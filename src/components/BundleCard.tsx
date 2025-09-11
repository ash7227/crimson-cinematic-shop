import { useState, useEffect } from "react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const allImages = [bundle.heroImage, ...bundle.items.map(item => item.image)];

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCurrentImageIndex(1); // Start with first item image
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0); // Return to hero image
  };

  // Auto-cycle through images when hovered
  useEffect(() => {
    if (!isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const nextIndex = prev + 1;
        return nextIndex >= allImages.length ? 1 : nextIndex; // Skip hero image in cycle
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isHovered, allImages.length]);

  return (
    <Card 
      className="card-cinematic group cursor-pointer overflow-hidden" 
      onClick={() => onViewDetails(bundle)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden">
        <img
          src={allImages[currentImageIndex]}
          alt={bundle.title}
          className="w-full h-80 object-cover object-top transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute top-4 right-4">
          <Badge variant="destructive" className="bg-crimson text-white">
            -{discount}%
          </Badge>
        </div>
        {isHovered && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {allImages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
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