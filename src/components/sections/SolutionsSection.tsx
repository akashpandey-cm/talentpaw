import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AntiGravityMesh from '../AntiGravityMesh';
import { BRAND_GRADIENT, EASE_PREMIUM, GPU_ACCELERATION } from '../../lib/brand';

/* ─── Types ──────────────────────────────────────────────────────────── */
type Stat = { val: string; label: string };
type Panel = {
  eyebrow: string;
  title: string;
  sub: string;
  cta: { primary: string; secondary: string };
  stats: Stat[];
  img: string;
  dark: boolean;
};

/* ─── Content ─────────────────────────────────────────────────────────  */
const PANELS: Panel[] = [
  {
    eyebrow: 'For Clients',
    title: 'Hire elite talent\nin 24 hours.',
    sub: 'Skip the noise. Get matched with vetted, top-1% professionals instantly — no agencies, no delays.',
    cta: { primary: 'Post a Project', secondary: 'Learn More' },
    stats: [
      { val: '24H',  label: 'Avg. Match Time'  },
      { val: '99%',  label: 'Client Satisfaction' },
      { val: '12K+', label: 'Projects Delivered' },
    ],
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80',
    dark: true,
  },
  {
    eyebrow: 'For Talent',
    title: 'Land high-value\ncontracts globally.',
    sub: 'Work with top-tier brands and access exclusive opportunities worldwide. All in one place.',
    cta: { primary: 'Browse Contracts', secondary: 'Apply Now' },
    stats: [
      { val: '8K+',    label: 'Open Projects'  },
      { val: 'Tier-1', label: 'Brands Only'    },
      { val: '$200M+', label: 'Total Paid Out'  },
    ],
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80',
    dark: false,
  },
];

/* ─── Button ─────────────────────────────────────────────────────────── */
function Btn({
  children,
  dark,
  outline = false,
  href = '#',
}: {
  children: React.ReactNode;
  dark: boolean;
  outline?: boolean;
  href?: string;
}) {
  const [hov, setHov] = useState(false);

  const baseSolid = dark
    ? 'bg-white text-black hover:bg-white/90'
    : 'text-white';
  const baseOutline = dark
    ? 'border border-white/20 text-white/70 hover:text-white hover:border-white/40'
    : 'border border-black/10 text-black/50 hover:text-black hover:border-black/20';

  return (
    <motion.a
      href={href}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: EASE_PREMIUM }}
      className={`relative h-[52px] px-8 rounded-full font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden transition-[background-color,border-color] duration-300 ${outline ? baseOutline : baseSolid}`}
      style={
        !outline && !dark
          ? {
              backgroundImage: BRAND_GRADIENT,
              boxShadow: hov ? '0 12px 32px -4px rgba(123,97,255,0.45)' : '0 4px 16px -4px rgba(123,97,255,0.3)',
              transition: 'box-shadow 0.3s ease',
              ...GPU_ACCELERATION
            }
          : undefined
      }
    >
      <span className="relative z-10">{children}</span>
      {!outline && <ArrowRight className="w-4 h-4 opacity-70 relative z-10" />}
    </motion.a>
  );
}

/* ─── Stat Item ──────────────────────────────────────────────────────── */
function StatItem({ stat }: { stat: Stat }) {
  return (
    <div className="flex flex-col gap-1 w-full sm:w-auto">
      <span
        className={`text-[24px] lg:text-[28px] font-black tracking-tight leading-none text-white`}
        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
      >
        {stat.val}
      </span>
      <span className={`text-[10px] font-bold uppercase tracking-[2.5px] text-white/60 mt-0.5`}>
        {stat.label}
      </span>
    </div>
  );
}

/* ─── ZigZagText ─────────────────────────────────────────────────────── */
function ZigZagText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: i % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.03,
            ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier for "pop" effect
          }}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Card ───────────────────────────────────────────────────────────── */
function Card({ panel, slideFrom }: { panel: Panel; slideFrom: 'left' | 'right' }) {
  const [hov, setHov] = useState(false);
  const { eyebrow, title, sub, cta, stats, img, dark } = panel;

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: slideFrom === 'left' ? -120 : 120,
        rotate: slideFrom === 'left' ? -5 : 5,
        scale: 0.9
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0,
        rotate: 0,
        scale: 1
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 1.2, 
        ease: EASE_PREMIUM,
        delay: slideFrom === 'right' ? 0.2 : 0 
      }}
      className="flex-1 min-w-0"
      style={GPU_ACCELERATION}
    >
      <motion.div
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        animate={{
          y: hov ? -8 : 0,
        }}
        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        className={`relative h-auto min-h-[480px] md:h-[480px] rounded-[32px] overflow-hidden flex flex-col justify-end group transition-[box-shadow] duration-700 bg-black ${hov ? 'lg:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]' : 'shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]'}`}
        style={GPU_ACCELERATION}
      >
        {/* Full-bleed Background Image */}
        <motion.img
          src={img}
          alt={title}
          loading="lazy"
          decoding="async"
          animate={{ 
            scale: hov ? 1.05 : 1.1,
            filter: hov ? 'brightness(1.05)' : 'brightness(0.95)'
          }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform translate-z-0"
        />

        {/* Dynamic Overlay */}
        <motion.div 
          className="absolute inset-0 bg-black/20 z-10 pointer-events-none"
          animate={{ opacity: hov ? 0 : 1 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        />

        {/* Gradient for content legibility */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20 pointer-events-none"
          animate={{ opacity: hov ? 0.6 : 1 }}
        />

        {/* Content Container */}
        <div className="relative z-30 p-8 flex flex-col mt-auto w-full">
          
          {/* Eyebrow Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex mb-3"
          >
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-[2px] backdrop-blur-md shadow-xl border`}
              style={{ 
                background: eyebrow.toLowerCase().includes('client') 
                  ? 'rgba(180, 0, 255, 0.15)' 
                  : 'rgba(255, 139, 0, 0.15)',
                borderColor: eyebrow.toLowerCase().includes('client')
                  ? 'rgba(180, 0, 255, 0.3)'
                  : 'rgba(255, 139, 0, 0.3)'
              }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ 
                  backgroundColor: eyebrow.toLowerCase().includes('client') 
                    ? '#B400FF' 
                    : '#FF8B00' 
                }}
              />
              {eyebrow}
            </span>
          </motion.div>

          {/* Title with ZigZag */}
          <h3 className="text-[28px] lg:text-[34px] font-bold tracking-tight leading-[1.05] text-white mb-2">
            <ZigZagText text={title} delay={0.5} />
          </h3>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-[14px] lg:text-[15px] leading-[1.4] text-white/70 max-w-sm mb-4"
          >
            {sub}
          </motion.p>

          {/* Stats Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-px w-full bg-white/10 mb-4 origin-left" 
          />

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 md:gap-6 mb-5"
          >
            {stats.map(s => (
              <StatItem key={s.label} stat={s} />
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Btn dark={false}>{cta.primary}</Btn>
            <Btn dark={true} outline>{cta.secondary}</Btn>
          </motion.div>
          
        </div>

        {/* Hover Radial Light effect */}
        <motion.div
          animate={{ opacity: hov ? 0.4 : 0 }}
          className="absolute -top-1/2 -right-1/2 w-full h-full pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle, ${dark ? '#7B61FF33' : '#FF8A3D33'} 0%, transparent 70%)`
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */
export default function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="pt-20 pb-[120px] px-6 relative overflow-hidden bg-[#FAFAFB]"
    >
      <AntiGravityMesh />
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      <div className="relative max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-12 max-w-4xl" style={GPU_ACCELERATION}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="inline-flex items-center gap-2.5 mb-6"
          >
            <div className="h-px w-8 bg-gradient-to-r from-[#7B61FF] to-[#FF4D8D] rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-[4px] text-[#6B7280]">
              TalentPAW Solutions
            </span>
          </motion.div>

          <motion.h2
            className="text-[40px] md:text-[60px] font-bold text-[#0D0A1A] tracking-tight leading-[1.1] md:leading-[76px]"
          >
            <ZigZagText text="Top companies hire faster" delay={0.1} />
            <br className="hidden md:block" />{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              <ZigZagText text="with TalentPAW." delay={0.6} />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_PREMIUM }}
            className="mt-6 text-xl text-[#6B7280] leading-relaxed max-w-xl"
          >
            Whether you need to hire or want to be hired — we built the perfect pathway for both sides.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          {PANELS.map((panel, i) => (
            <Card
              key={panel.title}
              panel={panel}
              slideFrom={i === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
