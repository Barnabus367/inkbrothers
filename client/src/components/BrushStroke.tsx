import { useEffect, useState } from "react";

export default function BrushStroke() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isVisible && window.scrollY > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  return (
    <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1200 20" preserveAspectRatio="none">
        <path 
          className={`brush-stroke ${isVisible ? "animate-brush-draw" : ""}`}
          d="M0,10 Q300,2 600,10 T1200,10" 
          stroke="var(--ink-red)" 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
