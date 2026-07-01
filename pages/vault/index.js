import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import LazyPortfolioCard from '../../components/LazyPortfolioCard';

async function getInventoryData() {
  try {
    const response = await fetch('/api/inventory');
    if (!response.ok) {
      throw new Error(`Inventory fetch failed: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load inventory:', error);
    return [];
  }
}

const portfolioCards = [
  {
    brand: 'koenigsegg',
    label: '01 / Hyper-Engineering',
    title: 'Koenigsegg',
    description: 'Pioneering speed barriers with revolutionary carbon-weave architecture and custom megawatt engineering.',
    image: '/assets/images/hypercars/koenigsegg/koenigsegg-jesko.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    alt: 'Koenigsegg Jesko',
  },
  {
    brand: 'pagani',
    label: '02 / Haute Couture',
    title: 'Pagani',
    description: 'Where fine Renaissance art blends flawlessly with raw Mercedes-AMG V12 track dominance.',
    image: '/assets/images/hypercars/pagani/pagani-01.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    alt: 'Pagani sports car',
  },
  {
    brand: 'mansory',
    label: '03 / High Customization',
    title: 'Mansory',
    description: 'Bespoke carbon modifications redefining visual impact and presence on structural super-assets.',
    image: '/assets/images/hypercars/mansory/mansory-jesko.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    alt: 'Mansory custom car',
  },
  {
    brand: 'ferrari',
    label: '04 / Heritage Track',
    title: 'Ferrari',
    description: 'The undisputed baseline of legacy speed investments, spanning classic legends to modern icons.',
    image: '/assets/images/hypercars/ferrari/ferrari-enzo.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    alt: 'Ferrari Enzo',
  },
  {
    brand: 'aston-martin',
    label: '05 / British Grand Tour',
    title: 'Aston Martin',
    description: 'Exquisite tailored aesthetic balance meeting computational performance dynamics.',
    image: '/assets/images/hypercars/aston-martin/aston-vantage.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    alt: 'Aston Martin car',
  },
  {
    brand: 'rolls-royce',
    label: '06 / Ultimate Comfort',
    title: 'Rolls-Royce',
    description: 'The pinnacle structural benchmark of uncompromised whisper-silent private travel luxury.',
    image: '/assets/images/hypercars/rolls-royce/rolls-royce-spirit-of-estacy.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    alt: 'Rolls-Royce Spirit of Ecstasy',
  },
  {
    brand: 'bugatti',
    label: '07 / Supreme Power',
    title: 'Bugatti',
    description: 'Uncompromising hypercar excellence defined by raw quad-turbocharged dominance and sculptural perfection.',
    image: '/assets/images/hypercars/bugatti/bugatti-chiron.webp',
    video: '/assets/video/bugatti-brouillard.mp4',
    alt: 'Bugatti Hypercar',
  },
  {
    brand: 'lamborghini',
    label: '08 / Italian Precision',
    title: 'Lamborghini',
    description: 'Aggressive design language paired with mid-engine performance and cutting-edge superlative engineering.',
    image: '/assets/images/hypercars/lamborghini/lamborghini-revuelto.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    alt: 'Lamborghini Revuelto',
  },
  {
    brand: 'maserati',
    label: '09 / Tridemte Legacy',
    title: 'Maserati',
    description: 'Where Italian motorsport heritage meets refined luxury and timeless design sophistication.',
    image: '/assets/images/hypercars/maserati/maserati-mc20.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    alt: 'Maserati MC20',
  },
  {
    brand: 'bentley',
    label: '10 / British Heritage',
    title: 'Bentley',
    description: 'Continental elegance fused with blistering acceleration and ultra-luxury craftsmanship.',
    image: '/assets/images/hypercars/bentley/bentley-continental.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    alt: 'Bentley Continental',
  },
];

const brandFilters = [
  { id: 'all', label: 'All' },
  { id: 'koenigsegg', label: 'Koenigsegg' },
  { id: 'pagani', label: 'Pagani' },
  { id: 'mansory', label: 'Mansory' },
  { id: 'ferrari', label: 'Ferrari' },
  { id: 'aston-martin', label: 'Aston Martin' },
  { id: 'rolls-royce', label: 'Rolls-Royce' },
  { id: 'bugatti', label: 'Bugatti' },
  { id: 'lamborghini', label: 'Lamborghini' },
  { id: 'maserati', label: 'Maserati' },
  { id: 'bentley', label: 'Bentley' },
];

export async function getStaticProps() {
  const fs = (await import('fs')).default;
  const path = (await import('path')).default;

  const imagesRoot = path.join(process.cwd(), 'public', 'assets', 'images', 'hypercars');
  const portfolioImages = {};

  try {
    const brandDirs = await fs.promises.readdir(imagesRoot, { withFileTypes: true });
    const rotationIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const hashBrand = brand => [...brand].reduce((sum, char) => sum + char.charCodeAt(0), 0);

    for (const dirent of brandDirs) {
      if (!dirent.isDirectory()) continue;
      const brandFolder = path.join(imagesRoot, dirent.name);
      const files = await fs.promises.readdir(brandFolder);
      const validFiles = files
        .filter(file => !file.startsWith('.') && !file.startsWith('thumb'))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

      if (validFiles.length > 0) {
        const offset = hashBrand(dirent.name);
        const imageFile = validFiles[(rotationIndex + offset) % validFiles.length];
        portfolioImages[dirent.name] = `/assets/images/hypercars/${dirent.name}/${imageFile}`;
      }
    }
  } catch (error) {
    console.error('Failed to load hypercar images:', error);
  }

  return {
    props: { portfolioImages },
    revalidate: 86400,
  };
}

export default function VaultPage({ portfolioImages }) {
  const [activeBrand, setActiveBrand] = useState('all');
  const [inventory, setInventory] = useState([]);
  const [inventoryLoading, setInventoryLoading] = useState(true);
  const [inventoryError, setInventoryError] = useState(null);

  useEffect(() => {
    let mounted = true;
    getInventoryData().then(data => {
      if (!mounted) return;
      setInventory(data);
      setInventoryLoading(false);
      if (!data || data.length === 0) {
        setInventoryError('Inventory is temporarily unavailable.');
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    const interactiveElements = Array.from(
      document.querySelectorAll('a, button, input, textarea, select, .brand-btn')
    );

    let lastUpdateTime = 0;
    const throttleDelay = 16;

    const updatePosition = event => {
      const now = Date.now();
      if (now - lastUpdateTime < throttleDelay) return;
      lastUpdateTime = now;

      if (cursor && ring) {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        ring.style.left = `${event.clientX}px`;
        ring.style.top = `${event.clientY}px`;
        cursor.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const hideCursor = () => {
      if (cursor && ring) {
        cursor.style.opacity = '0';
        ring.style.opacity = '0';
      }
    };

    const showCursor = () => {
      if (cursor && ring) {
        cursor.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const addHoverState = () => {
      if (cursor && ring) {
        cursor.classList.add('cursor-hover');
        ring.classList.add('cursor-hover');
      }
    };

    const removeHoverState = () => {
      if (cursor && ring) {
        cursor.classList.remove('cursor-hover');
        ring.classList.remove('cursor-hover');
      }
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', addHoverState);
      element.addEventListener('mouseleave', removeHoverState);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', addHoverState);
        element.removeEventListener('mouseleave', removeHoverState);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>Imperium Motors | The Vault</title>
        <meta
          name="description"
          content="The Asset Portfolio, Curated Icons, and Live Inventory from Imperium Motors."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Script id="tailwind-config-vault" strategy="afterInteractive">
        {`window.tailwind = window.tailwind || {}; window.tailwind.config = { theme: { extend: { colors: { gold: '#d4af37' } } } };`}
      </Script>
      <Script src="https://cdn.tailwindcss.com" strategy="afterInteractive" />

      <main className="min-h-screen bg-black text-white">
        <header className="site-nav sticky top-0 z-40">
          <div className="nav-inner flex items-center justify-between px-6 md:px-16 py-4">
            <Link href="/" className="text-xs uppercase tracking-[0.35em] text-white">Imperium Motors</Link>
            <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em]">
              <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
              <Link href="/identity" className="text-gray-300 hover:text-white transition">Our Identity</Link>
              <Link href="/services" className="text-gray-300 hover:text-white transition">Services</Link>
              <Link href="/estates" className="text-gray-300 hover:text-white transition">The Estates</Link>
            </div>
          </div>
        </header>

        <section id="portfolio" className="py-24 bg-black border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4 font-semibold">The Asset Portfolio</p>
            <h1 className="text-4xl md:text-6xl text-white font-medium mb-4">The Curated Icons</h1>
            <p className="text-gray-400 font-light max-w-xl mx-auto mb-20 text-sm md:text-base">
              An overview of hypercars engineered by visionaries, procured exclusively through Imperium channels.
            </p>

            <div id="inventory" className="mb-20">
              <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4 font-semibold">Live Inventory</p>
              <h2 className="text-3xl md:text-5xl text-white font-medium mb-4">Current Showcase</h2>
              <p className="text-gray-400 font-light max-w-2xl mx-auto mb-12 text-sm md:text-base">
                Real-time inventory updates through our edge-powered inventory API.
              </p>

              {inventoryLoading ? (
                <p className="text-gray-400">Loading inventory...</p>
              ) : inventory.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inventory.map((item, index) => (
                    <article key={index} className="service-card text-left">
                      <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">{item.brand || 'Imperium Collection'}</p>
                      <h3 className="text-2xl text-white font-semibold mb-3">{item.model || item.name || 'Signature Vehicle'}</h3>
                      <p className="text-gray-400 leading-relaxed text-sm">
                        {item.description || item.summary || 'A rare automotive showcase asset available for discreet inquiry.'}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">
                  {inventoryError || 'No inventory data is available at this time.'}
                </div>
              )}
            </div>

            <div className="brand-filters flex flex-wrap justify-center gap-3 mb-12">
              {brandFilters.map(filter => (
                <button
                  type="button"
                  key={filter.id}
                  className={`brand-btn ${activeBrand === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveBrand(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioCards.map(card => (
                <LazyPortfolioCard
                  key={card.brand}
                  brand={card.brand}
                  card={card}
                  portfolioImages={portfolioImages}
                  activeBrand={activeBrand}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
    </>
  );
}
