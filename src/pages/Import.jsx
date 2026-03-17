import { useState } from "react";

function Import() {
  const [fichierCentrales, setFichierCentrales] = useState(null);
  const [fichierPostes, setFichierPostes] = useState(null);
  const [resultat, setResultat] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  async function importerFichier(fichier, url) {
    const formData = new FormData();
    formData.append("fichier", fichier);
    const res = await fetch(`http://127.0.0.1:8000${url}`, {
      method: "POST",
      body: formData,
    });
    return res.json();
  }

  async function handleImportCentrales() {
    if (!fichierCentrales) return;
    setChargement(true);
    setErreur(null);
    try {
      const res = await importerFichier(fichierCentrales, "/api/import/centrales");
      setResultat(res);
    } catch (e) {
      setErreur("Erreur lors de l'import. Vérifiez le format du fichier.");
    } finally {
      setChargement(false);
    }
  }

  async function handleImportPostes() {
    if (!fichierPostes) return;
    setChargement(true);
    setErreur(null);
    try {
      const res = await importerFichier(fichierPostes, "/api/import/postes");
      setResultat(res);
    } catch (e) {
      setErreur("Erreur lors de l'import. Vérifiez le format du fichier.");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "900px" }}>

      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>Import des données</h1>
        <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>Importez vos fichiers Excel du dispatching</p>
      </div>

      {resultat && (
        <div style={{ background: "#e8f5e2", border: "0.5px solid #86efac", borderRadius: "10px", padding: "14px 18px", marginBottom: "20px", fontSize: "13px", color: "#3B6D11" }}>
          ✅ {resultat.message} — fichier : {resultat.fichier}
        </div>
      )}

      {erreur && (
        <div style={{ background: "#fde8e8", border: "0.5px solid #fca5a5", borderRadius: "10px", padding: "14px 18px", marginBottom: "20px", fontSize: "13px", color: "#A32D2D" }}>
          ❌ {erreur}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>

        <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "14px", fontWeight: "500", marginBottom: "6px" }}>📊 Import Centrales</div>
          <div style={{ fontSize: "12px", color: "#888", marginBottom: "16px" }}>
            Fichier Excel avec colonnes : nom, type, installee, actuelle, etat
          </div>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={e => setFichierCentrales(e.target.files[0])}
            style={{ width: "100%", fontSize: "12px", marginBottom: "12px" }}
          />
          {fichierCentrales && (
            <div style={{ fontSize: "11px", color: "#888", marginBottom: "12px" }}>
              📄 {fichierCentrales.name}
            </div>
          )}
          <button
            onClick={handleImportCentrales}
            disabled={!fichierCentrales || chargement}
            style={{
              width: "100%",
              padding: "10px",
              background: fichierCentrales ? "#185FA5" : "#e0e0e0",
              color: fichierCentrales ? "white" : "#888",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              cursor: fichierCentrales ? "pointer" : "not-allowed",
              fontWeight: "500",
            }}
          >
            {chargement ? "Import en cours..." : "Importer"}
          </button>
        </div>

        <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "14px", fontWeight: "500", marginBottom: "6px" }}>🗼 Import Postes HTB</div>
          <div style={{ fontSize: "12px", color: "#888", marginBottom: "16px" }}>
            Fichier Excel avec colonnes : nom, tension, etat
          </div>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={e => setFichierPostes(e.target.files[0])}
            style={{ width: "100%", fontSize: "12px", marginBottom: "12px" }}
          />
          {fichierPostes && (
            <div style={{ fontSize: "11px", color: "#888", marginBottom: "12px" }}>
              📄 {fichierPostes.name}
            </div>
          )}
          <button
            onClick={handleImportPostes}
            disabled={!fichierPostes || chargement}
            style={{
              width: "100%",
              padding: "10px",
              background: fichierPostes ? "#185FA5" : "#e0e0e0",
              color: fichierPostes ? "white" : "#888",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              cursor: fichierPostes ? "pointer" : "not-allowed",
              fontWeight: "500",
            }}
          >
            {chargement ? "Import en cours..." : "Importer"}
          </button>
        </div>
      </div>

      <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "20px" }}>
        <div style={{ fontSize: "14px", fontWeight: "500", marginBottom: "12px" }}>📋 Format des fichiers Excel attendu</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "500", color: "#185FA5", marginBottom: "8px" }}>Centrales.xlsx</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
              <thead>
                <tr style={{ background: "#f5f5f5" }}>
                  {["nom", "type", "installee", "actuelle", "etat"].map(h => (
                    <th key={h} style={{ padding: "6px 8px", textAlign: "left", border: "0.5px solid #e0e0e0" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {["Maria-Gléta 2", "Gaz", "80", "75", "En marche"].map((v, i) => (
                    <td key={i} style={{ padding: "6px 8px", border: "0.5px solid #e0e0e0", color: "#888" }}>{v}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "500", color: "#185FA5", marginBottom: "8px" }}>Postes.xlsx</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
              <thead>
                <tr style={{ background: "#f5f5f5" }}>
                  {["nom", "tension", "etat"].map(h => (
                    <th key={h} style={{ padding: "6px 8px", textAlign: "left", border: "0.5px solid #e0e0e0" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {["Cotonou", "148.0", "Attention"].map((v, i) => (
                    <td key={i} style={{ padding: "6px 8px", border: "0.5px solid #e0e0e0", color: "#888" }}>{v}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Import;