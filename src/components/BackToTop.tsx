import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-8 md:bottom-12 md:right-12 z-[100] w-14 h-14 bg-black/20 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 flex items-center justify-center text-white hover:text-brand hover:border-brand/50 hover:bg-black/40 hover:scale-110 active:scale-95 transition-all duration-500 group"
          aria-label="Back to top"
        >
          {/* Subtle glowing ring on hover */}
          <div className="absolute inset-0 rounded-full border-2 border-brand/20 opacity-0 group-hover:opacity-100 scale-150 group-hover:scale-110 transition-all duration-500 ease-out" />
          
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6 relative z-10" strokeWidth={3} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
