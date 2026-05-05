import { Trophy, Crosshair, GraduationCap, Building2 } from 'lucide-react';
import { useInView } from '../hooks';

const SERVICES = [
  {
    icon: Trophy,
    title: 'Competitive Leagues',
    tagline: 'Year-Round. All Levels.',
    description:
      'Seasonal T20 and HardTennis series running all year long — rain or shine. From casual social leagues to elite divisions, find your competition level and bring your squad.',
    features: ['T20 Series', 'HardTennis Leagues', 'All Skill Levels', 'Seasonal Formats'],
    gradient: 'from-electric via-electric-300 to-emerald-400',
    bgGlow: 'bg-electric/5',
  },
  {
    icon: Crosshair,
    title: 'Training Lanes',
    tagline: 'Pro-Level Practice.',
    description:
      'Book full 85ft lanes for individual or team sessions. Every lane equipped with latest-generation BOLA and Jugs pitching machines delivering pace, spin, and swing at match intensity.',
    features: ['Individual Sessions', 'Team Bookings', 'BOLA Machines', 'Full 85ft Run-Up'],
    gradient: 'from-blue-400 via-cyan-400 to-teal-400',
    bgGlow: 'bg-blue-500/5',
  },
  {
    icon: GraduationCap,
    title: 'Cricket Academies',
    tagline: 'Develop. Compete. Excel.',
    description:
      'Grassroots programs for beginners (ages 7–12) build fundamentals and a love for the game. High-Performance coaching for elite athletes leverages AI-enabled video analysis to sharpen technique.',
    features: ['Grassroots (Ages 7–12)', 'High-Performance', 'AI Video Analysis', 'Expert Coaching'],
    gradient: 'from-amber-400 via-orange-400 to-red-400',
    bgGlow: 'bg-amber-500/5',
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    tagline: 'Team Building. Reimagined.',
    description:
      'Swap the tired bowling alley for something unforgettable. Organize corporate cricket matches, social events, and team-building experiences that actually build teams.',
    features: ['Team Building', 'Social Matches', 'Private Events', 'Custom Packages'],
    gradient: 'from-purple-400 via-fuchsia-400 to-pink-400',
    bgGlow: 'bg-purple-500/5',
  },
];

export default function Services() {
  const [sectionRef, isVisible] = useInView();

  return (
    <section id="services" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/30 to-navy-900 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-electric/2 rounded-full blur-[250px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric/5 border border-electric/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-electric/80">
              What We Offer
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Your Game.{' '}
            <span className="gradient-text">Our Arena.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Whether you're a seasoned pro, a weekend warrior, or just picking up a bat for the first time — we've got a pitch with your name on it.
          </p>
        </div>

        <div className="glow-line mb-16 sm:mb-20" />

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className={`glass-card-hover p-8 sm:p-10 group relative overflow-hidden transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                {/* Glow accent */}
                <div className={`absolute top-0 right-0 w-48 h-48 ${service.bgGlow} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Icon + Title */}
                  <div className="flex items-start gap-5 mb-6">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-[1px] group-hover:scale-110 transition-transform duration-500`}>
                      <div className="w-full h-full rounded-[inherit] bg-navy-800 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-1">
                        {service.title}
                      </h3>
                      <p className={`text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 leading-relaxed mb-6 text-sm sm:text-base">
                    {service.description}
                  </p>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-white/60 font-medium hover:bg-white/10 hover:text-white/80 transition-all duration-300"
                      >
                        {feature}
                      </span>
                    ))}
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
