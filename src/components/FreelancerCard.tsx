import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface FreelancerCardProps {
  name: string;
  role: string;
  rating: number;
  image: string;
  className?: string;
  delay?: number;
}

export default function FreelancerCard({ name, role, rating, image, className, delay = 0 }: FreelancerCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ 
        y: [0, -10, 0],
        opacity: 1
      }}
      transition={{
        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        },
        opacity: {
          duration: 0.8,
          delay: delay * 0.3
        }
      }}
      className={cn(
        "bg-white/80 border border-black/5 backdrop-blur-md p-5 rounded-2xl w-64 shadow-xl shadow-black/5 hover:border-brand/30 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="relative">
          <img src={image} alt={name} className="w-14 h-14 rounded-full object-cover grayscale-[0.3]" />
          <div className="absolute -bottom-1 -right-1 bg-brand rounded-full p-1 border-2 border-white">
            <CheckCircle2 className="w-3 h-3 text-white fill-current" />
          </div>
        </div>
        <div>
          <h4 className="text-base font-bold text-black leading-tight">{name}</h4>
          <p className="text-sm text-gray-custom/70">{role}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-black/5 pt-4">
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-amber-500 fill-current" />
          <span className="text-sm font-bold text-black">{rating}</span>
        </div>
        <button className="text-sm font-bold text-brand hover:underline">View Portfolio</button>
      </div>
    </motion.div>
  );
}
