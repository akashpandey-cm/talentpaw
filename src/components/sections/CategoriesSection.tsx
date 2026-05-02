import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRAND_GRADIENT, EASE_PREMIUM, GPU_ACCELERATION } from '../../lib/brand';

const categories = [
  { img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', label: 'Vocalists',  count: '1.2K' },
  { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', label: 'Producers',  count: '800+' },
  { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80', label: 'Architects', count: '2.4K' },
];

export default function CategoriesSection() {
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-start pt-12 md:pt-16 pb-20 px-4 md:px-6 bg-[#08060f] overflow-visible md:overflow-hidden">
      <div className="max-w-[1440px] w-full mx-auto relative z-10 my-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 gap-6 md:gap-8">
          <div className="max-w-3xl" style={GPU_ACCELERATION}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="block text-white/50 text-[12px] md:text-[13px] font-bold uppercase tracking-[3px] md:tracking-[4px] mb-4 md:mb-5"
            >
              Industry Experts
            </motion.span>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className="text-[34px] sm:text-[40px] md:text-[60px] font-bold text-white leading-[1.08] md:leading-[76px] tracking-tight mb-4 md:mb-6 font-['Outfit']"
            >
              Choose Your<br />
              <span 
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: BRAND_GRADIENT }}
              >
                Champion.
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE_PREMIUM }}
              className="text-white/50 text-[14px] md:text-[18px] leading-relaxed max-w-xl font-medium"
            >
              From cinematic directors to blockchain architects—we house the experts who define their respective industries.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE_PREMIUM }}
            style={GPU_ACCELERATION}
            className="mb-2 md:mb-0"
          >
            <Link
              to="/search"
              className="group relative h-[48px] md:h-[50px] px-8 md:px-12 bg-white text-black font-bold text-base md:text-lg rounded-full flex items-center justify-center gap-4 transition-[box-shadow,transform] duration-300 active:scale-95 overflow-hidden shadow-sm hover:shadow-lg w-full sm:w-auto"
            >
              <span className="relative z-10">Explore All</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-black/[0.03] skew-x-[30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-700 ease-in-out" />
            </Link>
          </motion.div>
        </div>

        {/* Categories Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-[30px]">
          {categories.map((c, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.4 + (i * 0.1), ease: EASE_PREMIUM }}
              whileTap={{ scale: 0.98 }}
              className="group relative aspect-[4/2.8] md:aspect-[4/3.8] rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/10 cursor-pointer shadow-2xl"
              style={GPU_ACCELERATION}
            >
              <img
                src={c.img}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 will-change-transform translate-z-0"
                alt={c.label}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                  <p className="text-white/70 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[3px] md:tracking-[4px]">
                    {c.count} Professionals
                  </p>
                </div>
                <h4 className="text-white text-3xl md:text-4xl lg:text-[42px] font-black tracking-tighter">
                  {c.label}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
