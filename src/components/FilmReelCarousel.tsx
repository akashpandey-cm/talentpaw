import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 1,  label: 'Support Lead', sub: 'Executive Assistance', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80' },
  { id: 2,  label: 'Architect',    sub: 'Cloud & Infrastructure', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  { id: 3,  label: 'Director',     sub: 'Cinematic Strategy',    img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80' },
  { id: 4,  label: 'Engineer',     sub: 'Full-Stack Excellence', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80' },
  { id: 5,  label: 'Designer',     sub: 'Interface & Brand',    img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80' },
  { id: 6,  label: 'Producer',     sub: 'Multimedia Visionary',  img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80' },
  { id: 7,  label: 'Consultant',   sub: 'Market Intelligence',  img: 'https://images.unsplash.com/photo-1522071823991-b5ae7264714e?w=800&q=80' },
  { id: 8,  label: 'Manager',      sub: 'Client Success',       img: 'https://images.unsplash.com/photo-1552664199-fd31f7431a55?w=800&q=80' },
];

const N = CATEGORIES.length;
const ANGLE_STEP = 360 / N;
const HOLE_COUNT = 9;

// ── Film Sprocket Strip ──────────────────────────────────────────────
function SprocketRow() {
  return (
    <div className="bg-[#111018] h-[24px] sm:h-[36px] flex items-center justify-evenly px-2">
      {Array.from({ length: HOLE_COUNT }).map((_, i) => (
        <div
          key={i}
          className="w-4 h-2.5 sm:w-6 sm:h-4 rounded-[2px] sm:rounded-sm bg-[#1e1a2e] border border-white/5"
        />
      ))}
    </div>
  );
}

// ── Single Film Frame ─────────────────────────────────────────────────
function FilmFrame({
  cat,
  angle,
  activeAngle,
  isActive,
  onClick,
  dimensions
}: {
  cat: typeof CATEGORIES[0];
  angle: number;
  activeAngle: number;
  isActive: boolean;
  onClick: () => void;
  dimensions: { w: number, h: number, r: number }
}) {
  // Normalize angles to find shortest distance
  const diff = ((angle - activeAngle + 180) % 360 + 360) % 360 - 180;
  const distFromFront = Math.abs(diff);
  
  // Show more frames to create the "ring" feel from the sketch
  const visible = distFromFront < 140; 

  if (!visible) return null;

  const opacity = 1 - distFromFront / 150;
  const zIndex = Math.round(100 - distFromFront);
  
  // Elliptical adjustment: compress wide, expand deep
  const x = Math.sin((angle * Math.PI) / 180) * dimensions.r * 1.2;
  const z = Math.cos((angle * Math.PI) / 180) * dimensions.r;
  const y = Math.abs(Math.sin((angle * Math.PI) / 180)) * 20; // Slight curve up/down

  const dimFilter = isActive
    ? 'brightness(1.1) contrast(1.1)'
    : `brightness(${0.5 + (1 - distFromFront / 140) * 0.5})`;

  return (
    <motion.div
      onClick={onClick}
      className="absolute left-1/2 top-1/2"
      initial={false}
      animate={{
        x: x - dimensions.w / 2,
        y: y - (dimensions.h / 2 + (dimensions.w > 300 ? 36 : 24)),
        z: z,
        rotateY: angle,
        opacity,
        scale: 1 - distFromFront / 400,
      }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: dimensions.w,
        zIndex,
        cursor: isActive ? 'default' : 'pointer',
        transformStyle: 'preserve-3d',
      }}
    >
      <SprocketRow />
      <div className="w-full relative overflow-hidden bg-[#0d0b18] shadow-2xl rounded-sm" style={{ height: dimensions.h }}>
        <img
          src={cat.img}
          alt={cat.label}
          draggable={false}
          className="w-full h-full object-cover transition-all duration-[1500ms] select-none"
          style={{ filter: dimFilter }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/40 backdrop-blur-[2.5px]"
          >
            <div className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <p className="text-white/80 text-[8px] font-black uppercase tracking-[3px]">Tier-1 Professional</p>
            </div>
            <motion.h4 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-white text-3xl sm:text-4xl font-black tracking-tighter leading-none mb-2 drop-shadow-2xl"
            >
              {cat.label}
            </motion.h4>
            <p className="text-white/60 text-xs font-bold uppercase tracking-[2px]">{cat.sub}</p>
          </motion.div>
        )}
        {isActive && <div className="absolute inset-0 ring-2 ring-inset ring-purple-500/40" />}
      </div>
      <SprocketRow />
    </motion.div>
  );
}

export default function FilmReelCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 420, h: 280, r: 600 });
  const autoRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      const width = containerRef.current?.offsetWidth || window.innerWidth;
      if (width < 640) {
        setDimensions({ w: 260, h: 180, r: 350 });
      } else if (width < 1024) {
        setDimensions({ w: 340, h: 220, r: 480 });
      } else {
        setDimensions({ w: 420, h: 280, r: 600 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paused) {
      autoRef.current = setInterval(() => {
        setActive((p) => (p + 1) % N);
      }, 4000);
    }
    return () => clearInterval(autoRef.current);
  }, [paused]);

  const goTo = (dir: 1 | -1) => setActive((p) => (p + dir + N) % N);
  const groupRotation = -active * ANGLE_STEP;

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-visible"
        style={{ height: dimensions.h + (dimensions.w > 300 ? 150 : 100), perspective: '3000px' }}
      >
        <motion.div
            className="absolute left-1/2 top-1/2"
            style={{ 
              transformStyle: 'preserve-3d',
              rotateX: 12, // Tilt as seen in sketch
            }}
            animate={{ rotateY: groupRotation }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {CATEGORIES.map((cat, i) => (
            <FilmFrame
              key={cat.id}
              cat={cat}
              angle={i * ANGLE_STEP}
              activeAngle={active * ANGLE_STEP}
              isActive={i === active}
              onClick={() => setActive(i)}
              dimensions={dimensions}
            />
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button onClick={() => goTo(-1)} className="w-12 h-12 rounded-full border border-black/5 bg-white shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="flex gap-2.5">
          {CATEGORIES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-brand' : 'w-1.5 bg-black/10'}`}
            />
          ))}
        </div>
        <button onClick={() => goTo(1)} className="w-12 h-12 rounded-full border border-black/5 bg-white shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}
