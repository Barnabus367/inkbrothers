import { useState } from "react";
import { Palette, Camera, Ruler, User } from "lucide-react";

const tattooStyles = [
  {
    id: "blackgrey",
    name: "BLACK & GREY",
    description: "Klassisch, zeitlos, ausdrucksstark",
    icon: Palette
  },
  {
    id: "realism",
    name: "REALISM",
    description: "Fotorealistische Darstellungen",
    icon: Camera
  },
  {
    id: "fineline",
    name: "FINELINE",
    description: "Filigrane, minimalistische Designs",
    icon: Ruler
  },
  {
    id: "neotraditional",
    name: "NEO TRADITIONAL",
    description: "Moderne Interpretation klassischer Stile",
    icon: User
  },
  {
    id: "geometric",
    name: "GEOMETRIC",
    description: "Präzise Formen und Muster",
    icon: Palette
  }
];

export default function ConfiguratorSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [formData, setFormData] = useState({
    style: "",
    description: "",
    size: "",
    location: "",
    name: "",
    email: "",
    message: ""
  });

  const progress = (currentStep / 4) * 100;

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    setFormData(prev => ({ ...prev, style: styleId }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tattoo configuration submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Vielen Dank! Wir melden uns bald bei dir.");
  };

  return (
    <section id="konfigurator" className="py-20 px-4 ink-anthracite grunge-texture">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="font-bebas text-5xl md:text-6xl mb-4 text-ink-white section-title">
            TATTOO-KONFIGURATOR
          </h2>
          <p className="text-xl text-gray-400">
            Plane dein perfektes Tattoo in 4 einfachen Schritten
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-12 scroll-animate">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-ink-red">
              Schritt {currentStep} von 4
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(progress)}% abgeschlossen
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Configurator Form */}
        <div className="ink-black rounded-lg p-8 shadow-2xl scroll-animate">
          {currentStep === 1 && (
            <div>
              <h3 className="font-bebas text-3xl text-ink-white mb-8">
                WÄHLE DEINEN STIL
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tattooStyles.map((style) => {
                  const IconComponent = style.icon;
                  return (
                    <div
                      key={style.id}
                      onClick={() => handleStyleSelect(style.id)}
                      className={`configurator-step ${
                        selectedStyle === style.id ? "active" : ""
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/30 transition-colors">
                          <IconComponent className="w-8 h-8 text-ink-red" />
                        </div>
                        <h4 className="font-bebas text-xl text-ink-white mb-2">
                          {style.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {style.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="font-bebas text-3xl text-ink-white mb-8">
                BESCHREIBE DEIN WUNSCHMOTIV
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Detaillierte Beschreibung deiner Tattoo-Idee
                  </label>
                  <textarea
                    rows={8}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="form-textarea"
                    placeholder="Erzähl uns von deiner Tattoo-Idee... (z.B. Stil, Motive, Bedeutung, Inspiration, Größenvorstellung)"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="font-bebas text-3xl text-ink-white mb-8">
                GRÖSSE UND STELLE
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gewünschte Größe
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                    className="form-input"
                  >
                    <option value="">Größe wählen</option>
                    <option value="small">Klein (bis 5cm)</option>
                    <option value="medium">Mittel (5-15cm)</option>
                    <option value="large">Groß (15-25cm)</option>
                    <option value="xlarge">Sehr groß (über 25cm)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Körperstelle
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="form-input"
                  >
                    <option value="">Stelle wählen</option>
                    <option value="arm">Arm</option>
                    <option value="leg">Bein</option>
                    <option value="back">Rücken</option>
                    <option value="chest">Brust</option>
                    <option value="shoulder">Schulter</option>
                    <option value="wrist">Handgelenk</option>
                    <option value="neck">Nacken</option>
                    <option value="other">Andere</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="font-bebas text-3xl text-ink-white mb-8">
                KONTAKTDATEN
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="form-input"
                      placeholder="Dein Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="form-input"
                      placeholder="deine@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Zusätzliche Nachricht (optional)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="form-textarea"
                    placeholder="Weitere Informationen oder Fragen..."
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              ZURÜCK
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="btn-cta"
              >
                WEITER
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-cta"
              >
                KONFIGURATION SENDEN
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
