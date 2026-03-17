export const kpis = {
  productionTotale: 1240,
  chargeReseau: 89.4,
  frequence: 50.02,
  energieLivree: 4.2,
  alertesActives: 5,
  deficitPrevu: -45,
};

export const centrales = [
  { nom: "Maria-Gléta 2", type: "Gaz", installee: 80, actuelle: 75, etat: "En marche" },
  { nom: "Akpakpa", type: "Thermique", installee: 40, actuelle: 28, etat: "Réduite" },
  { nom: "Parakou", type: "Solaire/Th.", installee: 20, actuelle: 0, etat: "Arrêtée" },
  { nom: "Import CEB", type: "Interco", installee: 200, actuelle: 145, etat: "En ligne" },
];

export const alertes = [
  { id: 1, titre: "Surcharge — Ligne Bohicon-Parakou", niveau: "critique", categorie: "Transport", temps: "Il y a 2 min" },
  { id: 2, titre: "Tension hors limites — Poste Vedoko", niveau: "critique", categorie: "Poste", temps: "Il y a 15 min" },
  { id: 3, titre: "Arrêt inopiné — Maria-Gléta G3", niveau: "critique", categorie: "Production", temps: "Il y a 45 min" },
  { id: 4, titre: "Déficit prévu — Pointe 18h00", niveau: "attention", categorie: "Prévision", temps: "À venir" },
  { id: 5, titre: "Transformateur T2 Bohicon — 87%", niveau: "attention", categorie: "Distribution", temps: "Il y a 1h" },
];

export const productionCourbe = [
  { heure: "00h", production: 820, demande: 780 },
  { heure: "02h", production: 800, demande: 760 },
  { heure: "04h", production: 790, demande: 750 },
  { heure: "06h", production: 810, demande: 780 },
  { heure: "08h", production: 870, demande: 860 },
  { heure: "10h", production: 950, demande: 930 },
  { heure: "12h", production: 1050, demande: 1020 },
  { heure: "14h", production: 1180, demande: 1150 },
  { heure: "16h", production: 1200, demande: 1210 },
  { heure: "18h", production: 1240, demande: 1285 },
  { heure: "20h", production: 1100, demande: 1080 },
  { heure: "22h", production: 950, demande: 920 },
];

export const postes = [
  { nom: "Cotonou", poste: "Vedoko 161kV", tension: 148.0, nominal: 161, pu: 0.92, transitP: 145, transitQ: 32, etat: "Attention" },
  { nom: "Bohicon", poste: "Interco 161kV", tension: 151.8, nominal: 161, pu: 0.94, transitP: 88, transitQ: 45, etat: "Attention" },
  { nom: "Parakou", poste: "Nord 161kV", tension: 162.1, nominal: 161, pu: 1.01, transitP: 43, transitQ: 13, etat: "Normal" },
  { nom: "Natitingou", poste: "Ouest 161kV", tension: 163.5, nominal: 161, pu: 1.02, transitP: 15, transitQ: 3, etat: "Normal" },
];

export const transformateurs = [
  { nom: "TR-1 Cotonou", puissance: 40, charge: 98, temperature: 98, etat: "Surcharge" },
  { nom: "TR-2 Bohicon", puissance: 60, charge: 87, temperature: 82, etat: "Attention" },
  { nom: "TR-1 Parakou", puissance: 50, charge: 65, temperature: 65, etat: "Normal" },
  { nom: "TR-1 Natitingou", puissance: 80, charge: 55, temperature: 78, etat: "Normal" },
  { nom: "TR-2 Parakou", puissance: 30, charge: 30, temperature: 45, etat: "Normal" },
];

export const previsions = [
  { heure: "18h00", demande: 280, production: 260, nomination: 150, deficit: -20 },
  { heure: "19h00", demande: 310, production: 265, nomination: 150, deficit: -45 },
  { heure: "20h00", demande: 305, production: 270, nomination: 160, deficit: -35 },
  { heure: "21h00", demande: 290, production: 280, nomination: 160, deficit: -10 },
  { heure: "22h00", demande: 270, production: 285, nomination: 160, deficit: 15 },
];