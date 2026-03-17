import { postes, transformateurs } from "../data/donnees";

function couleurEtat(etat) {
  if (etat === "Surcharge") return { bg: "#fde8e8", color: "#A32D2D", border: "#fca5a5" };
  if (etat === "Attention") return { bg: "#fef3e2", color: "#BA7517", border: "#fcd34d" };
  return { bg: "#e8f5e2", color: "#3B6D11", border: "#86efac" };
}

function jaugeTension(tension, nominal) {
  const pct = Math.min(100, Math.round((tension / nominal) * 100));
  const couleur = tension < nominal * 0.95 ? "#A32D2D" : tension > nominal * 1.05 ? "#BA7517" : "#3B6D11";
  return { pct, couleur };
}

function Postes() {
  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "1200px" }}>

      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>Module Postes HTB</h1>
        <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>Tensions, transits et état des transformateurs</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Total postes", valeur: postes.length, couleur: "#185FA5" },
          { label: "Postes normaux", valeur: postes.filter(p => p.etat === "Normal").length, couleur: "#3B6D11" },
          { label: "En attention", valeur: postes.filter(p => p.etat === "Attention").length, couleur: "#BA7517" },
          { label: "Transformateurs", valeur: transformateurs.length, couleur: "#185FA5" },
        ].map((k) => (
          <div key={k.label} style={{ background: "#f5f5f5", borderRadius: "8px", padding: "16px", position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>{k.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "500", color: k.couleur }}>{k.valeur}</div>
            <div style={{ position: "absolute", bottom: 0, left: 0, height: "3px", width: "80%", background: k.couleur, borderRadius: "0 2px 0 0" }} />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
          Postes HTB — Tensions & Transits
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          {postes.map((p) => {
            const c = couleurEtat(p.etat);
            const jauge = jaugeTension(p.tension, p.nominal);
            return (
              <div key={p.nom} style={{ background: "white", border: `0.5px solid ${c.border}`, borderRadius: "12px", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: "500" }}>{p.nom}</div>
                    <div style={{ fontSize: "11px", color: "#888" }}>{p.poste}</div>
                  </div>
                  <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "10px", background: c.bg, color: c.color, fontWeight: "500" }}>
                    {p.etat}
                  </span>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "11px", color: "#888" }}>Tension</span>
                    <span style={{ fontSize: "13px", fontWeight: "500", color: jauge.couleur }}>{p.tension} kV</span>
                  </div>
                  <div style={{ height: "5px", background: "#f0f0f0", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${jauge.pct}%`, background: jauge.couleur, borderRadius: "3px" }} />
                  </div>
                  <div style={{ fontSize: "10px", color: "#888", marginTop: "3px" }}>Nominal : {p.nominal} kV</div>
                </div>

                <div style={{ borderTop: "0.5px solid #f0f0f0", paddingTop: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                    <span style={{ color: "#888" }}>Transit P</span>
                    <span style={{ fontWeight: "500" }}>{p.transitP} MW</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                    <span style={{ color: "#888" }}>Transit Q</span>
                    <span style={{ fontWeight: "500" }}>{p.transitQ} Mvar</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
          Transformateurs — Charge & Température
        </div>
        <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "16px 20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid #e0e0e0" }}>
                {["Transformateur", "Puissance", "Charge", "Température", "État"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: "11px", color: "#888", fontWeight: "500" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transformateurs.map((t) => {
                const c = couleurEtat(t.etat);
                const tempCouleur = t.temperature > 95 ? "#A32D2D" : t.temperature > 80 ? "#BA7517" : "#3B6D11";
                return (
                  <tr key={t.nom} style={{ borderBottom: "0.5px solid #f5f5f5" }}>
                    <td style={{ padding: "12px", fontWeight: "500" }}>{t.nom}</td>
                    <td style={{ padding: "12px", color: "#888" }}>{t.puissance} MVA</td>
                    <td style={{ padding: "12px", minWidth: "140px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ flex: 1, height: "5px", background: "#f0f0f0", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${t.charge}%`, background: c.color, borderRadius: "3px" }} />
                        </div>
                        <span style={{ fontSize: "11px", color: "#888", minWidth: "35px" }}>{t.charge}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px", fontWeight: "500", color: tempCouleur }}>{t.temperature} °C</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "10px", background: c.bg, color: c.color, fontWeight: "500" }}>
                        {t.etat}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Postes;