import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

// ── Brand gradient (same as your BRAND_GRADIENT) ──────────────────────────
const BRAND_GRADIENT = 'linear-gradient(148.93deg, #B400FF 0%, #830FB7 33.96%, #CB5564 56.61%, #FF8B00 81.2%)';

interface WelcomeScreenProps {
  appState: 'loading' | 'transitioning_in' | 'welcome' | 'transitioning_out' | 'loaded';
}

// ── Floating particle canvas ───────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#B400FF', '#830FB7', '#CB5564', '#FF8B00'];

    type Particle = {
      x: number; y: number; vy: number; vx: number;
      r: number; color: string; alpha: number; alphaSpeed: number;
      type: 'bubble' | 'ribbon';
      rotation: number; rs: number; // rotation and rotation speed
      w: number; h: number; // width and height for ribbons
    };

    const particles: Particle[] = Array.from({ length: 60 }, () => {
      const type = Math.random() > 0.4 ? 'bubble' : 'ribbon';
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        vy: -(1.2 + Math.random() * 2.2),
        vx: (Math.random() - 0.5) * 0.6,
        r: 1.5 + Math.random() * 2.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0,
        alphaSpeed: 0.01 + Math.random() * 0.02,
        type,
        rotation: Math.random() * Math.PI * 2,
        rs: (Math.random() - 0.5) * 0.1,
        w: 4 + Math.random() * 6,
        h: 2 + Math.random() * 3,
      };
    });

    // ── FALLING CELEBRATION STRIPS ──────────────────────────
    const strips: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: -Math.random() * 200, // Start above the screen
      vy: 1.5 + Math.random() * 2.5, // Positive vy = falling
      vx: (Math.random() - 0.5) * 1.5,
      r: 1.5 + Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0,
      alphaSpeed: 0.01 + Math.random() * 0.02,
      type: 'ribbon',
      rotation: Math.random() * Math.PI * 2,
      rs: (Math.random() - 0.5) * 0.2,
      w: 15 + Math.random() * 15,
      h: 3 + Math.random() * 2,
    }));

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & Draw Rising Particles
      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.rotation += p.rs;
        p.alpha = Math.min(p.alpha + p.alphaSpeed, 0.85);

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
          p.alpha = 0;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha * (p.y / canvas.height);
        ctx.fillStyle = p.color;

        if (p.type === 'bubble') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw a Star
          const spikes = 5;
          const outerRadius = p.w / 2.5;
          const innerRadius = outerRadius / 2;
          let rot = (Math.PI / 2) * 3 + p.rotation;
          let x = p.x;
          let y = p.y;
          let step = Math.PI / spikes;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y - outerRadius);
          for (let i = 0; i < spikes; i++) {
            x = p.x + Math.cos(rot) * outerRadius;
            y = p.y + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = p.x + Math.cos(rot) * innerRadius;
            y = p.y + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
          }
          ctx.lineTo(p.x, p.y - outerRadius);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      });

      // Update & Draw Falling Stars
      strips.forEach(s => {
        s.y += s.vy;
        s.x += s.vx;
        s.rotation += s.rs;
        s.alpha = Math.min(s.alpha + s.alphaSpeed, 0.9);

        if (s.y > canvas.height + 20) {
          s.y = -Math.random() * 100;
          s.x = Math.random() * canvas.width;
          s.alpha = 0;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;

        // Draw a Star
        const spikes = 5;
        const outerRadius = s.w / 2.5;
        const innerRadius = outerRadius / 2;
        let rot = (Math.PI / 2) * 3 + s.rotation;
        let x = s.x;
        let y = s.y;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y - outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = s.x + Math.cos(rot) * outerRadius;
          y = s.y + Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;

          x = s.x + Math.cos(rot) * innerRadius;
          y = s.y + Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(s.x, s.y - outerRadius);
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
      style={{ zIndex: 0 }}
    />
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function WelcomeScreen({ appState }: WelcomeScreenProps) {
  const isVisible =
    appState === 'transitioning_in' ||
    appState === 'welcome' ||
    appState === 'transitioning_out';

  if (!isVisible) return null;

  return (
    <motion.div
      key="overlay"
      initial={{
        y: '100vh',
        borderTopLeftRadius: '100%',
        borderTopRightRadius: '100%',
        borderBottomLeftRadius: '0%',
        borderBottomRightRadius: '0%',
      }}
      animate={{
        y: appState === 'transitioning_out' ? '-120vh' : '0vh',
        borderTopLeftRadius: appState === 'transitioning_in' ? '100%' : '0%',
        borderTopRightRadius: appState === 'transitioning_in' ? '100%' : '0%',
        borderBottomLeftRadius: appState === 'transitioning_out' ? '100%' : '0%',
        borderBottomRightRadius: appState === 'transitioning_out' ? '100%' : '0%',
      }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed z-[10000] flex items-center justify-center flex-col pointer-events-none overflow-hidden"
      style={{
        top: '-20vh',
        left: '-25vw',
        width: '150vw',
        height: '140vh',
        background: '#0D0A1A',
        boxShadow: '0 0 100px rgba(0,0,0,0.8)',
      }}
    >
      {/* Particles rising from bottom */}
      <ParticleCanvas />

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '60%',
          height: '220px',
          background:
            'radial-gradient(ellipse at bottom, rgba(180,0,255,0.22) 0%, rgba(203,85,100,0.1) 40%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Text container — perfectly centered and responsive */}
      <div
        className="flex flex-col items-center justify-center w-full max-w-[100vw] px-4 text-center"
        style={{ zIndex: 2, position: 'relative' }}
      >
        {/* Welcome to — grey muted */}
        <AnimatePresence>
          {appState === 'welcome' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="uppercase tracking-[6px] md:tracking-[10px] text-[10px] md:text-sm font-bold mb-3 md:mb-6"
              style={{ color: 'rgba(255,255,255,0.40)' }}
            >
              Welcome to
            </motion.div>
          )}
        </AnimatePresence>

        {/* TALENT P.A.W. — full brand gradient, rise from bottom */}
        <AnimatePresence>
          {appState === 'welcome' && (
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-wrap justify-center overflow-visible py-4 px-2 md:px-10">
                {'TALENT P.A.W.'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0, filter: 'blur(6px)' }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.04 + 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight"
                    style={{
                      backgroundImage: BRAND_GRADIENT,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      display: 'inline-block',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>

              {/* Tagline below the main title */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-white/30 text-[9px] md:text-xs font-bold tracking-[4px] md:tracking-[12px] uppercase mt-1 md:mt-4"
              >
                Platform for all work
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}