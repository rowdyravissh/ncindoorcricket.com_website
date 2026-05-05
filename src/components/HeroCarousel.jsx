import { ChevronLeft, ChevronRight, MapPin, ArrowDown } from 'lucide-react';
import { useCarousel } from '../hooks';

const SLIDES = [
  {
    image: '/hero-stadium.png',
    title: 'The Future of Cricket\nin North Carolina',
    subtitle: 'Greater Charlotte\'s first purpose-built indoor cricket arena — engineered for the sport, not adapted from a warehouse.',
  },
  {
    image: '/hero-match.png',
    title: 'Box Cricket.\nUnleashed.',
    subtitle: 'Full-contact, high-intensity 6v6 and 8v8 matches under stadium lights. Year-round leagues start at launch.',
  },
  {
    image: '/hero-training.png',
    title: 'Train Like\na Pro.',
    subtitle: 'Full 85ft run-up lanes with 2024 BOLA pitching machines. Professional-grade turf engineered for consistent bounce.',
  },
];

export default function HeroCarousel() {
  const { current, goTo, next, prev } = useCarousel(SLIDES.length, 6000);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] max-h-[1100px] overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${
            i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title.replace('\n', ' ')}
            className="absolute inset-0 w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-navy-900/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 sm:pb-28 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Location Badge */}
          <div className="animate-fade-in mb-6">
            <span className="stat-badge">
              <MapPin className="w-4 h-4" />
              Greater Charlotte, NC Area
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-6 max-w-4xl animate-fade-in-up">
            {SLIDES[current].title.split('\n').map((line, j) => (
              <span key={j} className="block">
                {j === 1 ? (
                  <span className="gradient-text text-shadow-glow">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mb-10 animate-fade-in-up animate-delay-200 font-light leading-relaxed">
            {SLIDES[current].subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-400">
            <a href="#interest" className="btn-primary text-lg">
              Register Your Interest
              <ArrowDown className="w-5 h-5 ml-2 animate-bounce-slow" />
            </a>
            <a href="#facilities" className="btn-secondary text-lg">
              Explore the Arena
            </a>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-6 sm:bottom-10 right-4 sm:right-8 lg:right-12 flex items-center gap-4 z-20">
          {/* Dots */}
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                id={`hero-slide-${i}`}
                className={`transition-all duration-500 rounded-full ${
                  i === current
                    ? 'w-8 h-2 bg-electric shadow-[0_0_10px_rgba(57,255,20,0.5)]'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={prev}
              id="hero-prev"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-electric/30 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              id="hero-next"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-electric/30 transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent z-[5]" />
    </section>
  );
}
