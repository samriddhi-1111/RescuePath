import React, { useEffect, useState } from 'react';
import { runKruskal, getGraphData } from '../services/api';
import GraphVisualizer from '../components/GraphVisualizer';
import { Network } from 'lucide-react';

const EmergencyNetwork = () => {
  const [graphData, setGraphData] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGraphData().then(setGraphData).catch(console.error);
  }, []);

  const handleRun = async () => {
    setLoading(true);
    try {
      const res = await runKruskal();
      setResult(res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2 drop-shadow-sm">Emergency Network Planner</h1>
        <p className="text-slate-600 font-medium">Generate a minimum-cost network to keep all facilities connected using Kruskal's algorithm.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Network className="h-6 w-6 text-green-500" /> MST Generator
            </h2>
            <p className="text-sm text-slate-600 font-medium mb-6">
              Kruskal's algorithm sorts all available roads by distance and connects locations greedily, avoiding any cycles using a Disjoint Set (Union-Find) data structure.
            </p>
            <button 
              onClick={handleRun}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:-translate-y-0.5 transition-all text-sm tracking-wider uppercase"
            >
              {loading ? 'Generating Network...' : 'Generate Network'}
            </button>
          </div>

          {result && (
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>
              <h3 className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-4">Network Generated</h3>
              
              <div className="space-y-5">
                <div className="bg-white/70 p-4 rounded-xl border border-white/60 shadow-sm flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Total Cost</span>
                  <span className="text-3xl font-black text-slate-800">{result.totalCost}</span>
                </div>
                
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3">Selected Connections</p>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                    {result.edges.map((e, i) => (
                      <div key={i} className="bg-white/50 border border-white/60 px-3 py-2 rounded-lg text-sm flex justify-between shadow-sm">
                        <span className="font-bold text-slate-700">{e.from}-{e.to}</span>
                        <span className="font-semibold text-slate-500">{e.weight}km</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/50 p-3 rounded-xl border border-white/60 shadow-sm flex justify-between items-center mt-2">
                  <span className="text-xs font-bold text-slate-500">Time Complexity</span>
                  <code className="text-xs text-purple-600 font-black bg-purple-100 px-2 py-1 rounded">O(E log E)</code>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 p-5 shadow-xl h-full flex flex-col">
             <h2 className="text-lg font-bold text-slate-800 mb-4">Minimum Spanning Tree</h2>
             <div className="flex-1 rounded-xl overflow-hidden">
               <GraphVisualizer 
                graphData={graphData} 
                mstEdges={result ? result.edges : []}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyNetwork;
