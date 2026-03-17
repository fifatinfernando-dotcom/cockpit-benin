import { useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f8f8" }}>

      <style>{`
        .mobile-topbar { display: none; }
        .sidebar-wrap { position: relative; }
        .mobile-overlay { display: none; }

        @media (max-width: 768px) {
          .mobile-topbar {
            display: flex !important;
            position: fixed;
            top: 0; left: 0; right: 0;
            height: 56px;
            background: #0d1b2a;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            z-index: 100;
          }
          .sidebar-wrap {
            position: fixed !important;
            top: 0; left: -220px;
            height: 100vh;
            transition: left 0.3s ease;
            z-index: 99;
          }
          .sidebar-wrap.open {
            left: 0 !important;
          }
          .mobile-overlay {
            display: block !important;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 98;
          }
          .main-content {
            padding-top: 56px;
            width: 100%;
          }
          .desktop-sidebar {
            display: none !important;
          }
        }
      `}</style>

      {/* Barre mobile en haut */}
      <div className="mobile-topbar">
        <div style={{ fontSize: "15px", fontWeight: "600", color: "white" }}>
          ⚡ Cockpit Bénin
        </div>
        <button
          onClick={() => setMenuOuvert(!menuOuvert)}
          style={{
            background: "none", border: "none",
            color: "white", fontSize: "24px", cursor: "pointer"
          }}
        >
          {menuOuvert ? "✕" : "☰"}
        </button>
      </div>

      {/* Overlay sombre quand menu ouvert */}
      {menuOuvert && (
        <div
          className="mobile-overlay"
          onClick={() => setMenuOuvert(false)}
        />
      )}

      {/* Sidebar mobile */}
      <div className={`sidebar-wrap ${menuOuvert ? "open" : ""}`}>
        <Sidebar onClose={() => setMenuOuvert(false)} />
      </div>

      {/* Sidebar desktop */}
      <div className="desktop-sidebar">
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <main className="main-content" style={{ flex: 1, overflow: "auto" }}>
        {children}
      </main>

    </div>
  );
}

export default Layout;