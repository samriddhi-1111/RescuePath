import React, { useState } from 'react';
import { runKnapsack } from '../services/api';
import { Package, Plus, Trash2, CheckCircle } from 'lucide-react';

const ResourceOptimizer = () => {
  const [capacity, setCapacity] = useState(20);
  const [items, setItems] = useState([
    { id: 1, name: 'Medical Kit', weight: 5, benefit: 50 },
    { id: 2, name: 'Oxygen', weight: 10, benefit: 90 },
    { id: 3, name: 'Food', weight: 8, benefit: 40 },
    { id: 4, name: 'Water', weight: 6, benefit: 45 }
  ]);
  const [result, setResult] = useState(null);

  const handleAddItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, { id: newId, name: 'New Item', weight: 1, benefit: 10 }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleChange = (id, field, value) => {
    if (field !== 'name') {
      // Prevent negative numbers and strip leading zeros (except a single zero)
      let cleaned = value.replace(/^-/, '').replace(/^0+(?=\d)/, '');
      let num = cleaned === '' ? '' : Number(cleaned);
      setItems(items.map(i => i.id === id ? { ...i, [field]: num } : i));
    } else {
      setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
    }
  };

  const handleOptimize = async (e) => {
    if (e) e.preventDefault();
    if (!capacity || capacity <= 0) return;
    if (items.some(i => !i.name || i.weight === '' || i.benefit === '')) return;

    try {
      const res = await runKnapsack(items, capacity);
      setResult(res);
    } catch (err) {
      console.error(err);
    }
  };

  const isFormValid = capacity > 0 && items.every(i => i.name.trim() !== '' && i.weight !== '' && i.benefit !== '');

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2 drop-shadow-sm">Rescue Resource Optimizer</h1>
        <p className="text-slate-600 font-medium">Use Dynamic Programming (0/1 Knapsack) to select the optimal combination of emergency supplies.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleOptimize} className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/60 shadow-xl">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Package className="text-blue-500" /> Vehicle Cargo Setup
          </h2>
          
          <div className="mb-8">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Vehicle Weight Capacity (kg)</label>
            <input 
              type="number" 
              required
              min="1"
              value={capacity} 
              onChange={e => {
                let val = e.target.value.replace(/^-/, '').replace(/^0+(?=\d)/, '');
                setCapacity(val === '' ? '' : Number(val));
              }}
              className="w-full bg-white/80 border border-white rounded-xl p-4 text-slate-800 text-2xl font-black shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all text-center"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end mb-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Available Resources</label>
              <button type="button" onClick={handleAddItem} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                <Plus size={14} /> Add Item
              </button>
            </div>
            
            {items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-white/70 p-2 rounded-xl border border-white shadow-sm transition-all hover:shadow-md">
                <div className="col-span-5">
                  <input type="text" required placeholder="Item Name" value={item.name} onChange={e => handleChange(item.id, 'name', e.target.value)} className="w-full bg-transparent border-none p-2 text-sm font-bold text-slate-700 focus:outline-none placeholder:text-slate-400" />
                </div>
                <div className="col-span-3">
                  <div className="flex items-center bg-slate-100/50 rounded-lg overflow-hidden border border-slate-200/50">
                    <input type="number" required min="0" value={item.weight} onChange={e => handleChange(item.id, 'weight', e.target.value)} className="w-full bg-transparent border-none p-2 text-sm font-bold text-slate-700 focus:outline-none text-center" />
                    <span className="bg-slate-200/50 text-[10px] font-black text-slate-500 px-2 py-2.5">kg</span>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center bg-blue-50/50 rounded-lg overflow-hidden border border-blue-100/50">
                    <span className="bg-blue-100/50 text-[10px] font-black text-blue-500 px-2 py-2.5">pts</span>
                    <input type="number" required min="0" value={item.benefit} onChange={e => handleChange(item.id, 'benefit', e.target.value)} className="w-full bg-transparent border-none p-2 text-sm font-bold text-blue-700 focus:outline-none text-center" />
                  </div>
                </div>
                <div className="col-span-1 text-right flex justify-end pr-2">
                  <button type="button" onClick={() => handleRemoveItem(item.id)} className="text-red-400 hover:text-red-600 p-1 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>

          <button 
            type="submit"
            className="w-full font-black py-4 px-4 rounded-xl mt-8 shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] transition-all text-sm tracking-widest uppercase bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white hover:-translate-y-0.5"
          >
            Optimize Loadout
          </button>
        </form>

        <div>
          {result ? (
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-2xl h-full relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Optimization Results</h2>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl text-center mb-8 border border-green-100 shadow-inner">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Maximum Rescue Benefit</p>
                <div className="text-6xl font-black text-green-500 drop-shadow-sm">{result.maxBenefit}</div>
              </div>
              
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Selected Items ({result.selectedItems.length})</h3>
              <div className="space-y-3 mb-8 flex-1">
                {result.selectedItems.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-xl text-slate-800 shadow-sm">
                    <span className="font-bold flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" /> {item.name}
                    </span>
                    <span className="text-sm font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">{item.weight}kg <span className="text-slate-300 mx-1">|</span> <span className="text-blue-500">{item.benefit}pts</span></span>
                  </div>
                ))}
                {result.selectedItems.length === 0 && (
                  <div className="text-slate-400 font-medium italic p-6 text-center bg-slate-50 rounded-xl border border-slate-100">No items fit within the capacity.</div>
                )}
              </div>
              
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 shadow-inner mt-auto">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Weight Used</span>
                  <span className="font-black text-slate-800 text-lg bg-white px-3 py-1 rounded-lg shadow-sm border border-slate-100">{result.selectedItems.reduce((acc, item) => acc + item.weight, 0)} / {capacity} kg</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Algorithm</span>
                  <span className="text-xs font-black text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-100">0/1 Knapsack (DP)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-white/60 bg-white/30 backdrop-blur-sm rounded-3xl flex items-center justify-center text-slate-500 p-8 text-center font-medium">
              Configure your vehicle capacity and available resources, then run the optimizer to see the best loadout.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceOptimizer;
