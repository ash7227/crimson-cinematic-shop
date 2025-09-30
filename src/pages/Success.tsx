import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useCart } from "@/contexts/CartContext";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Clear cart on successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Thank you for your purchase! Your order has been confirmed and you'll receive a confirmation email shortly.
              </p>
              {sessionId && (
                <p className="text-sm text-muted-foreground">
                  Order ID: {sessionId.slice(-8)}
                </p>
              )}
              <div className="space-y-2">
                <Button 
                  onClick={() => navigate('/')} 
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Success;