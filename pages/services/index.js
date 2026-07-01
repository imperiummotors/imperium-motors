import Head from 'next/head';
import Script from 'next/script';

const serviceItems = [
  {
    id: 'private-acquisition',
    title: 'Private Acquisition',
    description:
      'Discrete sourcing and transaction handling for collector-grade hypercars through trusted global networks.',
  },
  {
    id: 'investment-advisory',
    title: 'Investment Advisory',
    description:
      'Asset-level guidance for acquisition timing, rarity outlook, and long-term value preservation strategy.',
  },
  {
    id: 'legacy-advisory',
    title: 'Legacy Advisory',
    description:
      'Structuring collections as generational assets with confidentiality-first stewardship and documentation.',
  },
  {
    id: 'asset-protection',
    title: 'Asset Protection',
    description:
      'Security, insurance coordination, climate-aware storage planning, and white-glove operational protocols.',
  },
  {
    id: 'international-delivery',
    title: 'International Delivery',
    description:
      'End-to-end cross-border movement with partner carriers, bonded handling, and zero-contact delivery standards.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Imperium Motors | Services</title>
        <meta
          name="description"
          content="Global white-glove logistics and private advisory services from Imperium Motors."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Script id="tailwind-config-services" strategy="beforeInteractive">
        {`window.tailwind = window.tailwind || {}; window.tailwind.config = { theme: { extend: { colors: { gold: '#d4af37' } } } };`}
      </Script>
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />

      <main className="min-h-screen bg-black text-white">
        <header className="site-nav sticky top-0 z-40">
          <div className="nav-inner flex items-center justify-between px-6 md:px-16 py-4">
            <a href="/" className="text-xs uppercase tracking-[0.35em] text-white">Imperium Motors</a>
            <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em]">
              <a href="/" className="text-gray-300 hover:text-white transition">Home</a>
              <a href="/#portfolio" className="text-gray-300 hover:text-white transition">The Vault</a>
              <a href="/#appointment" className="text-gray-300 hover:text-white transition">Private Briefing</a>
            </div>
          </div>
        </header>

        <section className="py-24 px-6 md:px-16 bg-[#090909]">
          <div className="max-w-7xl mx-auto">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-4">Global White-Glove Logistics</p>
            <h1 className="text-4xl md:text-6xl text-white font-medium mb-6">Worldwide delivery. Zero compromise.</h1>
            <p className="text-gray-400 leading-relaxed max-w-4xl mb-8">
              Every hypercar is transported with the same reverence it deserves. Imperium Motors partners exclusively
              with <span className="text-white font-medium"> Emirates SkyCargo</span> for international movements:
              enclosed air freight, climate-controlled holds, full insurance, and door-to-door white-glove handling.
            </p>
            <a
              href="https://youtu.be/AasfpxvgT8A?si=8kOF4_jCKEUqxhdK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex border border-gold text-gold hover:bg-gold hover:text-black text-xs uppercase tracking-[0.25em] font-semibold px-6 py-3 transition duration-300"
            >
              Watch: Emirates SkyCargo →
            </a>
          </div>
        </section>

        <section className="py-20 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-6">Services</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceItems.map(item => (
                <article key={item.id} id={item.id} className="service-card scroll-mt-28">
                  <h2 className="text-white text-xl font-semibold mb-3">{item.title}</h2>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
