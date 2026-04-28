import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import AntiGravityMesh from '../AntiGravityMesh';
import { BRAND_GRADIENT, EASE_PREMIUM, GPU_ACCELERATION } from '../../lib/brand';

interface CTASectionProps {
  onBookNow: () => void;
}

export default function CTASection({ onBookNow }: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // HIGH-PERFORMANCE MOUSE TRACKING
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 120 });
  const spotlightTransform = useMotionTemplate`translate(${smoothX}px, ${smoothY}px)`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - 300);
      mouseY.set(e.clientY - rect.top - 300);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section 
      ref={sectionRef}
      id="cta"
      className="pt-20 pb-20 px-6 relative overflow-hidden bg-[#FAFAFB]"
    >
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={GPU_ACCELERATION}>
        <AntiGravityMesh />

        {/* Interactive Mouse Spotlight */}
        <motion.div
          style={{ ...GPU_ACCELERATION, transform: spotlightTransform }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand/[0.05] blur-[100px] rounded-full pointer-events-none translate-z-0"
        />

        {/* Parallax Grid */}
        <motion.div
          style={{ y: gridY, ...GPU_ACCELERATION }}
          className="absolute inset-0 grid-bg-light opacity-[0.25]"
        />

        {/* Subtle Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />

        {/* Floating Particles - Moved to CSS for performance */}
        <div className="absolute inset-0" style={GPU_ACCELERATION}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: [0, 0.4, 0], y: "-100%" }}
              transition={{ duration: 15 + i * 5, repeat: Infinity, delay: i * 3, ease: "linear" }}
              className="absolute w-1 h-1 bg-purple-400 rounded-full blur-[1px] translate-z-0"
              style={{ left: `${20 + i * 30}%` }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center" style={GPU_ACCELERATION}>
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-black/[0.06] bg-white/50 backdrop-blur-md shadow-xl shadow-black/[0.02] mb-12"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[4px] text-black/40">Recruitment open for q3</span>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
          className="text-[40px] md:text-[60px] font-bold text-black leading-[1.1] md:leading-[76px] tracking-tight mb-10 font-['Outfit']"
        >
          Scale your design<br />
          <span 
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: BRAND_GRADIENT }}
          >
            Velocity.
          </span>
        </motion.h2>

        {/* Rich Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_PREMIUM }}
          className="text-[19px] sm:text-[22px] text-black/50 leading-relaxed max-w-2xl mx-auto mb-16 font-medium"
        >
          Stop settling for average. Get matched with the world&apos;s most elite creative talent and start shipping at speed.
        </motion.p>

        {/* High-Impact Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_PREMIUM }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full px-4 sm:px-0"
        >
          {/* Main Drawer Trigger */}
          <motion.button
            onClick={onBookNow}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group relative h-14 md:h-16 px-10 md:px-12 w-full sm:w-auto bg-black text-white font-black text-base md:text-lg rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] transition-[transform,box-shadow] duration-300 overflow-hidden"
          >
            <span className="relative z-10">Start Hiring Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Optimized Shimmer: runs ONLY on hover */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="h-14 md:h-16 px-10 md:px-12 w-full sm:w-auto bg-white border border-black/[0.08] text-black font-bold text-base md:text-lg rounded-full shadow-lg shadow-black/[0.02] hover:shadow-xl hover:border-black/[0.15] transition-[background-color,border-color,box-shadow,transform] duration-300"
          >
            Explore Talent
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
