import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { EASE_PREMIUM, GPU_ACCELERATION } from '../../lib/brand';

function SectionTitle({ subtitle, title, description, light = false }: {
  subtitle: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  // Split title by <br/> to animate lines independently
  const lines = title.split('<br/>');

  return (
    <div className="mb-12 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: EASE_PREMIUM }}
        style={GPU_ACCELERATION}
      >
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 ${light ? 'bg-white/10 border-white/20 text-white/80' : 'bg-brand/5 border-brand/10 text-brand'}`}>
          <span className="text-[10px] font-black uppercase tracking-[3px]">{subtitle}</span>
        </div>

        <h2 className={`text-[34px] sm:text-[44px] md:text-[68px] font-bold tracking-tight leading-[1.06] md:leading-[1.05] mb-6 md:mb-8 font-['Outfit'] ${light ? 'text-white' : 'text-black'}`}>
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden mb-1">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.15, 
                  ease: [0.16, 1, 0.3, 1] // Premium smooth ease-out
                }}
                dangerouslySetInnerHTML={{ __html: line }}
              />
            </div>
          ))}
        </h2>

        {description && (
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_PREMIUM }}
            className={`text-base md:text-lg max-w-2xl leading-relaxed ${light ? 'text-white/60' : 'text-gray-custom'}`}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default function ManifestoSection() {
  const stats = [
    { val: 'T-1', label: 'Tier Ranking' },
    { val: '24H', label: 'Match Time' },
    { val: '100%', label: 'Vetting' },
    { val: 'Secure', label: 'Pay' },
  ];

  return (
    <section className="py-20 md:py-40 px-4 md:px-6 relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_PREMIUM }}
            className="aspect-square bg-gradient-to-br from-brand/20 to-transparent rounded-[32px] md:rounded-[60px] p-1 border border-white/10"
            style={GPU_ACCELERATION}
          >
            <img
              src="https://images.unsplash.com/photo-1552664199-fd31f7431a55?w=1000&q=80"
              className="w-full h-full object-cover rounded-[31px] md:rounded-[59px] grayscale contrast-125 hover:grayscale-0 transition-[filter,transform] duration-700 ease-out"
              alt="studio"
              loading="lazy"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -bottom-10 -right-10 bg-white/5 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 hidden md:block"
            style={GPU_ACCELERATION}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white">
                <Star fill="white" />
              </div>
              <div>
                <h4 className="text-white font-bold">12K+ Professionals</h4>
                <p className="text-white/40 text-xs tracking-wider uppercase">Vetted &amp; Verified</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text */}
        <div>
          <SectionTitle
            light
            subtitle="The Concept"
            title="We Bridge<br/>Ambition with<br/><span class='text-gradient-premium'>Elite Ability.</span>"
            description="Traditional hiring is broken. We don't just provide a list of names; we deliver a curated selection of the absolute top 1% of talent, powered by precision AI and human expertise."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="border-l-2 border-brand/40 pl-5 pr-2 py-1"
                style={GPU_ACCELERATION}
              >
                <h4 className="text-white text-2xl sm:text-3xl md:text-4xl font-black mb-1 tracking-tighter">{stat.val}</h4>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[3px]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
