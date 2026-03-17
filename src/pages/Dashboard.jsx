import { useState, useEffect } from "react";
import CarteKpi from "../components/kpi/CarteKpi";
import ListeCentrales from "../components/kpi/ListeCentrales";
import ListeAlertes from "../components/alertes/ListeAlertes";
import GraphiqueProduction from "../components/charts/GraphiqueProduction";
import { kpis } from "../data/donnees";
import { getCentrales, getAlertes } from "../services/api";

function Dashboard() {
  const [centrales, setCentrales] = useState([]);
  const [alertes, setAlertes] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    async function chargerDonnees() {
      try {
        const [c, a] = await Promise.all([getCentrales(), getAlertes()]);
        setCentrales(c);
        setAlertes(a);
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

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" }}>

      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>Cockpit Supervision — Bénin</h1>
          <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>SBPE / CEB — Dispatching National</p>
        </div>
        <div style={{ fontSize: "11px", color: chargement ? "#BA7517" : "#3B6D11", background: chargement ? "#fef3e2" : "#e8f5e2", padding: "4px 12px", borderRadius: "20px" }}>
          {chargement ? "⏳ Chargement..." : "● Connecté à l'API"}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px", marginBottom: "20px" }}>
        <CarteKpi label="Production totale" valeur={kpis.productionTotale} unite="MW" delta="▲ +12 MW vs hier" couleur="bleu" />
        <CarteKpi label="Charge réseau" valeur={kpis.chargeReseau} unite="%" delta="⚠ Proche du seuil" couleur="orange" />
        <CarteKpi label="Fréquence" valeur={kpis.frequence} unite="Hz" delta="● Nominale" couleur="vert" />
        <CarteKpi label="Énergie livrée" valeur={kpis.energieLivree} unite="GWh" delta="Rendement 91.3%" couleur="vert" />
        <CarteKpi label="Alertes actives" valeur={alertes.length || kpis.alertesActives} unite="" delta={`${alertes.filter(a => a.niveau === "critique").length} critiques`} couleur="rouge" />
        <CarteKpi label="Déficit prévu" valeur={kpis.deficitPrevu} unite="MW" delta="Pic prévu à 19h00" couleur="rouge" />
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