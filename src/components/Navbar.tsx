import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] px-6 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
            <Zap className="text-white fill-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-black">TALENT<span className="text-brand">PAW</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/search">Find Talent</NavLink>
          <NavLink href="#categories">Solution <ChevronDown className="w-4 h-4 opacity-50" /></NavLink>
          <NavLink href="#how-it-works">Pricing</NavLink>
          <div className="w-px h-6 bg-black/5 ml-4" />
          <button className="text-[16px] font-medium text-gray-custom hover:text-brand transition-all duration-300 lg:hover:-translate-y-px">Log In</button>
          <Link to="/search" className="btn-purple">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-black/5 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <NavLink href="/search" mobile>Find Talent</NavLink>
            <NavLink href="#categories" mobile>Solutions</NavLink>
            <NavLink href="#how-it-works" mobile>Pricing</NavLink>
            <hr className="border-black/5" />
            <button className="w-full h-10 border border-gray-custom text-gray-custom font-medium rounded-sm">Log In</button>
            <button className="btn-purple w-full">Get Started</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ href, children, mobile }: { href: string; children: React.ReactNode; mobile?: boolean }) {
  return (
    <a 
      href={href} 
      className={cn(
        "text-[16px] font-medium text-gray-custom hover:text-black transition-colors flex items-center gap-1",
        mobile ? "text-lg py-2" : "nav-link-premium"
      )}
    >
      {children}
    </a>
  );
}
