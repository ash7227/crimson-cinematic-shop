import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, customerData } = await req.json();
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

    if (!stripeSecretKey) {
      throw new Error('Stripe secret key not configured');
    }

    // Create line items from cart items
    const lineItems = items.map((item: any) => {
      // Convert relative image paths to full URLs
      const imageUrl = item.image.startsWith('http') 
        ? item.image 
        : `${req.headers.get('origin')}${item.image}`;
      
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [imageUrl],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe checkout session
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'success_url': `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${req.headers.get('origin')}/checkout`,
        'payment_method_types[0]': 'card',
        'mode': 'payment',
        'customer_email': customerData?.email || '',
        'shipping_address_collection[allowed_countries][0]': 'US',
        'shipping_address_collection[allowed_countries][1]': 'CA',
        ...lineItems.reduce((acc: Record<string, string>, item: any, index: number) => {
          acc[`line_items[${index}][price_data][currency]`] = item.price_data.currency;
          acc[`line_items[${index}][price_data][product_data][name]`] = item.price_data.product_data.name;
          acc[`line_items[${index}][price_data][product_data][images][0]`] = item.price_data.product_data.images[0];
          acc[`line_items[${index}][price_data][unit_amount]`] = item.price_data.unit_amount.toString();
          acc[`line_items[${index}][quantity]`] = item.quantity.toString();
          return acc;
        }, {} as Record<string, string>),
      }),
    });

    const session = await response.json();

    if (!response.ok) {
      console.error('Stripe error:', session);
      throw new Error(session.error?.message || 'Failed to create checkout session');
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in create-checkout function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});