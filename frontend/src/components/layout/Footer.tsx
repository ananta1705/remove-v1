import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const logoImage = "/images/logo.png";

export function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section - Logo & Description */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center p-2.5">
              <img
                src={logoImage}
                alt="ReMove Logo"
                className="w-full h-full object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <h2 className="text-2xl font-bold text-white">ReMove</h2>
          </div>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Sistem Pengelolaan Sampah Terintegrasi yang memberikan solusi untuk mengatasi masalah
            pengelolaan sampah dengan cara yang tepat dan sesuai dengan aturan yang berlaku.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
          {["Beranda", "Tentang Kami", "Layanan", "Artikel", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-gray-300 hover:text-[#14CC99] transition-colors font-medium"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border-2 border-[#14CC99] flex items-center justify-center">
              <span className="text-[#14CC99] text-xs font-bold">©</span>
            </div>
            <p className="text-sm text-gray-400">
              2026 by <span className="text-[#14CC99] font-bold">ReMove</span>. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: Youtube, label: "YouTube" },
              { Icon: Mail, label: "Email" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-700/50 hover:bg-[#14CC99] flex items-center justify-center transition-all hover:scale-110 group"
                aria-label={label}
              >
                <Icon className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
