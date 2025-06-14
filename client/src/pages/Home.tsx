import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import CrewSection from "@/components/CrewSection";
import ConfiguratorSection from "@/components/ConfiguratorSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ExperimentalFeatures from "@/components/ExperimentalFeatures";

export default function Home() {
  useEffect(() => {
    // Initialize scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all scroll-animate elements
    document.querySelectorAll(".scroll-animate").forEach(el => {
      observer.observe(el);
    });

    // Add parallax effect to hero section
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroContent = document.querySelector(".hero-content");
      if (heroContent && scrolled < window.innerHeight) {
        (heroContent as HTMLElement).style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen ink-black text-ink-white">
      <Navigation />
      <HeroSection />
      <PortfolioSection />
      <CrewSection />
      <ExperimentalFeatures />
      <ConfiguratorSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
