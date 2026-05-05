import { Ruler, Trees, Target, Shield } from 'lucide-react';
import { useInView } from '../hooks';

const SPECS = [
  {
    icon: Ruler,
    stat: '24ft+',
    label: 'Clear Span Ceilings',
    description:
      'Towering clear-span architecture designed for natural lofted shots and overhead plays — delivering an authentic, unrestricted stadium experience indoors.',
    accent: 'from-electric/20 to-electric/5',
  },
  {
    icon: Trees,
    stat: '15mm',
    label: 'Pro-Grade Turf System',
    description:
      'High-density, non-sand-filled turf with Polyurethane (PU) backing engineered for consistent bounce performance with both hard tennis and leather cricket balls.',
    accent: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    icon: Target,
    stat: '85ft',
    label: 'Full Run-Up Training Lanes',
    description:
      'Professional-length batting lanes equipped with latest-generation BOLA and Jugs pitching machines — replicating every delivery from pace to spin at match-grade accuracy.',
    accent: 'from-blue-500/20 to-blue-500/5',
  },
  {
    icon: Shield,
    stat: '6v6',
    label: 'Box Cricket Arena',
    description:
      'Fully enclosed netting systems purpose-built for competitive Box Cricket — supporting 6v6 and 8v8 match formats in a tournament-ready environment. This is the real deal.',
    accent: 'from-amber-500/20 to-amber-500/5',
  },
];

export default function Facilities() {
  const [sectionRef, isVisible] = useInView();

  return (
    <section id="facilities" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-electric/3 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric/5 border border-electric/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-electric/80">
              Engineered for Excellence
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Professional Grade.{' '}
            <span className="gradient-text">Purpose Built.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Every surface, every dimension, every system — purpose-built for cricket. No compromises, no multi-sport afterthoughts.
          </p>
        </div>

        {/* Divider */}
        <div className="glow-line mb-16 sm:mb-20" />

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SPECS.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <div
                key={i}
                className={`glass-card-hover p-8 sm:p-10 group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${spec.accent} border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-6 h-6 text-electric" />
                  </div>

                  <div className="flex-1">
                    {/* Stat */}
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display font-black text-3xl sm:text-4xl gradient-text">
                        {spec.stat}
                      </span>
                      <span className="font-display font-semibold text-white/90 text-lg">
                        {spec.label}
                      </span>
                    </div>
                    {/* Description */}
                    <p className="text-white/50 leading-relaxed text-sm sm:text-base">
                      {spec.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
