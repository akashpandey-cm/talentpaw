import { useState, useRef, useEffect, useCallback, lazy, Suspense, memo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BRAND_GRADIENT, GPU_ACCELERATION } from '../../lib/brand';

// Lazy load heavy 3D component
const AntiGravityMesh = lazy(() => import('../AntiGravityMesh'));

// Singer Assets
import imgSinger1 from '../../assets/singer/cwbmcgk7veiirfjggmyj.webp';
import imgSinger2 from '../../assets/singer/erzi5zlyoifw3jfwmsna.webp';
import imgSinger3 from '../../assets/singer/gvlu6womhuiru8t6tckf.webp';
import imgSinger4 from '../../assets/singer/hlbtz75bph4eo0obbkhl.webp';
import imgSinger5 from '../../assets/singer/mckuw77seo1r35a8dwis.webp';
import imgSinger6 from '../../assets/singer/prjhrpzkuqvdygxsrlti.webp';

// DJ Assets
import imgDJ1 from '../../assets/b2tqjrwujusfhvlbo1fg.webp';
import imgDJ2 from '../../assets/hhyo2tcnsbwjfj7v9lyn.webp';
import imgDJ3 from '../../assets/lcs0vfehbdrtso2l3fco.webp';
import imgDJ4 from '../../assets/rlmlbquu3nboqe0hqplt.webp';
import imgDJ5 from '../../assets/vbfhorhdgk1yp2s8js9w.webp';
import imgDJ6 from '../../assets/vqddcuprewtlogi8yawx.webp';

// Model Assets
import imgModel1 from '../../assets/model/cohhoxdb9dbo80wry2bk.webp';
import imgModel2 from '../../assets/model/dmab2haxtpa2luxobod5.webp';
import imgModel3 from '../../assets/model/dpehjsj73hh4ukc8ewdz.webp';
import imgModel4 from '../../assets/model/lbahhnnb6yrywfjhnkdy.webp';
import imgModel5 from '../../assets/model/mc1lod5howquufwxg1vp.webp';
import imgModel6 from '../../assets/model/n3oawijkse4ttrwkbcxo.webp';

// Photographer Assets
import imgPhoto1 from '../../assets/photographer/hzoqxvagfvn5wvhctdg8.webp';
import imgPhoto2 from '../../assets/photographer/iejz4ebg5g8dheavhicd.webp';
import imgPhoto3 from '../../assets/photographer/kd01pmlsue6pnj54a9bs.webp';
import imgPhoto4 from '../../assets/photographer/o01icro3sbkbya52oihg.webp';
import imgPhoto5 from '../../assets/photographer/pxa4fmob1dnmlh4z2mx6.webp';
import imgPhoto6 from '../../assets/photographer/yffjb5idppwsid3yepnk.webp';

// Voice Actor Assets
import imgVoice1 from '../../assets/voiceactor/c4hhlnqpxr4djcijeqbv.webp';
import imgVoice2 from '../../assets/voiceactor/egdllcst3tfwwihzazlr.webp';
import imgVoice3 from '../../assets/voiceactor/ezfvyxumovnmr687nvsk.webp';
import imgVoice4 from '../../assets/voiceactor/gv1kwnz3r3oocfo2jqan.webp';
import imgVoice5 from '../../assets/voiceactor/rprww33zcqrxjtsulkek.webp';
import imgVoice6 from '../../assets/voiceactor/s7vyie63svffs9pecqln.webp';

// Musician Assets
import imgMusic1 from '../../assets/voiceactor/musician/ab1jdl3dmvb5rie6i2go.webp';
import imgMusic2 from '../../assets/voiceactor/musician/dvcjhsklpzzqtnabayft.webp';
import imgMusic3 from '../../assets/voiceactor/musician/iabeypkbtkojmtbacasn.webp';
import imgMusic4 from '../../assets/voiceactor/musician/jehmx0xemu2rjt7dy8ds.webp';
import imgMusic5 from '../../assets/voiceactor/musician/mz4phyiq3fbl2prcegwy.webp';
import imgMusic6 from '../../assets/voiceactor/musician/tjau6haott6h3pajgkvl.webp';

// Comedian Assets
import imgCom1 from '../../assets/voiceactor/musician/comedian/d9cucyg4ga0dq1eczfdt.webp';
import imgCom2 from '../../assets/voiceactor/musician/comedian/djz2zhqlgagvpa8ipeoz.webp';
import imgCom3 from '../../assets/voiceactor/musician/comedian/quybfsxhz5mlshiczeey.webp';
import imgCom4 from '../../assets/voiceactor/musician/comedian/srljjjwhd90b0alophoz.webp';
import imgCom5 from '../../assets/voiceactor/musician/comedian/uyg7n02kpdmfpy94ig0n.webp';
import imgCom6 from '../../assets/voiceactor/musician/comedian/xh3lkm23o0w8bpis3pfx.webp';

// Copywriter Assets
import imgCopy1 from '../../assets/content writer/is5oxc316p34lsr3upyp.webp';
import imgCopy2 from '../../assets/content writer/m7qcfelzb9ktclmi3rah.webp';
import imgCopy3 from '../../assets/content writer/qwx81lzcnruduxg6nbkm.webp';
import imgCopy4 from '../../assets/content writer/vajlpnnnqtru0juv8ngl.webp';
import imgCopy5 from '../../assets/content writer/wgx5418sexzqgcmlbdsz.webp';
import imgCopy6 from '../../assets/content writer/x9aon2q2jbuyfxerww7d.webp';

const TALENT_CARDS = [
  // Singer Cards - All New Specific Assets
  { img: imgSinger1, alt: 'Singer Performance 1', category: 'Singer' },
  { img: imgSinger2, alt: 'Singer Performance 2', category: 'Singer' },
  { img: imgSinger3, alt: 'Singer Performance 3', category: 'Singer' },
  { img: imgSinger4, alt: 'Singer Performance 4', category: 'Singer' },
  { img: imgSinger5, alt: 'Singer Performance 5', category: 'Singer' },
  { img: imgSinger6, alt: 'Singer Performance 6', category: 'Singer' },

  // DJ Cards
  { img: imgDJ1, alt: 'DJ Performance 1', category: 'DJ' },
  { img: imgDJ2, alt: 'DJ Performance 2', category: 'DJ' },
  { img: imgDJ3, alt: 'DJ Performance 3', category: 'DJ' },
  { img: imgDJ4, alt: 'DJ Performance 4', category: 'DJ' },
  { img: imgDJ5, alt: 'DJ Performance 5', category: 'DJ' },
  { img: imgDJ6, alt: 'DJ Performance 6', category: 'DJ' },

  // Model Cards
  { img: imgModel1, alt: 'Model Performance 1', category: 'Model' },
  { img: imgModel2, alt: 'Model Performance 2', category: 'Model' },
  { img: imgModel3, alt: 'Model Performance 3', category: 'Model' },
  { img: imgModel4, alt: 'Model Performance 4', category: 'Model' },
  { img: imgModel5, alt: 'Model Performance 5', category: 'Model' },
  { img: imgModel6, alt: 'Model Performance 6', category: 'Model' },

  // Photographer Cards
  { img: imgPhoto1, alt: 'Photographer Performance 1', category: 'Photographer' },
  { img: imgPhoto2, alt: 'Photographer Performance 2', category: 'Photographer' },
  { img: imgPhoto3, alt: 'Photographer Performance 3', category: 'Photographer' },
  { img: imgPhoto4, alt: 'Photographer Performance 4', category: 'Photographer' },
  { img: imgPhoto5, alt: 'Photographer Performance 5', category: 'Photographer' },
  { img: imgPhoto6, alt: 'Photographer Performance 6', category: 'Photographer' },

  // Voice Actor Cards
  { img: imgVoice1, alt: 'Voice Actor Performance 1', category: 'Voice Actor' },
  { img: imgVoice2, alt: 'Voice Actor Performance 2', category: 'Voice Actor' },
  { img: imgVoice3, alt: 'Voice Actor Performance 3', category: 'Voice Actor' },
  { img: imgVoice4, alt: 'Voice Actor Performance 4', category: 'Voice Actor' },
  { img: imgVoice5, alt: 'Voice Actor Performance 5', category: 'Voice Actor' },
  { img: imgVoice6, alt: 'Voice Actor Performance 6', category: 'Voice Actor' },

  // Musician Cards
  { img: imgMusic1, alt: 'Musician Performance 1', category: 'Musician' },
  { img: imgMusic2, alt: 'Musician Performance 2', category: 'Musician' },
  { img: imgMusic3, alt: 'Musician Performance 3', category: 'Musician' },
  { img: imgMusic4, alt: 'Musician Performance 4', category: 'Musician' },
  { img: imgMusic5, alt: 'Musician Performance 5', category: 'Musician' },
  { img: imgMusic6, alt: 'Musician Performance 6', category: 'Musician' },

  // Comedian Cards
  { img: imgCom1, alt: 'Comedian Performance 1', category: 'Comedian' },
  { img: imgCom2, alt: 'Comedian Performance 2', category: 'Comedian' },
  { img: imgCom3, alt: 'Comedian Performance 3', category: 'Comedian' },
  { img: imgCom4, alt: 'Comedian Performance 4', category: 'Comedian' },
  { img: imgCom5, alt: 'Comedian Performance 5', category: 'Comedian' },
  { img: imgCom6, alt: 'Comedian Performance 6', category: 'Comedian' },

  // Copywriter Cards
  { img: imgCopy1, alt: 'Copywriter Performance 1', category: 'Copywriter' },
  { img: imgCopy2, alt: 'Copywriter Performance 2', category: 'Copywriter' },
  { img: imgCopy3, alt: 'Copywriter Performance 3', category: 'Copywriter' },
  { img: imgCopy4, alt: 'Copywriter Performance 4', category: 'Copywriter' },
  { img: imgCopy5, alt: 'Copywriter Performance 5', category: 'Copywriter' },
  { img: imgCopy6, alt: 'Copywriter Performance 6', category: 'Copywriter' },
];

const CATEGORIES = [
  'Singer', 'DJ', 'Model', 'Photographer', 'Voice Actor', 'Musician', 'Comedian', 'Copywriter'
];

// Smooth Lazy Image Component
const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      {!loaded && (
        <div className="absolute inset-0 bg-black/[0.03] animate-pulse" />
      )}
    </div>
  );
};

/* ─── ZigZagText ─────────────────────────────────────────────────────── */
function ZigZagText({ text, delay = 0, className = "", style = {} }: { text: string; delay?: number; className?: string, style?: React.CSSProperties }) {
  return (
    <span className={`inline-block ${className}`} style={style}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: i % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.03,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// Memoized Talent Card (Prevents unnecessary re-renders)
const TalentCard = memo(({ card, index, activeCat }: { card: typeof TALENT_CARDS[0]; index: number; activeCat: string }) => {
  const isLeftSide = index < 3;

  return (
    <motion.div
      key={`${activeCat}-${index}`}
      initial={{
        opacity: 0,
        x: isLeftSide ? -150 : 150,
        rotateY: isLeftSide ? -35 : 35,
        scale: 0.85,
        z: -100
      }}
      animate={{
        opacity: 1,
        x: 0,
        rotateY: 0,
        scale: 1,
        z: 0
      }}
      exit={{
        opacity: 0,
        x: isLeftSide ? -100 : 100,
        scale: 0.9,
        transition: { duration: 0.3 }
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        mass: 1,
        delay: (isLeftSide ? index : (5 - index)) * 0.08
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
        rotateY: isLeftSide ? 5 : -5,
        boxShadow: "0 40px 80px -20px rgba(0,0,0,0.3)",
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      className={`relative aspect-[3/4] md:aspect-[227/476] w-full rounded-[18px] md:rounded-[23px] overflow-hidden group shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)] bg-white ${index % 2 !== 0 ? 'mt-0 md:mt-12' : ''}`}
      style={{
        ...GPU_ACCELERATION,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <LazyImage src={card.img} alt={card.alt} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

      {/* Premium Content Reveal */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 z-20">
        <p className="text-white font-black text-xl md:text-2xl tracking-tighter leading-none mb-1">
          {card.category}
        </p>
        <p className="text-white/60 text-[10px] font-bold uppercase tracking-[2px]">
          Verified Talent
        </p>
      </div>
    </motion.div>
  );
});

export default function ShowcaseSection() {
  const [activeCat, setActiveCat] = useState('Singer');
  const sectionRef = useRef<HTMLElement>(null);

  // Filter cards based on active category
  const filteredCards = TALENT_CARDS.filter(card => card.category === activeCat);

  // Optimized Mouse Tracking with Throttling
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });
  const spotlightTransform = useMotionTemplate`translate(${smoothX}px, ${smoothY}px)`;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 300);
    mouseY.set(e.clientY - rect.top - 300);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let rafId: number;
    let lastTime = 0;

    const throttledMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < 32) return; // ~30fps
      lastTime = now;
      rafId = requestAnimationFrame(() => handleMouseMove(e));
    };

    window.addEventListener('mousemove', throttledMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [handleMouseMove]);

  // Parallax (Lightweight)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative min-h-[100svh] w-full flex flex-col justify-start pt-8 md:pt-10 pb-16 md:pb-10 px-4 md:px-6 overflow-visible md:overflow-hidden bg-[#FAFAFB]"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" style={GPU_ACCELERATION}>

        {/* Lazy Loaded Heavy 3D Component */}
        <Suspense fallback={null}>
          <AntiGravityMesh />
        </Suspense>

        {/* Spotlight */}
        <motion.div
          style={{ ...GPU_ACCELERATION, transform: spotlightTransform }}
          className="absolute left-0 top-0 w-[800px] h-[800px] bg-brand/[0.035] blur-[120px] rounded-full pointer-events-none"
        />

        {/* Parallax Grid */}
        <motion.div
          style={{ ...GPU_ACCELERATION, y: gridY }}
          className="absolute inset-0 grid-bg-light opacity-[0.25]"
        />

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="max-w-[1440px] w-full mx-auto text-center relative z-10 flex flex-col items-center my-auto pt-0 md:pt-2" style={GPU_ACCELERATION}>

        <h2
          className="text-[34px] sm:text-[40px] md:text-[60px] font-bold tracking-tight text-black mb-2 md:mb-4 leading-[1.08] md:leading-[76px] font-['Outfit']"
        >
          <ZigZagText text="The Global" delay={0.1} /> <br className="md:hidden" />
          <ZigZagText
            text="Talent Showcase."
            delay={0.5}
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: BRAND_GRADIENT }}
          />
        </h2>

        {/* Categories Bar - Exact Figma Specs: Height 43px, Gap 30px, White Background */}
        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 md:gap-[30px] mb-4 md:mb-6 w-full overflow-x-auto pb-2 md:overflow-visible md:pb-0">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCat(cat)}
              className={`shrink-0 px-5 md:px-6 h-[40px] md:h-[43px] rounded-md text-[14px] md:text-[15px] font-medium transition-all duration-300 flex items-center justify-center font-['Outfit'] ${activeCat === cat
                ? 'bg-[#683995] text-white shadow-lg shadow-[#683995]/20'
                : 'bg-white text-[#676767] border border-black/[0.03] hover:border-black/[0.1] shadow-sm'
                }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Talent Grid - Optimized with Memo */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 mb-8 md:mb-12 w-full h-auto min-h-0 md:min-h-[500px]"
          style={{ perspective: "2000px" }}
        >
          <AnimatePresence mode="wait">
            {filteredCards.map((card, i) => (
              <TalentCard
                key={`${activeCat}-${i}`}
                card={card}
                index={i}
                activeCat={activeCat}
              />
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-3 px-8 md:px-10 h-[43px] bg-brand text-white font-bold text-sm md:text-base rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          View All Showcase
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
}
