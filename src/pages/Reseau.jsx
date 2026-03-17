import { useState } from "react";

const postes = [
  { id: "malanville", nom: "Malanville", x: 320, y: 30, tension: 161, charge: 40, etat: "Normal" },
  { id: "parakou", nom: "Parakou", x: 280, y: 150, tension: 162.1, charge: 65, etat: "Normal" },
  { id: "natitingou", nom: "Natitingou", x: 80, y: 160, tension: 163.5, charge: 40, etat: "Normal" },
  { id: "bohicon", nom: "Bohicon", x: 240, y: 290, tension: 151.8, charge: 88, etat: "Attention" },
  { id: "cotonou", nom: "Cotonou", x: 280, y: 400, tension: 148.0, charge: 94, etat: "Critique" },
  { id: "lokossa", nom: "Lokossa", x: 120, y: 380, tension: 160.2, charge: 55, etat: "Normal" },
];

const lignes = [
  { de: "malanville", vers: "parakou", flux: 45, charge: 92, label: "45 MW" },
  { de: "parakou", vers: "natitingou", flux: 12, charge: 40, label: "12 MW" },
  { de: "parakou", vers: "bohicon", flux: 80, charge: 65, label: "80 MW" },
  { de: "bohicon", vers: "cotonou", flux: 120, charge: 88, label: "120 MW" },
  { de: "bohicon", vers: "lokossa", flux: 35, charge: 55, label: "35 MW" },
  { de: "lokossa", vers: "cotonou", flux: 25, charge: 45, label: "25 MW" },
];

function couleurCharge(charge) {
  if (charge > 90) return "#A32D2D";
  if (charge > 70) return "#BA7517";
  return "#3B6D11";
}

function couleurPoste(etat) {
  if (etat === "Critique") return { bg: "#fde8e8", border: "#A32D2D", text: "#A32D2D" };
  if (etat === "Attention") return { bg: "#fef3e2", border: "#BA7517", text: "#BA7517" };
  return { bg: "#e8f5e2", border: "#3B6D11", text: "#3B6D11" };
}

function Reseau() {
  const [posteSelectionne, setPosteSelectionne] = useState(null);
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);

  const posteMap = Object.fromEntries(postes.map(p => [p.id, p]));

  const posteInfo = posteSelectionne ? postes.find(p => p.id === posteSelectionne) : null;
  const ligneInfo = ligneSelectionnee ? lignes.find(l => `${l.de}-${l.vers}` === ligneSelectionnee) : null;

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "1200px" }}>

      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>Module Réseau HT</h1>
        <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>Carte schématique — Réseau 161 kV Bénin</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Lignes surveillées", valeur: lignes.length, couleur: "#185FA5" },
          { label: "Surcharges critiques", valeur: lignes.filter(l => l.charge > 90).length, couleur: "#A32D2D" },
          { label: "Postes en attention", valeur: postes.filter(p => p.etat !== "Normal").length, couleur: "#BA7517" },
          { label: "Postes normaux", valeur: postes.filter(p => p.etat === "Normal").length, couleur: "#3B6D11" },
        ].map((k) => (
          <div key={k.label} style={{ background: "#f5f5f5", borderRadius: "8px", padding: "16px", position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>{k.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "500", color: k.couleur }}>{k.valeur}</div>
            <div style={{ position: "absolute", bottom: 0, left: 0, height: "3px", width: "80%", background: k.couleur, borderRadius: "0 2px 0 0" }} />
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "16px" }}>

        <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
            Carte du réseau — cliquez sur un poste ou une ligne
          </div>

          <svg viewBox="0 0 420 450" style={{ width: "100%", height: "420px" }}>
            {lignes.map((l) => {
              const de = posteMap[l.de];
              const vers = posteMap[l.vers];
              const id = `${l.de}-${l.vers}`;
              const selectionne = ligneSelectionnee === id;
              const mx = (de.x + vers.x) / 2;
              const my = (de.y + vers.y) / 2;
              return (
                <g key={id} onClick={() => { setLigneSelectionnee(id); setPosteSelectionne(null); }} style={{ cursor: "pointer" }}>
                  <line
                    x1={de.x} y1={de.y} x2={vers.x} y2={vers.y}
                    stroke={selectionne ? "#185FA5" : couleurCharge(l.charge)}
                    strokeWidth={selectionne ? 4 : 2.5}
                    strokeDasharray={l.charge > 90 ? "6 3" : "none"}
                  />
                  <rect x={mx - 18} y={my - 9} width={36} height={16} rx={4} fill="white" stroke={couleurCharge(l.charge)} strokeWidth={0.5} />
                  <text x={mx} y={my + 4} textAnchor="middle" fontSize={9} fill={couleurCharge(l.charge)} fontWeight="500">{l.label}</text>
                </g>
              );
            })}

            {postes.map((p) => {
              const c = couleurPoste(p.etat);
              const selectionne = posteSelectionne === p.id;
              return (
                <g key={p.id} onClick={() => { setPosteSelectionne(p.id); setLigneSelectionnee(null); }} style={{ cursor: "pointer" }}>
                  <circle cx={p.x} cy={p.y} r={selectionne ? 18 : 14} fill={c.bg} stroke={c.border} strokeWidth={selectionne ? 3 : 1.5} />
                  <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={8} fill={c.text} fontWeight="600">
                    {p.charge}%
                  </text>
                  <text x={p.x} y={p.y + 22} textAnchor="middle" fontSize={9} fill="#555" fontWeight="500">{p.nom}</text>
                </g>
              );
            })}
          </svg>

          <div style={{ display: "flex", gap: "16px", marginTop: "8px", fontSize: "11px", color: "#888" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "12px", height: "3px", background: "#3B6D11", display: "inline-block", borderRadius: "2px" }}></span>Normal &lt; 70%</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "12px", height: "3px", background: "#BA7517", display: "inline-block", borderRadius: "2px" }}></span>Attention 70-90%</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "12px", height: "3px", background: "#A32D2D", display: "inline-block", borderRadius: "2px" }}></span>Critique &gt; 90%</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {posteInfo && (
            <div style={{ background: "white", border: `0.5px solid ${couleurPoste(posteInfo.etat).border}`, borderRadius: "12px", padding: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                Poste sélectionné
              </div>
              <div style={{ fontSize: "16px", fontWeight: "500", marginBottom: "12px" }}>{posteInfo.nom}</div>
              {[
                { label: "Tension", valeur: `${posteInfo.tension} kV` },
                { label: "Nominal", valeur: "161 kV" },
                { label: "Charge", valeur: `${posteInfo.charge} %` },
                { label: "État", valeur: posteInfo.etat },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid #f5f5f5", fontSize: "13px" }}>
                  <span style={{ color: "#888" }}>{r.label}</span>
                  <span style={{ fontWeight: "500" }}>{r.valeur}</span>
                </div>
              ))}
            </div>
          )}

          {ligneInfo && (
            <div style={{ background: "white", border: `0.5px solid ${couleurCharge(ligneInfo.charge)}`, borderRadius: "12px", padding: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                Ligne sélectionnée
              </div>
              <div style={{ fontSize: "13px", fontWeight: "500", marginBottom: "12px" }}>
                {posteMap[ligneInfo.de].nom} → {posteMap[ligneInfo.vers].nom}
              </div>
              {[
                { label: "Flux", valeur: `${ligneInfo.flux} MW` },
                { label: "Charge", valeur: `${ligneInfo.charge} %` },
                { label: "État", valeur: ligneInfo.charge > 90 ? "Critique" : ligneInfo.charge > 70 ? "Attention" : "Normal" },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid #f5f5f5", fontSize: "13px" }}>
                  <span style={{ color: "#888" }}>{r.label}</span>
                  <span style={{ fontWeight: "500", color: couleurCharge(ligneInfo.charge) }}>{r.valeur}</span>
                </div>
              ))}
            </div>
          )}

          {!posteInfo && !ligneInfo && (
            <div style={{ background: "#f5f5f5", borderRadius: "12px", padding: "20px", textAlign: "center", color: "#888", fontSize: "13px" }}>
              Cliquez sur un poste ou une ligne pour voir les détails
            </div>
          )}

          <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
              Lignes principales
            </div>
            {lignes.map((l) => (
              <div key={`${l.de}-${l.vers}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "0.5px solid #f5f5f5", fontSize: "12px" }}>
                <span style={{ color: "#555" }}>{posteMap[l.de].nom} → {posteMap[l.vers].nom}</span>
                <span style={{ fontWeight: "500", color: couleurCharge(l.charge) }}>{l.charge}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reseau;