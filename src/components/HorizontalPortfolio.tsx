import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 1, title: 'AI Automation', cat: 'Logic & Code', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Design System', cat: 'Visual Art', img: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: '3D Reality', cat: 'Metaverse', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Motion Pro', cat: 'Cinematics', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
];

export default function HorizontalPortfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current?.offsetWidth || 0;
      const windowWidth = window.innerWidth;
      const amountToScroll = scrollWidth - windowWidth;

      gsap.to(scrollRef.current, {
        x: -amountToScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white vertical-section py-20">
      <div className="absolute top-20 left-20 z-10">
        <h2 className="text-5xl font-bold tracking-tight text-black italic">OUR <span className="text-brand">SHOWCASE.</span></h2>
        <p className="text-gray-custom mt-4 max-w-sm">A curated selection of groundbreaking projects delivered by elite specialists.</p>
      </div>

      <div ref={scrollRef} className="flex h-[70vh] items-center gap-12 px-20">
        {PROJECTS.map((project) => (
          <div key={project.id} className="min-w-[500px] h-96 relative group overflow-hidden rounded-3xl bg-white border border-black/5 shadow-xl shadow-black/5">
            <img 
              src={project.img} 
              alt={project.title} 
              className="w-full h-full object-cover transition-all duration-700 opacity-90 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-10 left-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">{project.cat}</span>
              <h3 className="text-2xl font-bold mt-1 text-white">{project.title}</h3>
            </div>
          </div>
        ))}
        {/* Extra spacer */}
        <div className="min-w-[200px]" />
      </div>
    </section>
  );
}
