import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';

export default function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });
    
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useAnimationFrame((time) => {
    if (lenisRef.current) {
      lenisRef.current.raf(time);
    }
  });
}
