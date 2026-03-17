import { centrales as centralesLocales } from "../../data/donnees";

function ListeCentrales({ centralesApi }) {
  const centrales = centralesApi && centralesApi.length > 0 ? centralesApi : centralesLocales;

  const couleurEtat = {
    "En marche": { bg: "#e8f5e2", color: "#3B6D11" },
    "Réduite":   { bg: "#fef3e2", color: "#BA7517" },
    "Arrêtée":   { bg: "#fde8e8", color: "#A32D2D" },
    "En ligne":  { bg: "#e8f0fb", color: "#185FA5" },
  };

  return (
    <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "16px 20px" }}>
      <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
        Centrales & imports
      </div>
      {centrales.map((c) => {
        const pct = Math.round((c.actuelle / c.installee) * 100);
        const style = couleurEtat[c.etat] || { bg: "#eee", color: "#888" };
        return (
          <div key={c.nom} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "0.5px solid #f0f0f0" }}>
            <div style={{ minWidth: "130px" }}>
              <div style={{ fontSize: "13px", fontWeight: "500" }}>{c.nom}</div>
              <div style={{ fontSize: "11px", color: "#888" }}>{c.type} · {c.installee} MW inst.</div>
            </div>
            <div style={{ flex: 1, margin: "0 16px" }}>
              <div style={{ height: "5px", background: "#f0f0f0", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: style.color, borderRadius: "3px" }} />
              </div>
            </div>
            <div style={{ textAlign: "right", minWidth: "100px" }}>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>{c.actuelle} MW</div>
              <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "10px", background: style.bg, color: style.color, fontWeight: "500" }}>
                {c.etat}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListeCentrales;