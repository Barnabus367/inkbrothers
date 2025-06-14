const crewMembers = [
  {
    id: 1,
    name: "DAVID SIETE GATOS",
    role: "Neo Traditional / Color, 10+ Jahre",
    quote: "Jedes Tattoo erzählt eine Geschichte...",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    alt: "David Siete Gatos - Professional tattoo artist portrait"
  },
  {
    id: 2,
    name: "ROBERTO",
    role: "Studio-Mitbesitzer",
    quote: "Wir sorgen dafür, dass alles läuft.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    alt: "Roberto - Studio co-owner portrait"
  },
  {
    id: 3,
    name: "APO",
    role: "Studio-Mitbesitzer",
    quote: "Das Studio ist unser Zuhause.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    alt: "Apo - Studio co-owner portrait"
  },
  {
    id: 4,
    name: "XXX",
    role: "Studio-Mitbesitzer",
    quote: "Tattoo ist mehr als nur Kunst – es ist Leidenschaft.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    alt: "XXX - Studio co-owner portrait"
  }
];

export default function CrewSection() {
  return (
    <section id="artists" className="py-20 px-4 ink-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="font-bebas text-5xl md:text-6xl mb-4 text-ink-white section-title">
            UNSERE CREW
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {crewMembers.map((member, index) => (
            <div 
              key={member.id} 
              className={`card-crew scroll-animate`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img 
                src={member.image}
                alt={member.alt}
                className="w-full h-64 object-cover grayscale" 
              />
              <div className="p-6">
                <h3 className="font-bebas text-2xl text-ink-white mb-2">
                  {member.name}
                </h3>
                <p className="text-ink-red font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm italic">
                  "{member.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
