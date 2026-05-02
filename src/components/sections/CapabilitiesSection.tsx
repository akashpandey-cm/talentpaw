import { useState, useEffect, memo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { BRAND_GRADIENT, EASE_PREMIUM, GPU_ACCELERATION } from '../../lib/brand';

// Import small assets (<30KB where possible)
import imgComedian from '../../assets/voiceactor/musician/comedian/djz2zhqlgagvpa8ipeoz.webp'; // ~28KB
import imgGuitarist from '../../assets/voiceactor/musician/dvcjhsklpzzqtnabayft.webp'; // ~12KB
import imgVocalist from '../../assets/singer/mckuw77seo1r35a8dwis.webp'; // ~37KB
import imgHost from '../../assets/voiceactor/gv1kwnz3r3oocfo2jqan.webp'; // ~23KB
import imgMusician from '../../assets/voiceactor/musician/mz4phyiq3fbl2prcegwy.webp'; // ~35KB
import imgCopywriter from '../../assets/content writer/is5oxc316p34lsr3upyp.webp'; // ~23KB
import imgModel from '../../assets/model/dpehjsj73hh4ukc8ewdz.webp'; // ~30KB
import imgPhoto from '../../assets/photographer/pxa4fmob1dnmlh4z2mx6.webp'; // ~43KB
import imgDJ from '../../assets/lcs0vfehbdrtso2l3fco.webp'; // ~39KB

// === Use Public Folder Images (Sabse Important Change) ===
const SLIDES = [
  {
    img: imgComedian,
    role: 'Comedian',
    desc: 'Stand-Up Visionary'
  },
  {
    img: imgGuitarist,
    role: 'Guitarist',
    desc: 'Acoustic Mastery'
  },
  {
    img: imgVocalist,
    role: 'Vocalist',
    desc: 'Lead Performer'
  },
  {
    img: imgHost,
    role: 'Host',
    desc: 'Live Event MC'
  },
  {
    img: imgMusician,
    role: 'Musician',
    desc: 'Classical Wind'
  },
  {
    img: imgCopywriter,
    role: 'Copywriter',
    desc: 'Narrative Architect'
  },
  {
    img: imgModel,
    role: 'Model',
    desc: 'Editorial Talent'
  },
  {
    img: imgPhoto,
    role: 'Photographer',
    desc: 'Visual Storyteller'
  },
  {
    img: imgDJ,
    role: 'DJ',
    desc: 'Sonic Sculptor'
  },
];

const SlideCard = memo(({ slide, i, index, total, isMobile, onSelect }: {
  slide: typeof SLIDES[0];
  i: number;
  index: number;
  total: number;
  isMobile: boolean;
  onSelect: (i: number) => void;
}) => {
  const getOffset = () => {
    let offset = (i - index) % total;
    if (offset < -Math.floor(total / 2)) offset += total;
    if (offset > Math.floor(total / 2)) offset -= total;
    return offset;
  };

  const offset = getOffset();
  const isCenter = offset === 0;

  const xOffset = isMobile ? 58 : 220;
  const x = offset * xOffset;
  const scale = isCenter ? 1 : Math.max(0.65, 1 - Math.abs(offset) * 0.15);
  const rotateY = offset * -35;
  const zIndex = 100 - Math.abs(offset);
  const opacity = Math.abs(offset) >= 3 ? 0 : Math.abs(offset) >= 2 ? (isMobile ? 0 : 0.4) : isCenter ? 1 : 0.7;

  return (
    <motion.div
      whileTap={{ scale: isCenter ? 0.98 : scale }}
      animate={{ x, scale, rotateY, zIndex, opacity }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 32,
        mass: 0.5,
      }}
      className={`absolute w-[136px] sm:w-[160px] md:w-[220px] lg:w-[260px] aspect-[4/4.8] rounded-[20px] md:rounded-[24px] overflow-hidden bg-[#08060f] flex flex-col justify-center items-center ${isCenter ? 'cursor-default border-2 border-brand/40' : 'cursor-pointer border border-white/10'
        }`}
      style={{
        originX: 0.5,
        originY: 0.5,
        transformStyle: "preserve-3d",
        ...GPU_ACCELERATION
      }}
      onClick={() => !isCenter && onSelect(i)}
    >
      {/* Shadow Layer */}
      <motion.div
        animate={{ opacity: isCenter ? 1 : 0 }}
        className="absolute inset-0 pointer-events-none rounded-[24px] shadow-[0_30px_60px_-12px_rgba(123,97,255,0.45)] z-[-1]"
      />

      {/* Image - Simple & Fast */}
      <img
        src={slide.img}
        alt={slide.role}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        loading={isCenter ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={isCenter ? "high" : "low"}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08060F] via-[#08060F]/40 to-[#08060F]/10 z-10 pointer-events-none" />

      {/* Decor Lines - Optimized (less DOM) */}
      <div className="absolute top-3 left-0 right-0 flex gap-1 px-4 z-20 opacity-30">
        {Array.from({ length: isMobile ? 6 : 9 }).map((_, idx) => (
          <div key={idx} className="h-3 md:h-4 flex-1 bg-white/40 rounded-sm" />
        ))}
      </div>

      <div className="absolute bottom-3 left-0 right-0 flex gap-1 px-4 z-20 opacity-30">
        {Array.from({ length: isMobile ? 6 : 9 }).map((_, idx) => (
          <div key={idx} className="h-3 md:h-4 flex-1 bg-white/40 rounded-sm" />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center mt-auto pb-10 md:pb-12 text-center w-full px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-lg rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-[2px] text-white shadow-xl mb-3 border border-white/20">
          <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse shadow-[0_0_8px_rgba(104,57,149,0.8)]" />
          Tier-1 Professional
        </div>
        <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          {slide.role}
        </h3>
        <p className="text-[10px] md:text-sm font-bold text-white/50 uppercase tracking-[4px] drop-shadow-sm">
          {slide.desc}
        </p>
      </div>
    </motion.div>
  );
});

export default function CapabilitiesSection() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Memoized handler to prevent unnecessary re-renders of SlideCard
  const handleSelect = useCallback((newIndex: number) => {
    setIndex(newIndex);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const total = SLIDES.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col items-center pt-24 pb-8 md:pt-[120px] md:pb-10 px-4 overflow-hidden bg-[#FAFAFB]">
      
      {/* ── High-Fidelity Falling Stars ── */}
      <FallingStars opacity={0.15} />

      {/* Background Glows & Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={GPU_ACCELERATION}>
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-rose-500/5 blur-[120px] rounded-full" />
        
        {/* Floating Background Orbs */}
        <FloatingOrb color="rgba(123, 97, 255, 0.12)" size="w-64 h-64" top="15%" left="5%" delay={0} />
        <FloatingOrb color="rgba(255, 77, 141, 0.08)" size="w-48 h-48" top="60%" right="5%" delay={2} />
      </div>


      <div className="w-full flex flex-col items-center my-auto z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="text-center mb-4 md:mb-8 relative w-full max-w-2xl px-2 md:px-4"
          style={GPU_ACCELERATION}
        >
          <h2 className="text-[34px] sm:text-[40px] md:text-[60px] font-bold text-[#0D0A1A] leading-[1.08] md:leading-[1.1] tracking-tight font-['Outfit']">
            World-Class <br className="md:hidden" />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: BRAND_GRADIENT }}>
              Talent Formats
            </span>
          </h2>
          <p className="mt-3 md:mt-4 text-gray-500 max-w-lg mx-auto text-[14px] md:text-[18px] leading-relaxed">
            Experience an elite showcase. Our platform instantly connects you with strictly vetted industry visionaries.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_PREMIUM }}
          className="relative w-full max-w-[1100px] h-[350px] sm:h-[420px] md:h-[460px] lg:h-[520px] bg-white/0 backdrop-blur-2xl rounded-[32px] sm:rounded-[40px] md:rounded-[60px] flex flex-col items-center justify-center p-3 md:p-4"
          style={GPU_ACCELERATION}
        >
          <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 w-[80px] h-[6px] bg-black/10 rounded-full" />

          <div
            className="relative w-full flex-grow flex items-center justify-center overflow-visible mt-6 md:mt-10"
            style={{ perspective: '1400px', ...GPU_ACCELERATION }}
          >
            {SLIDES.map((slide, i) => (
              <SlideCard
                key={i}
                slide={slide}
                i={i}
                index={index}
                total={total}
                isMobile={isMobile}
                onSelect={handleSelect}
              />
            ))}
          </div>

          <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 w-[100px] md:w-[140px] h-[4px] md:h-[5px] bg-black/10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingOrb({ color, size, top, left, right, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
      animate={{ 
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.1, 1],
        rotate: [0, 90, 0],
        x: [0, 15, 0],
        y: [0, -20, 0]
      }}
      transition={{
        duration: 12,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className={`absolute rounded-2xl border-2 border-black/5 backdrop-blur-sm pointer-events-none ${size}`}
      style={{ 
        boxShadow: `0 0 40px ${color}`,
        top: top,
        left: left,
        right: right,
        zIndex: 0
      }}
    >
      <div className="absolute inset-0 rounded-2xl border-2 border-brand/20 opacity-40" />
    </motion.div>
  );
}

function FallingStars({ opacity = 0.4 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#683995', '#8b5cf6', '#a78bfa', '#000000'];

    type Star = {
      x: number; y: number; vy: number; vx: number;
      r: number; color: string; alpha: number; alphaSpeed: number;
      rotation: number; rs: number;
      w: number;
    };

    const stars: Star[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vy: 0.4 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.4,
      r: 1 + Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.3,
      alphaSpeed: 0.005 + Math.random() * 0.01,
      rotation: Math.random() * Math.PI * 2,
      rs: (Math.random() - 0.5) * 0.05,
      w: 2 + Math.random() * 4,
    }));

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(s => {
        s.y += s.vy;
        s.x += s.vx;
        s.rotation += s.rs;
        s.alpha = Math.min(s.alpha + s.alphaSpeed, 0.3);

        if (s.y > canvas.height + 20) {
          s.y = -20;
          s.x = Math.random() * canvas.width;
          s.alpha = 0;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;

        const spikes = 4;
        const outer = s.w;
        const inner = outer / 3;
        let rot = (Math.PI / 2) * 3 + s.rotation;
        let step = Math.PI / spikes;
        
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - outer);
        for (let i = 0; i < spikes; i++) {
          ctx.lineTo(s.x + Math.cos(rot) * outer, s.y + Math.sin(rot) * outer);
          rot += step;
          ctx.lineTo(s.x + Math.cos(rot) * inner, s.y + Math.sin(rot) * inner);
          rot += step;
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity }}
    />
  );
}
