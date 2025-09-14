import { useState } from "react";
import { X, ShoppingCart, Plus, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface BundleItem {
  name: string;
  type: string;
  image: string;
  price: number;
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

interface BundleModalProps {
  bundle: Bundle | null;
  isOpen: boolean;
  onClose: () => void;
}

const BundleModal = ({ bundle, isOpen, onClose }: BundleModalProps) => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!bundle) return null;

  const discount = Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100);

  const toggleItem = (index: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(index)) {
      newSelected.delete(index);
      const newQuantities = { ...quantities };
      delete newQuantities[index];
      setQuantities(newQuantities);
    } else {
      newSelected.add(index);
      setQuantities({ ...quantities, [index]: 1 });
    }
    setSelectedItems(newSelected);
  };

  const updateQuantity = (index: number, change: number) => {
    const current = quantities[index] || 1;
    const newQuantity = Math.max(1, current + change);
    setQuantities({ ...quantities, [index]: newQuantity });
  };

  const getSelectedTotal = () => {
    return Array.from(selectedItems).reduce((total, index) => {
      const item = bundle.items[index];
      const quantity = quantities[index] || 1;
      return total + (item.price * quantity);
    }, 0);
  };

  const handleBuyBundle = () => {
    addToCart({
      id: `bundle-${bundle.id}`,
      name: bundle.title,
      price: bundle.price,
      image: bundle.heroImage,
      type: 'bundle'
    });
    toast({
      title: "Added to cart!",
      description: `${bundle.title} bundle has been added to your cart.`,
    });
    onClose();
  };

  const handleAddSelectedToCart = () => {
    Array.from(selectedItems).forEach((index) => {
      const item = bundle.items[index];
      const quantity = quantities[index] || 1;
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: `${bundle.id}-item-${index}-${Date.now()}-${i}`,
          name: item.name,
          price: item.price,
          image: item.image,
          type: 'individual'
        });
      }
    });
    toast({
      title: "Added to cart!",
      description: `${selectedItems.size} item(s) added to your cart.`,
    });
    setSelectedItems(new Set());
    setQuantities({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cinematic">
            {bundle.title}
          </DialogTitle>
        </DialogHeader>

        {/* Hero Section */}
        <div className="relative mb-6">
          <img
            src={bundle.heroImage}
            alt={bundle.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="destructive" className="bg-crimson text-white">
              -{discount}%
            </Badge>
          </div>
        </div>

        {/* Bundle Purchase */}
        <div className="card-cinematic p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2">Complete Bundle</h3>
          <p className="text-muted-foreground mb-4">{bundle.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-crimson">${bundle.price}</span>
              <span className="text-xl text-muted-foreground line-through">${bundle.originalPrice}</span>
            </div>
            <Button className="btn-crimson" onClick={handleBuyBundle}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add Bundle to Cart
            </Button>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Individual Items */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Or Buy Items Separately</h3>
          <div className="grid gap-4">
            {bundle.items.map((item, index) => (
              <div
                key={index}
                className={`card-cinematic p-4 transition-all ${
                  selectedItems.has(index) ? 'ring-2 ring-crimson' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                    <p className="text-lg font-bold text-crimson mt-1">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedItems.has(index) && (
                      <div className="flex items-center space-x-2 mr-4">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(index, -1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{quantities[index] || 1}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(index, 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <Button
                      variant={selectedItems.has(index) ? "default" : "outline"}
                      onClick={() => toggleItem(index)}
                      className={selectedItems.has(index) ? "btn-crimson" : ""}
                    >
                      {selectedItems.has(index) ? "Added" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Items Summary */}
        {selectedItems.size > 0 && (
          <div className="card-cinematic p-4 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-semibold">
                  Selected Items ({selectedItems.size})
                </span>
                <p className="text-sm text-muted-foreground">
                  Total: ${getSelectedTotal().toFixed(2)}
                </p>
              </div>
              <Button className="btn-crimson" onClick={handleAddSelectedToCart}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add Selected to Cart
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BundleModal;