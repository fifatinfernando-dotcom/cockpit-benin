import { useState, useEffect } from "react";
import CarteKpi from "../components/kpi/CarteKpi";
import ListeCentrales from "../components/kpi/ListeCentrales";
import ListeAlertes from "../components/alertes/ListeAlertes";
import GraphiqueProduction from "../components/charts/GraphiqueProduction";
import { getKpis, getCentrales, getAlertes } from "../services/api";

function Dashboard() {
  const [centrales, setCentrales] = useState([]);
  const [alertes, setAlertes] = useState([]);
  const [kpis, setKpis] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [derniereMAJ, setDerniereMAJ] = useState(null);
  const [compteur, setCompteur] = useState(30);

  useEffect(() => {
    async function chargerDonnees() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/production/kpis");
        const k = await res.json();
        const c = await getCentrales();
        const a = await getAlertes();
        setCentrales(c);
        setAlertes(a);
        setKpis(k);
        setDerniereMAJ(new Date());
        setCompteur(30);
      } catch (err) {
        console.error("Erreur API:", err);
      } finally {
        setChargement(false);
      }
    }
    chargerDonnees();
    const intervalle = setInterval(chargerDonnees, 30000);
    return () => clearInterval(intervalle);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompteur(c => c > 0 ? c - 1 : 30);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (chargement || !kpis) {
    return (
      <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
        <p style={{ color: "#888" }}>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" }}>

      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>Cockpit Supervision — Bénin</h1>
          <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>SBPE — Dispatching National</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
          <div style={{ fontSize: "11px", color: "#3B6D11", background: "#e8f5e2", padding: "4px 12px", borderRadius: "20px" }}>
            ● Connecté à l'API
          </div>
          {derniereMAJ && (
            <div style={{ fontSize: "11px", color: "#888" }}>
              Màj dans {compteur}s — {derniereMAJ.toLocaleTimeString("fr-FR")}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px", marginBottom: "20px" }}>
        <CarteKpi label="Production totale" valeur={kpis["productionTotale"]} unite="MW" delta="Temps réel" couleur="bleu" />
        <CarteKpi label="Charge réseau" valeur={kpis["chargeReseau"]} unite="%" delta={kpis["chargeReseau"] > 85 ? "⚠ Proche du seuil" : "● Normal"} couleur={kpis["chargeReseau"] > 85 ? "orange" : "vert"} />
        <CarteKpi label="Fréquence" valeur={kpis["frequence"]} unite="Hz" delta="● Nominale" couleur="vert" />
        <CarteKpi label="Énergie livrée" valeur={kpis["energieLivree"]} unite="GWh" delta="Rendement 91.3%" couleur="vert" />
        <CarteKpi label="Alertes actives" valeur={kpis["alertesActives"]} unite="" delta={`${alertes.filter(a => a.niveau === "critique").length} critiques`} couleur="rouge" />
        <CarteKpi label="Déficit prévu" valeur={kpis["deficitPrevu"]} unite="MW" delta="Pic prévu à 19h00" couleur="rouge" />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <GraphiqueProduction />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <ListeCentrales centralesApi={centrales} />
        <ListeAlertes alertesApi={alertes} />
      </div>

    </div>
  );
}

export default Dashboard;