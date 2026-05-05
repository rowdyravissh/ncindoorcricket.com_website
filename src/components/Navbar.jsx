import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Facilities', href: '#facilities' },
  { label: 'Services', href: '#services' },
  { label: 'Register Interest', href: '#interest' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900/90 backdrop-blur-xl shadow-[0_1px_0_rgba(57,255,20,0.1)]'
          : 'bg-transparent'
      }`}
    >
      {/* Grand Opening Banner */}
      <div className="bg-gradient-to-r from-electric/10 via-electric/20 to-electric/10 border-b border-electric/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2">
          <Zap className="w-4 h-4 text-electric animate-pulse" />
          <p className="text-xs sm:text-sm font-display font-semibold tracking-wider text-electric uppercase">
            Grand Opening Soon — Greater Charlotte, NC Area
          </p>
          <Zap className="w-4 h-4 text-electric animate-pulse" />
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" id="nav-logo" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center group-hover:bg-electric/20 transition-all duration-300">
              <span className="text-electric font-display font-black text-lg sm:text-xl">NC</span>
              <div className="absolute -inset-0.5 rounded-xl bg-electric/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-white text-lg leading-tight block">
                NC Indoor Cricket
              </span>
              <span className="text-xs text-electric/60 font-medium tracking-widest uppercase">
                Greater Charlotte
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  link.href === '#interest'
                    ? 'btn-primary text-sm !px-6 !py-2.5'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 top-[calc(4rem+2.5rem)] bg-navy-900/98 backdrop-blur-2xl transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-6 pt-20">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`font-display text-2xl font-semibold transition-all duration-300 ${
                mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${
                link.href === '#interest'
                  ? 'btn-primary mt-4'
                  : 'text-white/80 hover:text-electric'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
