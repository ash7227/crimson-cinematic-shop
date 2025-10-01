-- Create orders table to store order information
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_session_id text UNIQUE NOT NULL,
  stripe_payment_intent_id text,
  status text NOT NULL DEFAULT 'pending',
  total_amount decimal(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'usd',
  customer_email text NOT NULL,
  customer_name text,
  shipping_address jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create order_items table to store individual items in each order
CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_name text NOT NULL,
  product_image text,
  quantity integer NOT NULL,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Enable RLS on order_items table
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own orders
CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Policy: Users can view items from their own orders
CREATE POLICY "Users can view their own order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Policy: Service role can insert orders (for webhooks)
CREATE POLICY "Service role can insert orders"
ON public.orders
FOR INSERT
TO service_role
WITH CHECK (true);

-- Policy: Service role can insert order items (for webhooks)
CREATE POLICY "Service role can insert order items"
ON public.order_items
FOR INSERT
TO service_role
WITH CHECK (true);

-- Policy: Service role can update orders (for webhooks)
CREATE POLICY "Service role can update orders"
ON public.orders
FOR UPDATE
TO service_role
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_stripe_session_id ON public.orders(stripe_session_id);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();