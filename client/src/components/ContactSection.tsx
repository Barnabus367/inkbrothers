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

            {/* Studio Image */}
            <div className="mt-8">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="InkBrothers Studio interior - modern tattoo parlor"
                className="w-full h-64 object-cover rounded-lg shadow-2xl"
              />
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
