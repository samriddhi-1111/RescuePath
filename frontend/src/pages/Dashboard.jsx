import React, { useEffect, useState } from 'react';
import { getStatistics, getGraphData } from '../services/api';
import StatCard from '../components/StatCard';
import GraphVisualizer from '../components/GraphVisualizer';
import { ShieldAlert, Route, AlertTriangle, Users, MapPin } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statData, graph] = await Promise.all([
        getStatistics(),
        getGraphData()
      ]);
      setStats(statData);
      setGraphData(graph);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2 drop-shadow-sm">Emergency Operations Center</h1>
        <p className="text-slate-600 font-medium">Real-time overview of the disaster network and algorithmic routing systems.</p>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" />
            <span className="font-semibold">{error}</span>
          </div>
          <button onClick={fetchData} className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-bold transition-colors">
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Active Zones" value={loading ? '...' : `0${stats?.disasterZones || 0}`} subtitle="Disaster Locations" icon={ShieldAlert} />
        <StatCard title="Open Roads" value={loading ? '...' : (stats?.openRoads ?? 0)} subtitle="Safe to Travel" icon={Route} />
        <StatCard title="Blocked Roads" value={loading ? '...' : `0${stats?.blockedRoads || 0}`} subtitle="Impassable" icon={AlertTriangle} />
        <StatCard title="Total Locations" value={loading ? '...' : (stats?.totalLocations ?? 0)} subtitle="Tracked Nodes" icon={MapPin} />
        <StatCard title="People at Risk" value="143" subtitle="Simulated Data" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 p-6 shadow-xl h-full min-h-[400px] flex flex-col">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Live Disaster Network</h2>
            {loading && !graphData ? (
              <div className="flex-1 flex items-center justify-center text-slate-500 font-semibold animate-pulse">Loading simulation data...</div>
            ) : graphData ? (
              <GraphVisualizer graphData={graphData} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500 font-semibold">No data available</div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 p-5 shadow-xl">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Network Status</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 font-bold">Overall Risk Level</span>
                  <span className="text-amber-500 font-black">{loading ? '...' : (stats?.averageRisk ?? 0)} / 5.0</span>
                </div>
                <div className="w-full bg-slate-200/50 rounded-full h-3 shadow-inner overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-300 to-amber-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${((stats?.averageRisk || 0) / 5) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 font-bold">Road Availability</span>
                  <span className="text-blue-600 font-black">{loading ? '...' : (stats?.openRoads ?? 0)} / {loading ? '...' : (stats?.totalRoads ?? 0)}</span>
                </div>
                <div className="w-full bg-slate-200/50 rounded-full h-3 shadow-inner overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000" style={{ width: stats?.totalRoads ? `${(stats.openRoads / stats.totalRoads) * 100}%` : '0%' }}></div>
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
