import { useEffect, useState } from "react";

export default function GlassNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`imperium-header ${
        scrolled ? "imperium-header-scrolled" : ""
      }`}
    >
      <nav className="imperium-nav">

        <div className="nav-left">
          <button
            className="menu-button"
            aria-label="Open navigation menu"
          >
            ☰
          </button>
        </div>

        <div className="nav-center">

          <div className="brand-crest">
            IM
          </div>

          <div className="brand-text">

            <span className="brand-title">
              IMPERIUM MOTORS
            </span>

            <span className="brand-subtitle">
              The House of Imperium
            </span>

          </div>

        </div>

        <div className="nav-right">

          <button className="enquiry-button">
            Private Enquiry
          </button>

        </div>

      </nav>
    </header>
  );
}