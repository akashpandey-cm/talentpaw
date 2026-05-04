import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Set 1 - Original Logos
import logo1 from '../../assets/logos/Group 16936.png';
import logo2 from '../../assets/logos/LOGOIPSUM-03 1.png';
import logo3 from '../../assets/logos/dummy-logo-1b 1.png';
import logo4 from '../../assets/logos/dummy-logo-2b 1.png';
import logo5 from '../../assets/logos/dummy-logo-3b 1.png';
import logo6 from '../../assets/logos/dummy-logo-4b 1.png';
import logo7 from '../../assets/logos/dummy-logo-5b 1.png';
import logo8 from '../../assets/logos/logo2 1.png';
import logo9 from '../../assets/logos/logo4 1.png';
import logo10 from '../../assets/logos/modern-graphic-leaf-abstrack-with-water-drop-colorful-logo-good-for-technology-logo-fruits-logo-fresh-logo-nature-logo-company-logo-dummy-logo-bussiness-logo-vector 1.png';

// Set 2 - New Logos
import logo11 from '../../assets/logos/logoss/6075b82f35ff9de0f7fd126c84a14a0f 1.png';
import logo12 from '../../assets/logos/logoss/7d41c7f13d1d7184b227e6b38667e1ee 1.png';
import logo13 from '../../assets/logos/logoss/97b0f33906e7b6ca194b1ab3b2640c87 1.png';
import logo14 from '../../assets/logos/logoss/Google_2015_logo.svg 1.png';
import logo15 from '../../assets/logos/logoss/Lenskart-Logo 1.png';
import logo16 from '../../assets/logos/logoss/Netflix_2015_logo.svg 1.png';
import logo17 from '../../assets/logos/logoss/Tesla_logo 1.png';
import logo18 from '../../assets/logos/logoss/[CITYPNG.COM]HD Starbucks Circle Woman Logo PNG - 2000x2000 1.png';
import logo19 from '../../assets/logos/logoss/bb0815bf6bac97e7092219b6c69616e4 1.png';
import logo20 from '../../assets/logos/logoss/c04796c7fe755acf201496d8e402ffe4 1.png';

// Floating cursor logos
import floatLogo1 from '../../assets/Subtract.png';
import floatLogo2 from '../../assets/logos/logoss/[CITYPNG.COM]HD Starbucks Circle Woman Logo PNG - 2000x2000 1.png';
import floatLogo3 from '../../assets/logos/logoss/c04796c7fe755acf201496d8e402ffe4 1.png';
import floatLogo4 from '../../assets/logos/logoss/Tesla_logo 1.png';
import floatLogo5 from '../../assets/logos/logoss/Google_2015_logo.svg 1.png';

const FLOATING_LOGOS = [floatLogo1, floatLogo2, floatLogo3, floatLogo4, floatLogo5];

interface FloatingLogo {
  id: number;
  x: number;
  y: number;
  logo: string;
  rotation: number;
}

const LOGO_SETS = [
  [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10],
  [logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18, logo19, logo20]
];

const ROTATION_INTERVAL = 8000;
const SCAN_DURATION = 1.8;

export default function LogoBillboardSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const billboardRef = useRef<HTMLDivElement>(null);
  const spawnThrottleRef = useRef<number>(0);
  const logoIndexRef = useRef<number>(0);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  const [setIndex, setSetIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [floatingLogos, setFloatingLogos] = useState<FloatingLogo[]>([]);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setIsScanning(true);
      setSetIndex((prev) => (prev + 1) % LOGO_SETS.length);
      setTimeout(() => {
        setIsScanning(false);
      }, (SCAN_DURATION + 0.5) * 1000);
    }, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, [isInView]);

  const currentLogos = LOGO_SETS[setIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current || !billboardRef.current) return;

    const now = Date.now();
    if (now - spawnThrottleRef.current < 110) return;
    spawnThrottleRef.current = now;

    const sectionRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - sectionRect.left;
    const y = e.clientY - sectionRect.top;

    const bbRect = billboardRef.current.getBoundingClientRect();
    const bbLeft = bbRect.left - sectionRect.left;
    const bbTop = bbRect.top - sectionRect.top;
    if (
      x >= bbLeft && x <= bbLeft + bbRect.width &&
      y >= bbTop && y <= bbTop + bbRect.height
    ) return;

    const id = Date.now();
    const logo = FLOATING_LOGOS[logoIndexRef.current % FLOATING_LOGOS.length];
    logoIndexRef.current++;

    const newItem: FloatingLogo = {
      id,
      x: x + (Math.random() - 0.5) * 20,
      y,
      logo,
      rotation: (Math.random() - 0.5) * 40,
    };

    setFloatingLogos(prev => [...prev, newItem].slice(-6));

    setTimeout(() => {
      setFloatingLogos(prev => prev.filter(item => item.id !== id));
    }, 1300);
  };

  return (
    <section
      className="py-24 px-6 bg-black relative overflow-hidden font-outfit"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none" />

      {/* Floating cursor logo overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {floatingLogos.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -25 }}
              exit={{ opacity: 0, scale: 0.7, y: -45 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute bg-white rounded-xl shadow-lg flex items-center justify-center"
              style={{
                left: item.x - 35,
                top: item.y - 30,
                width: 70,
                height: 50,
                rotate: item.rotation,
              }}
            >
              <img src={item.logo} alt="" className="max-h-[34px] max-w-[60px] object-contain" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Ambient Decorations (Left/Right) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left Side Elements */}
        <FloatingOrb color="rgba(123, 97, 255, 0.15)" size="w-64 h-64" top="10%" left="-5%" delay={0} />
        <FloatingOrb color="rgba(255, 77, 141, 0.1)" size="w-48 h-48" top="40%" left="-2%" delay={2} />
        <FloatingOrb color="rgba(123, 97, 255, 0.08)" size="w-32 h-32" top="70%" left="2%" delay={4} />

        {/* Right Side Elements */}
        <FloatingOrb color="rgba(123, 97, 255, 0.15)" size="w-64 h-64" top="15%" right="-5%" delay={1} />
        <FloatingOrb color="rgba(255, 138, 61, 0.1)" size="w-48 h-48" top="50%" right="-2%" delay={3} />
        <FloatingOrb color="rgba(123, 97, 255, 0.08)" size="w-32 h-32" top="80%" right="2%" delay={5} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 bg-white/10 border border-white/20 px-6 py-2 rounded-full backdrop-blur-md"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[4px] text-white/80">Partner Ecosystem</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-[34px] sm:text-[40px] md:text-[60px] font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            Powering the Future of <br />
            <span className="text-gradient-premium">Modern Teams</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#94A3B8] text-sm md:text-base mt-2 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Join 500+ leading companies who trust TalentPaw to build, scale, and <br className="hidden md:block" />
            manage their creative and professional talent.
          </motion.p>
        </div>

        {/* The Grid Billboard - 4 Column Layout Restored */}
        <div ref={billboardRef} className="max-w-6xl mx-auto border border-white p-3 md:p-4 bg-black relative rounded-[20px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            {/* ROW 1 */}
            {currentLogos.slice(0, 4).map((logo, i) => (
              <LogoSlot key={`r1-${i}`} logo={logo} index={i} isInView={isInView} isScanning={isScanning} />
            ))}

            {/* ROW 2 Left */}
            <LogoSlot logo={currentLogos[4]} index={4} isInView={isInView} isScanning={isScanning} className="col-span-2 md:col-span-1" />

            {/* Center Box - Title Treatment */}
            <div className="col-span-2 h-[100px] md:h-[130px] flex flex-col items-center justify-center premium-border-gradient-inner animate-border-reverse rounded-xl z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-xl md:text-2xl font-black tracking-[0.35em] uppercase leading-tight">
                  <span className="text-white">Trusted</span>{" "}
                  <span className="text-brand">Partners</span>
                </h3>
              </motion.div>
            </div>

            {/* ROW 2 Right */}
            <LogoSlot logo={currentLogos[5]} index={5} isInView={isInView} isScanning={isScanning} className="col-span-2 md:col-span-1" />

            {/* ROW 3 */}
            {currentLogos.slice(6, 10).map((logo, i) => (
              <LogoSlot key={`r3-${i}`} logo={logo} index={i + 6} isInView={isInView} isScanning={isScanning} />
            ))}
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand/5 blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoSlot({ logo, index, isInView, isScanning, className = '' }: any) {
  return (
    <div className={`premium-border-gradient-inner animate-border-reverse p-2 rounded-xl group transition-colors duration-500 ${className}`}>
      <LogoItem logo={logo} index={index} isInView={isInView} isScanning={isScanning} />
    </div>
  );
}

function LogoItem({ logo, index, isInView, isScanning }: any) {
  const isFirstLoad = useRef(true);

  useEffect(() => {
    isFirstLoad.current = false;
  }, []);

  return (
    <div className="h-[100px] md:h-[120px] bg-white rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg">
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={logo}
            initial={isFirstLoad.current ? {
              opacity: 0,
              scale: 0.8,
              filter: 'blur(10px)'
            } : {
              clipPath: 'inset(0 100% 0 0)',
              opacity: 1,
            }}
            animate={isInView ? {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              clipPath: 'inset(0 0% 0 0)',
            } : {}}
            exit={{
              clipPath: 'inset(0 0 0 100%)',
              opacity: 1,
              transition: { duration: SCAN_DURATION, ease: [0.65, 0, 0.35, 1] }
            }}
            transition={{
              duration: SCAN_DURATION,
              delay: isFirstLoad.current ? index * 0.1 : index * 0.15,
              ease: [0.65, 0, 0.35, 1]
            }}
            className="absolute inset-0 flex items-center justify-center bg-white z-20"
          >
            {/* The Wiper Line */}
            {isScanning && (
              <motion.div
                initial={{ left: '0%', opacity: 1 }}
                animate={{ left: '100%', opacity: [1, 1, 0] }}
                transition={{
                  duration: SCAN_DURATION,
                  delay: index * 0.15,
                  ease: [0.65, 0, 0.35, 1]
                }}
                className="absolute top-0 bottom-0 w-[2px] bg-brand shadow-[0_0_15px_rgba(123,97,255,0.8)] z-30"
              />
            )}

            <img
              src={logo}
              alt="Partner Logo"
              className="max-h-[34px] md:max-h-[42px] max-w-[120px] md:max-w-[160px] object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FloatingOrb({ color, size, top, left, right, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
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
      className={`absolute rounded-2xl border-2 border-white/20 backdrop-blur-md pointer-events-none ${size}`}
      style={{
        boxShadow: `0 0 40px ${color}`,
        top: top,
        left: left,
        right: right,
        zIndex: 0
      }}
    >
      {/* Inner Stroke Glow - Increased Weight */}
      <div className="absolute inset-0 rounded-2xl border-2 border-brand/40 opacity-70" />
    </motion.div>
  );
}