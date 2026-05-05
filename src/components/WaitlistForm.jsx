import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Star } from 'lucide-react';
import { useInView } from '../hooks';

const INTEREST_OPTIONS = [
  { value: '', label: 'Select your primary interest' },
  { value: 'leagues', label: 'Competitive Leagues' },
  { value: 'lane-rentals', label: 'Training Lane Rentals' },
  { value: 'youth-academy', label: 'Youth Academy (Ages 7–12)' },
  { value: 'corporate-events', label: 'Corporate Events' },
];

// Using Formspree for free form submissions
// Replace YOUR_FORM_ID with an actual Formspree form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

// Fallback: mailto link for info@ncindoorcricket.com
const MAILTO_FALLBACK = 'mailto:info@ncindoorcricket.com';

export default function WaitlistForm() {
  const [sectionRef, isVisible] = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Please enter your full name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return 'Please enter a valid email address.';
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10)
      return 'Please enter a valid phone number.';
    if (!formData.interest) return 'Please select your primary interest.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest,
          _subject: `NC Indoor Cricket Interest — ${formData.name}`,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', interest: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      // Fallback: open mailto if Formspree isn't configured
      const body = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AInterest: ${formData.interest}`;
      window.open(`${MAILTO_FALLBACK}?subject=Interest%20Registration&body=${body}`, '_blank');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', interest: '' });
    }
  };

  return (
    <section id="interest" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/20 to-navy-900 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-electric/3 rounded-full blur-[300px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric/5 border border-electric/10 mb-6">
            <Star className="w-3.5 h-3.5 text-electric" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-electric/80">
              Exclusive Early Access
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Secure Your Spot on{' '}
            <span className="gradient-text">the Interest List</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Be the first to know about our official opening date, early-bird specials, and exclusive launch events in the Greater Charlotte area.
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`animated-border p-8 sm:p-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {status === 'success' ? (
            /* ── Success State ── */
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-electric/10 border border-electric/20 flex items-center justify-center mx-auto mb-6 animate-fade-in">
                <CheckCircle className="w-10 h-10 text-electric" />
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4 animate-fade-in-up">
                You're on the list!
              </h3>
              <p className="text-white/60 max-w-md mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
                We will reach out soon with exclusive updates for our official opening date in the Greater Charlotte area. Get ready to play.
              </p>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} className="space-y-6" id="waitlist-form" noValidate>
              {/* Error Banner */}
              {status === 'error' && errorMessage && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fade-in">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="waitlist-name" className="block text-sm font-medium text-white/70 mb-2">
                    Full Name <span className="text-electric">*</span>
                  </label>
                  <input
                    id="waitlist-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-5 py-4 rounded-xl bg-navy-700/50 border border-white/10 text-white placeholder-white/30 font-medium
                             focus:outline-none focus:border-electric/40 transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="waitlist-email" className="block text-sm font-medium text-white/70 mb-2">
                    Email Address <span className="text-electric">*</span>
                  </label>
                  <input
                    id="waitlist-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-5 py-4 rounded-xl bg-navy-700/50 border border-white/10 text-white placeholder-white/30 font-medium
                             focus:outline-none focus:border-electric/40 transition-all duration-300"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="waitlist-phone" className="block text-sm font-medium text-white/70 mb-2">
                    Phone Number <span className="text-electric">*</span>
                  </label>
                  <input
                    id="waitlist-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="w-full px-5 py-4 rounded-xl bg-navy-700/50 border border-white/10 text-white placeholder-white/30 font-medium
                             focus:outline-none focus:border-electric/40 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Primary Interest */}
              <div>
                <label htmlFor="waitlist-interest" className="block text-sm font-medium text-white/70 mb-2">
                  Primary Interest <span className="text-electric">*</span>
                </label>
                <select
                  id="waitlist-interest"
                  name="interest"
                  required
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl bg-navy-700/50 border border-white/10 text-white font-medium appearance-none
                           focus:outline-none focus:border-electric/40 transition-all duration-300
                           bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2339ff14%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]
                           bg-[length:20px] bg-[right_16px_center] bg-no-repeat"
                >
                  {INTEREST_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-navy-800 text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="waitlist-submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full text-lg group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Join the Inner Circle
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>

              {/* Privacy note */}
              <p className="text-center text-xs text-white/30 mt-4">
                Your information is kept strictly confidential. We will only use it to send you launch updates.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
