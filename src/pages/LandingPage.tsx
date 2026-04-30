import { lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import useSmoothScroll from '../hooks/useSmoothScroll';
import { GPU_ACCELERATION } from '../lib/brand';

import '../styles/stacking.css'; // <-- Dedicated stacking styles

// ── Section Components (Lazy Loaded) ──────────────────────────────────
// This prevents heavy components from blocking the initial render of the Hero.
// Sections will load as the user starts their experience.
const HeroSection         = lazy(() => import('../components/sections/HeroSection'));
const SolutionsSection    = lazy(() => import('../components/sections/SolutionsSection'));
const ManifestoSection    = lazy(() => import('../components/sections/ManifestoSection'));
const CapabilitiesSection = lazy(() => import('../components/sections/CapabilitiesSection'));
const CategoriesSection   = lazy(() => import('../components/sections/CategoriesSection'));
const CTASection          = lazy(() => import('../components/sections/CTASection'));
const ShowcaseSection     = lazy(() => import('../components/sections/ShowcaseSection'));
const TestimonialSection  = lazy(() => import('../components/sections/TestimonialSection'));
const FooterSection       = lazy(() => import('../components/sections/FooterSection'));



// Fallback component for smooth loading
const SectionFallback = () => <div className="h-[80vh] w-full bg-[#FAFAFB] animate-pulse rounded-[40px] m-4" />;

export default function LandingPage({ onStartHiring }: { onStartHiring: () => void }) {
  useSmoothScroll();


  const { scrollYProgress } = useScroll();
  
  // Optimized snappier spring for premium feel
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 200, 
    damping: 30,
    restDelta: 0.001
  });
  
  const progressBarScaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div className="relative w-full bg-white">



      {/* ── Cinematic Snap Container ── */}
      <div className="snap-container">
        <main className="relative w-full flex flex-col" style={GPU_ACCELERATION}>
          <Suspense fallback={<SectionFallback />}>
            {/* ── 01: HERO ── */}
            <div className="sticky-section">
              <HeroSection />
            </div>

            {/* ── 02: SOLUTIONS ── */}
            <div className="sticky-section">
              <SolutionsSection />
            </div>

            {/* ── 04: MANIFESTO ── */}
            <div className="sticky-section bg-[#111111]">
              <ManifestoSection />
            </div>

            {/* ── 05: CAPABILITIES ── */}
            <div className="sticky-section bg-white">
              <CapabilitiesSection />
            </div>

            {/* ── 06: SHOWCASE ── */}
            <div className="sticky-section">
              <ShowcaseSection />
            </div>

            {/* ── 07: TESTIMONIALS ── */}
            <div className="sticky-section bg-white">
              <TestimonialSection />
            </div>

            {/* ── 08: CATEGORIES ── */}
            <div className="sticky-section bg-white">
              <CategoriesSection />
            </div>

            {/* ── 09: FINAL CTA + FOOTER ── */}
            <div className="sticky-section bg-[#050505] flex flex-col h-screen overflow-hidden">
              <div className="flex-grow bg-[#FAFAFB] flex flex-col">
                <CTASection onBookNow={onStartHiring} compact={true} />
              </div>
              <FooterSection />
            </div>
          </Suspense>
        </main>
      </div>

      {/* ── Global Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 h-[4px] bg-black/5 z-[100] pointer-events-none">
        <motion.div className="h-full bg-brand origin-left" style={{ scaleX: progressBarScaleX }} />
      </div>
    </div>
  );
}
