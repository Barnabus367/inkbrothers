import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import BrushStroke from "./BrushStroke";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-black/95 backdrop-blur-sm" : "bg-black/80"
    } border-b border-gray-800/30`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="font-bebas text-2xl text-ink-white tracking-wider">
              INK<span className="text-ink-red">BROTHERS</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a 
                href="#work" 
                onClick={(e) => handleNavClick(e, "#work")}
                className="nav-link"
              >
                WORK
              </a>
              <a 
                href="#artists" 
                onClick={(e) => handleNavClick(e, "#artists")}
                className="nav-link"
              >
                ARTISTS
              </a>
              <a 
                href="#konfigurator" 
                onClick={(e) => handleNavClick(e, "#konfigurator")}
                className="nav-link"
              >
                KONFIGURATOR
              </a>
              <a 
                href="#connect" 
                onClick={(e) => handleNavClick(e, "#connect")}
                className="nav-link"
              >
                CONNECT
              </a>
              <button className="btn-cta">
                TERMIN BUCHEN
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-ink-white hover:text-ink-red transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-ink-anthracite rounded-lg mt-2">
              <a 
                href="#work" 
                onClick={(e) => handleNavClick(e, "#work")}
                className="nav-link block px-3 py-2"
              >
                WORK
              </a>
              <a 
                href="#artists" 
                onClick={(e) => handleNavClick(e, "#artists")}
                className="nav-link block px-3 py-2"
              >
                ARTISTS
              </a>
              <a 
                href="#konfigurator" 
                onClick={(e) => handleNavClick(e, "#konfigurator")}
                className="nav-link block px-3 py-2"
              >
                KONFIGURATOR
              </a>
              <a 
                href="#connect" 
                onClick={(e) => handleNavClick(e, "#connect")}
                className="nav-link block px-3 py-2"
              >
                CONNECT
              </a>
              <button className="btn-cta w-full mt-2">
                TERMIN BUCHEN
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Animated Brushstroke */}
      <BrushStroke />
    </nav>
  );
}
