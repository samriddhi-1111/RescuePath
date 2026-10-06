import React from 'react';

const positions = {
  A: { x: 100, y: 150 },
  B: { x: 300, y: 50 },
  C: { x: 300, y: 250 },
  D: { x: 100, y: 350 },
  E: { x: 500, y: 150 },
  F: { x: 500, y: 350 },
  G: { x: 300, y: 450 },
  H: { x: 700, y: 250 },
};

const nodeColors = {
  "Rescue Base": { fill: "#eff6ff", stroke: "#3b82f6" }, 
  "Hospital": { fill: "#ecfdf5", stroke: "#10b981" }, 
  "Shelter": { fill: "#f5f3ff", stroke: "#8b5cf6" }, 
  "Police Station": { fill: "#fffbeb", stroke: "#f59e0b" }, 
  "Disaster Zone": { fill: "#fef2f2", stroke: "#ef4444" }, 
  "Relief Center": { fill: "#ecfeff", stroke: "#06b6d4" }, 
  "default": { fill: "#f8fafc", stroke: "#94a3b8" }
};

const getEdgeStyle = (status) => {
  const s = status.toLowerCase();
  if (s === 'blocked') return { stroke: '#ef4444', dash: '5,5', width: 3 };
  if (s === 'high risk' || s === 'high') return { stroke: '#f59e0b', dash: 'none', width: 2 };
  if (s === 'partially blocked') return { stroke: '#f97316', dash: '10,5', width: 2 };
  return { stroke: '#cbd5e1', dash: 'none', width: 2 };
};

const GraphVisualizer = ({ graphData, highlightedPath = [], highlightedEdges = [], mstEdges = [], failedEdge = null }) => {
  if (!graphData || !graphData.locations) return null;

  return (
    <div className="w-full flex flex-col xl:flex-row gap-6 items-start rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm p-4">
      
      {/* Legend - Moved outside SVG */}
      <div className="flex-shrink-0 w-full xl:w-36 bg-white/70 backdrop-blur-sm border border-white/90 p-4 rounded-xl shadow-sm">
        <h3 className="text-slate-800 text-xs font-black tracking-widest mb-3">LEGEND</h3>
        <div className="flex flex-row xl:flex-col flex-wrap gap-2.5">
          {Object.entries(nodeColors).filter(([k]) => k !== 'default').map(([type, colors]) => (
            <div key={type} className="flex items-center gap-2">
              <div 
                className="w-3.5 h-3.5 rounded-full border-2"
                style={{ backgroundColor: colors.fill, borderColor: colors.stroke }}
              ></div>
              <span className="text-slate-700 text-[10px] font-bold whitespace-nowrap uppercase tracking-wider">{type}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full flex justify-center items-center">
        <svg viewBox="0 0 800 500" className="w-full h-auto max-w-full drop-shadow-sm">
          
          {/* Edges Pass 1: Draw all lines first so they are under the labels */}
          {graphData.roads.map((road, idx) => {
            const from = positions[road.from];
            const to = positions[road.to];
            
            let isHighlighted = false;
            let isMST = false;
            let isFailed = false;

            if (highlightedPath.length > 0) {
              for (let i = 0; i < highlightedPath.length - 1; i++) {
                if (
                  (highlightedPath[i] === road.from && highlightedPath[i+1] === road.to) ||
                  (highlightedPath[i] === road.to && highlightedPath[i+1] === road.from)
                ) {
                  isHighlighted = true;
                  break;
                }
              }
            }

            if (mstEdges.length > 0) {
              isMST = mstEdges.some(e => 
                (e.from === road.from && e.to === road.to) || (e.from === road.to && e.to === road.from)
              );
            }

            if (failedEdge) {
              if ((failedEdge.from === road.from && failedEdge.to === road.to) || (failedEdge.from === road.to && failedEdge.to === road.from)) {
                isFailed = true;
              }
            }

            const baseStyle = getEdgeStyle(road.status);
            const strokeColor = isFailed ? '#dc2626' : (isHighlighted ? '#3b82f6' : (isMST ? '#10b981' : baseStyle.stroke));
            const strokeWidth = isFailed ? 6 : (isHighlighted || isMST ? 5 : baseStyle.width);
            const strokeDash = isFailed ? '2,2' : baseStyle.dash;

            return (
              <line
                key={`line-${idx}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDash}
                className={isHighlighted || isMST ? "transition-all duration-500 drop-shadow-sm" : ""}
              />
            );
          })}

          {/* Edges Pass 2: Draw all labels on top of lines */}
          {graphData.roads.map((road, idx) => {
            const from = positions[road.from];
            const to = positions[road.to];
            
            let isHighlighted = false;
            let isMST = false;
            let isFailed = false;

            if (highlightedPath.length > 0) {
              for (let i = 0; i < highlightedPath.length - 1; i++) {
                if (
                  (highlightedPath[i] === road.from && highlightedPath[i+1] === road.to) ||
                  (highlightedPath[i] === road.to && highlightedPath[i+1] === road.from)
                ) {
                  isHighlighted = true;
                  break;
                }
              }
            }

            if (failedEdge) {
              if ((failedEdge.from === road.from && failedEdge.to === road.to) || (failedEdge.from === road.to && failedEdge.to === road.from)) {
                isFailed = true;
              }
            }

            return (
              <g key={`label-${idx}`}>
                <rect 
                  x={(from.x + to.x) / 2 - 14} 
                  y={(from.y + to.y) / 2 - 10} 
                  width="28" height="20" 
                  fill="rgba(255,255,255,0.95)" rx="6" stroke="#e2e8f0"
                  className="backdrop-blur-sm shadow-sm"
                />
                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 + 4}
                  fill={isHighlighted ? "#2563eb" : (isFailed ? "#dc2626" : "#475569")}
                  fontSize="12"
                  fontWeight="800"
                  textAnchor="middle"
                >
                  {road.distance}
                </text>
              </g>
            );
          })}

          {/* Nodes Pass 3: Draw all nodes on top of everything */}
          {graphData.locations.map((loc) => {
            const pos = positions[loc.id];
            const isHighlighted = highlightedPath.includes(loc.id);
            const typeColors = nodeColors[loc.type] || nodeColors['default'];
            
            return (
              <g key={loc.id}>
                {isHighlighted && (
                  <circle cx={pos.x} cy={pos.y} r={32} fill="#bfdbfe" opacity="0.6" className="animate-pulse" />
                )}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={22}
                  fill={typeColors.fill}
                  stroke={typeColors.stroke}
                  strokeWidth={isHighlighted ? 4 : 3}
                  className="drop-shadow-md transition-all duration-300"
                />
                <text
                  x={pos.x}
                  y={pos.y + 6}
                  fill="#0f172a"
                  fontSize="16"
                  fontWeight="900"
                  textAnchor="middle"
                >
                  {loc.id}
                </text>
                <rect x={pos.x - 45} y={pos.y + 30} width="90" height="24" fill="rgba(255,255,255,0.9)" rx="12" className="backdrop-blur-md shadow-sm border border-white" />
                <text
                  x={pos.x}
                  y={pos.y + 46}
                  fill="#334155"
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {loc.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default GraphVisualizer;
