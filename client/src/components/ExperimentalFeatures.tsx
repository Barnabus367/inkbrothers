import { useState, useEffect, useRef } from "react";
import { Eye, Zap, Cpu, Palette, Camera } from "lucide-react";

// AI-Powered Tattoo Vision Component
export function TattooVisionAI() {
  const [isActive, setIsActive] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startVision = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "environment",
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        startAnalysis();
      }
    } catch (error: any) {
      setError(
        "Kamera-Zugriff verweigert. Bitte erlauben Sie den Kamera-Zugriff für KI-Analyse.",
      );
      console.error("Camera access denied:", error);
    }
  };

  const stopVision = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsActive(false);
    setIsAnalyzing(false);
    setAiSuggestion("");
    setAnalysisResults([]);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate progressive AI analysis
    const analysisSteps = [
      { step: 1, text: "Körperregion erkannt...", delay: 1000 },
      { step: 2, text: "Hautstruktur analysiert...", delay: 2000 },
      { step: 3, text: "Optimale Tattoo-Stile berechnet...", delay: 3000 },
      { step: 4, text: "Empfehlungen generiert!", delay: 4000 },
    ];

    analysisSteps.forEach(({ step, text, delay }) => {
      setTimeout(() => {
        setAnalysisResults((prev) => [
          ...prev,
          { step, text, timestamp: Date.now() },
        ]);
        if (step === 4) {
          setIsAnalyzing(false);
          generateAISuggestion();
        }
      }, delay);
    });
  };

  const generateAISuggestion = () => {
    const suggestions = [
      "Oberarm: Perfekt für ein Neo-Traditional Sleeve mit organischen Formen und kräftigen Farben",
      "Unterarm: Ideal für Fine-Line Arbeiten oder geometrische Muster mit hohem Detailgrad",
      "Schulter: Ausgezeichnet für realistische Portraits oder biomechanische Designs",
      "Rücken: Optimal für großflächige Kompositionen oder japanische Traditional-Stile",
      "Brust: Geeignet für symmetrische Designs oder ornamentale Blackwork-Muster",
    ];
    const randomSuggestion =
      suggestions[Math.floor(Math.random() * suggestions.length)];
    setAiSuggestion(randomSuggestion);
  };

  const captureSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0);
        // Here you could send the image data to an actual AI service
        generateAISuggestion();
      }
    }
  };

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Eye className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">KI Tattoo-Vision</h3>
        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
          BETA
        </span>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {!isActive ? (
        <div className="space-y-4">
          <button
            onClick={startVision}
            className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
          >
            📱 Körperstelle scannen für KI-Empfehlung
          </button>
          <div className="text-center text-gray-400 text-sm">
            <p>
              Die KI analysiert Ihre Körperstelle und empfiehlt optimale
              Tattoo-Stile
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-48 object-cover rounded-lg border border-red-500/30"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-2"></div>
                  <p className="text-white text-sm">KI analysiert...</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={captureSnapshot}
              disabled={isAnalyzing}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
            >
              📸 Analyse starten
            </button>
            <button
              onClick={stopVision}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
            >
              ❌ Stoppen
            </button>
          </div>

          {analysisResults.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">
                Analyse-Fortschritt:
              </h4>
              {analysisResults.map((result, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-300 mb-1"
                >
                  <span className="text-green-400">✓</span>
                  {result.text}
                </div>
              ))}
            </div>
          )}

          {aiSuggestion && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-medium mb-2">🧠 KI-Empfehlung:</p>
              <p className="text-white leading-relaxed">{aiSuggestion}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Real-time Tattoo Simulator
export function LiveTattooSimulator() {
  const [selectedStyle, setSelectedStyle] = useState("realism");
  const [opacity, setOpacity] = useState(0.8);

  const styles = [
    { id: "realism", name: "Realism", color: "#ff4444" },
    { id: "traditional", name: "Traditional", color: "#44ff44" },
    { id: "geometric", name: "Geometric", color: "#4444ff" },
    { id: "blackwork", name: "Blackwork", color: "#ffffff" },
  ];

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">Live Tattoo Simulator</h3>
        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
          LIVE
        </span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                selectedStyle === style.id
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-gray-600 hover:border-red-500/50 text-gray-400 hover:text-white"
              }`}
            >
              {style.name}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-white font-medium">Transparenz</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-red"
          />
        </div>

        <div
          className="w-full h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-red-500/30 flex items-center justify-center relative overflow-hidden"
          style={{ opacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse" />
          <p className="text-white font-bold">Tattoo-Vorschau hier</p>
        </div>
      </div>
    </div>
  );
}

// Advanced Pain Simulator with Personalization
export function PainSimulator() {
  const [bodyPart, setBodyPart] = useState("arm");
  const [painLevel, setPainLevel] = useState(0);
  const [personalTolerance, setPersonalTolerance] = useState(5);
  const [tattooSize, setTattooSize] = useState("medium");
  const [sessionDuration, setSessionDuration] = useState(2);
  const [finalPrediction, setFinalPrediction] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const bodyParts = [
    {
      id: "arm",
      name: "Oberarm",
      pain: 3,
      nerves: "wenige",
      description: "Muskulöse Region, gut gepolstert",
    },
    {
      id: "forearm",
      name: "Unterarm",
      pain: 4,
      nerves: "mäßig",
      description: "Mehr Knochen spürbar, moderate Schmerzen",
    },
    {
      id: "ribs",
      name: "Rippen",
      pain: 8,
      nerves: "viele",
      description: "Direkt auf Knochen, sehr schmerzhaft",
    },
    {
      id: "back",
      name: "Rücken",
      pain: 4,
      nerves: "wenige",
      description: "Große Fläche, variiert je nach Bereich",
    },
    {
      id: "ankle",
      name: "Knöchel",
      pain: 7,
      nerves: "viele",
      description: "Dünne Haut, viele Nervenenden",
    },
    {
      id: "shoulder",
      name: "Schulter",
      pain: 5,
      nerves: "mäßig",
      description: "Muskulös aber bewegungsaktiv",
    },
    {
      id: "wrist",
      name: "Handgelenk",
      pain: 8,
      nerves: "sehr viele",
      description: "Sehr empfindlich, dünne Haut",
    },
    {
      id: "thigh",
      name: "Oberschenkel",
      pain: 3,
      nerves: "wenige",
      description: "Großer Muskel, wenig schmerzhaft",
    },
    {
      id: "shin",
      name: "Schienbein",
      pain: 9,
      nerves: "sehr viele",
      description: "Direkt auf Knochen, extrem schmerzhaft",
    },
    {
      id: "neck",
      name: "Nacken",
      pain: 7,
      nerves: "viele",
      description: "Empfindliche Region, viele Nerven",
    },
  ];

  const sizeMultipliers = {
    small: { factor: 0.8, name: "Klein (< 5cm)", duration: "1-2h" },
    medium: { factor: 1.0, name: "Mittel (5-15cm)", duration: "2-4h" },
    large: { factor: 1.3, name: "Groß (15-30cm)", duration: "4-8h" },
    sleeve: { factor: 1.8, name: "Sleeve/Rücken", duration: "8-15h" },
  };

  useEffect(() => {
    const selectedPart = bodyParts.find((part) => part.id === bodyPart);
    if (selectedPart) {
      calculatePainPrediction(selectedPart);
    }
  }, [bodyPart, personalTolerance, tattooSize, sessionDuration]);

  const calculatePainPrediction = (selectedPart: any) => {
    const basePain = selectedPart.pain;
    const sizeModifier =
      sizeMultipliers[tattooSize as keyof typeof sizeMultipliers].factor;
    const toleranceModifier = (10 - personalTolerance) / 10;
    const durationModifier = sessionDuration > 3 ? 1.2 : 1.0;

    const calculatedPain = Math.min(
      10,
      Math.round(
        basePain * sizeModifier * toleranceModifier * durationModifier,
      ),
    );
    setPainLevel(calculatedPain);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const selectedPart = bodyParts.find((part) => part.id === bodyPart);
      const size = sizeMultipliers[tattooSize as keyof typeof sizeMultipliers];

      setFinalPrediction({
        bodyPart: selectedPart?.name,
        painLevel,
        recommendations: generateRecommendations(),
        estimatedBreaks: Math.ceil(sessionDuration / 2),
        aftercare: getAftercareAdvice(),
      });
      setIsSimulating(false);
    }, 2000);
  };

  const generateRecommendations = () => {
    const recommendations = [];

    if (painLevel <= 3) {
      recommendations.push("✅ Perfekt für Ihr erstes Tattoo");
      recommendations.push("🧘 Entspannungstechniken ausreichend");
    } else if (painLevel <= 6) {
      recommendations.push("⚠️ Schmerztoleranz-Training empfohlen");
      recommendations.push("🍯 Vor dem Termin gut essen");
    } else {
      recommendations.push("🚨 Nur für erfahrene Tattoo-Träger");
      recommendations.push("💊 Schmerzmittel vorher besprechen");
      recommendations.push("👥 Vertrauensperson mitbringen");
    }

    if (sessionDuration > 4) {
      recommendations.push("⏰ Mehrere Sitzungen planen");
    }

    return recommendations;
  };

  const getAftercareAdvice = () => {
    if (painLevel <= 4) return "Standard-Nachsorge ausreichend";
    if (painLevel <= 7) return "Erhöhte Aufmerksamkeit bei der Nachsorge";
    return "Intensive Nachsorge und Schmerzmanagement nötig";
  };

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">Schmerz-Simulator</h3>
        <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
          ADVANCED
        </span>
      </div>

      <div className="space-y-4">
        {/* Body Part Selection */}
        <div>
          <label className="block text-white font-medium mb-2">
            Körperstelle wählen
          </label>
          <select
            value={bodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-red-500 focus:outline-none"
          >
            {bodyParts.map((part) => (
              <option key={part.id} value={part.id}>
                {part.name} - {part.description}
              </option>
            ))}
          </select>
        </div>

        {/* Personal Pain Tolerance */}
        <div>
          <label className="block text-white font-medium mb-2">
            Ihre Schmerztoleranz: {personalTolerance}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={personalTolerance}
            onChange={(e) => setPersonalTolerance(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Schmerzempfindlich</span>
            <span>Schmerzresistent</span>
          </div>
        </div>

        {/* Tattoo Size */}
        <div>
          <label className="block text-white font-medium mb-2">
            Tattoo-Größe
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(sizeMultipliers).map(([key, size]) => (
              <button
                key={key}
                onClick={() => setTattooSize(key)}
                className={`p-3 rounded-lg border text-sm transition-all duration-300 ${
                  tattooSize === key
                    ? "border-red-500 bg-red-500/20 text-white"
                    : "border-gray-600 hover:border-red-500/50 text-gray-400 hover:text-white"
                }`}
              >
                <div className="font-medium">{size.name}</div>
                <div className="text-xs opacity-75">{size.duration}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Session Duration */}
        <div>
          <label className="block text-white font-medium mb-2">
            Geplante Sitzungsdauer: {sessionDuration}h
          </label>
          <input
            type="range"
            min="1"
            max="8"
            value={sessionDuration}
            onChange={(e) => setSessionDuration(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Pain Level Display */}
        <div className="space-y-2">
          <div className="flex justify-between text-white">
            <span>Vorhergesagtes Schmerzlevel</span>
            <span className="font-bold text-2xl">{painLevel}/10</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 relative overflow-hidden">
            <div
              className={`h-4 rounded-full transition-all duration-500 relative ${
                painLevel <= 3
                  ? "bg-gradient-to-r from-green-500 to-green-400"
                  : painLevel <= 6
                    ? "bg-gradient-to-r from-yellow-500 to-orange-400"
                    : "bg-gradient-to-r from-red-600 to-red-500"
              }`}
              style={{ width: `${painLevel * 10}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Simulation Button */}
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
        >
          {isSimulating ? "⚡ Simuliere..." : "🧬 Detaillierte Analyse starten"}
        </button>

        {/* Results */}
        {finalPrediction && (
          <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
            <h4 className="text-white font-bold">📊 Analyse-Ergebnis:</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-gray-300">
                  <strong>Region:</strong> {finalPrediction.bodyPart}
                </p>
                <p className="text-gray-300">
                  <strong>Geschätzte Pausen:</strong>{" "}
                  {finalPrediction.estimatedBreaks}
                </p>
                <p className="text-gray-300">
                  <strong>Nachsorge:</strong> {finalPrediction.aftercare}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-white font-medium">Empfehlungen:</p>
                {finalPrediction.recommendations.map(
                  (rec: string, i: number) => (
                    <p key={i} className="text-gray-300 text-sm">
                      {rec}
                    </p>
                  ),
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Advanced Neural Tattoo Designer
export function NeuralTattooDesigner() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("neo-traditional");
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedComplexity, setSelectedComplexity] = useState("medium");
  const [generationSteps, setGenerationSteps] = useState<any[]>([]);
  const [finalDesign, setFinalDesign] = useState<any>(null);
  const [designHistory, setDesignHistory] = useState<any[]>([]);

  const styles = [
    {
      id: "neo-traditional",
      name: "Neo-Traditional",
      description: "Moderne Interpretation klassischer Tattoos",
    },
    {
      id: "realism",
      name: "Realism",
      description: "Fotorealistische Darstellungen",
    },
    {
      id: "geometric",
      name: "Geometric",
      description: "Mathematische Formen und Muster",
    },
    {
      id: "blackwork",
      name: "Blackwork",
      description: "Reine schwarze Tinte, hoher Kontrast",
    },
    {
      id: "watercolor",
      name: "Watercolor",
      description: "Aquarell-ähnliche Farbverläufe",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Reduziert auf das Wesentliche",
    },
    {
      id: "biomechanical",
      name: "Biomechanical",
      description: "Organische und mechanische Elemente",
    },
    {
      id: "tribal",
      name: "Tribal",
      description: "Traditionelle Stammesmuster",
    },
  ];

  const sizes = [
    { id: "small", name: "Klein", description: "2-5cm", price: "150-300 CHF" },
    {
      id: "medium",
      name: "Mittel",
      description: "5-15cm",
      price: "300-800 CHF",
    },
    {
      id: "large",
      name: "Groß",
      description: "15-30cm",
      price: "800-1500 CHF",
    },
    {
      id: "sleeve",
      name: "Sleeve",
      description: "Ganzer Arm",
      price: "1500-3000 CHF",
    },
  ];

  const complexities = [
    {
      id: "simple",
      name: "Einfach",
      description: "Klare Linien, wenig Details",
    },
    {
      id: "medium",
      name: "Mittel",
      description: "Moderate Details, Schattierungen",
    },
    {
      id: "complex",
      name: "Komplex",
      description: "Hochdetailliert, mehrere Ebenen",
    },
    {
      id: "masterpiece",
      name: "Meisterwerk",
      description: "Höchste Kunstfertigkeit",
    },
  ];

  const generateDesign = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGenerationSteps([]);
    setFinalDesign(null);

    const steps = [
      { step: 1, text: "Prompt analysiert und verstanden...", delay: 500 },
      { step: 2, text: "Stil-Parameter konfiguriert...", delay: 1000 },
      { step: 3, text: "Komposition berechnet...", delay: 1500 },
      { step: 4, text: "Farb-Palette generiert...", delay: 2000 },
      { step: 5, text: "Details verfeinert...", delay: 2500 },
      { step: 6, text: "Technische Machbarkeit geprüft...", delay: 3000 },
      { step: 7, text: "Design fertiggestellt!", delay: 3500 },
    ];

    steps.forEach(({ step, text, delay }) => {
      setTimeout(() => {
        setGenerationSteps((prev) => [
          ...prev,
          { step, text, timestamp: Date.now() },
        ]);
        if (step === 7) {
          setTimeout(() => {
            generateFinalDesign();
            setIsGenerating(false);
          }, 500);
        }
      }, delay);
    });
  };

  const generateFinalDesign = () => {
    const selectedStyleData = styles.find((s) => s.id === selectedStyle);
    const selectedSizeData = sizes.find((s) => s.id === selectedSize);
    const selectedComplexityData = complexities.find(
      (c) => c.id === selectedComplexity,
    );

    const designElements = generateDesignElements();
    const technicalSpecs = generateTechnicalSpecs();

    const design = {
      id: Date.now(),
      prompt,
      style: selectedStyleData,
      size: selectedSizeData,
      complexity: selectedComplexityData,
      elements: designElements,
      technical: technicalSpecs,
      estimatedTime: calculateEstimatedTime(),
      estimatedSessions: calculateSessions(),
      createdAt: new Date().toLocaleString("de-DE"),
    };

    setFinalDesign(design);
    setDesignHistory((prev) => [design, ...prev.slice(0, 4)]); // Keep last 5 designs
  };

  const generateDesignElements = () => {
    const keywords = prompt.toLowerCase().split(" ");
    const elements = [];

    // Analyze prompt for common elements
    if (
      keywords.some((k) =>
        ["tier", "wolf", "löwe", "adler", "schlange"].includes(k),
      )
    ) {
      elements.push("Tiermotiv als Hauptelement");
    }
    if (keywords.some((k) => ["blume", "rose", "lotus", "baum"].includes(k))) {
      elements.push("Botanische Elemente");
    }
    if (
      keywords.some((k) => ["geom", "dreieck", "kreis", "mandala"].includes(k))
    ) {
      elements.push("Geometrische Formen");
    }
    if (keywords.some((k) => ["schrift", "text", "name", "wort"].includes(k))) {
      elements.push("Typografische Elemente");
    }

    // Add style-specific elements
    if (selectedStyle === "neo-traditional") {
      elements.push("Kräftige Outlines", "Moderne Farbgebung");
    } else if (selectedStyle === "realism") {
      elements.push("Fotorealistische Schattierungen", "Hoher Detailgrad");
    } else if (selectedStyle === "geometric") {
      elements.push("Präzise Linienführung", "Symmetrische Muster");
    }

    return elements.length > 0
      ? elements
      : ["Individuelles Design-Konzept", "Stilspezifische Ausführung"];
  };

  const generateTechnicalSpecs = () => {
    return {
      needleConfiguration:
        selectedComplexity === "complex" ? "Liner + Shader" : "Standard Liner",
      inkColors: selectedStyle === "blackwork" ? "Schwarz" : "Schwarz + Farben",
      sessionBreaks:
        calculateSessions() > 1 ? "Ja, alle 2-3 Stunden" : "Nach Bedarf",
      healingTime: selectedSize === "sleeve" ? "4-6 Wochen" : "2-4 Wochen",
    };
  };

  const calculateEstimatedTime = () => {
    const baseTime =
      sizes.find((s) => s.id === selectedSize)?.id === "small"
        ? 2
        : sizes.find((s) => s.id === selectedSize)?.id === "medium"
          ? 4
          : sizes.find((s) => s.id === selectedSize)?.id === "large"
            ? 8
            : 12;

    const complexityMultiplier =
      selectedComplexity === "simple"
        ? 0.8
        : selectedComplexity === "medium"
          ? 1.0
          : selectedComplexity === "complex"
            ? 1.5
            : 2.0;

    return Math.round(baseTime * complexityMultiplier);
  };

  const calculateSessions = () => {
    const totalTime = calculateEstimatedTime();
    return Math.ceil(totalTime / 6); // Max 6 hours per session
  };

  const saveToFavorites = (design: any) => {
    // Here you could save to localStorage or send to backend
    alert("Design zu Favoriten hinzugefügt!");
  };

  const bookConsultation = (design: any) => {
    // Here you could integrate with booking system
    alert(
      `Beratungstermin für "${design.prompt}" angefragt. David wird sich melden!`,
    );
  };

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Cpu className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">Neural Tattoo Designer</h3>
        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
          KI-POWERED
        </span>
      </div>

      <div className="space-y-6">
        {/* Prompt Input */}
        <div>
          <label className="block text-white font-medium mb-2">
            Beschreiben Sie Ihr Wunschtattoo
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="z.B. 'Majestätischer Wolf im Mondschein mit geometrischen Elementen' oder 'Japanischer Drache mit Kirschblüten'"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none resize-none"
            rows={3}
          />
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-white font-medium mb-2">
            Tattoo-Stil
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3 rounded-lg border text-sm transition-all duration-300 ${
                  selectedStyle === style.id
                    ? "border-cyan-500 bg-cyan-500/20 text-white"
                    : "border-gray-600 hover:border-cyan-500/50 text-gray-400 hover:text-white"
                }`}
                title={style.description}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {/* Size and Complexity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">Größe</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
            >
              {sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.name} ({size.description}) - {size.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Komplexität
            </label>
            <select
              value={selectedComplexity}
              onChange={(e) => setSelectedComplexity(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
            >
              {complexities.map((complexity) => (
                <option key={complexity.id} value={complexity.id}>
                  {complexity.name} - {complexity.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateDesign}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-cyan-600 to-red-600 hover:from-cyan-500 hover:to-red-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
        >
          {isGenerating ? "KI arbeitet..." : "Design generieren"}
        </button>

        {/* Generation Progress */}
        {generationSteps.length > 0 && (
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">
              Generation Progress:
            </h4>
            <div className="space-y-2">
              {generationSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">{step.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final Design Result */}
        {finalDesign && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-cyan-500/30">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-white font-bold text-lg">
                Generiertes Design
              </h4>
              <span className="text-xs text-gray-400">
                {finalDesign.createdAt}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-cyan-400 font-medium">Konzept:</p>
                  <p className="text-white">{finalDesign.prompt}</p>
                </div>

                <div>
                  <p className="text-cyan-400 font-medium">Stil:</p>
                  <p className="text-white">{finalDesign.style.name}</p>
                  <p className="text-gray-400 text-sm">
                    {finalDesign.style.description}
                  </p>
                </div>

                <div>
                  <p className="text-cyan-400 font-medium">Design-Elemente:</p>
                  <ul className="text-white text-sm space-y-1">
                    {finalDesign.elements.map((element: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-cyan-400">•</span>
                        {element}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-cyan-400 font-medium">
                    Technische Details:
                  </p>
                  <div className="text-white text-sm space-y-1">
                    <p>
                      <strong>Größe:</strong> {finalDesign.size.name} (
                      {finalDesign.size.description})
                    </p>
                    <p>
                      <strong>Geschätzte Zeit:</strong>{" "}
                      {finalDesign.estimatedTime}h
                    </p>
                    <p>
                      <strong>Sitzungen:</strong>{" "}
                      {finalDesign.estimatedSessions}
                    </p>
                    <p>
                      <strong>Preis:</strong> {finalDesign.size.price}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-cyan-400 font-medium">Technische Specs:</p>
                  <div className="text-white text-sm space-y-1">
                    <p>
                      <strong>Nadel:</strong>{" "}
                      {finalDesign.technical.needleConfiguration}
                    </p>
                    <p>
                      <strong>Farben:</strong> {finalDesign.technical.inkColors}
                    </p>
                    <p>
                      <strong>Heilung:</strong>{" "}
                      {finalDesign.technical.healingTime}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => saveToFavorites(finalDesign)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm transition-all duration-300"
                  >
                    ⭐ Speichern
                  </button>
                  <button
                    onClick={() => bookConsultation(finalDesign)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm transition-all duration-300"
                  >
                    📅 Beratung buchen
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Design History */}
        {designHistory.length > 0 && (
          <div className="bg-gray-800/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Letzte Designs:</h4>
            <div className="space-y-2">
              {designHistory.slice(0, 3).map((design, i) => (
                <div
                  key={design.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-300 truncate">
                    {design.prompt}
                  </span>
                  <span className="text-gray-500">{design.style.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExperimentalFeatures() {
  const [activeTab, setActiveTab] = useState("vision");

  const tabs = [
    { id: "vision", name: "KI Vision", icon: Eye },
    { id: "simulator", name: "Live Sim", icon: Camera },
    { id: "pain", name: "Schmerz", icon: Zap },
    { id: "neural", name: "Neural", icon: Cpu },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "vision":
        return <TattooVisionAI />;
      case "simulator":
        return <LiveTattooSimulator />;
      case "pain":
        return <PainSimulator />;
      case "neural":
        return <NeuralTattooDesigner />;
      default:
        return <TattooVisionAI />;
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            EXPERIMENTAL LAB
          </h2>
          <p className="text-xl text-gray-400">
            Die Zukunft der Tattoo-Kunst erleben
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Active Component */}
        <div className="relative">{renderActiveComponent()}</div>
      </div>
      
      {/* Gradient fade overlay for smooth transition */}
      <div className="section-fade-bottom pointer-events-none absolute bottom-0 left-0 w-full h-32 z-10"></div>
    </section>
  );
}
