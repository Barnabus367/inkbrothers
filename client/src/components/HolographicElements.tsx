import { useState, useEffect, useRef } from "react";

// Holographic Tattoo Previewer
function HolographicTattooPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Holographic grid effect
      ctx.strokeStyle = `rgba(239, 68, 68, ${0.3 + Math.sin(Date.now() * 0.003) * 0.2})`;
      ctx.lineWidth = 1;
      
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Holographic particles
      const time = Date.now() * 0.001;
      for (let i = 0; i < 50; i++) {
        const x = (mousePosition.x + Math.sin(time + i) * 100) % canvas.width;
        const y = (mousePosition.y + Math.cos(time + i * 0.5) * 50) % canvas.height;
        
        ctx.fillStyle = `hsla(${(time * 50 + i * 10) % 360}, 70%, 60%, ${0.6 + Math.sin(time + i) * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isActive) {
        requestAnimationFrame(animate);
      }
    };

    if (isActive) {
      animate();
    }
  }, [isActive, mousePosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div className="relative bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Holographic Preview</h3>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive
              ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {isActive ? 'Deaktivieren' : 'Aktivieren'}
        </button>
      </div>
      
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="w-full h-64 border border-red-500/20 rounded-lg cursor-crosshair"
        onMouseMove={handleMouseMove}
        style={{
          background: 'linear-gradient(45deg, rgba(0,0,0,0.9) 0%, rgba(30,30,30,0.9) 100%)'
        }}
      />
      
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          Bewege die Maus für interaktive Hologramm-Effekte
        </p>
      </div>
    </div>
  );
}

// Quantum Tattoo Designer
function QuantumTattooDesigner() {
  const [quantumState, setQuantumState] = useState('superposition');
  const [complexity, setComplexity] = useState(50);
  const [dimension, setDimension] = useState('3D');

  const quantumStates = [
    { id: 'superposition', name: 'Superposition', color: 'from-blue-500 to-purple-500' },
    { id: 'entanglement', name: 'Verschränkung', color: 'from-green-500 to-cyan-500' },
    { id: 'collapse', name: 'Kollaps', color: 'from-red-500 to-orange-500' },
    { id: 'coherence', name: 'Kohärenz', color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-spin" />
        <h3 className="text-xl font-bold text-white">Quantum Designer</h3>
        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">QUANTUM</span>
      </div>

      <div className="space-y-6">
        {/* Quantum State Selector */}
        <div>
          <label className="text-white font-medium mb-3 block">Quantum Zustand</label>
          <div className="grid grid-cols-2 gap-2">
            {quantumStates.map((state) => (
              <button
                key={state.id}
                onClick={() => setQuantumState(state.id)}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  quantumState === state.id
                    ? 'border-purple-500 bg-purple-500/20 text-white'
                    : 'border-gray-600 hover:border-purple-500/50 text-gray-400 hover:text-white'
                }`}
              >
                <div className={`w-full h-2 bg-gradient-to-r ${state.color} rounded-full mb-2`} />
                {state.name}
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Quantum Field */}
        <div>
          <label className="text-white font-medium mb-3 block">
            Quantum Komplexität: {complexity}%
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={complexity}
              onChange={(e) => setComplexity(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dimensional Matrix */}
        <div>
          <label className="text-white font-medium mb-3 block">Dimensionale Matrix</label>
          <div className="flex gap-2">
            {['2D', '3D', '4D', '∞D'].map((dim) => (
              <button
                key={dim}
                onClick={() => setDimension(dim)}
                className={`flex-1 py-2 px-3 rounded-lg transition-all duration-300 ${
                  dimension === dim
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                {dim}
              </button>
            ))}
          </div>
        </div>

        {/* Quantum Visualization */}
        <div className="relative h-32 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-lg border border-purple-500/30 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 relative">
                <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-spin" />
                <div className="absolute inset-2 border-4 border-cyan-500/30 rounded-full animate-spin animate-reverse" />
                <div className="absolute inset-4 border-4 border-red-500/30 rounded-full animate-pulse" />
              </div>
              <p className="text-white font-bold">Quantum State: {quantumState}</p>
              <p className="text-gray-400 text-sm">Dimension: {dimension}</p>
            </div>
          </div>
          
          {/* Quantum particles */}
          <div className="absolute inset-0">
            {Array.from({ length: complexity / 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-purple-600 via-cyan-600 to-red-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300">
          Quantum Design manifestieren
        </button>
      </div>
    </div>
  );
}

// Biometric Tattoo Matcher
function BiometricTattooMatcher() {
  const [scanning, setScanning] = useState(false);
  const [biometricData, setBiometricData] = useState<any>(null);
  const [recommendation, setRecommendation] = useState("");

  const startBiometricScan = () => {
    setScanning(true);
    
    // Simulate biometric analysis
    setTimeout(() => {
      const mockData = {
        skinTone: "medium",
        veinPattern: "complex",
        muscleDensity: 75,
        sensitivity: 40,
        healingFactor: 85
      };
      
      setBiometricData(mockData);
      setRecommendation("Empfehlung: Neo-Traditional Style mit mittlerer Linienbreite. Optimale Heilungszeit: 3-4 Wochen.");
      setScanning(false);
    }, 3000);
  };

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full" />
        <h3 className="text-xl font-bold text-white">Biometric Matcher</h3>
        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">MEDIZINISCH</span>
      </div>

      {!biometricData ? (
        <div className="text-center space-y-4">
          <div className="w-32 h-32 mx-auto border-4 border-dashed border-green-500/50 rounded-full flex items-center justify-center">
            {scanning ? (
              <div className="relative">
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-2 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin animate-reverse" />
              </div>
            ) : (
              <div className="text-4xl">🫱</div>
            )}
          </div>
          
          <button
            onClick={startBiometricScan}
            disabled={scanning}
            className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
          >
            {scanning ? 'Biometrie wird gescannt...' : 'Biometrischen Scan starten'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="text-green-400 text-sm">Hautton</div>
              <div className="text-white font-bold">{biometricData.skinTone}</div>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
              <div className="text-cyan-400 text-sm">Venenmuster</div>
              <div className="text-white font-bold">{biometricData.veinPattern}</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="text-blue-400 text-sm">Muskeldichte</div>
              <div className="text-white font-bold">{biometricData.muscleDensity}%</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <div className="text-purple-400 text-sm">Heilungsfaktor</div>
              <div className="text-white font-bold">{biometricData.healingFactor}%</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-green-400 font-medium mb-2">Personalisierte Empfehlung:</div>
            <p className="text-white">{recommendation}</p>
          </div>
          
          <button
            onClick={() => {
              setBiometricData(null);
              setRecommendation("");
            }}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
          >
            Neuen Scan durchführen
          </button>
        </div>
      )}
    </div>
  );
}

export { HolographicTattooPreview, QuantumTattooDesigner, BiometricTattooMatcher };