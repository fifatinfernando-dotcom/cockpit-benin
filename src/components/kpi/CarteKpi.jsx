function CarteKpi({ label, valeur, unite, delta, couleur }) {
  const couleurs = {
    bleu: "#185FA5",
    vert: "#3B6D11",
    orange: "#BA7517",
    rouge: "#A32D2D",
  };

  return (
    <div style={{
      background: "#f5f5f5",
      borderRadius: "8px",
      padding: "14px 16px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
        {label}
      </div>
      <div style={{ fontSize: "26px", fontWeight: "500", lineHeight: 1 }}>
        {valeur}
        <span style={{ fontSize: "13px", color: "#888", marginLeft: "3px" }}>{unite}</span>
      </div>
      <div style={{ fontSize: "11px", marginTop: "5px", color: couleurs[couleur] || "#888" }}>
        {delta}
      </div>
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: "3px",
        width: "80%",
        background: couleurs[couleur] || "#185FA5",
        borderRadius: "0 2px 0 0",
      }} />
    </div>
  );
}

export default CarteKpi;