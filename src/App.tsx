import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import Loader from './components/Loader';
import { motion, AnimatePresence } from 'framer-motion';

type AppState = 'loading' | 'transitioning_in' | 'welcome' | 'transitioning_out' | 'loaded';

function App() {
  const [appState, setAppState] = useState<AppState>('loading');

  const handleStartTransition = () => {
    setAppState('transitioning_in');
    
    // Step 1: Overlay slides in (800ms). Start welcome sequence.
    setTimeout(() => {
      setAppState('welcome');
    }, 800);

    // Step 2: Welcome text animation finishes. Start slide out.
    setTimeout(() => {
      setAppState('transitioning_out');
    }, 3200); // 800ms slide-in + 2400ms holding for welcome text

    // Step 3: Overlay slides off. Reveal homepage.
    setTimeout(() => {
      setAppState('loaded');
    }, 4000); // 3200ms + 800ms slide-out
  };

  const handleLoaderComplete = () => {
    // Loader unmounts natively
  };

  return (
    <>
      {/* BASE BACKGROUND TO PREVENT FLASHING DURING TRANSITION */}
      {appState !== 'loaded' && (
        <div className="fixed inset-0 z-[9990] bg-[#040308]" />
      )}

      {/* HOMEPAGE / APP CONTENT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ 
          opacity: appState === 'loaded' ? 1 : 0, 
          scale: appState === 'loaded' ? 1 : 0.92,
          y: appState === 'loaded' ? 0 : 40 
        }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={{ 
          visibility: appState === 'loaded' ? 'visible' : 'hidden',
          transformOrigin: 'top center'
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile/:id" element={<div className="p-20 text-center text-black">Profile Page Coming Soon</div>} />
          </Routes>
        </Router>
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
        {(appState === 'transitioning_in' || appState === 'welcome' || appState === 'transitioning_out') && (
          <motion.div
            key="overlay"
            initial={{ 
              y: '100vh', 
              borderTopLeftRadius: '100%', 
              borderTopRightRadius: '100%',
              borderBottomLeftRadius: '0%',
              borderBottomRightRadius: '0%'
            }}
            animate={{ 
              y: appState === 'transitioning_out' ? '-120vh' : '0vh',
              borderTopLeftRadius: appState === 'transitioning_in' ? '100%' : '0%',
              borderTopRightRadius: appState === 'transitioning_in' ? '100%' : '0%',
              borderBottomLeftRadius: appState === 'transitioning_out' ? '100%' : '0%',
              borderBottomRightRadius: appState === 'transitioning_out' ? '100%' : '0%',
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1] 
            }}
            className="fixed z-[9998] flex items-center justify-center flex-col pointer-events-none"
            style={{
              top: 0,
              left: '-25vw', 
              width: '150vw',
              height: '120vh',
              background: '#0D0A1A', 
              boxShadow: '0 0 100px rgba(0, 0, 0, 0.8)',
            }}
          >
            {/* Animated Text Container */}
            <div className="flex flex-col items-center justify-center -translate-y-[10vh]">
               <AnimatePresence>
                 {appState === 'welcome' && (
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                     transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                     className="text-white/50 uppercase tracking-[6px] md:tracking-[10px] text-xs md:text-sm font-bold mb-4 md:mb-6"
                   >
                     Welcome to
                   </motion.div>
                 )}
               </AnimatePresence>

               <AnimatePresence>
                 {appState === 'welcome' && (
                   <div className="flex overflow-hidden">
                     {"TALENTPAW".split('').map((char, i) => (
                       <motion.span
                         key={i}
                         initial={{ y: 100, opacity: 0, rotateX: -90 }}
                         animate={{ y: 0, opacity: 1, rotateX: 0 }}
                         exit={{ y: -100, opacity: 0, rotateX: 90 }}
                         transition={{ 
                           duration: 0.8, 
                           delay: i * 0.05 + 0.2, // Staggered entry
                           ease: [0.22, 1, 0.36, 1] 
                         }}
                         className="text-white text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter"
                         style={{ transformStyle: 'preserve-3d', transformOrigin: 'bottom' }}
                       >
                         {char}
                       </motion.span>
                     ))}
                   </div>
                 )}
               </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
