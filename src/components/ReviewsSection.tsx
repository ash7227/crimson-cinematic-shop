import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    name: "Mike R.",
    rating: 5,
    comment: "The Blood Spatter Analyst costume is incredibly detailed! Every piece feels authentic and high quality. Perfect for conventions.",
    character: "Blood Spatter Analyst",
    verified: true
  },
  {
    name: "Sarah L.",
    rating: 5,
    comment: "Amazing attention to detail on the Chemistry Teacher set. The suit fits perfectly and the accessories are spot on!",
    character: "Chemistry Teacher",
    verified: true
  },
  {
    name: "James K.",
    rating: 5,
    comment: "Character Closet doesn't mess around - these costumes are movie quality. Worth every penny for the authenticity.",
    character: "Blood Spatter Analyst",
    verified: true
  },
  {
    name: "Emma D.",
    rating: 5,
    comment: "Fast shipping, perfect packaging, and the costume exceeded my expectations. The fedora and glasses are perfect!",
    character: "Chemistry Teacher",
    verified: true
  },
  {
    name: "Alex M.",
    rating: 5,
    comment: "Finally found costumes that actually look like the real thing. Character Closet is now my go-to for all costume needs.",
    character: "All Characters",
    verified: true
  }
];

const ReviewsSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 fill-crimson text-crimson" />
            ))}
            <span className="text-xl font-semibold ml-2">5.0</span>
            <span className="text-muted-foreground">• 127 reviews</span>
          </div>
          <p className="text-muted-foreground">
            Trusted by collectors and enthusiasts worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="card-cinematic">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-crimson text-white">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{review.name}</span>
                      {review.verified && (
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${
                            star <= review.rating 
                              ? 'fill-crimson text-crimson' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3 italic">
                  "{review.comment}"
                </p>
                <span className="text-xs text-crimson font-medium">
                  {review.character}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;