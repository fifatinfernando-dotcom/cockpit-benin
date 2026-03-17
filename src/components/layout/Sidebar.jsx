import { useLocation, useNavigate } from "react-router-dom";

const menus = [
  { label: "Dashboard", icone: "⚡", path: "/" },
  { label: "Production", icone: "🏭", path: "/production" },
  { label: "Réseau HT", icone: "🔌", path: "/reseau" },
  { label: "Postes", icone: "🗼", path: "/postes" },
  { label: "Alertes", icone: "🔔", path: "/alertes" },
  { label: "Prévisions", icone: "📈", path: "/previsions" },
  { label: "Import Excel", icone: "📂", path: "/import" },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{
      width: "220px",
      minHeight: "100vh",
      background: "#0d1b2a",
      padding: "0",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}>
      <div style={{ padding: "20px 16px 16px", borderBottom: "0.5px solid #1e3a5f" }}>
        <div style={{ fontSize: "15px", fontWeight: "600", color: "white" }}>⚡ Cockpit Bénin</div>
        <div style={{ fontSize: "11px", color: "#5a8ab0", marginTop: "3px" }}>SBPE / CEB</div>
      </div>

      <nav style={{ padding: "12px 8px", flex: 1 }}>
        {menus.map((m) => {
          const actif = location.pathname === m.path;
          return (
            <div
              key={m.path}
              onClick={() => navigate(m.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "2px",
                background: actif ? "#185FA5" : "transparent",
                color: actif ? "white" : "#8ab4d4",
                fontSize: "13px",
                fontWeight: actif ? "500" : "400",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => { if (!actif) e.currentTarget.style.background = "#1e3a5f"; }}
              onMouseLeave={e => { if (!actif) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: "16px" }}>{m.icone}</span>
              {m.label}
            </div>
          );
        })}
      </nav>

      <div style={{ padding: "12px 16px", borderTop: "0.5px solid #1e3a5f" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#3B6D11", animation: "blink 1.4s infinite" }} />
          <span style={{ fontSize: "11px", color: "#5a8ab0" }}>Temps réel actif</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;