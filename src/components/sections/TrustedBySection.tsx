import { motion } from 'framer-motion';

// Import logos (using available dummy logos)
import logo1 from '../../assets/logos/dummy-logo-1b 1.png';
import logo2 from '../../assets/logos/dummy-logo-2b 1.png';
import logo3 from '../../assets/logos/dummy-logo-3b 1.png';
import logo4 from '../../assets/logos/dummy-logo-4b 1.png';
import logo5 from '../../assets/logos/dummy-logo-5b 1.png';
import logo6 from '../../assets/logos/LOGOIPSUM-03 1.png';

const PARTNERS = [
  { img: logo1, top: '12%', left: '10%', size: 'w-28 md:w-36' },
  { img: logo2, top: '18%', left: '72%', size: 'w-32 md:w-40' },
  { img: logo3, top: '42%', left: '15%', size: 'w-24 md:w-32' },
  { img: logo4, top: '55%', left: '80%', size: 'w-36 md:w-44' },
  { img: logo5, top: '75%', left: '20%', size: 'w-28 md:w-36' },
  { img: logo6, top: '82%', left: '65%', size: 'w-32 md:w-40' },
];

export default function TrustedBySection() {
  const text = "Trusted Partners";
  const words = text.split(" ");

  return (
    <section className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
      
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-purple-500/5 to-transparent opacity-30 pointer-events-none" />

      {/* Center Sticky Text - One-time scatter on view */}
      <div className="relative z-10 text-center pointer-events-none select-none">
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white"
          initial="initial"
          whileInView="scattered"
          viewport={{ once: true, amount: 0.5 }}
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-4 md:mr-8 last:mr-0">
              {word.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    initial: { opacity: 1, x: 0, y: 0, scale: 1 },
                    scattered: { 
                      opacity: 0, 
                      x: (Math.random() - 0.5) * 400, 
                      y: (Math.random() - 0.5) * 300,
                      scale: 0.6,
                      transition: { 
                        duration: 1.2, 
                        ease: [0.23, 1, 0.32, 1],
                        delay: 0.5 // Start after a short pause
                      }
                    }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
      </div>

      {/* Truly Scattered Images Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTNERS.map((partner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 1, 
                ease: [0.23, 1, 0.32, 1],
                delay: 0.8 + (i * 0.15) 
              }
            }}
            viewport={{ once: true, amount: 0.3 }}
            className={`absolute ${partner.size} pointer-events-auto group`}
            style={{ 
              top: partner.top, 
              left: partner.left 
            }}
          >
            {/* Floating Animation Wrapper */}
            <motion.div
              animate={{ y: [0, Math.random() * 20 - 10, 0] }}
              transition={{ 
                duration: 6 + Math.random() * 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative"
            >
              <motion.img
                src={partner.img}
                alt="Partner"
                className="w-full h-auto rounded-2xl shadow-2xl filter grayscale-[80%] brightness-[0.85] transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 cursor-pointer"
                style={{ zIndex: i + 10 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
