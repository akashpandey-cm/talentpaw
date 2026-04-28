import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface HiringDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HiringDrawer({ isOpen, onClose }: HiringDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-xl"
          />

          {/* Split Reveal - Top Panel */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#fafafa]/95 backdrop-blur-md border-b border-black/5"
          />
          {/* Split Reveal - Bottom Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#fafafa]/95 backdrop-blur-md"
          />

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative bg-white rounded-[40px] p-8 md:p-14 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.2)] w-full max-w-2xl border border-black/[0.03]"
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-all group"
            >
              <X className="w-6 h-6 text-black/50 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="mb-12 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-black uppercase tracking-[3px] mb-6">
                Concierge Service
              </span>
              <h2 className="text-[42px] font-black tracking-tighter leading-none mb-4">Start Hiring Now</h2>
              <p className="text-black/40 text-lg font-medium">Curate your elite team with expert precision.</p>
            </div>

            <form className="space-y-8" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[2.5px] text-black/30 px-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full h-16 bg-black/[0.03] rounded-3xl px-8 outline-none focus:ring-4 focus:ring-purple-500/10 border border-transparent focus:border-purple-500/20 transition-all font-semibold"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[2.5px] text-black/30 px-1">Corporate Email</label>
                  <input
                    type="email"
                    className="w-full h-16 bg-black/[0.03] rounded-3xl px-8 outline-none focus:ring-4 focus:ring-purple-500/10 border border-transparent focus:border-purple-500/20 transition-all font-semibold"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[2.5px] text-black/30 px-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full h-16 bg-black/[0.03] rounded-3xl px-8 outline-none focus:ring-4 focus:ring-purple-500/10 border border-transparent focus:border-purple-500/20 transition-all font-semibold"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[2.5px] text-black/30 px-1">Project Scope</label>
                <textarea
                  className="w-full h-40 bg-black/[0.03] rounded-[32px] px-8 py-6 outline-none focus:ring-4 focus:ring-purple-500/10 border border-transparent focus:border-purple-500/20 transition-all font-semibold resize-none"
                  placeholder="Tell us about the elite talent you need..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-20 bg-black text-white font-black text-xl rounded-[28px] shadow-2xl shadow-black/10 mt-6 relative overflow-hidden group"
              >
                <span className="relative z-10">Submit Hiring Request</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
