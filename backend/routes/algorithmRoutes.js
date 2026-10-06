const express = require('express');
const router = express.Router();
const { getGraphState, updateRoadStatus, loadScenario, scenarios } = require('../data/graphData');
const runDijkstra = require('../algorithms/dijkstra');
const runKruskal = require('../algorithms/kruskal');
const runBFS = require('../algorithms/bfs');

// Helper to build adjacency list from roads dynamically
function buildGraph() {
  const { locations, roads } = getGraphState();
  const graph = {};
  
  locations.forEach(loc => {
    graph[loc.id] = [];
  });

  roads.forEach(road => {
    graph[road.from].push({ node: road.to, weight: road.distance, risk: road.risk, status: road.status });
    graph[road.to].push({ node: road.from, weight: road.distance, risk: road.risk, status: road.status });
  });

  return graph;
}

router.get('/graph', (req, res) => {
  res.json(getGraphState());
});

router.post('/dijkstra', (req, res) => {
  const { source, destination, mode } = req.body;
  if (!source || !destination) {
    return res.status(400).json({ error: "Source and destination are required" });
  }

  const graph = buildGraph();
  const result = runDijkstra(graph, source, destination, mode || 'fastest');
  res.json(result);
});

router.post('/bfs', (req, res) => {
  const { source, destination } = req.body;
  if (!source || !destination) {
    return res.status(400).json({ error: "Source and destination are required" });
  }

  const graph = buildGraph();
  const result = runBFS(graph, source, destination);
  res.json(result);
});

router.get('/kruskal', (req, res) => {
  const { locations, roads } = getGraphState();
  const result = runKruskal(locations, roads);
  res.json(result);
});

router.get('/locations', (req, res) => {
  res.json(getGraphState().locations);
});

router.get('/roads', (req, res) => {
  res.json(getGraphState().roads);
});

router.post('/scenarios/load', (req, res) => {
  const { scenario } = req.body;
  loadScenario(scenario);
  res.json({ message: "Scenario loaded", graph: getGraphState() });
});

router.post('/road/status', (req, res) => {
  const { from, to, status, risk } = req.body;
  updateRoadStatus(from, to, status, risk);
  res.json({ message: "Road status updated", graph: getGraphState() });
});

router.get('/statistics', (req, res) => {
  const { locations, roads } = getGraphState();
  const openRoads = roads.filter(r => r.status === 'open' || r.status === 'Open').length;
  const blockedRoads = roads.filter(r => r.status === 'blocked' || r.status === 'Blocked').length;
  const avgRisk = (roads.reduce((acc, r) => acc + (r.risk || 0), 0) / roads.length).toFixed(1);
  const disasterZones = locations.filter(l => l.type === 'Disaster Zone').length;

  res.json({
    totalLocations: locations.length,
    totalRoads: roads.length,
    openRoads,
    blockedRoads,
    averageRisk: avgRisk,
    disasterZones
  });
});

router.post('/nearest-facility', (req, res) => {
  const { source, facilityType, algorithm } = req.body;
  const { locations } = getGraphState();
  const graph = buildGraph();
  
  const targets = locations.filter(l => l.type === facilityType).map(l => l.id);
  if (targets.length === 0) return res.status(400).json({ error: "No such facility found." });
  
  let bestResult = null;
  
  targets.forEach(target => {
    let result;
    if (algorithm === 'bfs') {
      result = runBFS(graph, source, target);
    } else {
      result = runDijkstra(graph, source, target, 'fastest');
    }
    
    if (!result.error) {
      if (!bestResult) {
        bestResult = result;
      } else {
        if (algorithm === 'bfs' && result.nodes < bestResult.nodes) {
          bestResult = result;
        } else if (algorithm === 'dijkstra' && result.distance < bestResult.distance) {
          bestResult = result;
        }
      }
    }
  });

  if (!bestResult) return res.json({ error: "No reachable facility found." });
  
  // Attach target name
  bestResult.destinationName = locations.find(l => l.id === bestResult.path[bestResult.path.length - 1]).name;
  res.json(bestResult);
});

const runKnapsack = require('../algorithms/knapsack');
router.post('/knapsack', (req, res) => {
  const { items, capacity } = req.body;
  if (!items || !capacity) return res.status(400).json({ error: "Items and capacity required" });
  res.json(runKnapsack(items, capacity));
});

module.exports = router;
