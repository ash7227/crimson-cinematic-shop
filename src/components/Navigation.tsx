import { useState } from "react";
import { Search, Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationProps {
  onSearch?: (query: string) => void;
}

const Navigation = ({ onSearch }: NavigationProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, signOut } = useAuth();

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
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-cinematic">Character Closet</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-sm mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search characters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input/50 border-border/50 focus:bg-input focus:border-border"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover border border-border shadow-lg">
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-background border-l border-border">
                  <div className="flex flex-col space-y-6 mt-8">
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
                    <div className="flex flex-col space-y-1">
                      {menuItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="px-3 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                      
                      <Link 
                        to="/cart" 
                        className="flex items-center gap-3 px-3 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Cart ({getTotalItems()})
                      </Link>
                      
                      {user ? (
                        <button
                          onClick={() => {
                            signOut();
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-3 px-3 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors w-full text-left"
                        >
                          <LogOut className="w-5 h-5" />
                          Sign Out
                        </button>
                      ) : (
                        <Link 
                          to="/auth" 
                          className="flex items-center gap-3 px-3 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="w-5 h-5" />
                          Sign In
                        </Link>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;