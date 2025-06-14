import { useState, useEffect, useRef } from "react";
import { Brain, Zap, Activity, Target, Waves, Sparkles } from "lucide-react";

// Neural Pattern Recognition for Tattoo Style Matching
export function NeuralPatternMatcher() {
  const [isScanning, setIsScanning] = useState(false);
  const [brainwaveData, setBrainwaveData] = useState<number[]>([]);
  const [personalityProfile, setPersonalityProfile] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setBrainwaveData((prev) => {
          const newData = [...prev, Math.random() * 100];
          return newData.slice(-50); // Keep last 50 readings
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isScanning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || brainwaveData.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw brainwave pattern
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;
    ctx.beginPath();

    brainwaveData.forEach((value, index) => {
      const x = (index / brainwaveData.length) * canvas.width;
      const y = canvas.height - (value / 100) * canvas.height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Neural network visualization
    ctx.fillStyle = "rgba(239, 68, 68, 0.3)";
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [brainwaveData]);

  const startNeuralScan = () => {
    setIsScanning(true);
    setBrainwaveData([]);

    setTimeout(() => {
      setPersonalityProfile({
        creativity: 85,
        risk_tolerance: 70,
        detail_orientation: 90,
        color_preference: "monochrome",
        style_match: "Dark Realism",
        confidence: 94,
      });
      setIsScanning(false);
    }, 8000);
  };

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">Neural Pattern Matcher</h3>
        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
          NEURAL
        </span>
      </div>

      <div className="space-y-6">
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          className="w-full h-32 border border-red-500/20 rounded-lg bg-black/50"
        />

        {!personalityProfile ? (
          <button
            onClick={startNeuralScan}
            disabled={isScanning}
            className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
          >
            {isScanning ? "Neural-Scan läuft..." : "Neural-Scan starten"}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <div className="text-red-400 text-sm">Kreativität</div>
                <div className="text-white font-bold">
                  {personalityProfile.creativity}%
                </div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <div className="text-purple-400 text-sm">
                  Risikobereitschaft
                </div>
                <div className="text-white font-bold">
                  {personalityProfile.risk_tolerance}%
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="text-red-400 font-medium mb-2">
                Neural-Match: {personalityProfile.confidence}% Übereinstimmung
              </div>
              <p className="text-white font-bold text-lg">
                {personalityProfile.style_match}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Basierend auf neuralen Mustern
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Synesthetic Color Therapy
export function SynestheticColorTherapy() {
  const [activeFrequency, setActiveFrequency] = useState(528);
  const [colorMapping, setColorMapping] = useState<any>({});
  const [isPlaying, setIsPlaying] = useState(false);

  const frequencies = [
    { freq: 396, name: "Befreiung", color: "#ff0000" },
    { freq: 417, name: "Wandel", color: "#ff8800" },
    { freq: 528, name: "Transformation", color: "#00ff00" },
    { freq: 639, name: "Verbindung", color: "#0088ff" },
    { freq: 741, name: "Erwachen", color: "#8800ff" },
    { freq: 852, name: "Intuition", color: "#ff0088" },
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setColorMapping({
          primary: `hsl(${Math.random() * 360}, 70%, 50%)`,
          secondary: `hsl(${Math.random() * 360}, 70%, 30%)`,
          accent: `hsl(${Math.random() * 360}, 90%, 60%)`,
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isPlaying, activeFrequency]);

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">
          Synesthetic Color Therapy
        </h3>
        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
          SYNESTHETIC
        </span>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-2">
          {frequencies.map((freq) => (
            <button
              key={freq.freq}
              onClick={() => setActiveFrequency(freq.freq)}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                activeFrequency === freq.freq
                  ? "border-cyan-500 bg-cyan-500/20 text-white"
                  : "border-gray-600 hover:border-cyan-500/50 text-gray-400 hover:text-white"
              }`}
            >
              <div
                className="w-4 h-4 rounded-full mx-auto mb-1"
                style={{ backgroundColor: freq.color }}
              />
              <div className="text-xs">{freq.freq}Hz</div>
              <div className="text-xs">{freq.name}</div>
            </button>
          ))}
        </div>

        <div className="relative h-32 border border-cyan-500/30 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 transition-all duration-200"
            style={{
              background:
                isPlaying && colorMapping.primary
                  ? `linear-gradient(45deg, ${colorMapping.primary}, ${colorMapping.secondary}, ${colorMapping.accent})`
                  : "linear-gradient(45deg, #111, #222, #111)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {activeFrequency}Hz
              </div>
              <div className="text-sm text-gray-300">
                {frequencies.find((f) => f.freq === activeFrequency)?.name}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
            isPlaying
              ? "bg-cyan-500 hover:bg-cyan-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-white"
          }`}
        >
          {isPlaying ? "⏸ Therapie stoppen" : "▶ Farbtherapie starten"}
        </button>
      </div>
    </div>
  );
}

// Quantum Entanglement Tattoo Synchronizer
export function QuantumTattooSync() {
  const [entangled, setEntangled] = useState(false);
  const [syncPartner, setSyncPartner] = useState("");
  const [quantumField, setQuantumField] = useState(0);

  useEffect(() => {
    if (entangled) {
      const interval = setInterval(() => {
        setQuantumField(Math.sin(Date.now() * 0.001) * 50 + 50);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [entangled]);

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">Quantum Synchronizer</h3>
        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
          QUANTUM
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-white font-medium mb-2 block">
            Sync-Partner ID
          </label>
          <input
            type="text"
            value={syncPartner}
            onChange={(e) => setSyncPartner(e.target.value)}
            placeholder="z.B. QENT-4A7B-9C2D"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
          />
        </div>

        <div className="relative h-24 border border-purple-500/30 rounded-lg bg-gradient-to-r from-purple-900/20 to-cyan-900/20 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {entangled ? (
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 border-4 border-purple-500 rounded-full animate-spin" />
                <Waves className="w-8 h-8 text-cyan-400 animate-pulse" />
                <div className="w-8 h-8 border-4 border-cyan-500 rounded-full animate-spin animate-reverse" />
              </div>
            ) : (
              <div className="text-gray-400">Quantum-Verschränkung inaktiv</div>
            )}
          </div>

          {entangled && (
            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex justify-between text-xs text-purple-400">
                <span>Feld-Stärke:</span>
                <span>{Math.round(quantumField)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                <div
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 h-1 rounded-full transition-all duration-100"
                  style={{ width: `${quantumField}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setEntangled(!entangled)}
          disabled={!syncPartner}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
        >
          {entangled
            ? "Verschränkung lösen"
            : "Quantum-Verschränkung aktivieren"}
        </button>

        {entangled && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="text-purple-400 font-medium mb-2">
              Synchronisation aktiv
            </div>
            <p className="text-white text-sm">
              Ihre Tattoo-Designs sind nun quantum-verschränkt mit Partner{" "}
              {syncPartner}. Alle Änderungen werden in Echtzeit übertragen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Biorhythm Tattoo Optimizer
export function BiorhythmOptimizer() {
  const [birthDate, setBirthDate] = useState("");
  const [biorhythms, setBiorhythms] = useState<any>(null);
  const [optimalDate, setOptimalDate] = useState("");

  const calculateBiorhythms = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();
    const daysSinceBirth = Math.floor(
      (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24),
    );

    const physical = Math.sin((2 * Math.PI * daysSinceBirth) / 23) * 100;
    const emotional = Math.sin((2 * Math.PI * daysSinceBirth) / 28) * 100;
    const intellectual = Math.sin((2 * Math.PI * daysSinceBirth) / 33) * 100;

    setBiorhythms({
      physical: Math.round(physical),
      emotional: Math.round(emotional),
      intellectual: Math.round(intellectual),
    });

    // Find optimal date (when all rhythms are positive)
    let optimalDays = 0;
    for (let i = 1; i <= 30; i++) {
      const futurePhysical = Math.sin(
        (2 * Math.PI * (daysSinceBirth + i)) / 23,
      );
      const futureEmotional = Math.sin(
        (2 * Math.PI * (daysSinceBirth + i)) / 28,
      );
      const futureIntellectual = Math.sin(
        (2 * Math.PI * (daysSinceBirth + i)) / 33,
      );

      if (
        futurePhysical > 0.5 &&
        futureEmotional > 0.5 &&
        futureIntellectual > 0.5
      ) {
        optimalDays = i;
        break;
      }
    }

    const optimal = new Date(
      today.getTime() + optimalDays * 24 * 60 * 60 * 1000,
    );
    setOptimalDate(optimal.toLocaleDateString("de-DE"));
  };

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-white">Biorhythmus Optimizer</h3>
        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
          BIO
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-white font-medium mb-2 block">
            Geburtsdatum
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:outline-none"
          />
        </div>

        <button
          onClick={calculateBiorhythms}
          disabled={!birthDate}
          className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
        >
          Biorhythmus analysieren
        </button>

        {biorhythms && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-red-400">Körperlich</span>
                  <span className="text-white font-bold">
                    {biorhythms.physical}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.abs(biorhythms.physical)}%` }}
                  />
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-400">Emotional</span>
                  <span className="text-white font-bold">
                    {biorhythms.emotional}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.abs(biorhythms.emotional)}%` }}
                  />
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-400">Intellektuell</span>
                  <span className="text-white font-bold">
                    {biorhythms.intellectual}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.abs(biorhythms.intellectual)}%` }}
                  />
                </div>
              </div>
            </div>

            {optimalDate && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="text-green-400 font-medium mb-2">
                  Optimaler Tattoo-Termin
                </div>
                <p className="text-white font-bold text-lg">{optimalDate}</p>
                <p className="text-gray-400 text-sm mt-1">
                  Basierend auf Ihren Biorhythmus-Zyklen
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function NeuralInterfaceStudio() {
  const [activeInterface, setActiveInterface] = useState("neural");

  const neuralInterfaces = [
    {
      id: "neural",
      name: "Neural",
      icon: Brain,
      component: NeuralPatternMatcher,
    },
    {
      id: "synesthetic",
      name: "Synesthetic",
      icon: Sparkles,
      component: SynestheticColorTherapy,
    },
    {
      id: "quantum",
      name: "Quantum",
      icon: Target,
      component: QuantumTattooSync,
    },
    {
      id: "bio",
      name: "Biorhythm",
      icon: Activity,
      component: BiorhythmOptimizer,
    },
  ];

  const ActiveComponent =
    neuralInterfaces.find((i) => i.id === activeInterface)?.component ||
    NeuralPatternMatcher;

  return (
    <section className="py-20 px-4 relative bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            NEURAL INTERFACE STUDIO
          </h2>
          <p className="text-xl text-gray-400">
            Fortschrittlichste Tattoo-Technologie der Zukunft
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {neuralInterfaces.map((neuralInterface) => {
            const IconComponent = neuralInterface.icon;
            return (
              <button
                key={neuralInterface.id}
                onClick={() => setActiveInterface(neuralInterface.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeInterface === neuralInterface.id
                    ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {neuralInterface.name}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <ActiveComponent />
        </div>
      </div>
    </section>
  );
}
