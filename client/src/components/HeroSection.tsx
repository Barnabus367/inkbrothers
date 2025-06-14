import { useEffect, useRef, useState } from "react";
import heroBackground from "@assets/image_1749869009808.png";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        heroElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden cursor-crosshair"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30 z-1 pointer-events-none"></div>

      {/* Interactive Light Beam */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(166, 40, 46, 0.3) 0%, transparent 30%)`,
        }}
      />
      
      {/* Main Hero Content */}
      <div
        className={`hero-inner relative z-2 text-center px-4 max-w-5xl mx-auto transition-all duration-2000 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >


        {/* Subtitle with Typewriter Effect */}
        <div className="mb-12 overflow-hidden">
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light animate-typewriter">
            Wir stechen Geschichten, keine Trends.
          </p>
        </div>

        {/* Interactive CTA Button */}
        <div className="relative inline-block">
          <a href="#kontakt" className="btn">
            TERMIN KLARMACHEN
            <span className="btn-arrow-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </span>
          </a>
        </div>

        
      </div>
      
      {/* Gradient fade overlay for smooth transition */}
      <div className="section-fade-bottom pointer-events-none absolute bottom-0 left-0 w-full h-32 z-10"></div>
    </section>
  );
}
