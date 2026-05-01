import { useEffect, useState } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
  onStartTransition?: () => void;
}

// 3 rows of images — alternating scroll directions with stable premium seeds
const ROW1 = [
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1514525253344-f203875880f0?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=520&fit=crop&q=80',
];
const ROW2 = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=520&fit=crop&q=80',
];
const ROW3 = [
  'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=520&fit=crop&q=80',
];

const LABELS = ['Vocalists', 'DJs', 'Influencers', 'Actors', 'Fashion', 'Artistry'];
const LETTERS = 'TALENTPAW'.split('');

function useCountUp(to: number, duration: number, running: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!running) return;
    const ctrl = animate(0, to, {
      duration,
      ease: [0.32, 0, 0.67, 0], // Smooth power ease
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return ctrl.stop;
  }, [running, to, duration]);
  return val;
}

function ImageStrip({
  images,
  direction,
  speed = 45,
}: {
  images: string[];
  direction: 'left' | 'right';
  speed?: number;
}) {
  const doubled = [...images, ...images];
  const itemW = 200 + 20; 
  const totalW = images.length * itemW;

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <motion.div
        style={{
          display: 'flex',
          gap: 20,
          width: doubled.length * itemW,
        }}
        animate={{ x: direction === 'left' ? [-totalW, 0] : [0, -totalW] }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: 'linear',
        }}
      >
        {doubled.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              width: 200,
              height: 280,
              borderRadius: 24,
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#151221',
            }}
          >
            <img
              src={img}
              alt=""
              loading="lazy"
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                opacity: 0.8,
                filter: 'grayscale(0.2) contrast(1.1)',
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Loader({ onComplete, onStartTransition }: LoaderProps) {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');
  const [exiting, setExiting] = useState(false);
  const progress = useCountUp(100, 3.2, phase === 'loading');

  useEffect(() => {
    // When loading finishes at 3.2s, trigger transition immediately
    const t1 = setTimeout(() => { 
      setExiting(true); 
      if (onStartTransition) onStartTransition(); 
    }, 3200); 

    const t2 = setTimeout(() => { 
      setPhase('done'); 
      onComplete(); 
    }, 3400); // Complete after 200ms fade out

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete, onStartTransition]);

  if (phase === 'done') return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }} // 200ms fade out as requested
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#040308',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 20,
          opacity: phase === 'reveal' ? 0.3 : 0.6,
          transition: 'opacity 1.2s cubic-bezier(0.65, 0, 0.35, 1)',
          transform: 'scale(1.05)',
        }}
      >
        <ImageStrip images={ROW1} direction="left"  speed={40} />
        <ImageStrip images={ROW2} direction="right" speed={30} />
        <ImageStrip images={ROW3} direction="left"  speed={45} />
      </div>

      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(4,3,8,0.4) 40%, #040308 90%)',
          pointerEvents: 'none',
        }}
      />
      
      <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(4,3,8,0.2)',
          zIndex: 5,
          pointerEvents: 'none',
      }} />

      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            zIndex: 20,
            width: 80, height: 80, borderRadius: 28,
            background: 'linear-gradient(145deg, #683995, #4b296b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 32,
            boxShadow: '0 0 60px rgba(104,57,149,0.7), 0 10px 20px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.15)',
            position: 'relative',
          }}
        >
          <span style={{
            fontSize: 28, fontWeight: 900,
            fontFamily: 'Outfit, sans-serif', color: '#fff',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}>TP</span>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
               position: 'absolute', inset: -4, borderRadius: 32,
               border: '2px solid rgba(104,57,149,0.3)'
            }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(15px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', position: 'relative' }}
            >
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 28 }}>
                {LABELS.map((label, i) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    style={{
                      fontSize: 10, fontWeight: 800,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      fontFamily: 'Outfit, sans-serif',
                      color: 'rgba(255,255,255,0.4)',
                      padding: '6px 14px',
                      background: 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 99,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    }}
                  >
                    {label}
                  </motion.span>
                ))}
              </div>

              <div style={{
                fontSize: 120,
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: '-0.08em',
                fontFamily: 'Outfit, sans-serif',
                color: '#fff',
                marginBottom: 12,
                position: 'relative'
              }}>
                <span style={{ position: 'relative', zIndex: 2 }}>{progress}</span>
                <span style={{ fontSize: 40, color: 'rgba(255,255,255,0.2)', position: 'relative', top: -20, left: 5 }}>%</span>
              </div>

              <motion.div 
                 animate={{ opacity: [0.3, 0.6, 0.3] }}
                 transition={{ duration: 1.5, repeat: Infinity }}
                 style={{
                    fontSize: 12, fontWeight: 700,
                    letterSpacing: '0.6em',
                    textTransform: 'uppercase',
                    fontFamily: 'Outfit, sans-serif',
                    color: '#683995',
                    marginTop: 10
                 }}
              >
                Syncing Masters
              </motion.div>
            </motion.div>
          )}

          {phase === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, overflow: 'hidden' }}>
                {LETTERS.map((l, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 100, opacity: 0, rotateX: 90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: 88,
                      fontWeight: 900,
                      color: '#fff',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      display: 'inline-block',
                      textShadow: '0 0 30px rgba(104,57,149,0.4)',
                    }}
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1, ease: 'circOut' }}
                style={{
                   height: 2, width: 240, margin: '24px auto',
                   background: 'linear-gradient(90deg, transparent, #683995, transparent)',
                }}
              />
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0em' }}
                animate={{ opacity: 1, letterSpacing: '0.6em' }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 12, fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                Elite Talent Experience
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
        background: 'rgba(255,255,255,0.02)',
        zIndex: 100
      }}>
        <motion.div
          animate={{ width: `${progress}%` }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, transparent, #683995, #a78bfa, #683995)',
            backgroundSize: '200% 100%',
            boxShadow: '0 0 30px #683995',
          }}
          transition={{ ease: 'linear' }}
        />
        <motion.div 
           animate={{ x: ['-100%', '200%'] }}
           transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
           style={{
              position: 'absolute', top: 0, left: 0, width: '40%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
           }}
        />
      </div>

      <div style={{ position: 'absolute', inset: 0, zIndex: 40, pointerEvents: 'none' }}>
        {[
          { top: 40, left: 40 },
          { top: 40, right: 40, rotate: 90 },
          { bottom: 40, left: 40, rotate: -90 },
          { bottom: 40, right: 40, rotate: 180 },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            style={{
              position: 'absolute', width: 30, height: 30,
              borderLeft: '1px solid rgba(104,57,149,0.4)',
              borderTop: '1px solid rgba(104,57,149,0.4)',
              ...s
            }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
    </motion.div>
  );
}
