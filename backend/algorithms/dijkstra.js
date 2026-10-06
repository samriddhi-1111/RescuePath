const MinPriorityQueue = require('./priorityQueue');

function runDijkstra(graph, source, destination, mode = 'fastest') {
  const distances = {};
  const previous = {};
  const risks = {};
  const pq = new MinPriorityQueue();
  
  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
    risks[node] = 0;
  }
  
  distances[source] = 0;
  pq.enqueue(source, 0);

  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    const currentNode = current.node;

    if (currentNode === destination) {
      break; // Optimization: stop when destination is reached
    }

    if (!graph[currentNode]) continue;

    for (let neighbor of graph[currentNode]) {
      if (neighbor.status === 'blocked' || neighbor.status === 'Partially Blocked') continue;

      let weight;
      if (mode === 'safest') {
        weight = neighbor.risk;
      } else if (mode === 'balanced') {
        weight = (0.6 * neighbor.weight) + (0.4 * neighbor.risk * 2); // scaling risk roughly to distance magnitude
      } else {
        weight = neighbor.weight; // fastest (distance)
      }

      const newDist = distances[currentNode] + weight;
      if (newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist;
        previous[neighbor.node] = currentNode;
        risks[neighbor.node] = risks[currentNode] + neighbor.risk;
        pq.enqueue(neighbor.node, newDist);
      }
    }
  }

  const path = [];
  let curr = destination;
  while (curr !== null) {
    path.unshift(curr);
    curr = previous[curr];
  }

  if (path.length === 0 || path[0] !== source) {
    return { error: "No reachable route exists between these locations." };
  }

  // Calculate actual distance/risk for the selected path
  let actualDistance = 0;
  let actualRisk = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i+1];
    const edge = graph[u].find(e => e.node === v);
    actualDistance += edge.weight;
    actualRisk += edge.risk;
  }

  return {
    algorithm: "Dijkstra",
    mode: mode,
    path,
    distance: actualDistance,
    risk: actualRisk,
    nodes: path.length,
    estimatedTime: actualDistance * 2 
  };
}

module.exports = runDijkstra;
