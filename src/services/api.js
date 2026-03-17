const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export async function getCentrales() {
  const res = await fetch(`${BASE_URL}/production/centrales`);
  return res.json();
}

export async function getKpis() {
  const res = await fetch(`${BASE_URL}/production/kpis`);
  return res.json();
}

export async function getAlertes() {
  const res = await fetch(`${BASE_URL}/alertes/`);
  return res.json();
}

export async function getPrevisions() {
  const res = await fetch(`${BASE_URL}/previsions/`);
  return res.json();
}

export async function getPostes() {
  const res = await fetch(`${BASE_URL}/postes/`);
  return res.json();
}