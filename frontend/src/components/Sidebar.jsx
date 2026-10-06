import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Route as RouteIcon, Map, ShieldAlert, Navigation, Crosshair, Package } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const path = location.pathname;

  const NavItem = ({ to, icon: Icon, label }) => (
    <Link 
      to={to} 
      onClick={() => setIsOpen && setIsOpen(false)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${path === to ? 'bg-white/80 shadow-md text-blue-600 border border-white/60' : 'text-slate-600 hover:bg-white/50 hover:text-slate-900 border border-transparent hover:border-white/40'}`}
    >
      <Icon className={`h-5 w-5 ${path === to ? 'text-blue-500' : 'text-slate-500'}`} />
      <span className="font-semibold text-sm">{label}</span>
    </Link>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white/60 backdrop-blur-xl border-r border-white/50 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      <div className="p-6 border-b border-white/40">
        <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2 tracking-tight drop-shadow-sm">
          <ShieldAlert className="h-7 w-7 text-red-500 drop-shadow-sm" />
          RescuePath
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-4 mt-2">Core Systems</div>
        <NavItem to="/" icon={Activity} label="Dashboard" />
        <NavItem to="/planner" icon={RouteIcon} label="Route Planner" />
        <NavItem to="/simulation" icon={Map} label="Disaster Simulation" />
        <NavItem to="/network" icon={ShieldAlert} label="Emergency Network" />
        
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-4 mt-8">Operations</div>
        <NavItem to="/mission" icon={Navigation} label="Mission Planner" />
        <NavItem to="/nearest" icon={Crosshair} label="Nearest Facility" />
        <NavItem to="/optimizer" icon={Package} label="Resource Optimizer" />
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;
