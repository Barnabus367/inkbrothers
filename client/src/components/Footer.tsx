import { Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative ink-anthracite py-12 px-4 grunge-texture border-t border-gray-800 section-flow z-20 -mt-8">
      {/* Zurich Skyline */}
      <div className="absolute top-0 left-0 w-full h-32 overflow-hidden pointer-events-none">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1200 120" 
          className="w-full h-full opacity-20"
          style={{ mixBlendMode: 'lighten' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skylineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#666', stopOpacity: 0.8}}/>
              <stop offset="50%" style={{stopColor: '#999', stopOpacity: 0.6}}/>
              <stop offset="100%" style={{stopColor: '#666', stopOpacity: 0.8}}/>
            </linearGradient>
          </defs>
          
          {/* Zurich skyline silhouette */}
          <path d="M0,120 L0,90 L50,85 L80,70 L120,75 L150,60 L180,65 L220,45 L250,50 L280,35 L320,40 L350,55 L380,50 L420,65 L450,60 L480,75 L520,70 L550,85 L580,80 L620,95 L650,90 L680,105 L720,100 L750,115 L780,110 L820,95 L850,100 L880,85 L920,90 L950,75 L980,80 L1020,65 L1050,70 L1080,55 L1120,60 L1150,45 L1200,50 L1200,120 Z" 
                fill="url(#skylineGrad)" 
                opacity="0.6"/>
          
          {/* Church spires and distinctive buildings */}
          <rect x="200" y="25" width="8" height="40" fill="url(#skylineGrad)" opacity="0.7"/>
          <rect x="320" y="30" width="6" height="35" fill="url(#skylineGrad)" opacity="0.7"/>
          <rect x="480" y="45" width="10" height="30" fill="url(#skylineGrad)" opacity="0.7"/>
          <rect x="720" y="40" width="8" height="35" fill="url(#skylineGrad)" opacity="0.7"/>
          <rect x="920" y="35" width="12" height="40" fill="url(#skylineGrad)" opacity="0.7"/>
          
          {/* Lake reflection hint */}
          <ellipse cx="600" cy="115" rx="400" ry="3" fill="url(#skylineGrad)" opacity="0.3"/>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <div className="mb-6">
            <span className="font-bebas text-3xl text-ink-white tracking-wider">
              INK<span className="text-ink-red">BROTHERS</span>
            </span>
          </div>

          <div className="mb-4">
            <p className="text-xl text-gray-300">
              InkBrothers Studio Zürich – Est. 2012
            </p>
          </div>

          <div className="mb-8">
            <p className="text-lg font-semibold text-ink-red italic">
              "Respekt auf der Haut. Keine Kompromisse."
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="#"
              className="text-gray-400 hover:text-ink-red transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-ink-red transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-ink-red transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-500 text-sm">
              © 2024 InkBrothers Studio. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
