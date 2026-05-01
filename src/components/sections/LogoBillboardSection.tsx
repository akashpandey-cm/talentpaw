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

const ROTATION_INTERVAL = 8000; // 8 seconds
const SCAN_DURATION = 1.8; // Duration of the line traversal in seconds

export default function LogoBillboardSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  const [setIndex, setSetIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  // Synchronized rotation logic
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      // 1. Start the scanning line
      setIsScanning(true);

      // 2. Change the logos exactly when the line starts its sweep
      // The clip-path reveal is synchronized via the same duration and delay
      setSetIndex((prev) => (prev + 1) % LOGO_SETS.length);

      // 3. Stop the scanning state after the animation completes
      setTimeout(() => {
        setIsScanning(false);
      }, (SCAN_DURATION + 0.5) * 1000); // Scan duration + max stagger delay

    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isInView]);

  const currentLogos = LOGO_SETS[setIndex];

  return (
    <section className="py-24 px-6 bg-white font-outfit overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 bg-brand/[0.03] border border-brand/10 px-6 py-2 rounded-full backdrop-blur-md"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[4px] text-brand/80">Partner Ecosystem</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[34px] sm:text-[40px] md:text-[60px] font-bold text-black leading-[1.08] md:leading-[76px] tracking-tight font-['Outfit']"
          >
            Powering the Future of <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #7B61FF, #FF4D8D, #FF8A3D)' }}
            >Modern Teams</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base mt-6 max-w-lg mx-auto font-medium"
          >
            Join 500+ leading companies who trust TalentPaw to build, scale, and manage their creative and professional talent.
          </motion.p>
        </div>

        {/* The Grid Billboard */}
        <div className="max-w-5xl mx-auto border-[0.5px] border-gray-200 grid grid-cols-2 md:grid-cols-4 bg-white relative">

          {/* ROW 1 */}
          {currentLogos.slice(0, 4).map((logo, i) => (
            <LogoItem key={`r1-${i}`} logo={logo} index={i} isInView={isInView} isScanning={isScanning} position="top" />
          ))}

          {/* ROW 2 */}
          <LogoItem logo={currentLogos[4]} index={4} isInView={isInView} isScanning={isScanning} position="mid-left" />

          <div className="col-span-2 h-[100px] md:h-[130px] border-[0.5px] border-gray-200 flex flex-col items-center justify-center bg-white z-20">
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 tracking-tighter uppercase">
              Trusted <span className="font-black text-brand tracking-widest">Partners</span>
            </h2>
          </div>

          <LogoItem logo={currentLogos[5]} index={5} isInView={isInView} isScanning={isScanning} position="mid-right" />

          {/* ROW 3 */}
          {currentLogos.slice(6, 10).map((logo, i) => (
            <LogoItem key={`r3-${i}`} logo={logo} index={i + 6} isInView={isInView} isScanning={isScanning} position="bottom" />
          ))}

          {/* Backdrop Glows */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/[0.03] blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoItem({ logo, index, isInView, isScanning, position }: any) {
  const isFirstLoad = useRef(true);

  // Entrance offsets for first load
  const xOffset = position === 'top' || position === 'bottom'
    ? (index % 4 - 1.5) * 160
    : position === 'mid-left' ? -180 : 180;
  const yOffset = position.includes('mid') ? 0 : (position === 'top' ? -70 : 70);

  useEffect(() => {
    isFirstLoad.current = false;
  }, []);

  return (
    <div className="h-[100px] md:h-[130px] border-[0.5px] border-gray-200 flex items-center justify-center bg-white relative overflow-hidden group">
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">

        <AnimatePresence mode="popLayout">
          <motion.div
            key={logo}
            initial={isFirstLoad.current ? {
              opacity: 0,
              scale: 0.1,
              x: xOffset,
              y: yOffset,
              filter: 'blur(8px)'
            } : {
              clipPath: 'inset(0 100% 0 0)',
              opacity: 1,
            }}
            animate={isInView ? {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
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
              delay: isFirstLoad.current ? index * 0.04 : index * 0.08,
              ease: [0.65, 0, 0.35, 1]
            }}
            className="absolute inset-0 flex items-center justify-center p-2 bg-white z-20"
          >
            {/* The Wiper Line - Synchronized with clipPath */}
            {isScanning && (
              <motion.div
                initial={{ left: '0%', opacity: 1 }}
                animate={{ left: '100%', opacity: [1, 1, 0] }}
                transition={{
                  duration: SCAN_DURATION,
                  delay: index * 0.08,
                  ease: [0.65, 0, 0.35, 1]
                }}
                className="absolute top-0 bottom-0 w-[1.5px] bg-[#7B61FF] shadow-[0_0_10px_rgba(123,97,255,0.6)] z-30"
              />
            )}

            <img
              src={logo}
              alt="Partner Logo"
              className="max-h-[36px] md:max-h-[56px] max-w-[130px] md:max-w-[180px] object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}