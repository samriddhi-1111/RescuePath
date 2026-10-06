import React, { useEffect, useState } from 'react';
import { getGraphData, loadScenario, updateRoadStatus, runDijkstra } from '../services/api';
import GraphVisualizer from '../components/GraphVisualizer';
import { AlertTriangle, Map } from 'lucide-react';

const DisasterSimulation = () => {
  const [graphData, setGraphData] = useState(null);
  const [scenario, setScenario] = useState('');
  
  const [sourceRoute, setSourceRoute] = useState('A');
  const [destRoute, setDestRoute] = useState('H');
  const [currentRoute, setCurrentRoute] = useState(null);
  const [newRoute, setNewRoute] = useState(null);
  const [failedEdge, setFailedEdge] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getGraphData();
    setGraphData(data);
  };

  const handleLoadScenario = async () => {
    if (!scenario) return;
    setLoading(true);
    try {
      const res = await loadScenario(scenario);
      setGraphData(res.graph);
      setCurrentRoute(null);
      setNewRoute(null);
      setFailedEdge(null);
    } catch (error) {
      console.error("Error loading scenario:", error);
    }
    setLoading(false);
  };

  const handleSimulateFailure = async (road) => {
    setLoading(true);
    try {
      const beforeRes = await runDijkstra(sourceRoute, destRoute);
      setCurrentRoute(beforeRes);

      await updateRoadStatus(road.from, road.to, 'blocked', road.risk);
      setFailedEdge(road);
      
      const afterRes = await runDijkstra(sourceRoute, destRoute);
      setNewRoute(afterRes);
      
      fetchData();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    try {
      const res = await loadScenario('reset'); 
      setGraphData(res.graph);
      setCurrentRoute(null);
      setNewRoute(null);
      setFailedEdge(null);
      setScenario('');
    } catch (error) {
      console.error("Error resetting scenario:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2 drop-shadow-sm">Disaster Simulation</h1>
        <p className="text-slate-600 font-medium">Simulate network failures and predefined disaster scenarios.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-xl flex flex-col">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Map className="h-6 w-6 text-blue-500" /> Scenarios
            </h2>
            <select 
              value={scenario} 
              onChange={e => setScenario(e.target.value)}
              className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm mb-4"
            >
              <option value="">Select Scenario...</option>
              <option value="flood">Flood (Multiple blocks)</option>
              <option value="earthquake">Earthquake (Severe damage)</option>
              <option value="fire">Fire (High risk zones)</option>
            </select>
            <div className="flex gap-3 mt-auto">
              <button 
                onClick={handleLoadScenario}
                disabled={!scenario || loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 px-2 rounded-xl shadow-md transition-all text-sm uppercase tracking-wider"
              >
                Load
              </button>
              <button 
                onClick={handleReset} 
                disabled={loading} 
                className="flex-1 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-700 font-bold py-3 px-2 rounded-xl shadow-sm transition-all text-sm uppercase tracking-wider"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-xl flex flex-col">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-500" /> What-If Analysis
            </h2>
            <div className="flex flex-col">
              <p className="text-sm text-slate-600 font-medium mb-4">Select a road to fail and observe how the routing algorithm adapts.</p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Source</label>
                  <select value={sourceRoute} onChange={e => setSourceRoute(e.target.value)} className="w-full bg-white/70 border border-white/50 rounded-lg p-2 text-slate-800 font-bold shadow-sm">
                    {graphData?.locations?.map(l => <option key={l.id} value={l.id}>{l.id}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Dest</label>
                  <select value={destRoute} onChange={e => setDestRoute(e.target.value)} className="w-full bg-white/70 border border-white/50 rounded-lg p-2 text-slate-800 font-bold shadow-sm">
                    {graphData?.locations?.map(l => <option key={l.id} value={l.id}>{l.id}</option>)}
                  </select>
                </div>
              </div>

              <div className="max-h-48 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {graphData?.roads?.filter(r => r.status !== 'blocked').map((road, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSimulateFailure(road)}
                    className="w-full flex justify-between items-center bg-white/50 hover:bg-red-50 border border-white/60 hover:border-red-200 p-3 rounded-xl shadow-sm transition-all text-left group"
                  >
                    <span className="font-mono text-sm font-bold text-slate-700 group-hover:text-red-700">{road.from} ↔ {road.to}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-200 group-hover:bg-red-100 group-hover:text-red-600 px-2 py-1 rounded text-slate-500 transition-colors">Fail Road</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {newRoute && currentRoute && (
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-xl relative overflow-hidden">
              <h2 className="text-lg font-bold mb-4 text-slate-800">Impact Report</h2>
              <div className="space-y-4">
                <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200 shadow-inner">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">BEFORE FAILURE</div>
                  <div className="font-mono text-sm font-bold text-slate-800">{!currentRoute.error ? currentRoute.path.join(' → ') : 'No Route'}</div>
                  {!currentRoute.error && <div className="text-xs font-bold text-slate-500 mt-1">Distance: {currentRoute.distance}km</div>}
                </div>
                
                <div className="bg-red-50/80 p-4 rounded-xl border border-red-200 shadow-inner">
                  <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">AFTER FAILURE</div>
                  <div className="font-mono text-sm font-bold text-red-700">{!newRoute.error ? newRoute.path.join(' → ') : 'No Route Possible'}</div>
                  {!newRoute.error && <div className="text-xs font-bold text-red-600/80 mt-1">Distance: {newRoute.distance}km</div>}
                </div>
                
                {!currentRoute.error && !newRoute.error && (
                  <div className="text-sm font-black text-amber-700 bg-amber-100/80 py-3 rounded-xl border border-amber-200 text-center shadow-sm">
                    Impact: +{newRoute.distance - currentRoute.distance} km
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-3">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 p-5 shadow-xl h-full min-h-[500px] flex flex-col">
             <h2 className="text-lg font-bold text-slate-800 mb-4">Simulation Grid</h2>
             <div className="flex-1 rounded-xl overflow-hidden">
               <GraphVisualizer 
                graphData={graphData} 
                highlightedPath={newRoute && !newRoute.error ? newRoute.path : []} 
                failedEdge={failedEdge}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterSimulation;
