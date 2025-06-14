import { useState, useRef, useEffect } from "react";
import { Instagram, MessageCircle, Star } from "lucide-react";
import davidPhoto from "@assets/image_1749921330782.png";
import robertoWork from "@assets/image_1749869009808.png";
import apoWork from "@assets/image_1749869016181.png";
import xxxWork from "@assets/image_1749869022370.png";

const crewMembers = [
  {
    id: 1,
    name: "DAVID COELLO MISA",
    role: "Master Tattoo Artist",
    experience: "15+ Jahre",
    quote: "Jedes Tattoo ist ein Kunstwerk, das eine Geschichte erzählt.",
    specialties: ["Realism", "Black & Grey", "Portraits", "Neo Traditional"],
    instagram: "@davidcoellomisa",
    image: davidPhoto,
    alt: "David Coello Misa holding tattoo awards - Master Tattoo Artist at InkBrothers Studio Zürich"
  }
];

export default function CrewSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
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
      sectionElement.addEventListener('mousemove', handleMouseMove);
      return () => sectionElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section 
      id="artists" 
      ref={sectionRef}
      className="relative py-20 px-4 ink-black overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(166, 40, 46, 0.08) 0%, transparent 60%)`
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-red-500/40 to-transparent"
            style={{
              left: `${(i * 2.5)}%`,
              transform: `translateX(${Math.sin((mousePosition.y + i * 0.1) * Math.PI * 2) * 30}px) rotate(${mousePosition.x * 10}deg)`,
              transition: 'all 0.5s ease-out'
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              transform: `translate(${mousePosition.x * 20 - 10}px, ${mousePosition.y * 20 - 10}px)`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Title Section */}
        <div className="text-center mb-20 scroll-animate">
          <div className="relative inline-block">
            <h2 className="font-bebas text-6xl md:text-8xl mb-6 text-ink-white section-title relative">
              <span className="inline-block animate-reveal-text" style={{ animationDelay: '0.3s' }}>
                DER
              </span>
              <br/>
              <span className="inline-block text-red-500 animate-reveal-text animate-neon-flicker" style={{ animationDelay: '0.6s' }}>
                KÜNSTLER
              </span>
              
              {/* Dynamic underline */}
              <div 
                className="absolute bottom-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent transition-all duration-500"
                style={{
                  left: `${mousePosition.x * 30}%`,
                  width: `${40 + mousePosition.x * 20}%`,
                  opacity: 0.6 + mousePosition.x * 0.4
                }}
              />
            </h2>
            
            {/* Corner decorations */}
            <div className="absolute -top-6 -left-6 w-12 h-12 border-l-2 border-t-2 border-red-500/40 animate-pulse" />
            <div className="absolute -bottom-6 -right-6 w-12 h-12 border-r-2 border-b-2 border-red-500/40 animate-pulse" />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto animate-typewriter">
            Der Meister hinter den Kunstwerken
          </p>
        </div>
        
        {/* Artist Showcase */}
        <div className="flex justify-center">
          <div className="max-w-md w-full">
            {crewMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="crew-card-advanced group relative scroll-animate"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transform: hoveredMember === member.id ? 'scale(1.02)' : 'scale(1)'
              }}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* 3D Card Container */}
              <div className="relative h-full bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 transition-all duration-500 group-hover:border-red-500/50">
                
                {/* Holographic Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `conic-gradient(from ${mousePosition.x * 360}deg, transparent, rgba(166, 40, 46, 0.3), transparent)`
                  }}
                />
                
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.alt}
                    className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Number Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bebas text-xl text-white shadow-xl transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Social Icons */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex gap-2">
                      <button className="w-8 h-8 bg-red-600/80 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                        <Instagram className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-gray-800/80 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6 relative">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-transparent" />
                  </div>
                  
                  <div className="relative z-10">
                    {/* Name and Title */}
                    <div className="mb-4">
                      <h3 className="font-bebas text-2xl text-ink-white mb-1 group-hover:text-red-400 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-red-500 font-semibold text-sm mb-1">
                        {member.role}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {member.experience}
                      </p>
                    </div>
                    
                    {/* Specialties */}
                    <div className="mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty, i) => (
                          <span 
                            key={specialty}
                            className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded border border-red-500/30 animate-fade-in-up"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Quote */}
                    <div className="relative">
                      <p className="text-gray-400 text-sm italic leading-relaxed">
                        "{member.quote}"
                      </p>
                      
                      {/* Quote decorations */}
                      <div className="absolute -top-2 -left-2 text-red-500/30 text-3xl font-serif">"</div>
                      <div className="absolute -bottom-4 -right-2 text-red-500/30 text-3xl font-serif transform rotate-180">"</div>
                    </div>
                    
                    {/* Instagram Handle */}
                    <div className="mt-4 pt-4 border-t border-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-xs">{member.instagram}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Glitch Effect */}
                <div className={`absolute inset-0 bg-red-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  hoveredMember === member.id ? 'animate-glitch-1' : ''
                }`} />
                
                {/* Interactive Light Beam */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none rounded-xl"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(166, 40, 46, 0.2) 0%, transparent 70%)`
                  }}
                />
              </div>
            </div>
          ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-20 scroll-animate">
          <p className="text-gray-400 mb-8 text-lg">
            Bereit, mit David zu arbeiten?
          </p>
          <button className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 font-bebas text-xl tracking-wider transition-all duration-300 transform hover:scale-105 hover:rotate-1 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              <MessageCircle className="w-6 h-6" />
              TERMIN VEREINBAREN
            </span>
            
            {/* Button animations */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="absolute inset-0 border-2 border-red-400 opacity-0 group-hover:opacity-100 animate-pulse" />
          </button>
        </div>
      </div>
    </section>
  );
}
