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

const LOGO_SETS = [
  [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10],
  [logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18, logo19, logo20]
];

const ROTATION_INTERVAL = 8000;
const SCAN_DURATION = 1.8;

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  const [setIndex, setSetIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

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

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden font-outfit" ref={containerRef}>
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none" />

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
        <div className="max-w-6xl mx-auto border border-white p-3 md:p-4 bg-black relative rounded-[20px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            {/* ROW 1 */}
            {currentLogos.slice(0, 4).map((logo, i) => (
              <LogoSlot key={`r1-${i}`} logo={logo} index={i} isInView={isInView} isScanning={isScanning} />
            ))}

            {/* ROW 2 Left */}
            <LogoSlot logo={currentLogos[4]} index={4} isInView={isInView} isScanning={isScanning} />

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
            <LogoSlot logo={currentLogos[5]} index={5} isInView={isInView} isScanning={isScanning} />

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

function LogoSlot({ logo, index, isInView, isScanning }: any) {
  return (
    <div className="premium-border-gradient-inner animate-border-reverse p-2 rounded-xl group transition-colors duration-500">
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

/*
ORIGINAL MANIFESTO SECTION CODE (COMMENTED OUT)
-----------------------------------------------
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { EASE_PREMIUM, GPU_ACCELERATION } from '../../lib/brand';

function SectionTitle({ subtitle, title, description, light = false }: {
  subtitle: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  const lines = title.split('<br/>');

  return (
    <div className="mb-12 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: EASE_PREMIUM }}
        style={GPU_ACCELERATION}
      >
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 ${light ? 'bg-white/10 border-white/20 text-white/80' : 'bg-brand/5 border-brand/10 text-brand'}`}>
          <span className="text-[10px] font-black uppercase tracking-[3px]">{subtitle}</span>
        </div>

        <h2 className={`text-[34px] sm:text-[44px] md:text-[68px] font-bold tracking-tight leading-[1.06] md:leading-[1.05] mb-6 md:mb-8 font-['Outfit'] ${light ? 'text-white' : 'text-black'}`}>
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden mb-1">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.15, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                dangerouslySetInnerHTML={{ __html: line }}
              />
            </div>
          ))}
        </h2>

        {description && (
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_PREMIUM }}
            className={`text-base md:text-lg max-w-2xl leading-relaxed ${light ? 'text-white/60' : 'text-gray-custom'}`}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default function ManifestoSection() {
  const stats = [
    { val: 'T-1', label: 'Tier Ranking' },
    { val: '24H', label: 'Match Time' },
    { val: '100%', label: 'Vetting' },
    { val: 'Secure', label: 'Pay' },
  ];

  return (
    <section className="py-20 md:py-40 px-4 md:px-6 relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_PREMIUM }}
            className="aspect-square bg-gradient-to-br from-brand/20 to-transparent rounded-[32px] md:rounded-[60px] p-1 border border-white/10"
            style={GPU_ACCELERATION}
          >
            <img
              src="https://images.unsplash.com/photo-1552664199-fd31f7431a55?w=1000&q=80"
              className="w-full h-full object-cover rounded-[31px] md:rounded-[59px] grayscale contrast-125 hover:grayscale-0 transition-[filter,transform] duration-700 ease-out"
              alt="studio"
              loading="lazy"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -bottom-10 -right-10 bg-white/5 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 hidden md:block"
            style={GPU_ACCELERATION}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white">
                <Star fill="white" />
              </div>
              <div>
                <h4 className="text-white font-bold">12K+ Professionals</h4>
                <p className="text-white/40 text-xs tracking-wider uppercase">Vetted &amp; Verified</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div>
          <SectionTitle
            light
            subtitle="The Concept"
            title="We Bridge<br/>Ambition with<br/><span class='text-gradient-premium'>Elite Ability.</span>"
            description="Traditional hiring is broken. We don't just provide a list of names; we deliver a curated selection of the absolute top 1% of talent, powered by precision AI and human expertise."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="border-l-2 border-brand/40 pl-5 pr-2 py-1"
                style={GPU_ACCELERATION}
              >
                <h4 className="text-white text-2xl sm:text-3xl md:text-4xl font-black mb-1 tracking-tighter">{stat.val}</h4>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[3px]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
*/
