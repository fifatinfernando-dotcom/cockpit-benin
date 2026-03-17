import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Production from "./pages/Production";
import Reseau from "./pages/Reseau";
import Postes from "./pages/Postes";
import Alertes from "./pages/Alertes";
import Previsions from "./pages/Previsions";
import Import from "./pages/Import";

function App() {
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