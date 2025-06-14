import { useState, useRef, useEffect } from "react";
import { Instagram, MessageCircle, Star } from "lucide-react";
import davidWork from "@assets/image_1749869004142.png";
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
    image: davidWork,
    alt: "David Coello Misa - Master Tattoo Artist at InkBrothers Studio Zürich"
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
                
                {/* Instagram Embed Section */}
                <div className="relative overflow-hidden h-80 bg-black flex items-center justify-center">
                  <div className="w-full h-full">
                    <div 
                      className="instagram-embed-container w-full h-full flex items-center justify-center"
                      dangerouslySetInnerHTML={{
                        __html: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/BwPM2SPj9OK/?utm_source=ig_embed&utm_campaign=loading" data-instgrm-version="14" style="background:#000; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(166,40,46,0.5),0 1px 10px 0 rgba(166,40,46,0.15); margin: 1px; max-width:100%; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px); filter: grayscale(100%); transition: filter 0.7s ease;"><div style="padding:16px;"> <a href="https://www.instagram.com/p/BwPM2SPj9OK/?utm_source=ig_embed&utm_campaign=loading" style="background:#000; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style="display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #333; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style="background-color: #333; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style="background-color: #333; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#a6282e"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style="color:#a6282e; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">David Coello Misa auf Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #333; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #333; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #333; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style="background-color: #333; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style="width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #333; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style="width: 0px; border-top: 8px solid #333; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style="background-color: #333; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style="width: 0; height: 0; border-top: 8px solid #333; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style="background-color: #333; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style="background-color: #333; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style="color:#666; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/BwPM2SPj9OK/?utm_source=ig_embed&utm_campaign=loading" style="color:#a6282e; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Ein Beitrag von David Coello Misa (@siete_gatos_tattoo)</a></p></div></blockquote>`
                      }}
                    />
                  </div>
                  
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
