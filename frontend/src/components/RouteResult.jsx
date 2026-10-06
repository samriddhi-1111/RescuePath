import React from 'react';

const RouteResult = ({ result }) => {
  if (!result) return null;

  if (result.error) {
    return (
      <div className="bg-red-900/20 border border-red-800 p-6 rounded-xl mt-6">
        <h3 className="text-red-400 font-bold mb-2">Error</h3>
        <p className="text-slate-300">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl mt-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">
        {result.algorithm === 'Kruskal' ? 'Minimum Spanning Tree Result' : 'Optimal Route Found'}
      </h3>
      
      {result.algorithm === 'Kruskal' ? (
        <div className="space-y-4">
          <p className="text-slate-300">
            <span className="font-semibold text-slate-400">Algorithm:</span> {result.algorithm}
          </p>
          <p className="text-slate-300">
            <span className="font-semibold text-slate-400">Total MST Cost:</span> {result.totalCost} km
          </p>
          <div className="mt-4">
            <p className="font-semibold text-slate-400 mb-2">Selected Edges:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {result.edges.map((e, i) => (
                <div key={i} className="bg-slate-700 px-3 py-2 rounded text-sm text-center">
                  {e.from} - {e.to} <span className="text-slate-400">({e.weight}km)</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">Time Complexity: O(E log E)</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {result.path.map((node, i) => (
              <React.Fragment key={i}>
                <span className="bg-blue-600 px-3 py-1 rounded-full font-bold text-sm">{node}</span>
                {i < result.path.length - 1 && <span className="text-slate-500">→</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-400">Total Distance</p>
              <p className="text-lg font-bold text-white">{result.distance || result.edges} {result.algorithm === 'BFS' ? 'edges' : 'km'}</p>
            </div>
            {result.risk !== undefined && (
              <div>
                <p className="text-sm text-slate-400">Risk Score</p>
                <p className="text-lg font-bold text-white">{result.risk}</p>
              </div>
            )}
            {result.estimatedTime !== undefined && (
              <div>
                <p className="text-sm text-slate-400">Estimated Time</p>
                <p className="text-lg font-bold text-white">{result.estimatedTime} mins</p>
              </div>
            )}
            <div>
              <p className="text-sm text-slate-400">Algorithm</p>
              <p className="text-lg font-bold text-white">{result.algorithm}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Time Complexity: {result.algorithm === 'Dijkstra' ? 'O((V+E) log V)' : 'O(V+E)'}
          </p>
        </div>
      )}
    </div>
  );
};

export default RouteResult;
