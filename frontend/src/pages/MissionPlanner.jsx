import React, { useState } from 'react';
import { FileText, CheckCircle } from 'lucide-react';
import { runDijkstra } from '../services/api';

const MissionPlanner = () => {
  const [mission, setMission] = useState({
    location: 'A',
    destination: 'C',
    people: '',
    priority: 'HIGH',
    type: 'Medical'
  });
  
  const [result, setResult] = useState(null);
  const [missionId, setMissionId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const id = `RP-${Math.floor(1000 + Math.random() * 9000)}`;
    setMissionId(id);
    
    try {
      const res = await runDijkstra(mission.location, mission.destination, 'fastest');
      setResult(res);
    } catch (err) {
      console.error(err);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2 drop-shadow-sm">Mission Planner</h1>
        <p className="text-slate-600 font-medium">Create and dispatch emergency rescue missions.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/60 shadow-xl">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-500" /> Dispatch Form
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase tracking-widest">Start Location</label>
                <select 
                  value={mission.location} 
                  onChange={e => setMission({ ...mission, location: e.target.value })}
                  className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-slate-800 font-bold shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  {['A','B','C','D','E','F','G','H'].map(l => <option key={l} value={l}>Node {l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase tracking-widest">Destination</label>
                <select 
                  value={mission.destination} 
                  onChange={e => setMission({ ...mission, destination: e.target.value })}
                  className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-slate-800 font-bold shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  {['A','B','C','D','E','F','G','H'].map(l => <option key={l} value={l}>Node {l}</option>)}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase tracking-widest">People</label>
                <input 
                  type="number" 
                  min="1"
                  required
                  value={mission.people}
                  onChange={e => setMission({ ...mission, people: e.target.value })}
                  className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-slate-800 font-bold shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="e.g. 15"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase tracking-widest">Priority</label>
                <select 
                  value={mission.priority} 
                  onChange={e => setMission({ ...mission, priority: e.target.value })}
                  className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-slate-800 font-bold shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase tracking-widest">Emergency Type</label>
              <select 
                value={mission.type} 
                onChange={e => setMission({ ...mission, type: e.target.value })}
                className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-slate-800 font-bold shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option>Medical</option>
                <option>Evacuation</option>
                <option>Food Supply</option>
                <option>Water Supply</option>
                <option>General Rescue</option>
              </select>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-black py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:-translate-y-0.5 transition-all mt-4 text-sm tracking-widest uppercase"
            >
              Create Mission
            </button>
          </form>
        </div>
        
        <div>
          {result && !result.error && missionId ? (
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-[10px] text-blue-600 font-black tracking-widest uppercase mb-1">Mission Authorized</div>
                  <h2 className="text-4xl font-black text-slate-800 tracking-tight">{missionId}</h2>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider ${mission.priority === 'CRITICAL' ? 'bg-red-100 text-red-600 border border-red-200 shadow-sm' : 'bg-amber-100 text-amber-600 border border-amber-200 shadow-sm'}`}>
                  {mission.priority}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-6 mb-8 text-sm bg-slate-50/50 p-5 rounded-2xl border border-slate-100 shadow-inner">
                <div>
                  <span className="block text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-1">Type</span>
                  <span className="font-black text-slate-800 text-lg">{mission.type}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-1">People</span>
                  <span className="font-black text-slate-800 text-lg">{mission.people}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-1">Status</span>
                  <span className="text-green-600 font-black flex items-center gap-1"><CheckCircle className="w-4 h-4" /> READY</span>
                </div>
              </div>
              
              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 shadow-sm">
                <div className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-3">Recommended Route</div>
                <div className="font-mono text-slate-800 font-black mb-5 text-lg">{result.path.join(' → ')}</div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-center border border-slate-100">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Dist</span>
                    <span className="font-black text-slate-800">{result.distance}km</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm text-center border border-slate-100">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">ETA</span>
                    <span className="font-black text-slate-800">{result.estimatedTime}m</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm text-center border border-slate-100">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Risk</span>
                    <span className="font-black text-slate-800">{result.risk}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-white/60 bg-white/30 backdrop-blur-sm rounded-3xl flex items-center justify-center text-slate-500 p-8 text-center font-medium">
              Submit the form to generate a mission briefing and calculate optimal routing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionPlanner;
