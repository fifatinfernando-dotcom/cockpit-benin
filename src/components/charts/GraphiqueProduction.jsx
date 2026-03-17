import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { productionCourbe } from "../../data/donnees";

function GraphiqueProduction() {
  return (
    <div style={{ background: "white", border: "0.5px solid #e0e0e0", borderRadius: "12px", padding: "16px 20px" }}>
      <div style={{ fontSize: "11px", fontWeight: "500", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
        Production vs Demande — 24h
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={productionCourbe} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradProd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#185FA5" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#185FA5" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradDem" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#BA7517" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#BA7517" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="heure" tick={{ fontSize: 11, fill: "#888" }} />
          <YAxis tick={{ fontSize: 11, fill: "#888" }} unit=" MW" width={60} />
          <Tooltip
            formatter={(value, name) => [`${value} MW`, name === "production" ? "Production" : "Demande"]}
            contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "0.5px solid #e0e0e0" }}
          />
          <Legend
            formatter={(value) => value === "production" ? "Production" : "Demande"}
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
          />

          <Area
            type="monotone"
            dataKey="production"
            stroke="#185FA5"
            strokeWidth={2}
            fill="url(#gradProd)"
          />
          <Area
            type="monotone"
            dataKey="demande"
            stroke="#BA7517"
            strokeWidth={2}
            fill="url(#gradDem)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphiqueProduction;