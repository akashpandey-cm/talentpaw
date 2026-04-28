import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';

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

export default function OrbitTestimonials({ 
  testimonials = DEFAULT_TESTIMONIALS, 
  speed = 40, 
  radius = 640 
}: OrbitTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = testimonials.length;
  const angleStep = 360 / count;

  // Use Motion Values to bypass React's render loop for continuous rotation
  const rotation = useMotionValue(0);
  const activeIndexRef = useRef(0);

  useAnimationFrame((time) => {
    const currentRotation = (time / (speed * 1000)) * -360;
    rotation.set(currentRotation);

    // Update active index based on rotation (closest to 270 degrees)
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
    <div className="relative w-full min-h-[700px] md:min-h-[750px] flex items-start justify-center bg-transparent overflow-visible">
      
      {/* ── Visual Atmosphere ── */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/[0.03] blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div 
        className="absolute w-[1300px] h-[1300px] border-[1.5px] border-dashed border-black/[0.03] rounded-full pointer-events-none" 
        style={{ top: '680px', left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      <div className="relative w-full h-full flex flex-col items-center pt-6 overflow-visible">
        
        {/* Avatars Orbit Cluster */}
        <div className="absolute top-[680px] left-1/2 -translate-x-1/2"> 
          {testimonials.map((item, i) => (
            <AvatarItem 
              key={item.id}
              item={item}
              index={i}
              rotation={rotation}
              angleStep={angleStep}
              radius={radius}
              isActive={i === activeIndex}
            />
          ))}
        </div>

        {/* ── Center Content ── */}
        <div className="relative mt-[160px] md:mt-[200px] w-full max-w-[340px] md:max-w-[720px] text-center px-4 z-20 overflow-visible">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              {/* Minimalist Quote Mark */}
              <div className="text-[60px] leading-none text-brand/20 font-serif mb-2">&ldquo;</div>

              <blockquote className="text-[20px] md:text-[28px] font-medium text-black/90 leading-[1.6] tracking-tight mb-8 md:mb-12 px-4 font-['Outfit'] italic">
                {activeTestimonial.message}
              </blockquote>

              <div className="flex flex-col items-center">
                <div className="h-[1px] w-8 bg-black/5 mb-6" />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-[13px] font-bold uppercase tracking-[8px] text-black font-['Outfit'] mb-2">
                    {activeTestimonial.name}
                  </span>
                  <span className="text-[10px] font-medium text-brand/60 uppercase tracking-[4px] font-['Outfit']">
                    {activeTestimonial.role}
                  </span>
                </motion.div>
                
                {/* Premium Dot Indicator */}
                <div className="flex gap-2.5 mt-10">
                  {testimonials.map((_, dotIdx) => (
                    <motion.div 
                      key={dotIdx}
                      initial={false}
                      animate={{ 
                        scale: dotIdx === activeIndex ? 1.2 : 1,
                        opacity: dotIdx === activeIndex ? 1 : 0.2
                      }}
                      className={`h-1.5 w-1.5 rounded-full bg-brand transition-all duration-700`} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Separate component for avatars to use isolated MotionValue transformations
function AvatarItem({ item, index, rotation, angleStep, radius, isActive }: { 
  item: Testimonial, 
  index: number, 
  rotation: any, 
  angleStep: number, 
  radius: number,
  isActive: boolean
}) {
  const initialAngle = index * angleStep;
  
  // High-performance transformations linked directly to the rotation MotionValue
  const itemRotation = useTransform(rotation, (r: number) => initialAngle + r);
  
  // High-performance trigonometric positioning for maximum smoothness
  const x = useTransform(itemRotation, (angle: number) => {
    return Math.cos((angle * Math.PI) / 180) * radius;
  });
  
  const y = useTransform(itemRotation, (angle: number) => {
    return Math.sin((angle * Math.PI) / 180) * radius;
  });

  const scale = useTransform(itemRotation, (angle: number) => {
    const normalized = ((angle % 360) + 360) % 360;
    const dist = Math.min(Math.abs(normalized - 270), 360 - Math.abs(normalized - 270));
    const factor = Math.max(0, 1 - dist / 70);
    return 0.6 + factor * 0.7; // 0.6 -> 1.3
  });

  const borderAlpha = useTransform(scale, [0.6, 1.3], [0.05, 0.4]);

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        left: -56, // Half of width (28 * 4 / 2)
        top: -56,
        willChange: "transform"
      }}
      className="absolute"
    >
      <div 
        className={`
          relative w-28 h-28 rounded-2xl overflow-hidden p-[1px] backdrop-blur-md border transition-all duration-700
          ${isActive ? 'bg-white shadow-[0_20px_50px_rgba(104,57,149,0.2)]' : 'bg-white/5'}
        `}
        style={{ borderColor: useTransform(borderAlpha, (a) => `rgba(123, 97, 255, ${a})`) as any }}
      >
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover rounded-2xl transition-all duration-1000"
        />
      </div>
    </motion.div>
  );
}
