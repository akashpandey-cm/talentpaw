import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const FooterParticles = lazy(() => import('../canvas/FooterParticles'));

// Custom icons (kept local to avoid lucide-react export issues)
const Twitter = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const Github = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const navColumns = [
  { title: 'Product',   links: ['Features', 'Pricing', 'Talent Pool', 'Case Studies'] },
  { title: 'Company',   links: ['About', 'Careers', 'Blog', 'Press'] },
  { title: 'Resources', links: ['Help Center', 'Community', 'Guides', 'API Docs'] },
  { title: 'Legal',     links: ['Privacy', 'Terms', 'Security', 'Compliance'] },
];

const socials = [
  { icon: Twitter,  label: 'Twitter' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Github,   label: 'GitHub' },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#050505] pt-12 pb-8 px-6 md:px-12 relative overflow-hidden w-full">
      {/* 3D Particle Field Background */}
      <Suspense fallback={null}>
        <FooterParticles />
      </Suspense>

      {/* Mesh Gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#673997]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B400FF]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8 mb-12">
          {/* Branding Column - Takes 2 spans on large screens */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <Link to="/">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center relative overflow-hidden group shadow-2xl">
                  <div className="absolute inset-[1.5px] rounded-[10px] bg-black" />
                  <div className="relative text-[10px] font-black text-white italic">TP</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B400FF] via-[#CB5564] to-[#FF8B00] opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tighter leading-none mb-1">
                    Talent<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B400FF] to-[#FF8B00]">PAW</span>
                  </h3>
                  <p className="text-white/30 text-[8px] font-black tracking-[3px] uppercase">The Elite Network</p>
                </div>
              </motion.div>
            </Link>
            <p className="text-white/40 text-[15px] leading-relaxed max-w-[300px]">
              We don&apos;t just build teams; we assemble legacies. The premier platform for top-tier global talent.
            </p>
            <div className="flex gap-3">
              {socials.map(s => (
                <motion.button
                  key={s.label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <s.icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Nav Columns Grid - Takes 4 spans on large screens, 2 cols on mobile */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full">
            {navColumns.map(col => (
              <div key={col.title}>
                <h4 className="text-white/20 text-[9px] font-black uppercase tracking-[3px] mb-6">{col.title}</h4>
                <div className="flex flex-col gap-4">
                  {col.links.map(link => (
                    <motion.a
                      key={link}
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-white/50 text-[14px] font-medium hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 h-[1.5px] bg-brand group-hover:w-3 transition-all" />
                      {link}
                    </motion.a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <div className="flex flex-wrap justify-center gap-6 text-white/30 text-[11px] font-medium tracking-wide">
            <span>© 2026 COLLECTIVE</span>
            <a href="#" className="hover:text-white transition-colors">PRIVACY_PROTOCOL</a>
            <a href="#" className="hover:text-white transition-colors">TERMS_OF_SERVICE</a>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/40 text-[9px] font-black tracking-widest uppercase">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
