
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LazyPortfolioCard from '../components/LazyPortfolioCard';

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
    brand: 'pagani',
    label: '01 / Haute Couture',
    title: 'Pagani',
    description: 'Where fine Renaissance art blends flawlessly with raw Mercedes-AMG V12 track dominance.',
    image: '/assets/images/hypercars/pagani/pagani-01.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    alt: 'Pagani sports car',
  },
  {
    brand: 'koenigsegg',
    label: '02 / Hyper-Engineering',
    title: 'Koenigsegg',
    description: 'Pioneering speed barriers with revolutionary carbon-weave architecture and custom megawatt engineering.',
    image: '/assets/images/hypercars/koenigsegg/koenigsegg-jesko.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    alt: 'Koenigsegg Jesko',
  },
  {
    brand: 'ferrari',
    label: '03 / Heritage Track',
    title: 'Ferrari',
    description: 'The undisputed baseline of legacy speed investments, spanning classic legends to modern icons.',
    image: '/assets/images/hypercars/ferrari/ferrari-enzo.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    alt: 'Ferrari Enzo',
  },
  {
    brand: 'aston-martin',
    label: '04 / British Grand Tour',
    title: 'Aston Martin',
    description: 'Exquisite tailored aesthetic balance meeting computational performance dynamics.',
    image: '/assets/images/hypercars/aston-martin/aston-vantage.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    alt: 'Aston Martin car',
  },
  {
    brand: 'rolls-royce',
    label: '05 / Ultimate Comfort',
    title: 'Rolls-Royce',
    description: 'The pinnacle structural benchmark of uncompromised whisper-silent private travel luxury.',
    image: '/assets/images/hypercars/rolls-royce/rolls-royce-spirit-of-estacy.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    alt: 'Rolls-Royce Spirit of Ecstasy',
  },
  {
    brand: 'bugatti',
    label: '06 / Supreme Power',
    title: 'Bugatti',
    description: 'Uncompromising hypercar excellence defined by raw quad-turbocharged dominance and sculptural perfection.',
    image: '/assets/images/hypercars/bugatti/bugatti-chiron.webp',
    video: '/assets/video/bugatti-brouillard.mp4',
    alt: 'Bugatti Hypercar',
  },
  {
    brand: 'lamborghini',
    label: '07 / Italian Precision',
    title: 'Lamborghini',
    description: 'Aggressive design language paired with mid-engine performance and cutting-edge superlative engineering.',
    image: '/assets/images/hypercars/lamborghini/lamborghini-revuelto.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    alt: 'Lamborghini Revuelto',
  },
  {
    brand: 'maserati',
    label: '08 / Tridemte Legacy',
    title: 'Maserati',
    description: 'Where Italian motorsport heritage meets refined luxury and timeless design sophistication.',
    image: '/assets/images/hypercars/maserati/maserati-mc20.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    alt: 'Maserati MC20',
  },
  {
    brand: 'bentley',
    label: '09 / British Heritage',
    title: 'Bentley',
    description: 'Continental elegance fused with blistering acceleration and ultra-luxury craftsmanship.',
    image: '/assets/images/hypercars/bentley/bentley-continental.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    alt: 'Bentley Continental',
  },
  {
    brand: 'mansory',
    label: '10 / High Customization',
    title: 'Mansory',
    description: 'Bespoke carbon modifications redefining visual impact and presence on structural super-assets.',
    image: '/assets/images/hypercars/mansory/mansory-jesko.webp',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    alt: 'Mansory custom car',
  },
];
const brandFilters = [
  { id: 'pagani', label: 'Pagani', logo: '/assets/logo/pagani-logo.webp' },
  { id: 'koenigsegg', label: 'Koenigsegg', logo: '/assets/logo/koenigsegg-logo.webp' },
  { id: 'ferrari', label: 'Ferrari', logo: '/assets/logo/ferrari-logo.webp' },
  { id: 'aston-martin', label: 'Aston Martin', logo: '/assets/logo/aston-martin-white-logo.webp' },
  { id: 'rolls-royce', label: 'Rolls-Royce', logo: '/assets/logo/rolls-royce-white-logo.webp' },
  { id: 'bugatti', label: 'Bugatti', logo: '/assets/logo/bugatti-logo-new-1.webp' },
  { id: 'lamborghini', label: 'Lamborghini', logo: '/assets/logo/lamborghini_shield-logo.webp' },
  { id: 'maserati', label: 'Maserati', logo: '/assets/logo/maserati-logo.webp' },
  { id: 'bentley', label: 'Bentley', logo: '/assets/logo/bentley-white-logo.webp' },
  { id: 'mansory', label: 'Mansory', logo: '/assets/logo/mansory_logo.svg.webp' },
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

export default function Home({ portfolioImages }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    const logoWrapper = document.getElementById('intro-shield-wrapper');
    const introTextTitle = document.getElementById('imperium-title');
    const introTextSub = document.getElementById('legacy-text');
    const introOverlay = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const navText = document.getElementById('nav-brand-text');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = Boolean(connection && connection.saveData);
    const slowConnection = Boolean(
      connection && typeof connection.effectiveType === 'string' && /(^2g$|slow-2g)/.test(connection.effectiveType)
    );
    const hasSeenIntro = window.sessionStorage.getItem('im-intro-seen') === '1';
    const shouldSkipIntro = reduceMotion || saveData || slowConnection || hasSeenIntro;

    if (shouldSkipIntro) {
      if (mainContent) mainContent.classList.add('visible');
      if (introOverlay) introOverlay.style.display = 'none';
      if (navText) navText.classList.add('show-nav-text');
      document.body.classList.remove('intro-active');
      return () => {
        document.body.classList.remove('intro-active');
      };
    }

    document.body.classList.add('intro-active');

    const runCinematicIntro = () => {
      if (introTextTitle) introTextTitle.classList.add('fade-out-text');
      if (introTextSub) introTextSub.classList.add('fade-out-text');

      setTimeout(() => {
        if (logoWrapper) logoWrapper.classList.add('fly-to-corner');
        if (introOverlay) introOverlay.style.opacity = '0';
        if (mainContent) mainContent.classList.add('visible');

        setTimeout(() => {
          if (introOverlay) introOverlay.style.display = 'none';
          window.sessionStorage.setItem('im-intro-seen', '1');
          document.body.classList.remove('intro-active');
        }, 800);
      }, 300);
    };

    const introTimer = window.setTimeout(runCinematicIntro, 800);
    const navTimer = window.setTimeout(() => {
      if (navText) navText.classList.add('show-nav-text');
    }, 1400);

    return () => {
      window.clearTimeout(introTimer);
      window.clearTimeout(navTimer);
      document.body.classList.remove('intro-active');
      if (introOverlay) {
        introOverlay.style.display = '';
        introOverlay.style.opacity = '';
      }
      if (mainContent) mainContent.classList.remove('visible');
      if (logoWrapper) logoWrapper.classList.remove('fly-to-corner');
      if (navText) navText.classList.remove('show-nav-text');
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    reveals.forEach(el => observer.observe(el));

    const mediaItems = Array.from(document.querySelectorAll('.portfolio-media'));
    const mediaHandlers = mediaItems.map(item => {
      const video = item.querySelector('video');
      if (!video) return null;
      const enter = () => {
        video.muted = true;
        video.play().catch(() => {});
      };
      const leave = () => {
        video.pause();
        video.currentTime = 0;
      };
      item.addEventListener('mouseenter', enter);
      item.addEventListener('mouseleave', leave);
      return { item, enter, leave };
    });

    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cursor = supportsFinePointer ? document.getElementById('cursor') : null;
    const ring = supportsFinePointer ? document.getElementById('cursorRing') : null;
    const interactiveElements = Array.from(
      document.querySelectorAll('a, button, input, textarea, select, .brand-btn, .nav-toggle, .mobile-nav-link')
    );

    let lastUpdateTime = 0;
    const throttleDelay = 16; // ~60fps

    const updatePosition = event => {
      const now = Date.now();
      if (now - lastUpdateTime < throttleDelay) return;
      lastUpdateTime = now;

      const x = event.clientX;
      const y = event.clientY;
      if (cursor && ring) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        ring.style.left = `${x}px`;
        ring.style.top = `${y}px`;
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

    if (supportsFinePointer) {
      document.addEventListener('mousemove', updatePosition);
      document.addEventListener('mouseleave', hideCursor);
      document.addEventListener('mouseenter', showCursor);
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', addHoverState);
        element.addEventListener('mouseleave', removeHoverState);
      });
    }

    return () => {
      observer.disconnect();
      mediaHandlers.forEach(handler => {
        if (!handler) return;
        handler.item.removeEventListener('mouseenter', handler.enter);
        handler.item.removeEventListener('mouseleave', handler.leave);
      });
      if (supportsFinePointer) {
        document.removeEventListener('mousemove', updatePosition);
        document.removeEventListener('mouseleave', hideCursor);
        document.removeEventListener('mouseenter', showCursor);
        interactiveElements.forEach(element => {
          element.removeEventListener('mouseenter', addHoverState);
          element.removeEventListener('mouseleave', removeHoverState);
        });
      }
    };
  }, []);

  const handleFilterClick = filter => {
    setActiveBrand(filter);
    setMobileMenuOpen(false);
  };

  const handleHeroBrandClick = filter => {
    setActiveBrand(filter);
    setMobileMenuOpen(false);
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Head>
        <title>IMPERIUM MOTORS | Where Luxury Meets Legacy</title>
        <meta
          name="description"
          content="Imperium Motors — Exclusive hypercar acquisition, rare automotive investments and bespoke concierge services for discerning global collectors."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Script id="tailwind-config" strategy="afterInteractive">
        {`window.tailwind = window.tailwind || {}; window.tailwind.config = { theme: { extend: { colors: { gold: '#d4af37' } } } };`}
      </Script>
      <Script src="https://cdn.tailwindcss.com" strategy="afterInteractive" />

      <div id="intro-shield-wrapper">
        <div id="intro-logo-stack" aria-label="Imperium Motors crest">
          <img src="/assets/logo/i_SDG.png" id="intro-logo-center" alt="Soli Deo Gloria mark" />
          <img src="/assets/logo/SHIELD_ONLY.png" id="intro-shield-frame" alt="Imperium Sovereign Crest" />
        </div>
        <img src="/assets/logo/IMPERIUM_MOTORS_NOSHIELD.png" id="nav-brand-text" alt="IMPERIUM MOTORS" />
      </div>

      <div id="intro-screen">
        <div className="h-32 md:h-48" />
        <img src="/assets/logo/IMPERIUM_MOTORS_NOSHIELD.png" id="imperium-title" alt="IMPERIUM MOTORS" />
        <div id="legacy-text" className="cursive-font">Soli Deo Gloria</div>
      </div>

      <div id="main-content">
        <nav className="site-nav fixed w-full z-50 top-0 left-0">
          <div className="nav-inner flex items-center justify-between px-6 md:px-16 py-4">
            <div className="flex items-center gap-4">
              <div className="nav-branding-zone">
                <div className="w-[160px] h-[160px] bg-transparent flex-shrink-0" />
              </div>
            </div>

            <button
              className={`nav-toggle lg:hidden ${mobileMenuOpen ? 'active' : ''}`}
              id="mobile-nav-toggle"
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(prev => !prev)}
            >
              <span />
              <span />
              <span />
            </button>

            <div className="nav-links hidden lg:flex space-x-10 uppercase text-[11px] tracking-[0.3em] font-medium items-center">
              <Link href="/identity" className="text-gray-300 hover:text-white transition">Our Identity</Link>
              <Link href="/services" className="text-gray-300 hover:text-white transition">Services</Link>
              <a href="#portfolio" className="text-gray-300 hover:text-white transition">The Vault</a>
              <Link href="/estates" className="text-gray-300 hover:text-white transition">The Estates</Link>
              <a href="#club" className="text-gray-300 hover:text-white transition">Elite Circle</a>
              <a href="#appointment" className="px-5 py-2.5 border border-gold text-white hover:bg-gold hover:text-black transition duration-300">Private Briefing</a>
            </div>
          </div>
        </nav>

        <div className={`mobile-menu ${mobileMenuOpen ? '' : 'hidden'}`} id="mobile-menu">
          <div className="mobile-menu-inner">
            <Link href="/identity" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Our Identity</Link>
            <Link href="/services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <a href="#portfolio" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>The Vault</a>
            <Link href="/estates" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>The Estates</Link>
            <a href="#club" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Elite Circle</a>
            <a href="#appointment" className="mobile-menu-cta" onClick={() => setMobileMenuOpen(false)}>Private Briefing</a>
          </div>
        </div>

        <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 bg-black overflow-visible">
          <div className="absolute inset-0 z-0 opacity-40 overflow-hidden">
            <Image
              src="/assets/images/gear_pagani.webp"
              alt="Showroom Infrastructure"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-black/30 to-black/80 z-10" />
          <div className="relative z-20 max-w-4xl mx-auto px-4 mt-16 hero-copy">
            <p className="uppercase tracking-[0.6em] text-xs md:text-sm mb-4 text-gold font-semibold">Soli Deo Gloria</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 pb-2 text-white tracking-tight hero-heading">
              Where <span className="italic font-light gold-gradient">Luxury</span> Meets{' '}
              <span className="italic font-light gold-gradient">Legacy</span>
            </h2>
            <div className="w-16 h-[1px] bg-gold/50 mx-auto mb-6" />
            <p className="text-sm md:text-base max-w-xl mx-auto font-light text-gray-300 tracking-wide leading-relaxed mb-8">
              Connecting discerning global visionaries through the procurement of the world&apos;s rarest automotive investments. Built on absolute privacy.
            </p>
            <div className="hero-actions">
              <a href="#appointment" className="bg-gold text-black px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300">Secure Entry</a>
              <a href="#portfolio" className="border border-white/20 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:border-gold transition-all duration-300">View Vault</a>
            </div>
          </div>
          <div className="hero-brand-float-panel">
            <div className="hero-brand-float-grid">
              {brandFilters
                .map(filter => (
                  <button
                    type="button"
                    key={filter.id}
                    className={`brand-grid-item ${activeBrand === filter.id ? 'active' : ''}`}
                    onClick={() => handleHeroBrandClick(filter.id)}
                    aria-label={`Explore ${filter.label}`}
                  >
                    <img src={filter.logo} alt={filter.label} className="brand-grid-logo" />
                  </button>
                ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-32 bg-black border-y border-white/5 reveal">
          <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4 font-semibold">The Asset Portfolio</p>
            <h2 className="text-4xl md:text-6xl text-white font-medium mb-4">The Curated Icons</h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto mb-20 text-sm md:text-base">
              An overview of hypercars engineered by visionaries, procured exclusively through Imperium channels.
            </p>

            <div id="inventory" className="mb-20">
              <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4 font-semibold">Live Inventory</p>
              <h3 className="text-3xl md:text-5xl text-white font-medium mb-4">Current Showcase</h3>
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
                      <h4 className="text-2xl text-white font-semibold mb-3">{item.model || item.name || 'Signature Vehicle'}</h4>
                      <p className="text-gray-400 leading-relaxed text-sm">{item.description || item.summary || 'A rare automotive showcase asset available for discreet inquiry.'}</p>
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
              {[{ id: 'all', label: 'All' }, ...brandFilters].map(filter => (
                <button
                  type="button"
                  key={filter.id}
                  className={`brand-btn ${activeBrand === filter.id ? 'active' : ''}`}
                  onClick={() => handleFilterClick(filter.id)}
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

        <section id="club" className="py-36 bg-black relative border-t border-white/5">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="/assets/images/ELITE_MEMBERS_CLUB.png"
              alt="Elite Members Lounge Core"
              fill
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/90 z-10" />
          <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-8">
            <Image src="/assets/logo/SHIELD.png" alt="Sovereign Crest" width={80} height={80} className="h-20 mx-auto opacity-80 crest-glow" />
            <p className="text-xs uppercase tracking-[0.5em] text-gold font-bold">The Imperium Legacy Circle</p>
            <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight">Strictly By Invitation Only</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto" />
            <p className="text-gray-400 font-light max-w-2xl mx-auto text-base leading-relaxed">
              Access to hidden hyper-assets or unlisted off-market collection transfers requires active peer nomination profiles.
            </p>
            <div className="pt-6" id="appointment">
              <a href="#appointment-form" className="border border-gold text-gold hover:bg-gold hover:text-black font-semibold uppercase text-xs tracking-[0.3em] px-12 py-4 transition duration-300">Propose Membership</a>
            </div>
            <div id="appointment-form" className="max-w-4xl mx-auto border border-white/10 p-8 md:p-16 bg-[#080808]/60 backdrop-blur-md relative mt-12 text-left">
              <div className="text-center space-y-4 mb-12">
                <p className="text-xs uppercase tracking-[0.4em] text-gold font-semibold">Strictly Protocol</p>
                <h3 className="text-3xl md:text-5xl text-white serif-font">Request Private Briefing</h3>
                <p className="text-sm text-gray-400 font-light">Visits to physical estate parameters are processed strictly through 48h corporate protocols.</p>
              </div>
              <form action="https://formspree.io/f/YOUR_ID" method="POST" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">Full Legal Name</label>
                    <input type="text" required className="w-full bg-black border border-white/10 focus:border-gold px-4 py-3.5 text-white outline-none transition text-sm font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">Secure Digital Coordinates (Email)</label>
                    <input type="email" required className="w-full bg-black border border-white/10 focus:border-gold px-4 py-3.5 text-white outline-none transition text-sm font-light" />
                  </div>
                </div>
                <div className="text-center pt-4">
                  <button type="submit" className="w-full sm:w-auto bg-gold text-black font-bold uppercase text-xs tracking-[0.3em] px-16 py-4 hover:bg-white transition duration-300">
                    Transmit Credentials
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <footer className="bg-[#0d0d0d] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-5">
              <div>
                <p className="text-white font-semibold tracking-[0.35em] text-sm uppercase">Imperium</p>
                <p className="text-gray-500 tracking-[0.25em] text-[9px] uppercase mt-0.5">Motors · imperiummotors.co.uk</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs">Where Luxury Meets Legacy. Exclusive hypercar sourcing, rare automotive investments and bespoke concierge for discerning global collectors.</p>
              <div className="flex gap-3 pt-2">
                <a href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-gray-500 hover:border-gold hover:text-gold transition text-[10px] font-semibold tracking-wider">IG</a>
                <a href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-gray-500 hover:border-gold hover:text-gold transition text-[10px] font-semibold tracking-wider">FB</a>
                <a href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-gray-500 hover:border-gold hover:text-gold transition text-[10px] font-semibold tracking-wider">LI</a>
                <a href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-gray-500 hover:border-gold hover:text-gold transition text-[10px] font-semibold tracking-wider">YT</a>
              </div>
            </div>
            <div className="space-y-5">
              <p className="text-[9px] uppercase tracking-[0.4em] text-gold font-semibold">Discover</p>
              <ul className="space-y-3">
                <li><Link href="/vault" className="text-xs text-gray-400 hover:text-white transition tracking-wide">Collection</Link></li>
                <li><Link href="/vault#inventory" className="text-xs text-gray-400 hover:text-white transition tracking-wide">Recently Sold</Link></li>
                <li><Link href="/identity#core-journey" className="text-xs text-gray-400 hover:text-white transition tracking-wide">Investment Cars</Link></li>
                <li><Link href="/vault" className="text-xs text-gray-400 hover:text-white transition tracking-wide">Hypercars</Link></li>
                <li><a href="#club" className="text-xs text-gray-400 hover:text-white transition tracking-wide">Elite Circle</a></li>
              </ul>
            </div>
            <div className="space-y-5">
              <p className="text-[9px] uppercase tracking-[0.4em] text-gold font-semibold">Services</p>
              <ul className="space-y-3">
                <li><Link href="/services#private-acquisition" className="text-xs text-gray-400 hover:text-white transition tracking-wide">Private Acquisition</Link></li>
                <li><Link href="/services#investment-advisory" className="text-xs text-gray-400 hover:text-white transition tracking-wide">Investment Advisory</Link></li>
                <li><Link href="/services#legacy-advisory" className="text-xs text-gray-400 hover:text-white transition tracking-wide">Legacy Advisory</Link></li>
                <li><Link href="/services#asset-protection" className="text-xs text-gray-400 hover:text-white transition tracking-wide">Asset Protection</Link></li>
                <li><Link href="/services#international-delivery" className="text-xs text-gray-400 hover:text-white transition tracking-wide">International Delivery</Link></li>
              </ul>
            </div>
            <div className="space-y-5">
              <p className="text-[9px] uppercase tracking-[0.4em] text-gold font-semibold">Contact</p>
              <ul className="space-y-3">
                <li><a href="mailto:info@imperiummotors.co.uk" className="text-xs text-gray-400 hover:text-gold transition tracking-wide">info@imperiummotors.co.uk</a></li>
                <li className="pt-2"><a href="tel:+919940923510" className="text-xs text-gray-400 hover:text-gold transition tracking-wide">🇮🇳 +91 99409 23510</a></li>
                <li><a href="tel:+447727298836" className="text-xs text-gray-400 hover:text-gold transition tracking-wide">🇬🇧 +44 7727 298836</a></li>
              </ul>
              <div className="pt-2 space-y-1">
                <p className="text-xs text-gray-600">Chennai HQ</p>
                <p className="text-xs text-gray-600">London Procurement Hub</p>
                <p className="text-xs text-gray-600">Strictly Confidential</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 py-8 text-center space-y-3">
            <div className="cursive-font text-3xl gold-gradient">Soli Deo Gloria</div>
            <div className="w-10 h-[1px] bg-gold/30 mx-auto" />
          </div>

          <div className="border-t border-white/5 py-5 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-3 max-w-7xl mx-auto">
            <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase">© 2026 Imperium Motors Ltd. All Legacy Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-[10px] text-gray-600 hover:text-gold transition tracking-wide">Privacy Policy</a>
              <a href="#" className="text-[10px] text-gray-600 hover:text-gold transition tracking-wide">Terms & Conditions</a>
              <a href="#" className="text-[10px] text-gray-600 hover:text-gold transition tracking-wide">Cookie Policy</a>
            </div>
          </div>
        </footer>
      </div>

      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      <a
        href="#appointment"
        className="floating-contact-icon"
        title="Request Private Briefing"
        aria-label="Contact Button"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="floating-icon-svg"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </a>
    </>
  );
}
