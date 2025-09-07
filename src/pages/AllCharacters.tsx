import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BundleCard from "@/components/BundleCard";
import BundleModal from "@/components/BundleModal";
import bloodSpatterTactical from "@/assets/blood-spatter-tactical.jpg";
import chemistryTeacherAlter from "@/assets/chemistry-teacher-alter.jpg";

// All available character bundles
const allCharacterBundles = [
  {
    id: "1",
    title: "Blood Spatter Analyst",
    description: "Complete forensic investigator costume with authentic details including tactical gear and analysis tools",
    price: 89.99,
    originalPrice: 129.99,
    heroImage: bloodSpatterTactical,
    items: [
      { name: "Tactical Henley", type: "Clothing", image: "/api/placeholder/100/100", price: 24.99 },
      { name: "Cargo Pants", type: "Clothing", image: "/api/placeholder/100/100", price: 32.99 },
      { name: "Tactical Gloves", type: "Accessory", image: "/api/placeholder/100/100", price: 15.99 },
      { name: "Evidence Kit", type: "Props", image: "/api/placeholder/100/100", price: 28.99 },
      { name: "Blood Sample Vials", type: "Props", image: "/api/placeholder/100/100", price: 12.99 },
      { name: "Lab Badge", type: "Accessory", image: "/api/placeholder/100/100", price: 8.99 },
    ]
  },
  {
    id: "2", 
    title: "Chemistry Teacher (Alter Ego)",
    description: "Transform into the iconic educator with this complete professional ensemble and chemistry accessories",
    price: 109.99,
    originalPrice: 149.99,
    heroImage: chemistryTeacherAlter,
    items: [
      { name: "Dark Suit Jacket", type: "Clothing", image: "/api/placeholder/100/100", price: 45.99 },
      { name: "Dress Pants", type: "Clothing", image: "/api/placeholder/100/100", price: 32.99 },
      { name: "Green Striped Shirt", type: "Clothing", image: "/api/placeholder/100/100", price: 22.99 },
      { name: "Fedora Hat", type: "Accessory", image: "/api/placeholder/100/100", price: 28.99 },
      { name: "Glasses", type: "Accessory", image: "/api/placeholder/100/100", price: 18.99 },
      { name: "Leather Belt", type: "Accessory", image: "/api/placeholder/100/100", price: 16.99 },
      { name: "Chemistry Equipment", type: "Props", image: "/api/placeholder/100/100", price: 34.99 },
    ]
  }
];

const AllCharacters = () => {
  const [selectedBundle, setSelectedBundle] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [filteredBundles, setFilteredBundles] = useState(allCharacterBundles);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredBundles(allCharacterBundles);
      setSearchResults([]);
      return;
    }

    const filtered = allCharacterBundles.filter(bundle => 
      bundle.title.toLowerCase().includes(query.toLowerCase()) ||
      bundle.description.toLowerCase().includes(query.toLowerCase()) ||
      bundle.items.some(item => item.name.toLowerCase().includes(query.toLowerCase()))
    );
    
    setFilteredBundles(filtered);
    setSearchResults(filtered.map(bundle => bundle.title));
  };

  const handleBundleView = (bundle: any) => {
    setSelectedBundle(bundle);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSearch={handleSearch} />
      
      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-cinematic">All Characters</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse our complete collection of character-inspired costume bundles. 
              Each set includes authentic details and premium accessories.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <span className="text-3xl font-bold text-crimson">{allCharacterBundles.length}</span>
              <p className="text-sm text-muted-foreground">Character Sets</p>
            </div>
            <div>
              <span className="text-3xl font-bold text-crimson">50+</span>
              <p className="text-sm text-muted-foreground">Individual Items</p>
            </div>
            <div>
              <span className="text-3xl font-bold text-crimson">Premium</span>
              <p className="text-sm text-muted-foreground">Quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Character Bundles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {searchResults.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Search Results ({filteredBundles.length})
              </h2>
            </div>
          )}
          
          {filteredBundles.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
                No characters found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all available characters.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBundles.map((bundle) => (
                <BundleCard
                  key={bundle.id}
                  bundle={bundle}
                  onViewDetails={handleBundleView}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">More Characters Coming Soon</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're constantly expanding our collection. Request your favorite character 
            and help us decide what to create next!
          </p>
          <button
            onClick={() => navigate('/#request')}
            className="btn-crimson px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
          >
            Request a Character
          </button>
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

export default AllCharacters;