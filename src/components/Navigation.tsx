import { useState } from "react";
import { Search, Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

interface NavigationProps {
  onSearch?: (query: string) => void;
}

const Navigation = ({ onSearch }: NavigationProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Accessories", href: "/#accessories" },
    { name: "All Characters", href: "/characters" },
    { name: "Request a Character", href: "/#request" },
    { name: "Promo Codes", href: "/#promo" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-cinematic">Character Closet</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <Link to="/cart" className="relative">
              <Button variant="outline" size="icon">
                <ShoppingCart className="w-4 h-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:block">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search characters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 bg-input border-border"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="text"
                      placeholder="Search characters..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </form>
                  
                  {/* Mobile Menu Items */}
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                  <Link 
                    to="/cart" 
                    className="flex items-center gap-2 px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Cart ({getTotalItems()})
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;