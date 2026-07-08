import { useEffect } from "react";

export default function MenuDrawer({ open, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <div
        className={`drawer-overlay ${open ? "active" : ""}`}
        onClick={onClose}
      />

      <aside className={`menu-drawer ${open ? "open" : ""}`}>
        <button className="drawer-close" onClick={onClose}>
          ×
        </button>

        <div className="drawer-brand">
          <h2>THE HOUSE OF IMPERIUM</h2>
          <p>Where Luxury Meets Legacy</p>
        </div>

        <nav className="drawer-nav">
          <a href="#">Our Identity</a>
          <a href="#">Services</a>
          <a href="#">The Vault</a>
          <a href="#">The Estates</a>
          <a href="#">Elite Circle</a>
          <a href="#">Private Enquiry</a>
        </nav>

        <div className="drawer-footer">
          <p>SOLI DEO GLORIA</p>
          <span>Glory to God Alone</span>
        </div>
      </aside>
    </>
  );
}