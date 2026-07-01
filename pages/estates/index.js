import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';

const spaces = [
  {
    src: '/assets/images/EXOTIC-SHOW-ROOM-VAULT.png',
    alt: 'Exotic Showroom Vault Space',
    title: 'The Exotic Showroom Vault',
    subtitle: 'High-Security Bonded Holding',
  },
  {
    src: '/assets/images/BOARDMEETING_ROOM.png',
    alt: 'Sovereign Boardroom Area',
    title: 'The Sovereign Boardroom',
    subtitle: '',
  },
  {
    src: '/assets/images/CAFE_LOUNGE.png',
    alt: 'Cafe Imperium Lounge Environment',
    title: 'Café Imperium',
    subtitle: 'Private Guest Lounge',
  },
  {
    src: '/assets/images/CLIENT_MEETINGROOM.png',
    alt: 'Executive Client Signoff Suite',
    title: 'The Executive Client Suite',
    subtitle: 'Private Sign-Off Room',
  },
];

export default function EstatesPage() {
  return (
    <>
      <Head>
        <title>Imperium Motors | The Estates</title>
        <meta
          name="description"
          content="Private Access Only — The Imperium Estates."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Script id="tailwind-config-estates" strategy="beforeInteractive">
        {`window.tailwind = window.tailwind || {}; window.tailwind.config = { theme: { extend: { colors: { gold: '#d4af37' } } } };`}
      </Script>
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />

      <main className="min-h-screen bg-black text-white">
        <header className="site-nav sticky top-0 z-40">
          <div className="nav-inner flex items-center justify-between px-6 md:px-16 py-4">
            <a href="/" className="text-xs uppercase tracking-[0.35em] text-white">Imperium Motors</a>
            <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em]">
              <a href="/" className="text-gray-300 hover:text-white transition">Home</a>
              <a href="/identity" className="text-gray-300 hover:text-white transition">Our Identity</a>
              <a href="/services" className="text-gray-300 hover:text-white transition">Services</a>
              <a href="/#portfolio" className="text-gray-300 hover:text-white transition">The Vault</a>
            </div>
          </div>
        </header>

        <section className="py-24 bg-[#060606]">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-20">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-gold mb-3 font-semibold">Private Access Only</p>
                <h1 className="text-4xl md:text-6xl text-white tracking-tight">The Imperium Estates</h1>
              </div>
              <p className="text-gray-400 font-light max-w-md mt-4 md:mt-0 text-sm leading-relaxed">
                Every transaction room, gallery lounge, and vault sanctuary is architectural proof of absolute prestige.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {spaces.map(space => (
                <div key={space.title} className="group overflow-hidden border border-white/5 relative">
                  <Image
                    src={space.src}
                    alt={space.alt}
                    width={600}
                    height={400}
                    loading="lazy"
                    className="w-full h-[400px] object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                  <div className="absolute bottom-6 left-6">
                    <h2 className="text-2xl text-white serif-font">{space.title}</h2>
                    <p className="text-xs text-gold uppercase tracking-widest mt-1">{space.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
