/*
 Breadth First Search

 Input:
 Adjacency List graph, source, destination

 Output:
 Path and number of edges

 Time Complexity:
 O(V + E)

 Space Complexity:
 O(V)
*/

function runBFS(graph, source, destination) {
  const queue = [source];
  const visited = new Set([source]);
  const previous = { [source]: null };

  let found = false;

  while (queue.length > 0) {
    const current = queue.shift();

    if (current === destination) {
      found = true;
      break;
    }

    if (!graph[current]) continue;

    for (let neighbor of graph[current]) {
      if (neighbor.status === 'blocked') continue;

      if (!visited.has(neighbor.node)) {
        visited.add(neighbor.node);
        previous[neighbor.node] = current;
        queue.push(neighbor.node);
      }
    }
  }

  if (!found) {
    return {
      error: "No reachable path exists between selected locations"
    };
  }

  const path = [];
  let curr = destination;
  while (curr !== null) {
    path.unshift(curr);
    curr = previous[curr];
  }

  return {
    algorithm: "BFS",
    path,
    edges: path.length - 1
  };
}

module.exports = runBFS;
