import React, { useEffect, useState } from 'react';
import { getGraphData } from '../services/api';
import StatCard from '../components/StatCard';
import { MapPin, Route, AlertTriangle, Layers } from 'lucide-react';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getGraphData().then(setData).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Disaster Rescue Path Planning Dashboard</h1>
        <p className="text-slate-400">DAA Mini-Project demonstrating graph algorithms for emergency response.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Locations" 
          value={data?.locations?.length || '-'} 
          subtitle="Nodes in Graph"
          icon={MapPin}
        />
        <StatCard 
          title="Roads" 
          value={data?.roads?.length || '-'} 
          subtitle="Edges in Graph"
          icon={Route}
        />
        <StatCard 
          title="Blocked Roads" 
          value={data?.roads?.filter(r => r.status === 'blocked').length || '0'} 
          subtitle="Unavailable Paths"
          icon={AlertTriangle}
        />
        <StatCard 
          title="Algorithms" 
          value="3" 
          subtitle="Dijkstra, Kruskal, BFS"
          icon={Layers}
        />
      </div>

      <div className="mt-12 bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold mb-4">Algorithm Complexity</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="py-3 px-4">Algorithm</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">Time Complexity</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="py-3 px-4 font-medium">BFS</td>
                <td className="py-3 px-4 text-slate-400">Graph traversal</td>
                <td className="py-3 px-4 font-mono text-blue-400">O(V + E)</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-3 px-4 font-medium">Dijkstra</td>
                <td className="py-3 px-4 text-slate-400">Shortest path</td>
                <td className="py-3 px-4 font-mono text-blue-400">O((V + E) log V)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Kruskal</td>
                <td className="py-3 px-4 text-slate-400">Minimum Spanning Tree</td>
                <td className="py-3 px-4 font-mono text-blue-400">O(E log E)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
