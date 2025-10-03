import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Order Placed Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Thank you for your order! We've received your order details and will contact you shortly with payment instructions.
            </p>
            {orderId && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium">Order Reference</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  {orderId.slice(0, 13)}...
                </p>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
                Continue Shopping
              </Button>
              <Button onClick={() => navigate("/orders")} className="flex-1">
                View Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Success;