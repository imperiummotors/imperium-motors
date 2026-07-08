export default function Hero() {
  return (
    <section className="hero">

      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/video/hero.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <p className="hero-kicker">
          BESPOKE AUTOMOTIVE ADVISORY
        </p>

        <h1 className="hero-title">
          WHERE LUXURY
          <br />
          MEETS LEGACY
        </h1>

        <p className="hero-text">
          Representing the world's most distinguished
          automotive marques through discretion,
          craftsmanship and enduring relationships.
        </p>

        <button className="hero-button">
          Enter The House of Imperium
        </button>

      </div>

    </section>
  );
}