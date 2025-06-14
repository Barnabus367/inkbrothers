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
        {/* Animated Border Frame */}
        <div className="relative mb-12">
          <div className="absolute inset-0 border-2 border-red-500/30 rounded-lg animate-pulse"></div>
          <div className="absolute inset-2 border border-red-500/60 rounded animate-glow-pulse"></div>

          {/* Main Title with Glitch Effect */}
          <h1 className="relative font-bebas text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold py-8 px-4 tracking-wider hero-title-glitch">
            <span className="relative z-10 text-white drop-shadow-2xl">
              ZUGANG NUR
              <br />
              <span className="text-red-500 inline-block transform hover:scale-110 transition-transform duration-300">
                FÜR ECHTE
              </span>
            </span>

            {/* Glitch layers */}
            <span
              className="absolute inset-0 text-red-500 opacity-80 animate-glitch-1"
              aria-hidden="true"
            >
              ZUGANG NUR
              <br />
              FÜR ECHTE
            </span>
            <span
              className="absolute inset-0 text-cyan-400 opacity-60 animate-glitch-2"
              aria-hidden="true"
            >
              ZUGANG NUR
              <br />
              FÜR ECHTE
            </span>
          </h1>
        </div>

        {/* Subtitle with Typewriter Effect */}
        <div className="mb-12 overflow-hidden">
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light animate-typewriter">
            Wir stechen Geschichten, keine Trends.
          </p>
        </div>

        {/* Interactive CTA Button */}
        <div className="relative inline-block group">
          <button className="relative bg-red-600 text-white px-12 py-6 text-xl font-bold tracking-wider transition-all duration-300 overflow-hidden group-hover:bg-red-700 group-hover:scale-105 group-hover:rotate-1">
            <span className="relative z-10">TERMIN KLARMACHEN</span>

            {/* Button animations */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

            <div className="absolute inset-0 border-2 border-red-400 opacity-0 group-hover:opacity-100 animate-pulse"></div>
          </button>

          {/* Button glow effect */}
          <div className="absolute inset-0 bg-red-600 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 tracking-wider">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-red-500 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
