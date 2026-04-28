import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

function SectionTitle({ subtitle, title, description, light = false }: {
  subtitle: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${light ? 'bg-white/10 border-white/20 text-white/80' : 'bg-brand/5 border-brand/10 text-brand'}`}>
          <span className="text-[10px] font-black uppercase tracking-[3px]">{subtitle}</span>
        </div>
        <h2
          className={`text-[40px] md:text-[60px] font-bold tracking-tight leading-[1.1] md:leading-[76px] mb-6 font-['Outfit'] ${light ? 'text-white' : 'text-black'}`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {description && (
          <p className={`text-lg max-w-2xl leading-relaxed ${light ? 'text-white/60' : 'text-gray-custom'}`}>
            {description}
          </p>
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
    <section className="py-20 md:py-40 px-6 relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Image */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-square bg-gradient-to-br from-brand/20 to-transparent rounded-[60px] p-1 border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1552664199-fd31f7431a55?w=1000&q=80"
              className="w-full h-full object-cover rounded-[59px] grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              alt="studio"
            />
          </motion.div>
          <div className="absolute -bottom-10 -right-10 bg-white/5 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 hidden md:block">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white">
                <Star fill="white" />
              </div>
              <div>
                <h4 className="text-white font-bold">12K+ Professionals</h4>
                <p className="text-white/40 text-xs tracking-wider uppercase">Vetted &amp; Verified</p>
              </div>
            </div>
          </div>
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
            {stats.map(stat => (
              <div key={stat.label} className="border-l-2 border-brand/40 pl-5 pr-2 py-1">
                <h4 className="text-white text-2xl sm:text-3xl md:text-4xl font-black mb-1 tracking-tighter">{stat.val}</h4>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[3px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
