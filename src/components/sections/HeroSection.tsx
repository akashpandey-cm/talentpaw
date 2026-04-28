import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import FilmReelCarousel from '../FilmReelCarousel';
import AntiGravityMesh from '../AntiGravityMesh';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // HIGH-PERFORMANCE MOUSE TRACKING (Bypasses React re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothHoverX = useSpring(mouseX, { damping: 40, stiffness: 120 });
  const smoothHoverY = useSpring(mouseY, { damping: 40, stiffness: 120 });
  const spotlightTransform = useMotionTemplate`translate(${smoothHoverX}px, ${smoothHoverY}px)`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Instead of setState, we update motion values directly — 0 frame drops!
      mouseX.set(e.clientX - rect.left - 400); // 400 is half the spotlight width
      mouseY.set(e.clientY - rect.top - 400);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });


  const gridY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[100vh] w-full flex items-center pt-20 pb-10 overflow-hidden bg-[#FAFAFB]"
    >
      {/* ── Ultra-Premium Atmospheric Background ── */}
      <AntiGravityMesh />
      
      <div className="absolute inset-0 pointer-events-none" style={{ willChange: "transform" }}>        {/* Central Core Glow */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-indigo-500/[0.03] blur-[150px] rounded-full"
        />

        {/* Parallax Grid Pattern */}
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 grid-bg-light opacity-[0.3]"
        />

        {/* Fine Noise Texture for Editorial Polish */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />

        {/* Interactive Mouse Spotlight (Ultra Smooth) */}
        <motion.div
          style={{ transform: spotlightTransform, willChange: "transform" }}
          className="absolute left-0 top-0 w-[800px] h-[800px] bg-indigo-500/[0.04] blur-[120px] rounded-full pointer-events-none translate-z-0"
        />
        
        {/* Subtle Floating Ambient Particles */}
        <div className="absolute inset-0" style={{ willChange: "transform" }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: [0, 0.5, 0], y: "-100%", x: Math.sin(i) * 120 }}
              transition={{ duration: 12 + i * 3, repeat: Infinity, delay: i * 2, ease: "linear" }}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-[1px] translate-z-0"
              style={{ left: `${15 + i * 15}%` }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative z-10">
        {/* Left: Text & CTAs */}
        <div style={{ willChange: "transform" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 mb-8 bg-white/50 border border-black/5 px-4 py-2 rounded-full backdrop-blur-md shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-brand animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[5px] text-brand/80">Live Talent Network</span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[60px] font-bold leading-[76px] tracking-tight mb-10 bg-clip-text text-transparent"
            style={{ 
              fontFamily: 'Outfit',
              backgroundImage: 'linear-gradient(148.93deg, #B400FF 0%, #830FB7 33.96%, #CB5564 56.61%, #FF8B00 81.2%)'
            }}
          >
            Build Your Dream<br />
            Support Team<br />
            in Days
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[20px] text-gray-500 leading-tight max-w-lg mb-12 font-medium"
          >
            Curating the world&apos;s most sought-after talent for visionary brands and revolutionary projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5"
          >
            <Link
              to="/search"
              className="group relative h-16 px-12 bg-black text-white font-bold rounded-full flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden active:scale-95 lg:hover:scale-[1.02] lg:hover:-translate-y-1 lg:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
            >
              <span className="relative z-10">Join Network</span>
              <Zap className="relative z-10 w-5 h-5 fill-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[30deg] -translate-x-full group-hover:translate-x-[200%] transition-none"
              />
            </Link>
            
            <button 
              onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-16 px-12 bg-white border border-black/[0.08] text-black font-bold rounded-full shadow-lg shadow-black/[0.02] hover:shadow-xl hover:border-black/[0.15] transition-all duration-500 active:scale-95 lg:hover:-translate-y-1 lg:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]"
            >
              View Showcase
            </button>
          </motion.div>
        </div>

        {/* Right: 3D Carousel Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative group lg:pl-20"
        >
          <div
            className="relative z-10 py-10 transition-transform duration-1000 ease-out flex justify-center translate-z-0"
            style={{ perspective: '2000px', transform: 'rotateY(10deg) rotateX(15deg) rotateZ(-5deg)' }}
          >
            <div
              className="relative w-full max-w-2xl"
              style={{ transform: 'rotateY(-45deg)', transformStyle: 'preserve-3d' }}
            >
              <FilmReelCarousel />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
