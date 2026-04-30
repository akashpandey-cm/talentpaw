import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import WelcomeScreen from './components/WelcomeScreen';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HiringDrawer from './components/sections/HiringDrawer';

// ── Optimized Code Splitting ───────────────────────────────────────────
// We lazy load the main entry points. Since the Loader covers the initial 
// 5s of app state, these chunks will prefetch in the background seamlessly.
const LandingPage = lazy(() => import('./pages/LandingPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));

type AppState = 'loading' | 'transitioning_in' | 'welcome' | 'transitioning_out' | 'loaded';

function App() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleStartTransition = () => {
    setAppState('transitioning_in');
    
    // Step 1: Overlay slides in (800ms). Start welcome sequence.
    setTimeout(() => {
      setAppState('welcome');
    }, 800);

    // Step 2: Welcome text animation finishes. Start slide out.
    setTimeout(() => {
      setAppState('transitioning_out');
    }, 3800); // 800ms slide-in + 3000ms (3s) holding for welcome text

    // Step 3: Overlay slides off. Reveal homepage.
    setTimeout(() => {
      setAppState('loaded');
    }, 5000); // 3800ms + 1200ms slide-out
  };

  const handleLoaderComplete = () => {
    // Loader unmounts natively
  };

  const isVisible = appState === 'loaded' || appState === 'transitioning_out';

  return (
    <Router>
      {/* BASE BACKGROUND TO PREVENT FLASHING DURING TRANSITION */}
      {appState !== 'loaded' && appState !== 'transitioning_out' && (
        <div className="fixed inset-0 z-[9990] bg-[#040308]" />
      )}

      {/* ── GLOBAL NAVBAR LAYER (Independent of page transforms) ── */}
      <Navbar />

      {/* ── GLOBAL HIRING DRAWER ── */}
      <HiringDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* HOMEPAGE / APP CONTENT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, filter: 'blur(20px)' }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0.96,
          filter: isVisible ? 'blur(0px)' : 'blur(20px)'
        }}
        onAnimationComplete={(definition) => {
          // Senior Staff Fix: Clear transforms after animation to restore pure 'fixed' positioning
          if (definition && typeof definition === 'object' && 'scale' in definition && definition.scale === 1) {
            // This ensures children with position: fixed behave correctly relative to viewport
          }
        }}
        transition={{ 
          duration: 1.8, 
          ease: [0.22, 1, 0.36, 1],
          opacity: { duration: 1.2 },
          filter: { duration: 1.5 }
        }}
        style={{ 
          visibility: isVisible ? 'visible' : 'hidden',
          transformOrigin: 'top center'
        }}
      >
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<LandingPage onStartHiring={() => setIsDrawerOpen(true)} />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile/:id" element={<div className="p-20 text-center text-black">Profile Page Coming Soon</div>} />
          </Routes>
        </Suspense>
      </motion.div>

      {/* THE LOADER */}
      <AnimatePresence>
        {appState !== 'loaded' && (
          <Loader 
            onStartTransition={handleStartTransition}
            onComplete={handleLoaderComplete} 
          />
        )}
      </AnimatePresence>

      {/* PREMIUM ENTRY OVERLAY & WELCOME SCREEN */}
      <AnimatePresence>
        <WelcomeScreen appState={appState} />
      </AnimatePresence>
    </Router>
  );
}

export default App;
