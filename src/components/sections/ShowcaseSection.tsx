import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import AntiGravityMesh from '../AntiGravityMesh';
import { BRAND_GRADIENT, EASE_PREMIUM, GPU_ACCELERATION } from '../../lib/brand';

// Import Assets
import imgGuitar from '../../assets/medium-shot-man-playing-guitar.webp';
import imgSingerRed from '../../assets/young-female-singer-red-dress.webp';
import imgFlute from '../../assets/man-playing-flute-concert.webp';
import imgMic from '../../assets/medium-shot-woman-holding-microphone.webp';
import imgComedian from '../../assets/medium-shot-stand-up-comedian.webp';
import imgSingerGold from '../../assets/cheerful-beautiful-young-woman-singer-holding-golden-vintage-microphone-lit-by-projector.webp';

const CATEGORIES = [
  'All', 'Singer', 'Musician', 'Comedian', 'Magician', 'Dancer', 'Actor', 'Model', 'Host'
];

const TALENT_CARDS = [
  { img: imgGuitar, alt: 'Guitarist' },
  { img: imgSingerRed, alt: 'Singer Red' },
  { img: imgFlute, alt: 'Flutist' },
  { img: imgMic, alt: 'Vocalist' },
  { img: imgComedian, alt: 'Comedian' },
  { img: imgSingerGold, alt: 'Singer Gold' },
];

export default function ShowcaseSection() {
  const [activeCat, setActiveCat] = useState('Singer');
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
      id="showcase"
      className="relative min-h-[100vh] w-full flex flex-col justify-center py-20 px-6 overflow-hidden bg-[#FAFAFB]"
    >
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" style={GPU_ACCELERATION}>
        <AntiGravityMesh />

        {/* Interactive Mouse Spotlight */}
        <motion.div
          style={{ ...GPU_ACCELERATION, transform: spotlightTransform }}
          className="absolute left-0 top-0 w-[800px] h-[800px] bg-brand/[0.04] blur-[120px] rounded-full pointer-events-none translate-z-0"
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

        {/* Floating Particles - CSS animation for better frame budget */}
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

      <div className="max-w-[1440px] w-full mx-auto text-center relative z-10 flex flex-col items-center justify-center h-full" style={GPU_ACCELERATION}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="block text-[#676767] text-[13px] font-bold uppercase tracking-[4px] mb-4"
        >
          TALENTPAW TALENT
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
          className="text-[40px] md:text-[60px] font-bold tracking-tight text-black mb-8 leading-[1.1] md:leading-[76px] font-['Outfit']"
        >
          The Global <br className="md:hidden" />
          <span 
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: BRAND_GRADIENT }}
          >
            Talent Showcase.
          </span>
        </motion.h2>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-[30px] mb-12 w-full">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-[8px] text-sm md:text-[16px] font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-500 lg:hover:-translate-y-1 lg:hover:shadow-[0_10px_20px_rgba(0,0,0,0.08)] active:scale-95 ${activeCat === cat
                  ? 'bg-brand text-white shadow-lg shadow-brand/20'
                  : 'bg-white border border-black/5 text-[#676767] hover:border-black/20 hover:bg-gray-50'
                }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-[30px] mb-20 w-full items-start">
          {TALENT_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_PREMIUM }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 30px 60px -15px rgba(0,0,0, 0.2)"
              }}
              className={`relative aspect-[227/476] w-full rounded-[23px] overflow-hidden group shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)] bg-white transition-[transform,box-shadow] duration-500 ${i % 2 !== 0 ? 'mt-0 md:mt-16' : ''
                }`}
              style={GPU_ACCELERATION}
            >
              <img
                src={card.img}
                alt={card.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out translate-z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand text-white font-bold text-lg rounded-full shadow-[0_10px_20px_rgba(104,57,149,0.2)] transition-[transform,box-shadow,background-color] duration-500 lg:hover:scale-[1.02] lg:hover:-translate-y-1 lg:hover:shadow-[0_20px_40px_-10px_rgba(104,57,149,0.4)]"
        >
          View All Showcase <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
}
