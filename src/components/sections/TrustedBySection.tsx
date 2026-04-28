export default function TrustedBySection() {
  const brands = ['NETFLIX', 'SPOTIFY', 'ADOBE', 'GOOGLE', 'MARVEL', 'SAMSUNG'];

  return (
    <section className="py-24 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center opacity-30 grayscale hover:grayscale-0 transition-all">
          {brands.map(brand => (
            <span key={brand} className="text-2xl font-black text-center tracking-tighter">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
