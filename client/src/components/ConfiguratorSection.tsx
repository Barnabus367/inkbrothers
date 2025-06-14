import { useState } from "react";
import { Palette, Camera, Ruler, User } from "lucide-react";

const tattooStyles = [
  {
    id: "blackgrey",
    name: "BLACK & GREY",
    description: "Klassisch, zeitlos, ausdrucksstark",
    icon: Palette,
  },
  {
    id: "realism",
    name: "REALISM",
    description: "Fotorealistische Darstellungen",
    icon: Camera,
  },
  {
    id: "fineline",
    name: "FINELINE",
    description: "Filigrane, minimalistische Designs",
    icon: Ruler,
  },
  {
    id: "neotraditional",
    name: "NEO TRADITIONAL",
    description: "Moderne Interpretation klassischer Stile",
    icon: User,
  },
  {
    id: "geometric",
    name: "GEOMETRIC",
    description: "Präzise Formen und Muster",
    icon: Palette,
  },
];

const bodyParts = [
  { id: "arm", name: "Oberarm", icon: "💪", description: "Klassischer Spot für erste Tattoos" },
  { id: "chest", name: "Brust", icon: "🫀", description: "Symbolträchtig, nah am Herzen" },
  { id: "back", name: "Rücken", icon: "🗿", description: "Große Fläche für komplexe Designs" },
  { id: "leg", name: "Bein", icon: "🦵", description: "Vielseitig und gut versteckbar" },
  { id: "shoulder", name: "Schulter", icon: "💯", description: "Perfekt für Statement-Pieces" },
  { id: "wrist", name: "Handgelenk", icon: "⌚", description: "Klein aber fein, immer sichtbar" },
];

export default function ConfiguratorSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("");
  const [formData, setFormData] = useState({
    style: "",
    description: "",
    size: "",
    location: "",
    name: "",
    email: "",
    message: "",
  });

  const progress = (currentStep / 4) * 100;

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    setFormData((prev) => ({ ...prev, style: styleId }));
  };

  const handleBodyPartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bodyPart = e.target.value;
    setSelectedBodyPart(bodyPart);
    setFormData((prev) => ({ ...prev, location: bodyPart }));
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
    <section
      id="konfigurator"
      className="py-20 px-4 ink-anthracite grunge-texture"
    >
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
                WAS FÜR EIN STYLE?
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
                ERZÄHL UNS VON DEINER IDEE
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Detaillierte Beschreibung deiner Tattoo-Idee
                  </label>
                  <textarea
                    rows={8}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
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
                WO SOLL'S HIN?
              </h3>

              <div className="space-y-8">
                {/* Body Part Selection */}
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-4">
                    Körperstelle wählen
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {bodyParts.map((part) => (
                      <button
                        key={part.id}
                        type="button"
                        onClick={() => handleBodyPartChange({ target: { value: part.id } } as any)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                          selectedBodyPart === part.id
                            ? 'border-red-500 bg-red-500/20 text-white'
                            : 'border-gray-600 hover:border-red-500/50 text-gray-400 hover:text-white'
                        }`}
                      >
                        <div className="text-2xl mb-2">{part.icon}</div>
                        <div className="font-bold text-white">{part.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{part.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visual Preview */}
                {selectedBodyPart && (
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h4 className="text-white font-bold mb-4">Ausgewählte Stelle: {bodyParts.find(p => p.id === selectedBodyPart)?.name}</h4>
                    <div className="flex items-center justify-center">
                      <div className={`w-32 h-40 rounded-lg border-2 border-red-500/50 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center body-preview-${selectedBodyPart}`}>
                        <div className="text-4xl">{bodyParts.find(p => p.id === selectedBodyPart)?.icon}</div>
                      </div>
                    </div>
                    <p className="text-center text-gray-400 mt-4">
                      {bodyParts.find(p => p.id === selectedBodyPart)?.description}
                    </p>
                  </div>
                )}

                {/* Size Selection */}
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-4">
                    Wie groß soll's werden?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "small", name: "Klein", size: "bis 5cm", price: "ab 150 CHF", description: "Dezent und fein" },
                      { id: "medium", name: "Mittel", size: "5-15cm", price: "ab 300 CHF", description: "Perfekte Balance" },
                      { id: "large", name: "Groß", size: "15-25cm", price: "ab 800 CHF", description: "Echtes Statement" },
                      { id: "xlarge", name: "XXL", size: "über 25cm", price: "ab 1500 CHF", description: "Kunstwerk auf Haut" }
                    ].map((size) => (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, size: size.id }))}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                          formData.size === size.id
                            ? 'border-red-500 bg-red-500/20 text-white'
                            : 'border-gray-600 hover:border-red-500/50 text-gray-400 hover:text-white'
                        }`}
                      >
                        <div className="font-bold text-white">{size.name}</div>
                        <div className="text-sm text-gray-300">{size.size}</div>
                        <div className="text-xs text-red-400 font-medium">{size.price}</div>
                        <div className="text-xs text-gray-400 mt-1">{size.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="font-bebas text-3xl text-ink-white mb-8">
                WIE ERREICHEN WIR DICH?
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
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
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
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
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
              className={`px-6 py-3 font-bold tracking-wider uppercase transition-all duration-200 ease-in-out ${
                currentStep === 1
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700 hover:scale-105"
              }`}
              style={{ borderRadius: '12px', height: '48px' }}
            >
              ZURÜCK
            </button>

            {currentStep < 4 ? (
              <button onClick={nextStep} className="btn">
                WEITER
                <span className="btn-arrow-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                  </svg>
                </span>
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn">
                KONFIGURATION SENDEN
                <span className="btn-arrow-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
