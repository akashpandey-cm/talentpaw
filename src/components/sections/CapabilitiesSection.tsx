import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { BRAND_GRADIENT, EASE_PREMIUM, GPU_ACCELERATION } from '../../lib/brand';

// Using actual assets
import imgGuitar from '../../assets/medium-shot-man-playing-guitar.webp';
import imgSingerRed from '../../assets/young-female-singer-red-dress.webp';
import imgFlute from '../../assets/man-playing-flute-concert.webp';
import imgMic from '../../assets/medium-shot-woman-holding-microphone.webp';
import imgComedian from '../../assets/medium-shot-stand-up-comedian.webp';

const SLIDES = [
  { img: imgComedian, role: 'Comedian', desc: 'Stand-Up Visionary' },
  { img: imgGuitar, role: 'Guitarist', desc: 'Acoustic Mastery' },
  { img: imgSingerRed, role: 'Vocalist', desc: 'Lead Performer' },
  { img: imgMic, role: 'Host', desc: 'Live Event MC' },
  { img: imgFlute, role: 'Musician', desc: 'Classical Wind' },
];

const SlideCard = memo(({ slide, i, index, total, isMobile, setIndex }: {
  slide: typeof SLIDES[0];
  i: number;
  index: number;
  total: number;
  isMobile: boolean;
  setIndex: (i: number) => void;
}) => {
  const getOffset = () => {
    let offset = (i - index) % total;
    if (offset < -Math.floor(total / 2)) offset += total;
    if (offset > Math.floor(total / 2)) offset -= total;
    return offset;
  };

  const offset = getOffset();
  const isCenter = offset === 0;
  const xOffset = isMobile ? 65 : 220;
  const x = offset * xOffset;
  const scale = isCenter ? 1 : Math.max(0.65, 1 - Math.abs(offset) * 0.15);
  const rotateY = offset * -35;
  const zIndex = 100 - Math.abs(offset);
  const opacity = Math.abs(offset) >= 3 ? 0 : Math.abs(offset) >= 2 ? (isMobile ? 0 : 0.4) : isCenter ? 1 : 0.7;

  return (
    <motion.div
      whileTap={{ scale: isCenter ? 0.98 : scale }}
      animate={{
        x,
        scale,
        rotateY,
        zIndex,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 32,
        mass: 0.5, // Lighter mass for faster response
      }}
      className={`absolute w-[160px] md:w-[220px] lg:w-[260px] aspect-[4/4.8] rounded-[24px] overflow-hidden bg-[#08060f] flex flex-col justify-center items-center ${
        isCenter ? 'cursor-default border-2 border-brand/40' : 'cursor-pointer border border-white/10'
      }`}
      style={{ 
        originX: 0.5, 
        originY: 0.5, 
        transformStyle: "preserve-3d", 
        ...GPU_ACCELERATION 
      }}
      onClick={() => !isCenter && setIndex(i)}
    >
      {/* High-performance Shadow Layer (Animates Opacity, not Box-Shadow) */}
      <motion.div 
        animate={{ opacity: isCenter ? 1 : 0 }}
        className="absolute inset-0 pointer-events-none rounded-[24px] shadow-[0_30px_60px_-12px_rgba(123,97,255,0.45)] z-[-1]"
      />

      <img
        src={slide.img}
        alt={slide.role}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 translate-z-0"
        loading="lazy"
        decoding="async"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#08060F] via-[#08060F]/40 to-[#08060F]/10 z-10 pointer-events-none" />

      {/* Decor */}
      <div className="absolute top-3 left-0 right-0 flex gap-1 px-4 z-20 opacity-30">
        {[...Array(isMobile ? 6 : 9)].map((_, idx) => <div key={idx} className="h-3 md:h-4 flex-1 bg-white/40 rounded-sm" />)}
      </div>
      <div className="absolute bottom-3 left-0 right-0 flex gap-1 px-4 z-20 opacity-30">
        {[...Array(isMobile ? 6 : 9)].map((_, idx) => <div key={idx} className="h-3 md:h-4 flex-1 bg-white/40 rounded-sm" />)}
      </div>

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center mt-auto pb-10 md:pb-12 text-center w-full px-4">
        <div className="px-3 py-1 bg-white/10 backdrop-blur-lg rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-[2px] text-white shadow-xl mb-3 border border-white/20">
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
    <section className="relative min-h-[100vh] w-full flex flex-col items-center pt-[100px] pb-8 md:pt-[120px] md:pb-10 px-4 overflow-hidden bg-gradient-to-br from-[#F4F6F9] via-[#FDF5F1] to-[#FFE8DB]">

      {/* Optimized background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={GPU_ACCELERATION}>
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand/5 blur-[120px] rounded-full translate-z-0" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-rose-500/5 blur-[120px] rounded-full translate-z-0" />
      </div>

      <div className="w-full flex flex-col items-center my-auto z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="text-center mb-4 md:mb-6 relative w-full max-w-2xl px-4"
          style={GPU_ACCELERATION}
        >
          <h2 className="text-[40px] md:text-[60px] font-bold text-[#0D0A1A] leading-[1.1] md:leading-[76px] tracking-tight font-['Outfit']">
            World-Class <br className="md:hidden" />
            <span 
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              Talent Formats
            </span>
          </h2>
          <p className="mt-4 md:mt-6 text-gray-500 max-w-lg mx-auto text-[15px] md:text-[18px]">
            Experience an elite showcase. Our platform instantly connects you with strictly vetted industry visionaries.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_PREMIUM }}
          className="relative w-full max-w-[1100px] h-[420px] md:h-[460px] lg:h-[520px] bg-white/0 backdrop-blur-2xl rounded-[40px] md:rounded-[60px] flex flex-col items-center justify-center p-4"
          style={GPU_ACCELERATION}
        >
          <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 w-[80px] h-[6px] bg-black/10 rounded-full" />

          {/* Stage */}
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
                setIndex={setIndex}
              />
            ))}
          </div>

          <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 w-[100px] md:w-[140px] h-[4px] md:h-[5px] bg-black/10 rounded-full" />
        </motion.div>
      </div>

    </section>
  );
}
