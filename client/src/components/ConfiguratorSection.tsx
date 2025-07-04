import { useState, useEffect } from "react";
import { Palette, Camera, Ruler, User, Sparkles, Loader2 } from "lucide-react";

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

  // AI Image Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [canGenerate, setCanGenerate] = useState(false);

  const progress = (currentStep / 4) * 100;

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    setFormData((prev) => ({ ...prev, style: styleId }));
  };

  // Monitor form changes for AI generation readiness
  useEffect(() => {
    checkGenerationReady();
  }, [formData.description, selectedStyle, selectedBodyPart, formData.size]);

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

  // Check if AI generation is possible
  const checkGenerationReady = () => {
    const hasDescription = formData.description.trim().length >= 5;
    const hasStyle = selectedStyle !== "";
    setCanGenerate(hasDescription && hasStyle);
  };

  // Calculate dynamic character limits
  const MAX_PROMPT_LENGTH = 300;
  
  const calculatePromptSuffix = () => {
    const selectedStyleData = tattooStyles.find(s => s.id === selectedStyle);
    
    // Style mapping to English
    const styleText = selectedStyleData ? `, in ${selectedStyleData.name.toLowerCase().replace('&', 'and')} style` : "";
    
    // Body part mapping to English
    const bodyPartMapping: Record<string, string> = {
      'arm': 'upper arm',
      'chest': 'chest',
      'back': 'back',
      'leg': 'leg', 
      'shoulder': 'shoulder',
      'wrist': 'wrist'
    };
    const bodyPartText = selectedBodyPart ? `, for the ${bodyPartMapping[selectedBodyPart] || selectedBodyPart}` : "";
    
    // Size mapping to English
    const sizeMapping: Record<string, string> = {
      'small': ', size: small (up to 5cm)',
      'medium': ', size: medium (5-15cm)', 
      'large': ', size: large (15-25cm)',
      'xlarge': ', size: very large (over 25cm)'
    };
    const sizeText = formData.size ? sizeMapping[formData.size] : "";
    
    return `${styleText}${bodyPartText}${sizeText}, tattoo design, high resolution, clear lines, trending on instagram, detailed`;
  };

  const promptSuffix = calculatePromptSuffix();
  const allowedUserLength = Math.max(10, MAX_PROMPT_LENGTH - promptSuffix.length);
  const remainingChars = allowedUserLength - formData.description.length;

  // Create comprehensive AI prompt from all user inputs
  const buildAIPrompt = () => {
    const fullPrompt = formData.description + promptSuffix;
    // Ensure we never exceed the maximum length
    return fullPrompt.slice(0, MAX_PROMPT_LENGTH);
  };

  // AI Image Generation Function
  const generateTattooPreview = async () => {
    if (!canGenerate || isGenerating) return;
    
    setIsGenerating(true);
    setGenerationError(null);
    
    try {
      const fullPrompt = buildAIPrompt();
      
      const response = await fetch('/api/generate-tattoo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: fullPrompt
        }),
      });
      
      const result = await response.json();
      
      if (result.image) {
        setGeneratedImage(result.image);
        
        // Show appropriate message based on source
        if (result.isFallback) {
          setGenerationError(result.message || "KI ist aktuell ausgelastet, hier unsere Top-Tattoo-Inspiration!");
        } else {
          setGenerationError(null); // Clear any previous errors for successful AI generation
        }
      }
      
      if (result.error && !result.image) {
        setGenerationError(result.error);
      }
      
    } catch (error) {
      console.error('Generation error:', error);
      setGenerationError('Netzwerkfehler bei der KI-Generierung. Prüfe deine Internetverbindung.');
    } finally {
      setIsGenerating(false);
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
      className="relative py-20 px-4 ink-anthracite grunge-texture section-flow z-20 -mt-8"
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
                      className={`configurator-step cursor-pointer border border-transparent transition-all duration-300 ease-out hover:border-red-600 hover:bg-white/[0.02] hover:scale-[1.01] ${
                        selectedStyle === style.id ? "active border-red-600 bg-white/[0.02]" : ""
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Description Input */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Detaillierte Beschreibung deiner Tattoo-Idee
                    </label>
                    <textarea
                      rows={8}
                      maxLength={allowedUserLength}
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
                    <div className="flex justify-between text-xs mt-2">
                      <p className="text-gray-500">
                        Mindestens 5 Zeichen für KI-Vorschau erforderlich
                      </p>
                      <p className={`${remainingChars <= 20 ? 'text-red-400' : remainingChars <= 50 ? 'text-yellow-400' : 'text-gray-500'}`}>
                        Noch {remainingChars} Zeichen verfügbar
                      </p>
                    </div>
                  </div>

                  {/* AI Generation Button */}
                  <div>
                    <button
                      onClick={generateTattooPreview}
                      disabled={!canGenerate || isGenerating}
                      className={`w-full flex items-center justify-center gap-3 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                        canGenerate && !isGenerating
                          ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg hover:shadow-red-500/25'
                          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          KI generiert Vorschau...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          KI-Vorschau generieren
                        </>
                      )}
                    </button>
                    
                    {!canGenerate && (
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Wähle einen Stil und beschreibe deine Idee für eine KI-Vorschau
                      </p>
                    )}

                    {/* AI Prompt Preview */}
                    {canGenerate && (
                      <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-600">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-sm font-medium text-gray-300">KI-Prompt Vorschau:</h5>
                          <span className="text-xs text-gray-400">
                            {buildAIPrompt().length}/{MAX_PROMPT_LENGTH} Zeichen
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 font-mono leading-relaxed">
                          "{buildAIPrompt()}"
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Vollständiger Prompt inkl. automatischer Tags (Stil, Körperstelle, Größe)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Preview Panel */}
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-red-500" />
                    KI-Vorschau
                  </h4>
                  
                  <div className="aspect-square bg-black/30 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center relative overflow-hidden">
                    {isGenerating && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <div className="text-center">
                          <Loader2 className="w-8 h-8 animate-spin text-red-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-300">KI erstellt dein Tattoo-Design...</p>
                          <p className="text-xs text-gray-500 mt-1">Dies kann bis zu 40 Sekunden dauern</p>
                        </div>
                      </div>
                    )}
                    
                    {generatedImage ? (
                      <img 
                        src={generatedImage} 
                        alt="KI-generierte Tattoo-Vorschau"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <Camera className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Deine KI-Vorschau erscheint hier</p>
                        <p className="text-xs mt-1">Beschreibe deine Idee und klicke auf "KI-Vorschau generieren"</p>
                      </div>
                    )}
                  </div>
                  
                  {generationError && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{generationError}</p>
                    </div>
                  )}
                  
                  {generatedImage && !generationError && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm">
                        Vorschau erfolgreich generiert! Dies ist ein KI-Konzept - das finale Tattoo wird von unserem Künstler individuell angepasst.
                      </p>
                    </div>
                  )}
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
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ease-out text-left hover:scale-[1.01] hover:bg-white/[0.02] ${
                          selectedBodyPart === part.id
                            ? 'border-red-600 bg-red-600/20 text-white'
                            : 'border-transparent hover:border-red-600 text-gray-400 hover:text-white'
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
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ease-out text-left hover:scale-[1.01] hover:bg-white/[0.02] ${
                          formData.size === size.id
                            ? 'border-red-600 bg-red-600/20 text-white'
                            : 'border-transparent hover:border-red-600 text-gray-400 hover:text-white'
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                  </svg>
                </span>
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn">
                KONFIGURATION SENDEN
                <span className="btn-arrow-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Gradient fade overlay for smooth transition */}
      <div className="section-fade-bottom pointer-events-none absolute bottom-0 left-0 w-full h-32 z-10"></div>
    </section>
  );
}
