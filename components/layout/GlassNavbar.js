export default function GlassNavbar() {
  return (
    <header className="imperium-header">
      <nav className="imperium-nav">

        <div className="nav-left">
          <button
            className="menu-button"
            aria-label="Open navigation"
          >
            ☰
          </button>
        </div>

        <div className="nav-center">

          {/* Add your shield later */}
          {/* <img
            src="/images/crest-gold.png"
            className="brand-logo"
            alt="Imperium Motors"
          /> */}

          <h1 className="brand-name">
            IMPERIUM MOTORS
          </h1>

          <p className="brand-subtitle">
            THE HOUSE OF IMPERIUM
          </p>

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