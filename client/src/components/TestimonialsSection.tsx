import React from "react";
// Optional: Wenn du Permanent Marker lokal hast, importiere sie, sonst Google Fonts im <head> einbinden
// import "@fontsource/permanent-marker";
// Modernes Galerie-Testimonial-Grid mit smooth horizontalem Slide
// Demo-Daten: 5 Testimonials, 1–3 Sätze, keine Fotos
const testimonials = [
  {
    name: "Kurt Haas",
    text: "Das Studio ist einfach wild! Mein Tattoo ist genau so geworden, wie ich es wollte. Die Jungs wissen, was sie tun."
  },
  {
    name: "Mymy Jetznid",
    text: "Ehrlich, beste Crew. Nicht 08/15, sondern mit Herzblut und Style. Ich komm wieder!"
  },
  {
    name: "Ciara Guess",
    text: "Mega Atmosphäre, super Arbeit. Hier fühlt man sich sofort wohl. Danke euch!"
  },
  {
    name: "Tanja Stauffer",
    text: "Spontan, kreativ, ehrlich. Mein neues Lieblingsstudio!"
  },
  {
    name: "V. M",
    text: "Termine easy, Umsetzung top, Ergebnis wild. Absolute Empfehlung."
  }
];






export default function TestimonialsSection() {
  // Used-Look: zufällige Rotation und zIndex pro Karte (pro Render, nicht pro Scroll)
  const [rotations] = React.useState(() => Array.from({length: testimonials.length}, () => `${(Math.random() * 4 - 2).toFixed(2)}deg`));
  const [zIndexes] = React.useState(() => Array.from({length: testimonials.length}, (_,i) => 10 + Math.floor(Math.random()*20) + i));

  // Marquee-Loop: CSS Keyframes
  // Pausieren bei Hover: Bonus
  // Responsiv: Kartenbreite via CSS

  // Karten-Rendering (ohne Parallax, für maximale Performance)
  const [selected, setSelected] = React.useState<number | null>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Scroll die ausgewählte Karte in die Mitte, wenn ausgewählt
  React.useEffect(() => {
    if (selected === null || !marqueeRef.current || !cardRefs.current[selected]) return;
    const marquee = marqueeRef.current;
    const card = cardRefs.current[selected];
    const marqueeRect = marquee.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const scrollLeft = marquee.scrollLeft + (cardRect.left + cardRect.width / 2) - (marqueeRect.left + marqueeRect.width / 2);
    marquee.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, [selected]);

  const renderCards = () =>
    testimonials.map((t, i) => (
      <button
        key={i}
        ref={el => cardRefs.current[i] = el}
        tabIndex={0}
        aria-label={`Testimonial von ${t.name} anzeigen`}
        className={`relative bg-[#18181b] border border-zinc-800 rounded-2xl shadow-2xl min-w-[320px] max-w-[340px] md:min-w-[340px] md:max-w-[360px] px-7 py-10 flex flex-col justify-between select-none transition-transform duration-300 group focus:outline-none focus:ring-2 focus:ring-[#ff2a2a] ${selected === i ? 'scale-105 z-50 border-[#ff2a2a] shadow-[0_8px_32px_0_#ff2a2a55,0_1.5px_0_#c00]' : 'hover:scale-[1.04] hover:shadow-2xl hover:z-50'}`}
        style={{
          transform: `rotate(${rotations[i]})`,
          zIndex: zIndexes[i],
          boxShadow: selected === i ? '0 8px 32px 0 #ff2a2a55, 0 1.5px 0 #c00' : '0 8px 32px 0 #000a, 0 1.5px 0 #c00',
          cursor: 'pointer',
        }}
        onClick={() => setSelected(i)}
      >
        <blockquote
          className="text-white text-2xl md:text-3xl leading-snug font-normal mb-8 tracking-tight"
          style={{
            fontFamily: 'Permanent Marker, Mojito Rough, sans-serif',
            textShadow: '1.5px 1.5px 0 #000, 0 2px 12px #c00',
            letterSpacing: '-0.01em',
            lineHeight: 1.18,
          }}
        >
          “{t.text}”
        </blockquote>
        <div className="w-full flex justify-end pr-2 pb-1">
          <span
            className="text-xs md:text-sm font-semibold tracking-wide pt-2 border-t border-zinc-800 w-fit font-signature"
            style={{
              fontFamily: 'Permanent Marker, Mojito Rough, sans-serif',
              color: selected === i ? '#ff2a2a' : '#333',
              opacity: selected === i ? 1 : 0.92,
              textShadow: selected === i
                ? '0 2px 8px #fff, 0 1px 0 #fff, 0 0 2px #ff2a2a'
                : '0 1px 0 #fff, 0 0 2px #fff',
              background: selected === i ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
              borderRadius: 6,
              padding: '2px 10px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              boxShadow: selected === i ? '0 2px 8px #fff8' : undefined,
              transition: 'all 0.2s',
            }}
          >
            {t.name}
          </span>
        </div>
      </button>
    ));

  return (
    <section
      className="w-full py-24 bg-[#101013] flex flex-col items-center relative overflow-hidden"
      aria-label="Kundenstimmen Galerie"
    >
      <h2
        className="text-4xl md:text-6xl mb-16 text-center text-white relative z-10 tracking-tight drop-shadow-xl uppercase"
        style={{ fontFamily: 'Permanent Marker, Mojito Rough, sans-serif', letterSpacing: '-0.03em', color: '#fff', textShadow: '2px 2px 0 #c00, 0 2px 12px #000' }}
      >
        <span style={{ color: '#ff2a2a', textShadow: 'none' }}>Das sagen unsere Kunden</span>
      </h2>
      <div
        className="w-full overflow-hidden pb-8"
      >
      <div
        ref={marqueeRef}
        className="marquee-track flex gap-6 md:gap-8 px-6 md:px-16"
        style={{
          display: 'flex',
          animation: selected === null ? 'marquee 32s linear infinite' : 'none',
          willChange: 'transform',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
        }}
      >
        {renderCards()}
        {renderCards()}
      </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          width: max-content;
        }
      `}</style>
    </section>
  );
}