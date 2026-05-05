import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="relative border-t border-white/5">
      {/* Glow line */}
      <div className="glow-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center">
                <span className="text-electric font-display font-black text-lg">NC</span>
              </div>
              <div>
                <span className="font-display font-bold text-white text-lg block leading-tight">NC Indoor Cricket</span>
                <span className="text-xs text-electric/60 font-medium tracking-widest uppercase">Greater Charlotte</span>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              The Greater Charlotte area's premier indoor cricket destination. Purpose-built for the sport you love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Facilities', href: '#facilities' },
                { label: 'Services', href: '#services' },
                { label: 'Register Interest', href: '#interest' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 hover:text-electric transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wider uppercase">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@ncindoorcricket.com"
                  id="footer-email"
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-electric transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" />
                  info@ncindoorcricket.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/40">
                <MapPin className="w-4 h-4" />
                Greater Charlotte, NC Area
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">
              &copy; {currentYear} NC Indoor Cricket. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs text-white/25">
              <span>Box Cricket Charlotte</span>
              <span className="text-electric/30">·</span>
              <span>Indoor Cricket Nets NC</span>
              <span className="text-electric/30">·</span>
              <span>Year-Round Cricket NC Area</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
