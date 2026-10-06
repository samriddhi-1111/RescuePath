let base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
if (base.endsWith('/')) base = base.slice(0, -1);
if (!base.endsWith('/api')) base += '/api';
const API_URL = base;

export const getGraphData = async () => {
  const res = await fetch(`${API_URL}/graph`);
  return res.json();
};

export const runDijkstra = async (source, destination, mode = 'fastest') => {
  const res = await fetch(`${API_URL}/dijkstra`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source, destination, mode })
  });
  return res.json();
};

export const runBFS = async (source, destination) => {
  const res = await fetch(`${API_URL}/bfs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source, destination })
  });
  return res.json();
};

export const runKruskal = async () => {
  const res = await fetch(`${API_URL}/kruskal`);
  return res.json();
};

export const getStatistics = async () => {
  const res = await fetch(`${API_URL}/statistics`);
  return res.json();
};

export const loadScenario = async (scenario) => {
  const res = await fetch(`${API_URL}/scenarios/load`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scenario })
  });
  return res.json();
};

export const updateRoadStatus = async (from, to, status, risk) => {
  const res = await fetch(`${API_URL}/road/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, status, risk })
  });
  return res.json();
};

export const findNearestFacility = async (source, facilityType, algorithm = 'dijkstra') => {
  const res = await fetch(`${API_URL}/nearest-facility`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source, facilityType, algorithm })
  });
  return res.json();
};

export const runKnapsack = async (items, capacity) => {
  const res = await fetch(`${API_URL}/knapsack`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, capacity })
  });
  return res.json();
};
