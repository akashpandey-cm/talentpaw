import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, memo } from 'react';

const BRAND_GRADIENT =
  'linear-gradient(148.93deg, #B400FF 0%, #830FB7 33.96%, #CB5564 56.61%, #FF8B00 81.2%)';

// ── Avatar config — defined OUTSIDE component to be referentially stable ──
const AVATAR_CONFIG = [
  { id: 'ava', x: '30%', y: '-45%', delay: 0.1, rotate: -8, dur: 7.5 },
  { id: 'charlotte', x: '70%', y: '-40%', delay: 0.3, rotate: 12, dur: 9 },
  { id: 'daniel', x: '8%', y: '35%', delay: 0.2, rotate: -10, dur: 8 },
  { id: 'container', x: '86%', y: '42%', delay: 0.6, rotate: 8, dur: 10 },
  { id: 'olivia', x: '25%', y: '140%', delay: 0.4, rotate: 14, dur: 8.5 },
  { id: 'sophia', x: '75%', y: '135%', delay: 0.5, rotate: 7, dur: 7 },
] as const;

// ── Stable float animation — no recalculation on re-render ────────────────
const makeFloatAnim = (rotate: number) => ({
  y: [0, -18, 0],
  rotate: [rotate, rotate + 3, rotate],
});

const makeFloatTransition = (dur: number, delay: number) => ({
  duration: dur,
  repeat: Infinity,
  ease: 'easeInOut' as const,
  delay,
});

// ── Types ─────────────────────────────────────────────────────────────────
interface WelcomeScreenProps {
  appState: 'loading' | 'transitioning_in' | 'welcome' | 'transitioning_out' | 'loaded';
}

// ── FloatingAvatar — memoized, no anonymous objects in render ─────────────
const FloatingAvatar = memo(function FloatingAvatar({
  src,
  x,
  y,
  delay,
  rotate,
  dur,
}: {
  src: string;
  x: string;
  y: string;
  delay: number;
  rotate: number;
  dur: number;
}) {
  const floatAnim = makeFloatAnim(rotate);
  const floatTrans = makeFloatTransition(dur, delay + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: -150, scale: 0.5, rotate: rotate - 10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate }}
      exit={{ opacity: 0, scale: 0.8, y: 100 }}
      transition={{
        opacity: { duration: 1.2, delay },
        y: { duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
      }}
      className="absolute pointer-events-none z-[1]"
      style={{ left: x, top: y, willChange: 'transform, opacity' }}
    >
      <motion.div
        animate={floatAnim}
        transition={floatTrans}
        className="w-12 h-12 md:w-20 md:h-20 rounded-[12px] md:rounded-[20px] overflow-hidden
                   border border-white/20 shadow-2xl bg-[#1A1625] relative"
        style={{ filter: 'contrast(1.05) brightness(1.05)', willChange: 'transform' }}
      >
        <img src={src} alt="Talent" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
      </motion.div>
    </motion.div>
  );
});

// ── Particle types ────────────────────────────────────────────────────────
type Particle = {
  x: number; y: number; vy: number; vx: number;
  r: number; color: string; alpha: number; alphaSpeed: number;
  isStar: boolean; rot: number; rs: number; w: number;
};

type Strip = {
  x: number; y: number; vy: number; vx: number;
  color: string; alpha: number; alphaSpeed: number;
  rot: number; rs: number; w: number;
};

const PARTICLE_COLORS = ['#B400FF', '#830FB7', '#CB5564', '#FF8B00'] as const;
const rnd = (min: number, max: number) => min + Math.random() * (max - min);
const pick = () => PARTICLE_COLORS[Math.random() * 4 | 0];

// All Math.random() calls happen HERE — never inside the animation loop
function makeParticle(W: number, H: number, fallen: boolean): Particle {
  return {
    x: rnd(0, W),
    y: fallen ? H + rnd(0, 20) : rnd(0, H),
    vy: -(1.2 + Math.random() * 2.2),
    vx: (Math.random() - 0.5) * 0.6,
    r: 1.5 + Math.random() * 2.5,
    color: pick(),
    alpha: fallen ? 0 : Math.random() * 0.85,
    alphaSpeed: 0.01 + Math.random() * 0.02,
    isStar: Math.random() > 0.4,
    rot: Math.random() * Math.PI * 2,
    rs: (Math.random() - 0.5) * 0.1,
    w: 4 + Math.random() * 6,
  };
}

function makeStrip(W: number, H: number, fresh: boolean): Strip {
  return {
    x: rnd(0, W),
    y: fresh ? -rnd(0, 500) : rnd(-500, H),
    vy: 1.5 + Math.random() * 2.5,
    vx: (Math.random() - 0.5) * 1.5,
    color: pick(),
    alpha: fresh ? 0 : Math.random() * 0.9,
    alphaSpeed: 0.01 + Math.random() * 0.02,
    rot: Math.random() * Math.PI * 2,
    rs: (Math.random() - 0.5) * 0.2,
    w: 15 + Math.random() * 15,
  };
}

// ── Extracted hot path — no closure allocation per frame ──────────────────
function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, outer: number, rot: number) {
  const inner = outer / 2;
  let r = Math.PI * 1.5 + rot;
  const step = Math.PI / 5;
  ctx.beginPath();
  ctx.moveTo(x, y - outer);
  for (let k = 0; k < 5; k++) {
    ctx.lineTo(x + Math.cos(r) * outer, y + Math.sin(r) * outer); r += step;
    ctx.lineTo(x + Math.cos(r) * inner, y + Math.sin(r) * inner); r += step;
  }
  ctx.closePath();
}

// ── ParticleCanvas — isolated, no props change after mount ───────────────
const ParticleCanvas = memo(function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1;
    let particles: Particle[] = [];
    let strips: Strip[] = [];
    let rafId = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }

    // ResizeObserver: more precise, avoids full-page resize event overhead
    const ro = new ResizeObserver(() => {
      resize();
      // Redistribute particles on resize so they don't clump
      particles.forEach(p => { if (p.x > W) p.x = rnd(0, W); });
      strips.forEach(s => { if (s.x > W) s.x = rnd(0, W); });
    });
    ro.observe(canvas);
    resize();

    particles = Array.from({ length: 60 }, () => makeParticle(W, H, false));
    strips = Array.from({ length: 80 }, () => makeStrip(W, H, false));

    const FADE_ZONE = 80; // px near edges for smoother alpha fade-in/out

    function tick() {
      ctx.clearRect(0, 0, W, H);

      // ── Rising particles ──────────────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.rs;
        p.alpha = Math.min(p.alpha + p.alphaSpeed, 0.85);

        if (p.y < -20) {
          particles[i] = makeParticle(W, H, true);
          continue;
        }

        // Smooth fade near top/bottom edges — no sudden pop-in/out
        const fade = Math.min(1, p.y / FADE_ZONE) * Math.min(1, (H - p.y) / FADE_ZONE);
        ctx.globalAlpha = p.alpha * fade;
        ctx.fillStyle = p.color;

        if (p.isStar) {
          drawStar(ctx, p.x, p.y, p.w / 2.5, p.rot);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Falling confetti strips ───────────────────────────────────────
      for (let i = 0; i < strips.length; i++) {
        const s = strips[i];
        s.y += s.vy;
        s.x += s.vx;
        s.rot += s.rs;
        s.alpha = Math.min(s.alpha + s.alphaSpeed, 0.9);

        if (s.y > H + 20) {
          strips[i] = makeStrip(W, H, true);
          continue;
        }

        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        drawStar(ctx, s.x, s.y, s.w / 2.5, s.rot);
        ctx.fill();
      }

      ctx.globalAlpha = 1; // always reset — prevents bleed into next frame
      rafId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []); // empty deps — canvas setup runs once, no stale closures

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
});

// ── Title chars — stable config, keyed by index not char ─────────────────
const TITLE_CHARS = 'TALENT P.A.W.'.split('');

const charStyle: React.CSSProperties = {
  backgroundImage: BRAND_GRADIENT,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
  padding: '0 0.02em',
};

// ── Main WelcomeScreen ────────────────────────────────────────────────────
export default function WelcomeScreen({ appState }: WelcomeScreenProps) {
  const isVisible = appState === 'transitioning_in'
    || appState === 'welcome'
    || appState === 'transitioning_out';

  if (!isVisible) return null;

  const isOut = appState === 'transitioning_out';
  const isIn = appState === 'transitioning_in';

  return (
    <motion.div
      key="welcome-overlay"
      initial={{
        y: '100vh',
        borderTopLeftRadius: '100%',
        borderTopRightRadius: '100%',
      }}
      animate={{
        y: isOut ? '-140vh' : '0vh',
        borderTopLeftRadius: isIn ? '100%' : '0%',
        borderTopRightRadius: isIn ? '100%' : '0%',
        borderBottomLeftRadius: isOut ? '100%' : '0%',
        borderBottomRightRadius: isOut ? '100%' : '0%',
      }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      aria-modal="true"
      role="dialog"
      aria-label="Welcome to Talent P.A.W."
      className="fixed z-[10000] flex items-center justify-center flex-col pointer-events-none overflow-hidden"
      style={{
        top: '-20vh',
        left: '-25vw',
        width: '150vw',
        height: '140vh',
        background: '#0D0A1A',
        boxShadow: '0 0 100px rgba(0,0,0,0.8)',
        contain: 'layout style paint', // GPU layer hint
      }}
    >
      {/* Canvas is always mounted so particles start before 'welcome' state */}
      <ParticleCanvas />

      {/* Bottom ambient glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '60%',
          height: '220px',
          background: 'radial-gradient(ellipse at bottom, rgba(180,0,255,.22) 0%, rgba(203,85,100,.1) 40%, transparent 70%)',
          zIndex: 1,
        }}
      />

      <div className="flex flex-col items-center justify-center w-full max-w-[100vw] px-4 text-center relative z-10">
        <AnimatePresence>
          {appState === 'welcome' && (
            <>
              {/* ── Avatars ── */}
              {AVATAR_CONFIG.map(({ id, ...props }) => (
                <FloatingAvatar key={id} src={getAvatarSrc(id)} {...props} />
              ))}

              {/* ── Eyebrow ── */}
              <motion.div
                key="eyebrow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
                className="uppercase tracking-[6px] md:tracking-[10px] text-[10px] md:text-sm font-bold mb-3 md:mb-6"
                style={{ color: 'rgba(255,255,255,.40)' }}
              >
                Welcome to
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Title + Tagline ── */}
        <AnimatePresence>
          {appState === 'welcome' && (
            <div key="title-block" className="flex flex-col items-center w-full">
              <div className="flex flex-wrap justify-center overflow-visible py-4 px-2 md:px-10">
                {TITLE_CHARS.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.04 + 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight"
                    style={charStyle}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>

              <motion.div
                key="tagline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.8, duration: 0.6 }}
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

// ── Avatar asset map — update imports as needed ───────────────────────────
import imgContainer from '../assets/logos/Container.png';
import imgAva from '../assets/logos/Image (Ava Wilson).png';
import imgCharlotte from '../assets/logos/Image (Charlotte White).png';
import imgDaniel from '../assets/logos/Image (Daniel Kim).png';
import imgOlivia from '../assets/logos/Image (Olivia Brown).png';
import imgSophia from '../assets/logos/Image (Sophia Martinez).png';

const AVATAR_SRC_MAP: Record<string, string> = {
  ava: imgAva,
  charlotte: imgCharlotte,
  daniel: imgDaniel,
  container: imgContainer,
  olivia: imgOlivia,
  sophia: imgSophia,
};

function getAvatarSrc(id: string): string {
  return AVATAR_SRC_MAP[id] ?? '';
}