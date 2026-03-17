import { alertes as alertesLocales } from "../../data/donnees";

function ListeAlertes({ alertesApi }) {
  const alertes = alertesApi && alertesApi.length > 0 ? alertesApi : alertesLocales;

  const styles = {
    critique: { dot: "#A32D2D", tagBg: "#fde8e8", tagColor: "#A32D2D" },
    attention: { dot: "#BA7517", tagBg: "#fef3e2", tagColor: "#BA7517" },
  };

  return (
    <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "16px 20px" }}>
      <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
        Alertes actives
      </div>
      {alertes.map((a) => {
        const s = styles[a.niveau] || styles.attention;
        return (
          <div key={a.id} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 0", borderBottom: "0.5px solid #f0f0f0" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.dot, marginTop: "4px", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "13px", fontWeight: "500" }}>{a.titre}</div>
              <div style={{ fontSize: "11px", color: "#888", marginTop: "3px" }}>
                <span style={{ fontSize: "10px", padding: "1px 6px", borderRadius: "4px", background: s.tagBg, color: s.tagColor, marginRight: "6px" }}>
                  {a.niveau.toUpperCase()}
                </span>
                <span style={{ fontSize: "10px", padding: "1px 6px", borderRadius: "4px", background: "#f5f5f5", color: "#888", marginRight: "6px" }}>
                  {a.categorie}
                </span>
                {a.temps}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListeAlertes;