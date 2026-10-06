import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:bg-white/80 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">{title}</h3>
        {Icon && (
          <div className="bg-blue-500/10 p-2 rounded-xl">
            <Icon className="text-blue-600 h-5 w-5" />
          </div>
        )}
      </div>
      <div className="text-3xl font-black text-slate-800 mb-1">{value}</div>
      {subtitle && <p className="text-xs font-medium text-slate-500">{subtitle}</p>}
    </div>
  );
};

export default StatCard;
