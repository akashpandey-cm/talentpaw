import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AntiGravityMesh from '../AntiGravityMesh';

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

/* ─── Helpers ────────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
      transition={{ duration: 0.25, ease: EASE }}
      className={`relative h-11 px-6 rounded-full font-semibold text-sm flex items-center gap-2 overflow-hidden transition-colors duration-300 ${outline ? baseOutline : baseSolid}`}
      style={
        !outline && !dark
          ? {
              background: 'linear-gradient(135deg, #7B61FF, #FF4D8D, #FF8A3D)',
              boxShadow: hov ? '0 12px 32px -4px rgba(123,97,255,0.45)' : '0 4px 16px -4px rgba(123,97,255,0.3)',
              transition: 'box-shadow 0.3s ease',
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

/* ─── Card ───────────────────────────────────────────────────────────── */
function Card({ panel, slideFrom }: { panel: Panel; slideFrom: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hov, setHov] = useState(false);
  const { eyebrow, title, sub, cta, stats, img, dark } = panel;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: slideFrom === 'left' ? 0.3 : 0.4, ease: EASE }}
      className="flex-1 min-w-0"
    >
      <motion.div
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        animate={{
          y: hov ? -8 : 0,
        }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`relative h-auto min-h-[480px] md:h-[480px] rounded-[32px] overflow-hidden flex flex-col justify-end group transition-shadow duration-700 bg-black ${hov ? 'lg:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]' : 'shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]'}`}
      >
        {/* Full-bleed Background Image */}
        <motion.img
          src={img}
          alt={title}
          loading="lazy"
          decoding="async"
          animate={{ 
            scale: hov ? 1.05 : 1.1,
            filter: hov ? 'brightness(1)' : 'brightness(0.7)'
          }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
        />

        {/* Dynamic Overlay - Reveals full image on hover */}
        <motion.div 
          className="absolute inset-0 bg-black/40 z-10 pointer-events-none"
          animate={{ opacity: hov ? 0 : 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        />

        {/* Gradient for content legibility - always visible but subtler on hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-20 pointer-events-none"
          animate={{ opacity: hov ? 0.7 : 1 }}
        />

        {/* Content Container - Tightened Margins/Gaps */}
        <div className="relative z-30 p-8 flex flex-col mt-auto w-full">
          
          {/* Eyebrow Badge */}
          <div className="flex mb-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[10px] font-semibold uppercase tracking-[2px] backdrop-blur-md border border-white/20 shadow-xl"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
              {eyebrow}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[28px] lg:text-[34px] font-bold tracking-tight leading-[1.05] text-white mb-2">
            {title}
          </h3>

          {/* Subtext */}
          <p className="text-[14px] lg:text-[15px] leading-[1.4] text-white/70 max-w-sm mb-4">
            {sub}
          </p>

          {/* Stats Divider */}
          <div className="h-px w-full bg-white/10 mb-4" />

          {/* Stats Row */}
          <div className="flex flex-wrap gap-4 md:gap-6 mb-5">
            {stats.map(s => (
              <StatItem key={s.label} stat={s} />
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Btn dark={false}>{cta.primary}</Btn>
            <Btn dark={true} outline>{cta.secondary}</Btn>
          </div>
          
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
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section
      id="solutions"
      className="pt-20 pb-[120px] px-6 relative overflow-hidden"
      style={{ background: '#FAFAFB' }}
    >
      <AntiGravityMesh />
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      <div className="relative max-w-[1280px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2.5 mb-6"
          >
            <div className="h-px w-8 bg-gradient-to-r from-[#7B61FF] to-[#FF4D8D] rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-[4px] text-[#6B7280]">
              TalentPAW Solutions
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-[40px] md:text-[60px] font-bold text-[#0D0A1A] tracking-tight leading-[1.1] md:leading-[76px]"
          >
            Top companies hire faster<br className="hidden md:block" />{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #7B61FF, #FF4D8D, #FF8A3D)' }}
            >
              with TalentPAW.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
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
