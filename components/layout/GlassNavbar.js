import { useState } from "react";
import MenuDrawer from "./MenuDrawer";

export default function GlassNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="imperium-header">
        <nav className="imperium-nav">

          <div className="nav-left">
            <button
              className="menu-button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
            >
              ☰
            </button>
          </div>

          <div className="nav-center">
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

      <MenuDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}