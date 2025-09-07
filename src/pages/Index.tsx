import { useState } from "react";
import Navigation from "@/components/Navigation";
import BundleCard from "@/components/BundleCard";
import BundleModal from "@/components/BundleModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReviewsSection from "@/components/ReviewsSection";
import bloodSpatterOutfit from "@/assets/blood-spatter-outfit.png";
import chemistryTeacherOutfit from "@/assets/chemistry-teacher-outfit.png";

// Mock data
const featuredBundles = [
  {
    id: "1",
    title: "Blood Spatter Analyst",
    description: "Complete forensic investigator costume with authentic details",
    price: 89.99,
    originalPrice: 129.99,
    heroImage: bloodSpatterOutfit,
    items: [
      { name: "Lab Coat", type: "Clothing", image: "/api/placeholder/100/100", price: 24.99 },
      { name: "Safety Glasses", type: "Accessory", image: "/api/placeholder/100/100", price: 12.99 },
      { name: "Latex Gloves", type: "Accessory", image: "/api/placeholder/100/100", price: 8.99 },
      { name: "Evidence Bags", type: "Props", image: "/api/placeholder/100/100", price: 15.99 },
      { name: "Blood Sample Kit", type: "Props", image: "/api/placeholder/100/100", price: 19.99 },
    ]
  },
  {
    id: "2",
    title: "Chemistry Teacher (Alter Ego)",
    description: "Transform into everyone's favorite science educator",
    price: 79.99,
    originalPrice: 109.99,
    heroImage: chemistryTeacherOutfit,
    items: [
      { name: "Yellow Shirt", type: "Clothing", image: "/api/placeholder/100/100", price: 19.99 },
      { name: "Khaki Pants", type: "Clothing", image: "/api/placeholder/100/100", price: 29.99 },
      { name: "Pork Pie Hat", type: "Accessory", image: "/api/placeholder/100/100", price: 16.99 },
      { name: "Gas Mask", type: "Accessory", image: "/api/placeholder/100/100", price: 34.99 },
      { name: "Chemistry Set", type: "Props", image: "/api/placeholder/100/100", price: 24.99 },
    ]
  }
];

const accessories = [
  { name: "Collector's Box", price: 29.99, image: "/api/placeholder/150/150", category: "Storage" },
  { name: "Fake Blood (8oz)", price: 12.99, image: "/api/placeholder/150/150", category: "Effects" },
  { name: "Blue Crystal Candy", price: 8.99, image: "/api/placeholder/150/150", category: "Props" },
  { name: "Nitrile Gloves (Box)", price: 15.99, image: "/api/placeholder/150/150", category: "Safety" },
  { name: "Evidence Labels", price: 6.99, image: "/api/placeholder/150/150", category: "Props" },
  { name: "Lab Goggles", price: 18.99, image: "/api/placeholder/150/150", category: "Safety" },
];

const Index = () => {
  const [selectedBundle, setSelectedBundle] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [voteCount, setVoteCount] = useState(200);
  const [requestForm, setRequestForm] = useState({ character: "", details: "" });
  const [promoCode, setPromoCode] = useState("");

  const handleSearch = (query: string) => {
    // Simple search implementation
    const results = featuredBundles
      .filter(bundle => bundle.title.toLowerCase().includes(query.toLowerCase()))
      .map(bundle => bundle.title);
    setSearchResults(results);
  };

  const handleBundleView = (bundle: any) => {
    setSelectedBundle(bundle);
    setIsModalOpen(true);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVoteCount(prev => Math.max(0, prev - 1));
    setRequestForm({ character: "", details: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSearch={handleSearch} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-cinematic">Character Closet</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Premium costume bundles and accessories inspired by your favorite characters. 
            Cinematic quality, authentic details.
          </p>
        </div>
      </section>

      {/* Featured Bundles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Character Bundles</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredBundles.map((bundle) => (
              <BundleCard
                key={bundle.id}
                bundle={bundle}
                onViewDetails={handleBundleView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Accessories Section */}
      <section id="accessories" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Standalone Accessories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {accessories.map((item, index) => (
              <Card key={index} className="card-cinematic">
                <CardContent className="p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-24 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                  <Badge variant="outline" className="text-xs mb-2">
                    {item.category}
                  </Badge>
                  <p className="text-crimson font-bold">${item.price}</p>
                  <Button size="sm" className="w-full mt-2 btn-crimson">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Request Character Section */}
      <section id="request" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <Card className="card-cinematic">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Request a Character</CardTitle>
              <p className="text-muted-foreground">
                Help us decide which character to create next!
              </p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-crimson">{voteCount}</span>
                <p className="text-sm text-muted-foreground">votes till next character</p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <Input
                  placeholder="Character name (e.g., 'The Joker', 'Sherlock Holmes')"
                  value={requestForm.character}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, character: e.target.value }))}
                  required
                />
                <Textarea
                  placeholder="Additional details or specific items you'd like to see..."
                  value={requestForm.details}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, details: e.target.value }))}
                  rows={4}
                />
                <Button type="submit" className="w-full btn-crimson">
                  Submit Request (+1 Vote)
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Promo Codes Section */}
      <section id="promo" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="container mx-auto max-w-md">
          <Card className="card-cinematic">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Promo Code</CardTitle>
              <p className="text-muted-foreground">
                Have a discount code? Enter it here!
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="text-center font-mono uppercase"
                />
                <Button className="w-full btn-crimson">
                  Apply Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bundle Modal */}
      <BundleModal
        bundle={selectedBundle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;