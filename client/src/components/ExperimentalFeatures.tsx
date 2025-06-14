import { useState, useEffect, useRef } from "react";
import { Eye, Zap, Cpu, Palette, Camera, Volume2 } from "lucide-react";

// AI-Powered Tattoo Vision Component
export function TattooVisionAI() {
  const [isActive, setIsActive] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const startVision = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        // Simulate AI analysis
        setTimeout(() => {
          setAiSuggestion("Perfekt für ein Neo-Traditional Sleeve mit organischen Formen");
        }, 2000);
      }
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Eye className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">KI Tattoo-Vision</h3>
        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">BETA</span>
      </div>
      
      {!isActive ? (
        <button
          onClick={startVision}
          className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
        >
          Körperstelle scannen für KI-Empfehlung
        </button>
      ) : (
        <div className="space-y-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-48 object-cover rounded-lg border border-red-500/30"
          />
          {aiSuggestion && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-medium">KI-Empfehlung:</p>
              <p className="text-white">{aiSuggestion}</p>
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
    { id: "blackwork", name: "Blackwork", color: "#ffffff" }
  ];

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">Live Tattoo Simulator</h3>
        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">LIVE</span>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                selectedStyle === style.id
                  ? 'border-red-500 bg-red-500/20 text-white'
                  : 'border-gray-600 hover:border-red-500/50 text-gray-400 hover:text-white'
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

// Nerve-Tracking Pain Simulator
export function PainSimulator() {
  const [bodyPart, setBodyPart] = useState("arm");
  const [painLevel, setPainLevel] = useState(0);
  
  const bodyParts = [
    { id: "arm", name: "Oberarm", pain: 3 },
    { id: "ribs", name: "Rippen", pain: 8 },
    { id: "back", name: "Rücken", pain: 4 },
    { id: "ankle", name: "Knöchel", pain: 7 }
  ];

  useEffect(() => {
    const selectedPart = bodyParts.find(part => part.id === bodyPart);
    if (selectedPart) {
      setPainLevel(selectedPart.pain);
    }
  }, [bodyPart]);

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">Schmerz-Simulator</h3>
        <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">NEU</span>
      </div>
      
      <div className="space-y-4">
        <select
          value={bodyPart}
          onChange={(e) => setBodyPart(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-red-500 focus:outline-none"
        >
          {bodyParts.map((part) => (
            <option key={part.id} value={part.id}>
              {part.name}
            </option>
          ))}
        </select>
        
        <div className="space-y-2">
          <div className="flex justify-between text-white">
            <span>Schmerzlevel</span>
            <span className="font-bold">{painLevel}/10</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                painLevel <= 3 ? 'bg-green-500' :
                painLevel <= 6 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${painLevel * 10}%` }}
            />
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <p className="text-gray-300 text-sm">
            {painLevel <= 3 && "Entspannt - Perfekt für Tattoo-Neulinge"}
            {painLevel > 3 && painLevel <= 6 && "Mäßig - Erfahrung empfohlen"}
            {painLevel > 6 && "Intensiv - Nur für Hartgesottene"}
          </p>
        </div>
      </div>
    </div>
  );
}

// Sonic Tattoo Experience
export function SonicTattooExperience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(440);
  
  const frequencies = [
    { name: "Entspannung", freq: 432, color: "bg-blue-500" },
    { name: "Fokus", freq: 528, color: "bg-green-500" },
    { name: "Energie", freq: 741, color: "bg-red-500" },
    { name: "Transformation", freq: 963, color: "bg-purple-500" }
  ];

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Volume2 className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">Sonic Tattoo Experience</h3>
        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">EXPERIMENTAL</span>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {frequencies.map((freq) => (
            <button
              key={freq.freq}
              onClick={() => setFrequency(freq.freq)}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                frequency === freq.freq
                  ? 'border-red-500 bg-red-500/20 text-white'
                  : 'border-gray-600 hover:border-red-500/50 text-gray-400 hover:text-white'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${freq.color} mx-auto mb-1`}/>
              {freq.name}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
        >
          {isPlaying ? '⏸ Stoppen' : '▶ Frequenz starten'}
        </button>
        
        {isPlaying && (
          <div className="bg-gradient-to-r from-purple-500/20 to-red-500/20 rounded-lg p-4 border border-purple-500/30">
            <div className="flex items-center justify-center space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 bg-red-500 rounded-full animate-pulse"
                  style={{
                    height: Math.random() * 40 + 20,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
            <p className="text-center text-white mt-2 text-sm">
              {frequency}Hz - Optimiert für Tattoo-Sessions
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Neural Tattoo Designer
export function NeuralTattooDesigner() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");

  const generateDesign = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setResult(`Generiertes Design basierend auf: "${prompt}"\nStil: Neuro-Gothic\nFarben: Schwarz/Rot\nKomplexität: Hoch`);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Cpu className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">Neural Tattoo Designer</h3>
        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">KI</span>
      </div>
      
      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Beschreibe dein Traumtattoo... (z.B. 'Cyberpunk-Wolf mit Neon-Augen')"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none resize-none"
          rows={3}
        />
        
        <button
          onClick={generateDesign}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-cyan-600 to-red-600 hover:from-cyan-500 hover:to-red-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
        >
          {isGenerating ? '🧠 KI arbeitet...' : '🎨 Design generieren'}
        </button>
        
        {result && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-cyan-500/30">
            <pre className="text-cyan-400 text-sm whitespace-pre-wrap">{result}</pre>
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
    { id: "sonic", name: "Sonic", icon: Volume2 },
    { id: "neural", name: "Neural", icon: Cpu }
  ];

  const renderActiveComponent = () => {
    switch(activeTab) {
      case "vision": return <TattooVisionAI />;
      case "simulator": return <LiveTattooSimulator />;
      case "pain": return <PainSimulator />;
      case "sonic": return <SonicTattooExperience />;
      case "neural": return <NeuralTattooDesigner />;
      default: return <TattooVisionAI />;
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
                    ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>
        
        {/* Active Component */}
        <div className="relative">
          {renderActiveComponent()}
        </div>
      </div>
    </section>
  );
}