import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import BrushStroke from "./BrushStroke";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (navElement) {
        navElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/95 backdrop-blur-sm" : "bg-black/80"
      } border-b border-gray-800/30 overflow-hidden`}
      style={{
        background: `linear-gradient(90deg, 
          rgba(0,0,0,0.9) 0%, 
          rgba(166,40,46,${mousePosition.x * 0.1}) ${mousePosition.x * 100}%, 
          rgba(0,0,0,0.9) 100%)`,
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent"
            style={{
              left: `${i * 8 + mousePosition.x * 10}%`,
              transform: `translateX(${Math.sin(mousePosition.x * Math.PI * 2) * 20}px)`,
              opacity: 0.3 + mousePosition.x * 0.4,
              transition: "all 0.3s ease-out",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Interactive Logo */}
          <div className="flex-shrink-0 relative group">
            <span
              className="font-bebas text-2xl text-ink-white tracking-wider transition-all duration-300 hover:scale-110"
              style={{
                textShadow: `0 0 ${10 + mousePosition.x * 20}px rgba(166, 40, 46, ${0.5 + mousePosition.x * 0.5})`,
              }}
            >
              INK
              <span className="text-ink-red animate-neon-flicker">
                BROTHERS
              </span>
            </span>

            {/* Logo particles */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-red-500 rounded-full animate-float"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Advanced Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {[
                { href: "#work", text: "WORK" },
                { href: "#artists", text: "ARTISTS" },
                { href: "#konfigurator", text: "KONFIGURATOR" },
                { href: "#connect", text: "CONNECT" },
              ].map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative group nav-link-advanced transition-all duration-300"
                  style={{
                    transform: `translateY(${Math.sin((mousePosition.x + index * 0.25) * Math.PI * 2) * 3}px)`,
                    transition: "all 0.3s ease-out",
                  }}
                >
                  <span className="relative z-10">{item.text}</span>

                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-red-600/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded" />

                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />

                  {/* Glitch effect on hover */}
                  <span
                    className="absolute inset-0 text-red-500 opacity-0 group-hover:opacity-50 group-hover:animate-glitch-1"
                    aria-hidden="true"
                  >
                    {item.text}
                  </span>
                </a>
              ))}

              {/* Enhanced CTA Button */}
              <button className="btn-cta-advanced">
                TERMIN BUCHEN
              </button>
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative text-ink-white hover:text-ink-red transition-all duration-300 transform hover:scale-110 hover:rotate-180"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}

              {/* Button glow */}
              <div className="absolute inset-0 bg-red-500 blur-md opacity-0 hover:opacity-30 transition-opacity duration-300 rounded-full" />
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-ink-anthracite/95 backdrop-blur-md rounded-lg mt-2 border border-red-500/30">
              {[
                { href: "#work", text: "WORK" },
                { href: "#artists", text: "ARTISTS" },
                { href: "#konfigurator", text: "KONFIGURATOR" },
                { href: "#connect", text: "CONNECT" },
              ].map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-link block px-3 py-2 relative group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{item.text}</span>
                  <div className="absolute inset-0 bg-red-600/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded" />
                </a>
              ))}

              <button
                className="btn-cta w-full mt-2 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                TERMIN BUCHEN
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Animated Brushstroke */}
      <BrushStroke />

      {/* Dynamic Light Trail */}
      <div
        className="absolute bottom-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent transition-all duration-300"
        style={{
          left: `${mousePosition.x * 80}%`,
          width: "20%",
          opacity: mousePosition.x > 0 ? 0.8 : 0,
        }}
      />
    </nav>
  );
}
