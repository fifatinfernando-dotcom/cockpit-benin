import { previsions } from "../data/donnees";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from "recharts";

const previsionsSemaine = [
  { jour: "Lun", demandeMax: 300, dispoPrevu: 280, statut: "Critique" },
  { jour: "Mar", demandeMax: 310, dispoPrevu: 265, statut: "Critique" },
  { jour: "Mer", demandeMax: 305, dispoPrevu: 280, statut: "Critique" },
  { jour: "Jeu", demandeMax: 300, dispoPrevu: 290, statut: "Attention" },
  { jour: "Ven", demandeMax: 295, dispoPrevu: 310, statut: "OK" },
  { jour: "Sam", demandeMax: 280, dispoPrevu: 310, statut: "OK" },
  { jour: "Dim", demandeMax: 270, dispoPrevu: 315, statut: "OK" },
];

function couleurStatut(statut) {
  if (statut === "Critique") return { bg: "#fde8e8", color: "#A32D2D" };
  if (statut === "Attention") return { bg: "#fef3e2", color: "#BA7517" };
  return { bg: "#e8f5e2", color: "#3B6D11" };
}

function Previsions() {
  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "1200px" }}>

      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>Module Prévisions</h1>
        <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>Demande, production et nominations J+1 / J+7</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Heure de pointe", valeur: "19h30", couleur: "#185FA5" },
          { label: "Demande estimée", valeur: "310 MW", couleur: "#BA7517" },
          { label: "Disponible prévu", valeur: "265 MW", couleur: "#3B6D11" },
          { label: "Déficit max prévu", valeur: "-45 MW", couleur: "#A32D2D" },
        ].map((k) => (
          <div key={k.label} style={{ background: "#f5f5f5", borderRadius: "8px", padding: "16px", position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>{k.label}</div>
            <div style={{ fontSize: "22px", fontWeight: "500", color: k.couleur }}>{k.valeur}</div>
            <div style={{ position: "absolute", bottom: 0, left: 0, height: "3px", width: "80%", background: k.couleur, borderRadius: "0 2px 0 0" }} />
          </div>
        ))}
      </div>

      <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "16px 20px", marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
          Prévisions J+1 — Courbe demande vs production (18h–22h)
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={previsions} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="heure" tick={{ fontSize: 11, fill: "#888" }} />
            <YAxis tick={{ fontSize: 11, fill: "#888" }} unit=" MW" width={60} />
            <Tooltip
              formatter={(v, name) => [`${v} MW`, name]}
              contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "0.5px solid #e0e0e0" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <ReferenceLine y={0} stroke="#e0e0e0" />
            <Bar dataKey="deficit" name="Déficit" fill="#fca5a5" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="demande" name="Demande" stroke="#BA7517" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="production" name="Production" stroke="#185FA5" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="nomination" name="Nomination CEB" stroke="#3B6D11" strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

        <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
            Détails prévisions heure par heure
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid #e0e0e0" }}>
                {["Heure", "Demande", "Production", "Nomination", "Déficit"].map(h => (
                  <th key={h} style={{ padding: "6px 8px", textAlign: "left", fontSize: "11px", color: "#888", fontWeight: "500" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previsions.map((p) => (
                <tr key={p.heure} style={{ borderBottom: "0.5px solid #f5f5f5" }}>
                  <td style={{ padding: "8px", fontWeight: "500" }}>{p.heure}</td>
                  <td style={{ padding: "8px" }}>{p.demande} MW</td>
                  <td style={{ padding: "8px" }}>{p.production} MW</td>
                  <td style={{ padding: "8px" }}>{p.nomination} MW</td>
                  <td style={{ padding: "8px", fontWeight: "500", color: p.deficit < 0 ? "#A32D2D" : "#3B6D11" }}>
                    {p.deficit > 0 ? "+" : ""}{p.deficit} MW
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
            Tendance hebdomadaire
          </div>
          {previsionsSemaine.map((j) => {
            const c = couleurStatut(j.statut);
            const deficit = j.dispoPrevu - j.demandeMax;
            return (
              <div key={j.jour} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "0.5px solid #f5f5f5" }}>
                <span style={{ fontSize: "13px", fontWeight: "500", minWidth: "35px" }}>{j.jour}</span>
                <div style={{ flex: 1, margin: "0 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#888", marginBottom: "3px" }}>
                    <span>Demande: {j.demandeMax} MW</span>
                    <span>Dispo: {j.dispoPrevu} MW</span>
                  </div>
                  <div style={{ height: "5px", background: "#f0f0f0", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min(100, Math.round((j.dispoPrevu / j.demandeMax) * 100))}%`, background: c.color, borderRadius: "3px" }} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "500", color: deficit < 0 ? "#A32D2D" : "#3B6D11", minWidth: "55px", textAlign: "right" }}>
                    {deficit > 0 ? "+" : ""}{deficit} MW
                  </span>
                  <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "10px", background: c.bg, color: c.color, fontWeight: "500" }}>
                    {j.statut}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default Previsions;