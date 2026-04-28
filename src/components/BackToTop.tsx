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
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-12 h-12 md:w-14 md:h-14 bg-white/80 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 flex items-center justify-center text-black hover:text-brand hover:scale-110 active:scale-95 transition-all duration-300 group"
          aria-label="Back to top"
        >
          {/* Subtle glowing ring on hover */}
          <div className="absolute inset-0 rounded-full border border-brand opacity-0 group-hover:opacity-100 scale-150 group-hover:scale-100 transition-all duration-500 ease-out" />
          
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
