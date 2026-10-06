import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RoutePlanner from './pages/RoutePlanner';
import DisasterSimulation from './pages/DisasterSimulation';
import EmergencyNetwork from './pages/EmergencyNetwork';
import MissionPlanner from './pages/MissionPlanner';
import NearestFacility from './pages/NearestFacility';
import ResourceOptimizer from './pages/ResourceOptimizer';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex relative">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-md rounded-lg border border-white shadow-md text-slate-800"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto h-screen relative z-10 pt-16 lg:pt-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planner" element={<RoutePlanner />} />
            <Route path="/simulation" element={<DisasterSimulation />} />
            <Route path="/network" element={<EmergencyNetwork />} />
            <Route path="/mission" element={<MissionPlanner />} />
            <Route path="/nearest" element={<NearestFacility />} />
            <Route path="/optimizer" element={<ResourceOptimizer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
