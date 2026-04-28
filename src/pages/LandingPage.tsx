import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import useSmoothScroll from '../hooks/useSmoothScroll';

import '../styles/stacking.css'; // <-- Dedicated stacking styles

// ── Section Components ────────────────────────────────────────────────
import HeroSection       from '../components/sections/HeroSection';
import SolutionsSection  from '../components/sections/SolutionsSection';
import ManifestoSection  from '../components/sections/ManifestoSection';
import CapabilitiesSection from '../components/sections/CapabilitiesSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import CTASection        from '../components/sections/CTASection';
import ShowcaseSection   from '../components/sections/ShowcaseSection';
import FooterSection     from '../components/sections/FooterSection';
import HiringDrawer      from '../components/sections/HiringDrawer';
import BackToTop         from '../components/BackToTop';

export default function LandingPage() {
  useSmoothScroll();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const progressBarScaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    // Changed overflow-x-hidden to overflow-clip for sticky to work correctly
    <div ref={containerRef} className="relative bg-white grid-bg-light overflow-clip min-h-screen">
      <Navbar />

      {/* ── Global Hiring Drawer ── */}
      <HiringDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Main Structural Wrapper for Stacking Context */}
      <main className="relative z-10 w-full flex flex-col">
        {/* ── 01: HERO ── */}
        <div className="sticky-section bg-[#FAFAFB]">
          <HeroSection />
        </div>

        {/* ── 02: SOLUTIONS ── */}
        <div className="sticky-section bg-[#FAFAFB]">
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

        {/* ── 06: TALENT SHOWCASE ── */}
        <div className="sticky-section bg-[#FAFAFB]">
          <ShowcaseSection />
        </div>

        {/* ── 07: CATEGORIES ── */}
        <div className="sticky-section bg-white">
          <CategoriesSection />
        </div>

        {/* ── 08: FINAL CTA ── */}
        <div className="sticky-section bg-[#FAFAFB]">
          <CTASection onBookNow={() => setIsDrawerOpen(true)} />
        </div>

        {/* ── FOOTER ── */}
        {/* Footer does not stack, it just appears at the bottom normally or we can stack it too */}
        <div className="sticky-section bg-white">
          <FooterSection />
        </div>
      </main>

      {/* ── Global Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 h-[4px] bg-black/5 z-[100] pointer-events-none">
        <motion.div className="h-full bg-brand origin-left" style={{ scaleX: progressBarScaleX }} />
      </div>

      {/* ── Back to Top Button ── */}
      <BackToTop />
    </div>
  );
}
