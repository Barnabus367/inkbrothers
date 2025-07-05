import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Vielen Dank für deine Nachricht! Wir melden uns bald bei dir.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="connect" className="relative py-20 px-4 ink-black section-flow z-20 -mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="font-bebas text-5xl md:text-6xl mb-4 text-ink-white section-title">
            CONNECT
          </h2>
          <p className="text-xl text-gray-400">
            Bereit für dein nächstes Tattoo? Lass uns sprechen.
          </p>
        </div>

        {/* Kontaktwege Grid */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="tel:+41445582433" className="flex flex-col items-center justify-center gap-2 p-6 rounded-lg bg-gray-900 hover:bg-red-500/10 transition shadow-lg text-center cursor-pointer group">
              <Phone className="w-8 h-8 text-ink-red mb-2 group-hover:scale-110 transition" />
              <span className="font-semibold text-ink-white text-lg">Anrufen</span>
              <span className="text-gray-400 text-sm">+41 44 558 24 33</span>
            </a>
            <a href="https://www.instagram.com/ink_brothers_regensdorf/" target="_blank" rel="noopener" className="flex flex-col items-center justify-center gap-2 p-6 rounded-lg bg-gray-900 hover:bg-red-500/10 transition shadow-lg text-center cursor-pointer group">
              <svg className="w-8 h-8 mb-2 group-hover:scale-110 transition" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
              <span className="font-semibold text-ink-white text-lg">Instagram</span>
              <span className="text-gray-400 text-sm">@inkbrothers_regendsdorf</span>
            </a>
            <a href="mailto:info@inkbrothers.ch" className="flex flex-col items-center justify-center gap-2 p-6 rounded-lg bg-gray-900 hover:bg-red-500/10 transition shadow-lg text-center cursor-pointer group">
              <Mail className="w-8 h-8 text-ink-red mb-2 group-hover:scale-110 transition" />
              <span className="font-semibold text-ink-white text-lg">E-Mail</span>
              <span className="text-gray-400 text-sm">info@inkbrothers.ch</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 scroll-animate">
            <div>
              <h3 className="font-bebas text-2xl text-ink-white mb-6">
                STUDIO INFO
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-ink-red mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-ink-white font-semibold">
                      InkBrothers Studio
                    </p>
                    <p className="text-gray-400">
                      Watterstrasse 10, 8105 Regensdorf
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-ink-red mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-ink-white font-semibold">
                      +41 44 558 24 33


                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-ink-red mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-ink-white font-semibold">
                      info@inkbrothers.ch
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-ink-red mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-ink-white font-semibold">
                      Öffnungszeiten
                    </p>
                    <p className="text-gray-400">Mo-Fr: 10:00-19:00</p>
                    <p className="text-gray-400">Sa: 10:00-17:00</p>
                    <p className="text-gray-400">So: Geschlossen</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-8 rounded-lg overflow-hidden shadow-2xl">
              <iframe
                title="INK Brothers Tattoo Studio Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2722.964964073624!2d8.4633966!3d47.4300334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900bdf9ed05457%3A0xde4f4d729407a9de!2sINK%20Brothers%20Tattoo%20Studio!5e0!3m2!1sde!2sch!4v1720180000000!5m2!1sde!2sch"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-64 border-0"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="ink-anthracite rounded-lg p-8 shadow-2xl scroll-animate">
            <h3 className="font-bebas text-2xl text-ink-white mb-6">
              NACHRICHT SENDEN
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Dein Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="deine@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Betreff
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Worum geht es?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nachricht
                </label>
                <textarea
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Erzähl uns von deiner Tattoo-Idee..."
                  required
                />
              </div>

              <button type="submit" className="w-full btn-cta">
                NACHRICHT SENDEN
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Gradient fade overlay for smooth transition */}
      <div className="section-fade-bottom pointer-events-none absolute bottom-0 left-0 w-full h-32 z-10"></div>
    </section>
  );
}
