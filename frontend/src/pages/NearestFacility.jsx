import React, { useState, useEffect } from 'react';
import { Crosshair } from 'lucide-react';
import { findNearestFacility, getGraphData } from '../services/api';

const NearestFacility = () => {
  const [graphData, setGraphData] = useState(null);
  const [source, setSource] = useState('B');
  const [facility, setFacility] = useState('Hospital');
  const [algorithm, setAlgorithm] = useState('bfs');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGraphData().then(setGraphData).catch(console.error);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await findNearestFacility(source, facility, algorithm);
      setResult(res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2 drop-shadow-sm">Nearest Facility Locator</h1>
        <p className="text-slate-600 font-medium">Find the closest emergency facility using BFS or Dijkstra.</p>
      </header>

      <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/60 shadow-xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Current Location</label>
            <select 
              value={source} 
              onChange={e => setSource(e.target.value)}
              className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-slate-800 font-bold shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {graphData?.locations?.map(l => <option key={l.id} value={l.id}>{l.name} (Node {l.id})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Facility Needed</label>
            <select 
              value={facility} 
              onChange={e => setFacility(e.target.value)}
              className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-slate-800 font-bold shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option>Hospital</option>
              <option>Shelter</option>
              <option>Rescue Base</option>
              <option>Police Station</option>
              <option>Relief Center</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Search Algorithm</label>
            <select 
              value={algorithm} 
              onChange={e => setAlgorithm(e.target.value)}
              className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-slate-800 font-bold shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="bfs">BFS (Fewest Hops)</option>
              <option value="dijkstra">Dijkstra (Shortest Distance)</option>
            </select>
          </div>
        </div>
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:-translate-y-0.5 transition-all text-sm tracking-wider uppercase flex items-center justify-center gap-2"
        >
          <Crosshair className="w-5 h-5" /> Locate Facility
        </button>
      </div>

      {result && (
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl border border-white shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          {result.error ? (
            <p className="text-red-500 font-black text-xl">{result.error}</p>
          ) : (
            <div>
              <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Nearest {facility} Found</h2>
              <div className="text-4xl font-black text-slate-800 mb-8 drop-shadow-sm">{result.destinationName}</div>
              
              <div className="flex justify-center items-center gap-4 text-2xl font-mono mb-10 bg-blue-50/50 py-6 rounded-2xl border border-blue-100 mx-auto max-w-2xl shadow-inner text-blue-700">
                {result.path.map((n, i) => (
                  <React.Fragment key={n}>
                    <span className="font-black bg-white px-3 py-1 rounded-lg shadow-sm border border-blue-100">{n}</span>
                    {i < result.path.length - 1 && <span className="text-blue-300">→</span>}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="flex justify-center gap-12">
                <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Algorithm</p>
                  <p className="text-xl font-black text-slate-800">{result.algorithm}</p>
                </div>
                {algorithm === 'dijkstra' ? (
                  <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Distance</p>
                    <p className="text-xl font-black text-blue-600">{result.distance} km</p>
                  </div>
                ) : (
                  <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Edges (Hops)</p>
                    <p className="text-xl font-black text-blue-600">{result.edges}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NearestFacility;
