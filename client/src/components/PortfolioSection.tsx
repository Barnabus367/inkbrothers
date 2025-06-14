import { Instagram } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
    title: "Black & Grey Sleeve",
    year: "2024",
    alt: "Black and grey sleeve tattoo with intricate linework"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
    title: "Neo Traditional",
    year: "2024",
    alt: "Neo traditional colorful tattoo with bold lines"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
    title: "Geometric Fineline",
    year: "2024",
    alt: "Geometric fine line tattoo with precise patterns"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
    title: "Realism Portrait",
    year: "2024",
    alt: "Realistic portrait tattoo showing incredible detail"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
    title: "Japanese Traditional",
    year: "2024",
    alt: "Traditional Japanese tattoo with bold colors"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1588015540598-c2ad0ce4e00c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
    title: "Minimalist Fineline",
    year: "2024",
    alt: "Minimalist single needle tattoo with clean lines"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1590736965093-b4a93a7c7188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
    title: "Watercolor Abstract",
    year: "2024",
    alt: "Abstract watercolor style tattoo with flowing colors"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1590736962111-3954ed4c7e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
    title: "American Traditional",
    year: "2024",
    alt: "Traditional American tattoo with bold outlines"
  }
];

export default function PortfolioSection() {
  return (
    <section id="work" className="py-20 px-4 ink-anthracite grunge-texture">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="font-bebas text-5xl md:text-6xl mb-4 text-ink-white section-title">
            UNSERE ARBEIT
          </h2>
          <p className="text-xl text-gray-400">
            Authentische Tattoo-Kunst, die Geschichten erzählt
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`portfolio-item scroll-animate`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={item.image}
                alt={item.alt}
                className="w-full h-80 object-cover"
              />
              <div className="portfolio-overlay">
                <div className="text-center text-white">
                  <p className="font-semibold mb-2">{item.title}</p>
                  <p className="text-sm mb-4">{item.year}</p>
                  <button className="bg-red-600 px-4 py-2 rounded text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto">
                    <Instagram className="w-4 h-4" />
                    Auf Instagram ansehen
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
