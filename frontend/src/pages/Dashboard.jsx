import React, { useEffect, useState } from 'react';
import { getStatistics, getGraphData } from '../services/api';
import StatCard from '../components/StatCard';
import GraphVisualizer from '../components/GraphVisualizer';
import { ShieldAlert, Route, AlertTriangle, Users, MapPin } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statData, graph] = await Promise.all([
          getStatistics(),
          getGraphData()
        ]);
        setStats(statData);
        setGraphData(graph);
      } catch (err) {
        console.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-slate-500 p-8 font-semibold animate-pulse">Loading simulation data...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2 drop-shadow-sm">Emergency Operations Center</h1>
        <p className="text-slate-600 font-medium">Real-time overview of the disaster network and algorithmic routing systems.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Active Zones" value={`0${stats?.disasterZones || 0}`} subtitle="Disaster Locations" icon={ShieldAlert} />
        <StatCard title="Open Roads" value={stats?.openRoads} subtitle="Safe to Travel" icon={Route} />
        <StatCard title="Blocked Roads" value={`0${stats?.blockedRoads || 0}`} subtitle="Impassable" icon={AlertTriangle} />
        <StatCard title="Total Locations" value={stats?.totalLocations} subtitle="Tracked Nodes" icon={MapPin} />
        <StatCard title="People at Risk" value="143" subtitle="Simulated Data" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 p-6 shadow-xl h-full">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Live Disaster Network</h2>
            <GraphVisualizer graphData={graphData} />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 p-5 shadow-xl">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Network Status</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 font-bold">Overall Risk Level</span>
                  <span className="text-amber-500 font-black">{stats?.averageRisk} / 5.0</span>
                </div>
                <div className="w-full bg-slate-200/50 rounded-full h-3 shadow-inner overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-300 to-amber-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${(stats?.averageRisk / 5) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 font-bold">Road Availability</span>
                  <span className="text-blue-600 font-black">{stats?.openRoads} / {stats?.totalRoads}</span>
                </div>
                <div className="w-full bg-slate-200/50 rounded-full h-3 shadow-inner overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${(stats?.openRoads / stats?.totalRoads) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Algorithm Systems</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-700 bg-white/70 p-3 rounded-xl shadow-sm border border-white/50">
                <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                Dijkstra Shortest Path Engine
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-700 bg-white/70 p-3 rounded-xl shadow-sm border border-white/50">
                <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                Kruskal MST Generator
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-700 bg-white/70 p-3 rounded-xl shadow-sm border border-white/50">
                <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                BFS Traversal Service
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
