import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', label: 'Vocalists',  count: '1.2K' },
  { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', label: 'Producers',  count: '800+' },
  { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80', label: 'Architects', count: '2.4K' },
];

export default function CategoriesSection() {
  return (
    <section className="relative min-h-[100vh] w-full flex flex-col justify-center py-20 px-6 bg-[#08060f] overflow-hidden">
      <div className="max-w-[1440px] w-full mx-auto relative z-10">
        
        {/* Header - Resized to match standard site typography & tracking */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block text-white/50 text-[13px] font-bold uppercase tracking-[4px] mb-6"
            >
              Industry Experts
            </motion.span>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[40px] md:text-[60px] font-bold text-white leading-[1.1] md:leading-[76px] tracking-tight mb-8 font-['Outfit']"
            >
              Choose Your<br />
              <span 
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(148.93deg, #B400FF 0%, #830FB7 33.96%, #CB5564 56.61%, #FF8B00 81.2%)' }}
              >
                Champion.
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/50 text-[18px] md:text-[20px] leading-relaxed max-w-xl font-medium"
            >
              From cinematic directors to blockchain architects—we house the experts who define their respective industries.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/search"
              className="group relative h-14 md:h-16 px-8 md:px-12 bg-white text-black font-bold text-base md:text-lg rounded-full flex items-center gap-4 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-300 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">Explore All</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-white/20 skew-x-[30deg] -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
            </Link>
          </motion.div>
        </div>

        {/* Categories Cards Layout - Shrunk Aspect Ratio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[30px]">
          {categories.map((c, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.4 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-square rounded-[32px] overflow-hidden border border-white/10 cursor-pointer shadow-2xl"
            >
              <img
                src={c.img}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 will-change-transform"
                alt={c.label}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-10 left-10 right-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                  <p className="text-white/70 text-[11px] font-extrabold uppercase tracking-[4px]">
                    {c.count} Professionals
                  </p>
                </div>
                <h4 className="text-white text-4xl lg:text-[42px] font-black tracking-tighter">
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
