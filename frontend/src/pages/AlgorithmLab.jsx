import React from 'react';

const AlgorithmLab = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Algorithm Lab</h1>
        <p className="text-slate-400">Deep dive into the DAA concepts powering the RescuePath system.</p>
      </header>
      
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8">
        <h2 className="text-xl font-bold mb-4">Algorithm Complexity Analyzer</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-slate-900 rounded-lg overflow-hidden">
            <thead className="bg-slate-950">
              <tr>
                <th className="py-3 px-4 font-bold text-slate-300">Algorithm</th>
                <th className="py-3 px-4 font-bold text-slate-300">Purpose</th>
                <th className="py-3 px-4 font-bold text-slate-300">Time Complexity</th>
                <th className="py-3 px-4 font-bold text-slate-300">Space Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="py-3 px-4 font-medium text-white">BFS</td>
                <td className="py-3 px-4 text-slate-400">Graph traversal (Nearest facility)</td>
                <td className="py-3 px-4 font-mono text-blue-400">O(V + E)</td>
                <td className="py-3 px-4 font-mono text-purple-400">O(V)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Dijkstra</td>
                <td className="py-3 px-4 text-slate-400">Shortest path routing</td>
                <td className="py-3 px-4 font-mono text-blue-400">O((V + E) log V)</td>
                <td className="py-3 px-4 font-mono text-purple-400">O(V + E)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Kruskal</td>
                <td className="py-3 px-4 text-slate-400">Minimum Spanning Tree</td>
                <td className="py-3 px-4 font-mono text-blue-400">O(E log E)</td>
                <td className="py-3 px-4 font-mono text-purple-400">O(V + E)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">0/1 Knapsack</td>
                <td className="py-3 px-4 text-slate-400">Resource optimization (DP)</td>
                <td className="py-3 px-4 font-mono text-blue-400">O(n * W)</td>
                <td className="py-3 px-4 font-mono text-purple-400">O(n * W)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold mb-3 text-blue-400">Dijkstra's Algorithm Walkthrough</h2>
          <p className="text-slate-300 mb-4">
            Dijkstra's algorithm finds the shortest path from a single source to all other nodes. 
            We use a <strong>Min Priority Queue (Min Heap)</strong> to fetch the next closest node in <code className="text-sm bg-slate-900 px-1 rounded">O(log V)</code> time.
          </p>
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300 space-y-4 border border-slate-700">
            <div>
              <div className="text-blue-400 font-bold mb-1">STEP 1 (Initialization)</div>
              <div>Start Node: A</div>
              <div>Distances: A=0, B=∞, C=∞, D=∞ ...</div>
              <div>Priority Queue: [ (A, 0) ]</div>
            </div>
            <div>
              <div className="text-blue-400 font-bold mb-1">STEP 2</div>
              <div>Dequeue A. Visit neighbors B, C, D.</div>
              <div>Updated Distances: B=4, C=7, D=3</div>
              <div>Priority Queue: [ (D, 3), (B, 4), (C, 7) ]</div>
            </div>
            <div>
              <div className="text-blue-400 font-bold mb-1">STEP 3</div>
              <div>Dequeue D (smallest distance). Visit E, G.</div>
              <div>Updated Distances: E=3+2=5, G=3+5=8</div>
              <div>Priority Queue: [ (B, 4), (E, 5), (C, 7), (G, 8) ]</div>
            </div>
            <div className="text-slate-500 italic">... continues until destination is reached ...</div>
          </div>
        </section>

        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold mb-3 text-green-400">Kruskal's Algorithm Walkthrough</h2>
          <p className="text-slate-300 mb-4">
            Kruskal's algorithm uses a greedy approach to find the MST. It sorts all edges and adds them one by one. 
            A <strong>Union-Find (Disjoint Set)</strong> data structure is used to detect if adding an edge creates a cycle in <code className="text-sm bg-slate-900 px-1 rounded">O(α(V))</code> time.
          </p>
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300 space-y-2 border border-slate-700">
            <div className="text-green-400 font-bold mb-2">SORTED EDGES & SELECTION</div>
            <div className="flex gap-4"><span>B-C = 2</span> <span className="text-green-500">✓ ACCEPT (No cycle)</span></div>
            <div className="flex gap-4"><span>D-E = 2</span> <span className="text-green-500">✓ ACCEPT (No cycle)</span></div>
            <div className="flex gap-4"><span>F-G = 2</span> <span className="text-green-500">✓ ACCEPT (No cycle)</span></div>
            <div className="flex gap-4"><span>A-D = 3</span> <span className="text-green-500">✓ ACCEPT (No cycle)</span></div>
            <div className="flex gap-4"><span>E-F = 3</span> <span className="text-green-500">✓ ACCEPT (No cycle)</span></div>
            <div className="flex gap-4"><span>C-D = 4</span> <span className="text-red-500">✗ REJECT (Creates cycle: C-B-E-D-C)</span></div>
            <div className="text-slate-500 italic mt-2">... until V-1 edges are selected ...</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AlgorithmLab;
