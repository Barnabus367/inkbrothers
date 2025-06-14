import smokeTexture from "@assets/smoke-texture-wallpaper-dark-background_1749913309315_1749914968513.jpg";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
          alt="Dramatic black and grey tattoo artwork" 
          className="w-full h-full object-cover brightness-50" 
        />
      </div>
      
      {/* Smoke Overlay */}
      <div className="absolute inset-0 z-10 opacity-17">
        <img 
          src={smokeTexture}
          alt=""
          className="w-[120%] h-full object-cover animate-smoke-drift"
        />
      </div>
      
      {/* Red Glow Overlay */}
      <div className="absolute inset-0 z-20 hero-glow animate-float"></div>
      
      {/* Hero Content */}
      <div className="relative z-30 text-center px-4 max-w-4xl mx-auto hero-content">
        <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-shadow-glow tracking-wider hero-title">
          ZUGANG NUR<br/>FÜR ECHTE
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Kein Hype. Keine Poser. Nur echte Kunst auf echter Haut.
        </p>
        <button className="btn-cta text-xl px-10 py-4">
          TERMIN KLARMACHEN
        </button>
      </div>
    </section>
  );
}
