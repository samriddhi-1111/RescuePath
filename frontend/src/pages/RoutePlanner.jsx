import React, { useEffect, useState } from 'react';
import GraphVisualizer from '../components/GraphVisualizer';
import { getGraphData, runDijkstra } from '../services/api';
import { ShieldCheck, Clock, Navigation, AlertTriangle } from 'lucide-react';

const RoutePlanner = () => {
  const [graphData, setGraphData] = useState(null);
  const [source, setSource] = useState('A');
  const [destination, setDestination] = useState('C');
  const [mode, setMode] = useState('fastest');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGraphData().then(setGraphData).catch(console.error);
  }, []);

  const handleRun = async (currentMode = mode) => {
    setLoading(true);
    try {
      const res = await runDijkstra(source, destination, currentMode);
      setResult(res);
    } catch (err) {
      setResult({ error: "Failed to connect to the server." });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2 drop-shadow-sm">Route Planner</h1>
        <p className="text-slate-600 font-medium">Calculate optimal rescue routes using Dijkstra's algorithm with weighted graphs.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Route Settings</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Source Node</label>
                  <select 
                    value={source} 
                    onChange={e => setSource(e.target.value)}
                    className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all"
                  >
                    {graphData?.locations?.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.id} - {loc.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Destination Node</label>
                  <select 
                    value={destination} 
                    onChange={e => setDestination(e.target.value)}
                    className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all"
                  >
                    {graphData?.locations?.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.id} - {loc.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Routing Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    type="button"
                    onClick={() => setMode('fastest')}
                    className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-300 ${mode === 'fastest' ? 'bg-blue-50 border-blue-400 text-blue-600 shadow-sm' : 'bg-white/50 border-white/50 text-slate-500 hover:bg-white/80'}`}
                  >
                    <Clock className="h-6 w-6 mb-1" />
                    <span className="text-[10px] font-black uppercase">Fastest</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setMode('safest')}
                    className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-300 ${mode === 'safest' ? 'bg-green-50 border-green-400 text-green-600 shadow-sm' : 'bg-white/50 border-white/50 text-slate-500 hover:bg-white/80'}`}
                  >
                    <ShieldCheck className="h-6 w-6 mb-1" />
                    <span className="text-[10px] font-black uppercase">Safest</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setMode('balanced')}
                    className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-300 ${mode === 'balanced' ? 'bg-purple-50 border-purple-400 text-purple-600 shadow-sm' : 'bg-white/50 border-white/50 text-slate-500 hover:bg-white/80'}`}
                  >
                    <Navigation className="h-6 w-6 mb-1" />
                    <span className="text-[10px] font-black uppercase">Balanced</span>
                  </button>
                </div>
              </div>

              <button 
                onClick={() => handleRun()}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-black py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 transition-all mt-4 text-sm tracking-wider uppercase"
              >
                {loading ? 'Calculating...' : 'Find Route'}
              </button>
            </div>
          </div>

          {result && !result.error && (
            <div className="bg-white/70 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
              <h3 className="text-sm font-black text-blue-600 flex items-center gap-2 uppercase tracking-wider mb-4">
                <ShieldCheck className="h-5 w-5" /> Optimal Route
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  {result.path.map((node, i) => (
                    <React.Fragment key={i}>
                      <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-800 font-bold text-sm shadow-sm">{node}</span>
                      {i < result.path.length - 1 && <span className="text-slate-400 font-bold">→</span>}
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 bg-white/50 p-4 rounded-xl border border-white/60 shadow-inner">
                  <div>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Distance</p>
                    <p className="text-2xl font-black text-slate-800">{result.distance} km</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">ETA</p>
                    <p className="text-2xl font-black text-slate-800">{result.estimatedTime} min</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Risk Level</p>
                    <p className={`text-xl font-black ${result.risk > 10 ? 'text-red-500' : (result.risk > 5 ? 'text-amber-500' : 'text-green-500')}`}>{result.risk}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Algorithm</p>
                    <p className="text-sm font-black text-blue-600 mt-1 capitalize">{result.algorithm} <span className="text-slate-400 text-xs">({result.mode})</span></p>
                  </div>
                </div>
                
                <div className="bg-white/50 p-3 rounded-lg border border-white/60 flex justify-between items-center mt-2 shadow-sm">
                  <span className="text-xs font-bold text-slate-500">Time Complexity</span>
                  <code className="text-xs text-purple-600 font-black bg-purple-100 px-2 py-1 rounded">O((V+E) log V)</code>
                </div>
              </div>
            </div>
          )}

          {result && result.error && (
            <div className="bg-red-50 backdrop-blur-md border border-red-200 p-6 rounded-2xl mt-6 shadow-lg">
              <h3 className="text-red-600 font-black mb-2 flex items-center gap-2"><AlertTriangle size={18} /> Routing Error</h3>
              <p className="text-red-800 font-medium">{result.error}</p>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 p-5 shadow-xl h-full flex flex-col">
             <h2 className="text-lg font-bold text-slate-800 mb-4">Route Visualization</h2>
             <div className="flex-1 rounded-xl overflow-hidden">
               <GraphVisualizer 
                graphData={graphData} 
                highlightedPath={result && !result.error ? result.path : []} 
              />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePlanner;
