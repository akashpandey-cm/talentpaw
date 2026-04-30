import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface HiringDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HiringDrawer({ isOpen, onClose }: HiringDrawerProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Auto-close after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-start md:items-center justify-center p-3 md:p-4 overflow-y-auto">
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
            className="relative bg-white rounded-[28px] md:rounded-[40px] p-5 sm:p-8 md:p-14 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.2)] w-full max-w-2xl border border-black/[0.03] my-4 md:my-0 max-h-none"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-all group"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-black/50 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="mb-8 md:mb-12 text-center pr-10 md:pr-0">
              <span className="inline-block px-3 md:px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[9px] md:text-[10px] font-black uppercase tracking-[2px] md:tracking-[3px] mb-5 md:mb-6">
                Concierge Service
              </span>
              <h2 className="text-[32px] md:text-[42px] font-black tracking-tighter leading-none mb-3 md:mb-4">Start Hiring Now</h2>
              <p className="text-black/40 text-base md:text-lg font-medium">Curate your elite team with expert precision.</p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5 md:space-y-8" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-[2.5px] text-black/30 px-1">Full Name</label>
                      <input
                        required
                        type="text"
                        className="w-full h-14 md:h-16 bg-black/[0.03] rounded-2xl md:rounded-3xl px-5 md:px-8 outline-none focus:ring-4 focus:ring-purple-500/10 border border-transparent focus:border-purple-500/20 transition-all font-semibold"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-[2.5px] text-black/30 px-1">Corporate Email</label>
                      <input
                        required
                        type="email"
                        className="w-full h-14 md:h-16 bg-black/[0.03] rounded-2xl md:rounded-3xl px-5 md:px-8 outline-none focus:ring-4 focus:ring-purple-500/10 border border-transparent focus:border-purple-500/20 transition-all font-semibold"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[2.5px] text-black/30 px-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      className="w-full h-14 md:h-16 bg-black/[0.03] rounded-2xl md:rounded-3xl px-5 md:px-8 outline-none focus:ring-4 focus:ring-purple-500/10 border border-transparent focus:border-purple-500/20 transition-all font-semibold"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[2.5px] text-black/30 px-1">Project Scope</label>
                    <textarea
                      required
                      className="w-full h-32 md:h-40 bg-black/[0.03] rounded-[24px] md:rounded-[32px] px-5 md:px-8 py-5 md:py-6 outline-none focus:ring-4 focus:ring-purple-500/10 border border-transparent focus:border-purple-500/20 transition-all font-semibold resize-none"
                      placeholder="Tell us about the elite talent you need..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-14 md:h-20 bg-black text-white font-black text-base md:text-xl rounded-[22px] md:rounded-[28px] shadow-2xl shadow-black/10 mt-5 md:mt-6 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Submit Hiring Request</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="py-20 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-black mb-4">Request Received!</h3>
                  <p className="text-black/40 text-lg font-medium max-w-sm">
                    Our concierge team will review your requirements and get back to you within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
