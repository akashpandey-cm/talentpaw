import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { EASE_PREMIUM, GPU_ACCELERATION } from '../../lib/brand';

interface CTASectionProps {
  onBookNow?: () => void;
  compact?: boolean;
}

export default function CTASection({ onBookNow, compact = false }: CTASectionProps) {
  const trustSignals = [
    { icon: <Shield className="w-5 h-5" />, text: "Vetted Tier-1 Talent" },
    { icon: <Clock className="w-5 h-5" />, text: "Match in 24 Hours" },
    { icon: <Star className="w-5 h-5" />, text: "Elite Quality Guarantee" },
  ];

  return (
    <section className={`relative w-full ${compact ? 'py-10 md:py-12' : 'py-24 md:py-48'} overflow-hidden bg-[#FAFAFB]`}>
      {/* Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-1/2 h-full bg-purple-500/[0.03] blur-[120px] rounded-full" />
        <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-full bg-orange-500/[0.03] blur-[120px] rounded-full" />
        
        {/* Animated Particles - Simplified for Performance */}
        <div className="absolute inset-0" style={GPU_ACCELERATION}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                scale: [0, 1.5, 0],
                x: [0, (i - 2) * 100, 0],
                y: [0, -200, 0]
              }}
              transition={{ 
                duration: 10 + i * 2, 
                repeat: Infinity, 
                delay: i * 1.5,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 bg-brand/10 rounded-full blur-[2px]"
              style={{ left: `${20 + i * 15}%`, bottom: '10%' }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 text-center px-4 md:px-6" style={GPU_ACCELERATION}>
        <div className="max-w-4xl mx-auto">
          {/* Trust Badges */}
          {!compact && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="flex flex-wrap items-center justify-center gap-6 mb-12"
            >
              {trustSignals.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-[#050505]/40 font-bold text-[10px] uppercase tracking-[3px]">
                  <span className="text-brand/50">{s.icon}</span>
                  {s.text}
                </div>
              ))}
            </motion.div>
          )}

          {/* Cinematic Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.1 }}
            className="text-[34px] sm:text-[40px] md:text-[60px] font-bold text-[#050505] leading-[1.08] md:leading-[76px] tracking-tight mb-4 md:mb-6 font-['Outfit']"
          >
            Scale your design <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B400FF] via-[#CB5564] to-[#FF8B00]">Velocity.</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.2 }}
            className="text-[#050505]/50 text-[16px] md:text-[22px] font-medium leading-relaxed max-w-2xl mx-auto mb-6"
          >
            Stop settling for average. Get matched with elite creative talent and start shipping at speed.
          </motion.p>

          {/* Centered CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              onClick={onBookNow}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 md:px-12 h-[52px] bg-[#050505] rounded-full overflow-hidden shadow-2xl shadow-black/20 w-full sm:w-auto flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white font-black text-xs md:text-sm uppercase tracking-wide md:tracking-widest flex items-center justify-center gap-3">
                Start Hiring Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 md:px-12 h-[52px] bg-white border border-black/10 rounded-full shadow-xl shadow-black/[0.02] hover:bg-black/[0.02] transition-all w-full sm:w-auto flex items-center justify-center"
            >
              <span className="text-[#050505] font-black text-xs md:text-sm uppercase tracking-wide md:tracking-widest">
                Explore Talent
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
