import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    name: "CosplayPro23",
    rating: 5,
    comment: "Ordered the tactical set for Comic-Con. The fabric quality is legit - not that cheap costume stuff. The pants actually fit like real tactical gear.",
    character: "Blood Spatter Analyst",
    verified: true
  },
  {
    name: "Jennifer M.",
    rating: 4,
    comment: "Love the attention to detail but sizing runs a bit large. The shirt material feels premium though. Definitely recommend sizing down.",
    character: "Chemistry Teacher",
    verified: true
  },
  {
    name: "TheatreKid2020",
    rating: 5,
    comment: "Used this for our school production. Director was impressed with how authentic it looked on stage. Worth the investment!",
    character: "Blood Spatter Analyst",
    verified: true
  },
  {
    name: "Mark T.",
    rating: 4,
    comment: "Good quality overall. The gloves are surprisingly well-made. Only complaint is shipping took a bit longer than expected but customer service was helpful.",
    character: "Chemistry Teacher",
    verified: true
  },
  {
    name: "Halloween_Queen",
    rating: 5,
    comment: "This was perfect for my Halloween costume! Got so many compliments. The apron is actually functional too lol.",
    character: "Blood Spatter Analyst",
    verified: true
  },
  {
    name: "David L.",
    rating: 3,
    comment: "Decent costume but the price is a bit steep. Quality is there but expected more accessories for the cost. Still happy with purchase.",
    character: "Chemistry Teacher",
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
            <span className="text-xl font-semibold ml-2">4.3</span>
            <span className="text-muted-foreground">• 89 reviews</span>
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