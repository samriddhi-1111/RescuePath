import React from 'react';

const Algorithms = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-6">DAA Concepts Used</h1>
      
      <div className="space-y-6">
        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold mb-3 text-blue-400">1. Graph Representation</h2>
          <p className="text-slate-300 mb-2">
            The disaster area is represented as a weighted graph where vertices are locations and edges are roads. 
            The graph is implemented using an <strong>Adjacency List</strong>.
          </p>
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-400">
            Space Complexity: O(V + E)
          </div>
        </section>

        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold mb-3 text-blue-400">2. Dijkstra's Algorithm</h2>
          <p className="text-slate-300 mb-2">
            Used to find the shortest/optimal rescue path from a source to a destination location. 
            It utilizes a Min Priority Queue (Min Heap) to efficiently select the next closest node.
          </p>
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-400">
            Time Complexity: O((V + E) log V)
          </div>
        </section>

        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold mb-3 text-blue-400">3. Kruskal's Algorithm</h2>
          <p className="text-slate-300 mb-2">
            Used to create a minimum-cost emergency network (Minimum Spanning Tree). 
            It utilizes the Union-Find data structure to detect cycles.
          </p>
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-400">
            Time Complexity: O(E log E)
          </div>
        </section>

        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold mb-3 text-blue-400">4. Breadth-First Search (BFS)</h2>
          <p className="text-slate-300 mb-2">
            Used for basic graph traversal to find the path with the minimum number of edges, ignoring road distances.
          </p>
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-400">
            Time Complexity: O(V + E)
          </div>
        </section>
      </div>
    </div>
  );
};

export default Algorithms;
