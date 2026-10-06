import React, { useState } from 'react';
import { runDijkstra, runBFS, runKruskal } from '../services/api';

const AlgorithmPanel = ({ locations, onResult }) => {
  const [source, setSource] = useState('A');
  const [destination, setDestination] = useState('C');
  const [algo, setAlgo] = useState('dijkstra');
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    try {
      let res;
      if (algo === 'dijkstra') {
        res = await runDijkstra(source, destination);
      } else if (algo === 'bfs') {
        res = await runBFS(source, destination);
      } else if (algo === 'kruskal') {
        res = await runKruskal();
      }
      onResult(res);
    } catch (err) {
      onResult({ error: "Failed to connect to the server." });
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Algorithm Controller</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Algorithm</label>
          <select 
            value={algo} 
            onChange={e => setAlgo(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="dijkstra">Dijkstra's Algorithm (Shortest Path)</option>
            <option value="bfs">Breadth First Search (Traversal)</option>
            <option value="kruskal">Kruskal's Algorithm (Minimum Spanning Tree)</option>
          </select>
        </div>

        {algo !== 'kruskal' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Source</label>
              <select 
                value={source} 
                onChange={e => setSource(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              >
                {locations?.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.id} - {loc.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Destination</label>
              <select 
                value={destination} 
                onChange={e => setDestination(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
              >
                {locations?.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.id} - {loc.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <button 
          onClick={handleRun}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-4"
        >
          {loading ? 'Running...' : 'Run Algorithm'}
        </button>
      </div>
    </div>
  );
};

export default AlgorithmPanel;
