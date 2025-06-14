import { Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="ink-anthracite py-12 px-4 grunge-texture border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-6">
            <span className="font-bebas text-3xl text-ink-white tracking-wider">
              INK<span className="text-ink-red">BROTHERS</span>
            </span>
          </div>

          <div className="mb-4">
            <p className="text-xl text-gray-300">
              InkBrothers Studio Zürich – Est. 2012
            </p>
          </div>

          <div className="mb-8">
            <p className="text-lg font-semibold text-ink-red italic">
              "Respekt auf der Haut. Keine Kompromisse."
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="#"
              className="text-gray-400 hover:text-ink-red transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-ink-red transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-ink-red transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-500 text-sm">
              © 2024 InkBrothers Studio. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
