import { useState } from "react";
import { alertes } from "../data/donnees";

const tousLesFiltres = ["Tous", "Critique", "Attention", "Transport", "Poste", "Production", "Prévision", "Distribution"];

function Alertes() {
  const [filtre, setFiltre] = useState("Tous");

  const alertesFiltrees = alertes.filter((a) => {
    if (filtre === "Tous") return true;
    if (filtre === "Critique") return a.niveau === "critique";
    if (filtre === "Attention") return a.niveau === "attention";
    return a.categorie === filtre;
  });

  const styles = {
    critique: { dot: "#A32D2D", tagBg: "#fde8e8", tagColor: "#A32D2D", bordure: "#fca5a5" },
    attention: { dot: "#BA7517", tagBg: "#fef3e2", tagColor: "#BA7517", bordure: "#fcd34d" },
  };

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "1200px" }}>

      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>Module Alertes</h1>
        <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>Supervision proactive du réseau</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Total alertes", valeur: alertes.length, couleur: "#185FA5" },
          { label: "Critiques", valeur: alertes.filter(a => a.niveau === "critique").length, couleur: "#A32D2D" },
          { label: "Attention", valeur: alertes.filter(a => a.niveau === "attention").length, couleur: "#BA7517" },
          { label: "Résolues aujourd'hui", valeur: 3, couleur: "#3B6D11" },
        ].map((k) => (
          <div key={k.label} style={{ background: "#f5f5f5", borderRadius: "8px", padding: "16px", position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>{k.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "500", color: k.couleur }}>{k.valeur}</div>
            <div style={{ position: "absolute", bottom: 0, left: 0, height: "3px", width: "80%", background: k.couleur, borderRadius: "0 2px 0 0" }} />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {tousLesFiltres.map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              border: "0.5px solid",
              borderColor: filtre === f ? "#185FA5" : "#e0e0e0",
              background: filtre === f ? "#185FA5" : "white",
              color: filtre === f ? "white" : "#555",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: filtre === f ? "500" : "400",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {alertesFiltrees.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#888", fontSize: "13px" }}>
            Aucune alerte pour ce filtre.
          </div>
        ) : (
          alertesFiltrees.map((a) => {
            const s = styles[a.niveau];
            return (
              <div key={a.id} style={{
                background: "white",
                border: `0.5px solid ${s.bordure}`,
                borderLeft: `4px solid ${s.dot}`,
                borderRadius: "10px",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", flex: 1 }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: s.dot, marginTop: "3px", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "500", marginBottom: "6px" }}>{a.titre}</div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", background: s.tagBg, color: s.tagColor, fontWeight: "500" }}>
                        {a.niveau.toUpperCase()}
                      </span>
                      <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", background: "#f5f5f5", color: "#888" }}>
                        {a.categorie}
                      </span>
                      <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", background: "#f5f5f5", color: "#888" }}>
                        {a.temps}
                      </span>
                    </div>
                  </div>
                </div>
                <button style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: "0.5px solid #e0e0e0",
                  background: "white",
                  color: "#555",
                  fontSize: "12px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}>
                  Acquitter
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Alertes;