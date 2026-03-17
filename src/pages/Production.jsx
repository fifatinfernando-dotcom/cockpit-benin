import { centrales as centralesLocales, productionCourbe } from "../data/donnees";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from "recharts";

const couleurEtat = {
  "En marche": { bg: "#e8f5e2", color: "#3B6D11" },
  "Réduite":   { bg: "#fef3e2", color: "#BA7517" },
  "Arrêtée":   { bg: "#fde8e8", color: "#A32D2D" },
  "En ligne":  { bg: "#e8f0fb", color: "#185FA5" },
};

function Production() {
  const centrales = centralesLocales;
  const totalInstalle = centrales.reduce((s, c) => s + c.installee, 0);
  const totalDisponible = centrales.reduce((s, c) => s + c.actuelle, 0);

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "1200px" }}>

      <style>{`
        .table-desktop { display: block; }
        .cards-mobile { display: none; }
        @media (max-width: 768px) {
          .table-desktop { display: none !important; }
          .cards-mobile { display: block !important; }
        }
      `}</style>

      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>Module Production</h1>
        <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>État des centrales en temps réel</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Puissance installée", valeur: totalInstalle, unite: "MW", couleur: "#185FA5" },
          { label: "Production actuelle", valeur: totalDisponible, unite: "MW", couleur: "#3B6D11" },
          { label: "Taux de disponibilité", valeur: Math.round((totalDisponible / totalInstalle) * 100), unite: "%", couleur: "#BA7517" },
        ].map((k) => (
          <div key={k.label} style={{ background: "#f5f5f5", borderRadius: "8px", padding: "16px", position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>{k.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "500" }}>{k.valeur}<span style={{ fontSize: "14px", color: "#888", marginLeft: "4px" }}>{k.unite}</span></div>
            <div style={{ position: "absolute", bottom: 0, left: 0, height: "3px", width: "80%", background: k.couleur, borderRadius: "0 2px 0 0" }} />
          </div>
        ))}
      </div>

      <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "16px 20px", marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
          État des centrales
        </div>

        <div className="table-desktop">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid #e0e0e0" }}>
                {["Centrale", "Type", "P. Installée", "P. Actuelle", "Taux", "État"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: "11px", color: "#888", fontWeight: "500" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {centrales.map((c) => {
                const pct = Math.round((c.actuelle / c.installee) * 100);
                const style = couleurEtat[c.etat] || { bg: "#eee", color: "#888" };
                return (
                  <tr key={c.nom} style={{ borderBottom: "0.5px solid #f5f5f5" }}>
                    <td style={{ padding: "12px" }}><strong>{c.nom}</strong></td>
                    <td style={{ padding: "12px", color: "#888" }}>{c.type}</td>
                    <td style={{ padding: "12px" }}>{c.installee} MW</td>
                    <td style={{ padding: "12px", fontWeight: "500" }}>{c.actuelle} MW</td>
                    <td style={{ padding: "12px", minWidth: "120px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ flex: 1, height: "5px", background: "#f0f0f0", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: style.color, borderRadius: "3px" }} />
                        </div>
                        <span style={{ fontSize: "11px", color: "#888", minWidth: "30px" }}>{pct}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "10px", background: style.bg, color: style.color, fontWeight: "500" }}>
                        {c.etat}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="cards-mobile">
          {centrales.map((c) => {
            const pct = Math.round((c.actuelle / c.installee) * 100);
            const style = couleurEtat[c.etat] || { bg: "#eee", color: "#888" };
            return (
              <div key={c.nom} style={{ padding: "12px", borderBottom: "0.5px solid #f0f0f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "500" }}>{c.nom}</div>
                    <div style={{ fontSize: "11px", color: "#888" }}>{c.type}</div>
                  </div>
                  <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "10px", background: style.bg, color: style.color, fontWeight: "500" }}>
                    {c.etat}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
                  <span style={{ color: "#888" }}>Installée: <strong>{c.installee} MW</strong></span>
                  <span style={{ color: "#888" }}>Actuelle: <strong style={{ color: style.color }}>{c.actuelle} MW</strong></span>
                </div>
                <div style={{ height: "5px", background: "#f0f0f0", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: style.color, borderRadius: "3px" }} />
                </div>
                <div style={{ fontSize: "11px", color: "#888", marginTop: "3px", textAlign: "right" }}>{pct}%</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
        <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
            Courbe de production — 24h
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={productionCourbe}>
              <defs>
                <linearGradient id="gProd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#185FA5" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#185FA5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="heure" tick={{ fontSize: 10, fill: "#888" }} />
              <YAxis tick={{ fontSize: 10, fill: "#888" }} unit=" MW" width={55} />
              <Tooltip formatter={(v) => [`${v} MW`, "Production"]} contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
              <Area type="monotone" dataKey="production" stroke="#185FA5" strokeWidth={2} fill="url(#gProd)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
            Production par centrale
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={centrales} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#888" }} unit=" MW" />
              <YAxis type="category" dataKey="nom" tick={{ fontSize: 10, fill: "#888" }} width={90} />
              <Tooltip formatter={(v) => [`${v} MW`]} contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
              <Bar dataKey="actuelle" fill="#185FA5" radius={[0, 4, 4, 0]} name="Production" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

export default Production;