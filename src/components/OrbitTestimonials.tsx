import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import { EASE_OUT_EXPO, GPU_ACCELERATION } from '../lib/brand';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  message: string;
}

interface OrbitTestimonialsProps {
  testimonials?: Testimonial[];
  speed?: number; 
  radius?: number; 
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Sarah Chen", role: "Product Design @ Meta", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", message: "TalentPaw transformed how we scale our creative teams. The quality of visionaries here is unmatched in the industry." },
  { id: 2, name: "Marcus Thorne", role: "Founder @ Nexus AI", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", message: "Finding elite talent used to take months. With TalentPaw, we closed our lead designer role in just 4 days. Incredible." },
  { id: 3, name: "Elena Rodriguez", role: "Marketing Director @ Nike", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", message: "The platform's interface is as premium as the talent it hosts. A truly elite experience from start to finish." },
  { id: 4, name: "David Kim", role: "CTO @ Vercel", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", message: "Vetted, high-performance individuals who actually understand modern workflows. TalentPaw is our secret weapon." },
  { id: 5, name: "Jessica Wu", role: "Creative Lead @ Apple", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", message: "I've never seen a higher concentration of pure creative brilliance. The vetting process here is clearly working." },
  { id: 6, name: "Julian Barnes", role: "Director @ Sony Music", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", message: "The artistry on this platform is breathtaking. We've found multiple project leads who have become core to our success." },
  { id: 7, name: "Aria Montgomery", role: "UX Researcher @ Google", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop", message: "Data-driven talent discovery at its finest. The depth of expertise available on TalentPaw is simply staggering." },
  { id: 8, name: "Liam O'Connell", role: "Lead Dev @ Shopify", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", message: "Finally, a platform that understands what high-performance engineering actually looks like. A game changer." },
  { id: 9, name: "Sophia Rossi", role: "Creative Director @ Gucci", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop", message: "The aesthetic sensibility of the talent here is world-class. It's rare to find such a concentrated pool of visionaries." },
  { id: 10, name: "Ethan Wright", role: "Senior Architect @ Tesla", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop", message: "Efficiency meets excellence. We've built an entire sub-team using TalentPaw in record time without compromising on quality." },
  { id: 11, name: "Mia Lindholm", role: "HR Head @ Spotify", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop", message: "Vetting is the hardest part of recruitment, and TalentPaw has perfected it. Every candidate we've seen has been top-tier." },
  { id: 12, name: "Noah Becker", role: "Fullstack @ OpenAI", image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop", message: "The most talented individuals aren't looking for jobs—they are on TalentPaw. This is where the real innovation happens." },
  { id: 13, name: "Isabella Martinez", role: "Design Director @ Airbnb", image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&h=400&fit=crop", message: "The standard of work on TalentPaw is breathtaking. We've built our entire design system using visionaries found here." }
];

const AvatarItem = memo(({ item, index, rotation, angleStep, radius, isActive, isMobile }: {
  item: Testimonial,
  index: number,
  rotation: MotionValue<number>,
  angleStep: number,
  radius: number,
  isActive: boolean,
  isMobile: boolean
}) => {
  const initialAngle = index * angleStep;
  const itemRotation = useTransform(rotation, (r: number) => initialAngle + r);
  
  const x = useTransform(itemRotation, (angle: number) => Math.cos((angle * Math.PI) / 180) * radius);
  const y = useTransform(itemRotation, (angle: number) => Math.sin((angle * Math.PI) / 180) * radius);

  const scale = useTransform(itemRotation, (angle: number) => {
    const normalized = ((angle % 360) + 360) % 360;
    const dist = Math.min(Math.abs(normalized - 270), 360 - Math.abs(normalized - 270));
    const factor = Math.pow(Math.max(0, 1 - dist / 60), 2); 
    return 0.7 + factor * 0.8;
  });

  const borderAlpha = useTransform(scale, [0.7, 1.5], [0.05, 0.3]);
  const borderColor = useTransform(borderAlpha, (a) => `rgba(123, 97, 255, ${a})`);

  const offset = isMobile ? -28 : -56;

  return (
    <motion.div
      style={{
        x, y, scale,
        left: offset,
        top: offset,
        ...GPU_ACCELERATION
      }}
      className="absolute"
    >
      <div
        className={`relative w-14 h-14 md:w-28 md:h-28 rounded-xl md:rounded-2xl overflow-hidden p-[0.5px] backdrop-blur-md border transition-[background-color,box-shadow,border-color] duration-1000 ${isActive ? 'bg-white shadow-[0_30px_60px_-12px_rgba(104,57,149,0.25)]' : 'bg-white/[0.03]'}`}
        style={{ borderColor: borderColor as any, perspective: '1000px' }}
      >
        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl md:rounded-2xl transition-transform duration-1000" />
      </div>
    </motion.div>
  );
});

export default function OrbitTestimonials({
  testimonials = DEFAULT_TESTIMONIALS,
  speed = 40,
  radius: initialRadius = 640
}: OrbitTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(initialRadius);
  const [isMobile, setIsMobile] = useState(false);
  const [orbitTop, setOrbitTop] = useState(680);
  const count = testimonials.length;
  const angleStep = 360 / count;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setRadius(mobile ? 140 : initialRadius);
      setOrbitTop(mobile ? 280 : 680);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialRadius]);

  const rotation = useMotionValue(0);
  const activeIndexRef = useRef(0);

  useAnimationFrame((time) => {
    const currentRotation = (time / (speed * 1000)) * -360;
    rotation.set(currentRotation);
    const normalizedRotation = ((currentRotation % 360) + 360) % 360;
    let bestIndex = 0;
    let minDiff = 360;

    for (let i = 0; i < count; i++) {
      const itemAngle = (i * angleStep + normalizedRotation) % 360;
      const diff = Math.min(Math.abs(itemAngle - 270), 360 - Math.abs(itemAngle - 270));
      if (diff < minDiff) {
        minDiff = diff;
        bestIndex = i;
      }
    }

    if (bestIndex !== activeIndexRef.current) {
      activeIndexRef.current = bestIndex;
      setActiveIndex(bestIndex);
    }
  });

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div className="relative w-full min-h-[480px] md:min-h-[750px] flex items-start justify-center bg-transparent overflow-visible">
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/[0.03] blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="hidden md:block absolute w-[1300px] h-[1300px] border-[1.5px] border-dashed border-black/[0.03] rounded-full pointer-events-none" style={{ top: '680px', left: '50%', transform: 'translate(-50%, -50%)' }} />

      <div className="relative w-full h-full flex flex-col items-center pt-6 overflow-visible">
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: `${orbitTop}px` }}>
          {testimonials.map((item, i) => (
            <AvatarItem key={item.id} item={item} index={i} rotation={rotation} angleStep={angleStep} radius={radius} isActive={i === activeIndex} isMobile={isMobile} />
          ))}
        </div>

        <div className="relative mt-[50px] md:mt-[180px] w-full max-w-[340px] md:max-w-[800px] text-center px-2 md:px-4 z-20 overflow-visible">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="flex flex-col items-center"
              style={GPU_ACCELERATION}
            >
              <div className="text-[64px] leading-none text-brand/10 font-serif mb-1 select-none">&ldquo;</div>
              <blockquote className="text-[17px] md:text-[28px] font-normal text-black/80 leading-[1.55] md:leading-[1.5] tracking-tight mb-4 md:mb-6 px-1 md:px-4 font-['Outfit'] italic">
                {activeTestimonial.message}
              </blockquote>

              <div className="flex flex-col items-center">
                <div className="h-[1px] w-6 bg-black/[0.08] mb-4" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center">
                  <span className="text-[12px] md:text-[14px] font-medium uppercase tracking-[5px] md:tracking-[10px] text-black font-['Outfit'] mb-3">{activeTestimonial.name}</span>
                  <span className="text-[9px] md:text-[10px] font-bold text-brand/40 uppercase tracking-[3px] md:tracking-[5px] font-['Outfit']">{activeTestimonial.role}</span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Constant Progress Stepper */}
          <div className="flex gap-4 mt-6 md:mt-12 justify-center">
            {testimonials.map((_, dotIdx) => (
              <motion.div 
                key={dotIdx}
                animate={{ 
                  opacity: dotIdx === activeIndex ? 1 : 0.1,
                  backgroundColor: dotIdx === activeIndex ? '#683995' : '#000000'
                }}
                className="h-1.5 w-1.5 rounded-full" 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
