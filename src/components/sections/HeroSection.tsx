import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Music, Mic2, Camera, Palette, Video, MessageSquare, Users, Star } from 'lucide-react';
import { SVGHoverButton } from '../ui/SVGHoverButton';
import AntiGravityMesh from '../AntiGravityMesh';
import { useEffect, useRef } from 'react';
import { BRAND_GRADIENT, EASE_PREMIUM, GPU_ACCELERATION } from '../../lib/brand';

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
      mouseX.set(e.clientX - rect.left - 400);
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
      <AntiGravityMesh />

      <div className="absolute inset-0 pointer-events-none" style={GPU_ACCELERATION}>
        {/* Central Core Glow - CSS Animation for Performance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-indigo-500/[0.03] blur-[150px] rounded-full animate-[pulse_8s_ease-in-out_infinite]" />

        {/* Parallax Grid Pattern */}
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 grid-bg-light opacity-[0.3]"
        />

        {/* Fine Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />

        {/* Interactive Mouse Spotlight */}
        <motion.div
          style={{ ...GPU_ACCELERATION, transform: spotlightTransform }}
          className="absolute left-0 top-0 w-[800px] h-[800px] bg-indigo-500/[0.04] blur-[120px] rounded-full pointer-events-none translate-z-0"
        />

        {/* Subtle Floating Ambient Particles - Simplified & GPU Hardened */}
        <div className="absolute inset-0" style={GPU_ACCELERATION}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: [0, 0.4, 0], y: "-100%" }}
              transition={{ duration: 15 + i * 5, repeat: Infinity, delay: i * 3, ease: "linear" }}
              className="absolute w-1.5 h-1.5 bg-brand/20 rounded-full blur-[1px] translate-z-0"
              style={{ left: `${20 + i * 30}%` }}
            />
          ))}
        </div>

        {/* ── Floating Talent Icons ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingIcon icon={<Music />} delay={0} left="10%" top="20%" size={32} color="#B400FF" />
          <FloatingIcon icon={<Mic2 />} delay={2} left="85%" top="15%" size={40} color="#FF8B00" />
          <FloatingIcon icon={<Camera />} delay={4} left="5%" top="70%" size={34} color="#3B82F6" />
          <FloatingIcon icon={<Palette />} delay={1} left="90%" top="60%" size={38} color="#EC4899" />
          <FloatingIcon icon={<Video />} delay={3} left="15%" top="45%" size={30} color="#8B5CF6" />
          <FloatingIcon icon={<MessageSquare />} delay={5} left="80%" top="80%" size={36} color="#6366F1" />
          <FloatingIcon icon={<Star />} delay={1.5} left="40%" top="10%" size={24} color="#F59E0B" />
          <FloatingIcon icon={<Users />} delay={3.5} left="60%" top="85%" size={32} color="#10B981" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative z-10">
        <div style={GPU_ACCELERATION}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          >
            <div className="inline-flex items-center gap-2 mb-8 bg-white/50 border border-black/5 px-4 py-2 rounded-full backdrop-blur-md shadow-sm animate-[bounce_4s_infinite_ease-in-out]">
              <div className="w-2 h-2 rounded-full bg-brand animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[5px] text-brand/80">Live Talent Network</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE_PREMIUM }}
            className="text-[40px] md:text-[60px] font-bold leading-[1.1] md:leading-[76px] tracking-tight mb-10 text-black font-['Outfit']"
          >
            Build Your Dream<br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              Support Team
            </span><br />
            in Days
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE_PREMIUM }}
            className="text-[20px] text-gray-500 leading-tight max-w-lg mb-12 font-medium"
          >
            Curating the world&apos;s most sought-after talent for visionary brands and revolutionary projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE_PREMIUM }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5"
          >
            <Link to="/search">
              <SVGHoverButton
                label="Join Network"
                dark={true}
                icon={<Zap className="w-5 h-5 fill-current" />}
              />
            </Link>

            <SVGHoverButton
              label="View Showcase"
              dark={false}
              onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </motion.div>
        </div>

        <div className="hidden lg:block lg:pl-20" />
      </div>
    </section>
  );
}

function FloatingIcon({ icon, delay, left, top, size, color }: {
  icon: React.ReactNode,
  delay: number,
  left: string,
  top: string,
  size: number,
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.2, 0.2, 0],
        y: [0, -50, -100, -150],
        rotate: [0, 15, -15, 0],
        scale: [0.8, 1.2, 1.2, 0.8]
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute pointer-events-none"
      style={{ left, top, fontSize: size, color }}
    >
      {icon}
    </motion.div>
  );
}
