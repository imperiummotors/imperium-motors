import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';

export default function IdentityPage() {
  return (
    <>
      <Head>
        <title>Imperium Motors | Our Identity</title>
        <meta
          name="description"
          content="The Core Journey of Imperium Motors — Born in Nellai. Refined in London."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Script id="tailwind-config-identity" strategy="afterInteractive">
        {`window.tailwind = window.tailwind || {}; window.tailwind.config = { theme: { extend: { colors: { gold: '#d4af37' } } } };`}
      </Script>
      <Script src="https://cdn.tailwindcss.com" strategy="afterInteractive" />

      <main className="min-h-screen bg-black text-white">
        <header className="site-nav sticky top-0 z-40">
          <div className="nav-inner flex items-center justify-between px-6 md:px-16 py-4">
            <Link href="/" className="text-xs uppercase tracking-[0.35em] text-white">Imperium Motors</Link>
            <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em]">
              <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
              <Link href="/services" className="text-gray-300 hover:text-white transition">Services</Link>
              <Link href="/#portfolio" className="text-gray-300 hover:text-white transition">The Vault</Link>
            </div>
          </div>
        </header>

        <section id="core-journey" className="py-24 px-6 md:px-16 bg-[#060606] relative scroll-mt-28">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <p className="text-xs uppercase tracking-[0.4em] text-gold font-semibold">The Core Journey</p>
              <h1 className="text-4xl md:text-6xl text-white tracking-tight">
                Born in Nellai.
                <br />
                <span className="italic text-gray-400 font-light">Refined in London.</span>
              </h1>
              <div className="w-20 h-[2px] bg-gold" />
              <p className="text-gray-300 font-light leading-relaxed text-lg">
                From childhood automotive dreams sparked in Tamil Nadu to navigating high-stakes hypercar acquisition
                networks across Europe, Imperium Motors represents an unbroken timeline of absolute personal integrity
                and relationship curation.
              </p>
              <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div className="border-l-2 border-gold/40 pl-4 space-y-2">
                  <h2 className="text-white font-medium tracking-wide">Our Strategic Goal</h2>
                  <p className="text-sm text-gray-400 font-light">
                    To protect and enhance generational vehicular assets across specialized private transaction layers.
                  </p>
                </div>
                <div className="border-l-2 border-gold/40 pl-4 space-y-2">
                  <h2 className="text-white font-medium tracking-wide">The Chennai Hub Matrix</h2>
                  <p className="text-sm text-gray-400 font-light">
                    Direct custom logistic clearing infrastructure executing placement tasks accurately from OMR
                    coordinates.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative group overflow-hidden border border-white/10">
                <Image
                  src="/assets/images/FRONT_OFFICE.png"
                  alt="Front Office Lounge Hub"
                  width={600}
                  height={550}
                  loading="lazy"
                  className="w-full h-[550px] object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 text-left">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Enclave Headquarters</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
