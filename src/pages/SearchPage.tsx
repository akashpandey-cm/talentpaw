import Navbar from '../components/Navbar';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const TALENTS = [
  { id: 1, name: "Jessica Smith", role: "UI Designer", rating: 4.9, price: "$60/hr", image: "https://i.pravatar.cc/300?u=jessICA" },
  { id: 2, name: "David Chen", role: "React Developer", rating: 5.0, price: "$85/hr", image: "https://i.pravatar.cc/300?u=davidchen" },
  { id: 3, name: "Michael Ross", role: "Copywriter", rating: 4.8, price: "$45/hr", image: "https://i.pravatar.cc/300?u=mikeross" },
  { id: 4, name: "Sophia Lee", role: "AI Researcher", rating: 5.0, price: "$120/hr", image: "https://i.pravatar.cc/300?u=sophialee" },
  { id: 5, name: "Marcus Wright", role: "Video Editor", rating: 4.7, price: "$50/hr", image: "https://i.pravatar.cc/300?u=marcuswright" },
  { id: 6, name: "Emma Wilson", role: "3D Artist", rating: 4.9, price: "$75/hr", image: "https://i.pravatar.cc/300?u=emmawilson" },
];

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-bg-alt">
      <Navbar />
      
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        {/* Search Header */}
        <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <h1 className="text-4xl font-bold text-black mb-2">Find your perfect hire.</h1>
                <p className="text-gray-custom">Browse world-class talent vetted for performance and reliability.</p>
              </div>
              
              <div className="flex items-center gap-4 flex-1 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-custom/50" />
                  <input 
                    type="text" 
                    placeholder="Search by skill or name..." 
                    className="w-full bg-bg-alt border border-black/5 rounded-lg py-3.5 pl-12 pr-6 focus:outline-none focus:border-brand/40 transition-all text-black"
                  />
                </div>
                <button className="flex items-center gap-2 px-6 py-3.5 border border-black/5 rounded-lg hover:bg-black/5 transition-all text-gray-custom">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filter
                </button>
              </div>
            </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {TALENTS.map((talent, i) => (
            <motion.div
              key={talent.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden group border border-black/5 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-bg-alt">
                <img src={talent.image} alt={talent.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-brand shadow-sm">
                  AVAILABLE
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-black tracking-tight">{talent.name}</h3>
                    <p className="text-sm text-gray-custom font-medium mt-0.5">{talent.role}</p>
                  </div>
                  <p className="text-base font-bold text-brand">{talent.price}</p>
                </div>
                
                <div className="flex gap-2 mb-6">
                  {['Product', 'Design', 'Strategy'].map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-bg-alt border border-black/5 rounded text-[11px] text-gray-custom uppercase font-bold">{tag}</span>
                  ))}
                </div>
                
                <button className="w-full py-3 bg-brand text-white rounded-sm text-sm font-bold hover:opacity-90 transition-all">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
