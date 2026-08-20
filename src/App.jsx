import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Production from "./pages/Production";
import Reseau from "./pages/Reseau";
import Postes from "./pages/Postes";
import Alertes from "./pages/Alertes";
import Previsions from "./pages/Previsions";
import Import from "./pages/Import";

function EcranChargement() {
  const [point, setPoint] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPoint(p => (p + 1) % 4);
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "#0d1b2a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}>
      <div style={{ marginBottom: "32px", textAlign: "center", padding: "0 24px" }}>

        <div style={{ fontSize: "64px", marginBottom: "24px" }}>⚡</div>

        <div style={{ marginBottom: "12px" }}>
          <span style={{
            fontSize: "72px",
            fontWeight: "900",
            color: "#2E7D32",
            letterSpacing: "6px",
          }}>
            SBP
          </span>
          <span style={{
            fontSize: "72px",
            fontWeight: "900",
            color: "#C62828",
            letterSpacing: "6px",
          }}>
            E
          </span>
        </div>

        <div style={{
          fontSize: "14px",
          color: "#8ab4d4",
          marginBottom: "4px",
          letterSpacing: "0.5px"
        }}>
          Société Béninoise de Production d'Électricité
        </div>

        <div style={{
          width: "60px",
          height: "2px",
          background: "#185FA5",
          margin: "14px auto",
          borderRadius: "2px"
        }} />

        <div style={{
          fontSize: "12px",
          color: "#5a8ab0",
          fontStyle: "italic",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "20px"
        }}>
          L'électricité, Accélérateur du développement
        </div>

        <div style={{
          fontSize: "14px",
          fontWeight: "500",
          color: "white",
          letterSpacing: "0.5px"
        }}>
          Cockpit de Supervision — Dispatching National
        </div>

      </div>

      <div style={{ width: "220px", marginBottom: "24px" }}>
        <div style={{ height: "3px", background: "#1e3a5f", borderRadius: "3px", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            background: "#185FA5",
            borderRadius: "3px",
            animation: "chargement 1.5s ease-in-out infinite",
          }} />
        </div>
      </div>

      <div style={{ fontSize: "13px", color: "#5a8ab0" }}>
        Connexion au système{".".repeat(point)}
      </div>

      <style>{`
        @keyframes chargement {
          0% { width: 0%; margin-left: 0; }
          50% { width: 70%; margin-left: 0; }
          75% { width: 30%; margin-left: 70%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [pret, setPret] = useState(false);

  useEffect(() => {
    async function verifierAPI() {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL
            ? import.meta.env.VITE_API_URL.replace("/api", "")
            : "http://127.0.0.1:8000/"
        );
        if (res.ok) {
          setTimeout(() => setPret(true), 1500);
        } else {
          setTimeout(() => setPret(true), 3000);
        }
      } catch {
        setTimeout(() => setPret(true), 3000);
      }
    }
    verifierAPI();
  }, []);

  useEffect(() => {
    const ping = () => {
      fetch("https://cockpit-benin-api.onrender.com/")
        .catch(() => {});
    };
    ping();
    const intervalle = setInterval(ping, 10 * 60 * 1000);
    return () => clearInterval(intervalle);
  }, []);

  if (!pret) return <EcranChargement />;

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/production" element={<Production />} />
          <Route path="/reseau" element={<Reseau />} />
          <Route path="/postes" element={<Postes />} />
          <Route path="/alertes" element={<Alertes />} />
          <Route path="/previsions" element={<Previsions />} />
          <Route path="/import" element={<Import />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;