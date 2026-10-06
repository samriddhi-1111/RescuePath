/*
 Kruskal's Algorithm

 Input:
 Locations, Edges

 Output:
 Minimum Spanning Tree (MST) edges, total cost

 Time Complexity:
 O(E log E)

 Space Complexity:
 O(V + E)
*/

const UnionFind = require('./unionFind');

function runKruskal(locations, edges) {
  // Sort edges by weight
  const sortedEdges = [...edges].sort((a, b) => a.distance - b.distance);
  
  const nodes = locations.map(loc => loc.id);
  const uf = new UnionFind(nodes);
  
  const mst = [];
  let totalCost = 0;

  for (let edge of sortedEdges) {
    if (edge.status === 'blocked') continue;

    if (uf.union(edge.from, edge.to)) {
      mst.push({
        from: edge.from,
        to: edge.to,
        weight: edge.distance
      });
      totalCost += edge.distance;
    }
  }

  return {
    algorithm: "Kruskal",
    edges: mst,
    totalCost
  };
}

module.exports = runKruskal;
