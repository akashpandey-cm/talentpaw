import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';

export default function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // Slightly longer for more cinematic feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });
    
    lenisRef.current = lenis;

    // ── Snap-on-Stop Logic ───────────────────────────────────────────
    let snapTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      if (!lenisRef.current) return;

      // Clear previous timeout while user is still scrolling
      clearTimeout(snapTimeout);

      // Set a new timeout to detect when scroll has settled
      snapTimeout = setTimeout(() => {
        const scrollPos = lenis.actualScroll;
        const vh = window.innerHeight;
        
        // Calculate current section index (0, 1, 2...)
        const sectionIndex = Math.round(scrollPos / vh);
        const targetScroll = sectionIndex * vh;

        // Only snap if we aren't already very close to the target
        if (Math.abs(scrollPos - targetScroll) > 10) {
          lenis.scrollTo(targetScroll, {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lock: true, // Prevent user from interrupting the snap for a better cinematic feel
          });
        }
      }, 250); // 250ms debounce for natural feel
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      clearTimeout(snapTimeout);
    };
  }, []);

  useAnimationFrame((time) => {
    if (lenisRef.current) {
      lenisRef.current.raf(time);
    }
  });
}
