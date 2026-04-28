import { motion } from 'framer-motion';
import OrbitTestimonials from '../OrbitTestimonials';

export default function TestimonialSection() {
  return (
    <section className="pt-24 pb-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 bg-brand/[0.03] border border-brand/10 px-6 py-2 rounded-full backdrop-blur-md"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[4px] text-brand/80">Social Proof</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[40px] md:text-[60px] font-bold text-black leading-[1.1] md:leading-[76px] tracking-tight font-['Outfit']"
          >
            Orbiting Around <span 
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #7B61FF, #FF4D8D, #FF8A3D)' }}
            >Trust.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base mt-6 max-w-lg mx-auto font-medium"
          >
            Joining forces with the world's most innovative brands to build the future of elite talent.
          </motion.p>
        </div>

        <OrbitTestimonials />
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/[0.02] blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
