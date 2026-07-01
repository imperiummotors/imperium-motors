import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function LazyPortfolioCard({ brand, card, portfolioImages, activeBrand }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  const isHidden = activeBrand !== 'all' && activeBrand !== card.brand;

  return (
    <div
      ref={cardRef}
      className={`group portfolio-card border border-white/5 bg-[#080808] p-8 hover:border-gold/40 transition duration-500 text-left space-y-4 reveal ${
        isHidden ? 'hidden' : ''
      }`}
      data-brand={card.brand}
    >
      {isVisible ? (
        <div className="portfolio-media">
          <Image
            src={portfolioImages[brand] || card.image}
            alt={card.alt}
            width={400}
            height={220}
            loading="lazy"
            className="w-full h-[220px] object-cover"
          />
          {isVisible && (
            <video
              muted
              loop
              playsInline
              preload="none"
              onMouseEnter={(e) => {
                e.target.muted = true;
                e.target.play().catch(() => {});
              }}
              onMouseLeave={(e) => {
                e.target.pause();
                e.target.currentTime = 0;
              }}
              className="absolute inset-0 w-full h-[220px] object-cover opacity-0 hover:opacity-100 transition"
            >
              <source src={card.video} type="video/mp4" />
            </video>
          )}
        </div>
      ) : (
        <div className="w-full h-[220px] bg-gray-900 animate-pulse rounded" />
      )}
      <div className="text-gold text-xs uppercase tracking-widest font-semibold">{card.label}</div>
      <h3 className="text-2xl text-white group-hover:text-gold transition">{card.title}</h3>
      <p className="text-sm text-gray-400 font-light leading-relaxed">{card.description}</p>
    </div>
  );
}
