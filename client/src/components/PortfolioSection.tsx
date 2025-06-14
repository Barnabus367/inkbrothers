import { useState, useRef, useEffect } from "react";
import { Instagram, ExternalLink, Eye } from "lucide-react";

import clownTattoo from "@assets/image_1749869004142.png";
import backPiece from "@assets/image_1749869009808.png";
import portraitTattoo from "@assets/image_1749869016181.png";
import skullTattoo from "@assets/image_1749869022370.png";
import musicSleeve from "@assets/image_1749869028566.png";
import duplicateClown from "@assets/01b418e4-1ff8-47df-9237-b4b132956efa.png";

const portfolioItems = [
  {
    id: 1,
    image: clownTattoo,
    title: "Horror Clown Portrait",
    year: "2024",
    artist: "David Siete Gatos",
    category: "Realism",
    alt: "Detailed horror clown tattoo with red nose on forearm - InkBrothers Studio Zürich",
  },
  {
    id: 2,
    image: backPiece,
    title: "Egyptian Mythology Backpiece",
    year: "2024",
    artist: "Roberto",
    category: "Realism",
    alt: "Full back tattoo featuring Egyptian pharaoh and mythology - InkBrothers Studio",
  },
  {
    id: 3,
    image: portraitTattoo,
    title: "Surreal Portrait",
    year: "2024",
    artist: "Apo",
    category: "Surrealism",
    alt: "Artistic portrait tattoo with dripping paint effects - InkBrothers Zürich",
  },
  {
    id: 4,
    image: skullTattoo,
    title: "Dark Portrait Realism",
    year: "2024",
    artist: "David Siete Gatos",
    category: "Realism",
    alt: "Dark realistic portrait tattoo with intricate shading - InkBrothers Studio",
  },
  {
    id: 5,
    image: musicSleeve,
    title: "Music Themed Sleeve",
    year: "2024",
    artist: "XXX",
    category: "Realism",
    alt: "Full sleeve tattoo with music and portrait elements - InkBrothers Zürich",
  },
  {
    id: 6,
    image: duplicateClown,
    title: "Horror Character Art",
    year: "2024",
    artist: "Roberto",
    category: "Horror",
    alt: "Detailed horror character tattoo showcase - InkBrothers Studio Zürich",
  },
];

export default function PortfolioSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      sectionElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        sectionElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section-tear relative py-20 px-4 ink-anthracite overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(166, 40, 46, 0.05) 0%, transparent 50%)`,
      }}
    >
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-red-500/30 to-transparent"
            style={{
              left: `${i * 3.33}%`,
              transform: `translateY(${Math.sin((mousePosition.x + i * 0.1) * Math.PI * 2) * 20}px)`,
              transition: "all 0.3s ease-out",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Title Section */}
        <div className="text-center mb-20 scroll-animate">
          <div className="relative inline-block">
            <h2 className="font-bebas text-6xl md:text-8xl mb-6 text-ink-white section-title relative z-10">
              <span
                className="inline-block animate-reveal-text"
                style={{ animationDelay: "0.2s" }}
              >
                UNSERE
              </span>
              <br />
              <span
                className="inline-block text-red-500 animate-reveal-text animate-neon-flicker"
                style={{ animationDelay: "0.4s" }}
              >
                ARBEIT
              </span>
            </h2>

            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-l-2 border-t-2 border-red-500/50 animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 border-r-2 border-b-2 border-red-500/50 animate-pulse"></div>
          </div>

          <p className="text-xl md:text-2xl text-gray-400 animate-typewriter max-w-3xl mx-auto">
            Authentische Tattoo-Kunst, die Geschichten erzählt
          </p>
        </div>

        {/* Interactive Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className="portfolio-item-advanced group relative scroll-animate"
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={() => setActiveItem(item.id)}
              onMouseLeave={() => setActiveItem(null)}
            >
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-black transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(255,0,0,0.3)]">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  style={{
                    filter:
                      activeItem === item.id
                        ? "brightness(1.1) contrast(1.2)"
                        : "brightness(0.8)",
                  }}
                />
                
                {/* Red glow background on hover */}
                <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                {/* Hover Overlay with Advanced Effects */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 ${
                    activeItem === item.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Animated Border Frame */}
                  <div className="absolute inset-2 border border-red-500/50 rounded opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500 animate-pulse"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500 animate-pulse"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="mb-4">
                      <h3 className="font-bebas text-2xl mb-1 text-red-500 animate-glitch-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-1">
                        by{" "}
                        <span className="text-red-400 font-semibold">
                          {item.artist}
                        </span>
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="px-2 py-1 bg-red-600/20 rounded border border-red-500/30">
                          {item.category}
                        </span>
                        <span>{item.year}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:rotate-1">
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </button>
                      <button className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700/80 px-4 py-2 rounded text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Magnetic Cursor Effect */}
                <div
                  className={`absolute w-2 h-2 bg-red-500 rounded-full pointer-events-none transition-all duration-200 ${
                    activeItem === item.id
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                  style={{
                    left: `${mousePosition.x * 100}%`,
                    top: `${mousePosition.y * 100}%`,
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 20px rgba(166, 40, 46, 0.8)",
                  }}
                />
              </div>

              {/* Interactive Number Badge */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bebas text-xl text-white transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 shadow-lg">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Glitch Effect Overlay */}
              <div
                className={`absolute inset-0 bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  activeItem === item.id ? "animate-glitch-2" : ""
                }`}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 scroll-animate">
          <p className="text-gray-400 mb-6 text-lg">
            Mehr von unserer Arbeit siehst du auf Instagram
          </p>
          <a href="https://instagram.com/inkbrothers_zurich" target="_blank" rel="noopener noreferrer" className="btn">
            @INKBROTHERS_ZURICH
            <span className="btn-arrow-circle">
              <Instagram className="w-3 h-3" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
