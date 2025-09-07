import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BundleItem {
  name: string;
  type: string;
  image: string;
}

interface Bundle {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  items: BundleItem[];
  heroImage: string;
}

interface BundleCardProps {
  bundle: Bundle;
  onViewDetails: (bundle: Bundle) => void;
}

const BundleCard = ({ bundle, onViewDetails }: BundleCardProps) => {
  const discount = Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100);

  return (
    <Card className="card-cinematic group cursor-pointer overflow-hidden" onClick={() => onViewDetails(bundle)}>
      <div className="relative overflow-hidden">
        <img
          src={bundle.heroImage}
          alt={bundle.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute top-4 right-4">
          <Badge variant="destructive" className="bg-crimson text-white">
            -{discount}%
          </Badge>
        </div>
      </div>
      
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-bold group-hover:text-cinematic transition-colors">
          {bundle.title}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{bundle.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-crimson">${bundle.price}</span>
          <span className="text-lg text-muted-foreground line-through">${bundle.originalPrice}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {bundle.items.slice(0, 3).map((item, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {item.name}
            </Badge>
          ))}
          {bundle.items.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{bundle.items.length - 3} more
            </Badge>
          )}
        </div>
        
        <Button className="w-full btn-crimson">
          View Bundle
        </Button>
      </CardContent>
    </Card>
  );
};

export default BundleCard;