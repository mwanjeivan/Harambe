
import React, { useState } from 'react';
import { Wallet, Package, Heart, CreditCard, ChevronLeft, Minus, Plus } from 'lucide-react';

const MATERIAL_OPTIONS = [
  { id: 'cow', name: 'Cow', emoji: '🐄', value: 1200000 },
  { id: 'rice', name: 'Rice Sack', emoji: '🍚', value: 150000 },
  { id: 'tent', name: 'Event Tent', emoji: '⛺', value: 300000 },
  { id: 'soda', name: 'Soda Crate', emoji: '🥤', value: 45000 },
  { id: 'goat', name: 'Goat', emoji: '🐐', value: 250000 },
  { id: 'cake', name: 'Wedding Cake', emoji: '🎂', value: 1500000 }
];

const PledgeCenter: React.FC<{ campaignName: string, onBack: () => void }> = ({ campaignName, onBack }) => {
  const [pledgeType, setPledgeType] = useState<'cash' | 'item'>('cash');
  const [amount, setAmount] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});

  const handleItemClick = (id: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const removeItem = (id: string) => {
    setSelectedItems(prev => {
      const newVal = (prev[id] || 0) - 1;
      if (newVal <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newVal };
    });
  };

  const totalValue = Object.entries(selectedItems).reduce((acc, [id, qty]) => {
    const item = MATERIAL_OPTIONS.find(o => o.id === id);
    // Fix: Explicitly wrap qty in Number() to resolve right-hand side arithmetic type error
    return acc + (item?.value || 0) * Number(qty);
  }, 0);

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500 mb-20">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 transition-colors">
        <ChevronLeft size={20} /> BACK TO CAMPAIGN
      </button>

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Pledge to Support</h2>
        <p className="text-emerald-600 font-bold italic">{campaignName}</p>
      </div>

      <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
        <button 
          onClick={() => setPledgeType('cash')}
          className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
            pledgeType === 'cash' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Cash Contribution
        </button>
        <button 
          onClick={() => setPledgeType('item')}
          className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
            pledgeType === 'item' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Materialistic Pledge
        </button>
      </div>

      {pledgeType === 'cash' ? (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center">Amount in UGX</p>
            <div className="relative">
              <input 
                type="number"
                placeholder="0.00"
                className="w-full bg-slate-50 border-none outline-none text-center text-4xl font-black py-8 rounded-[2rem] focus:ring-4 focus:ring-emerald-100 transition-all"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['50000', '100000', '250000', '500000', '1000000', '2000000'].map(val => (
              <button 
                key={val}
                onClick={() => setAmount(val)}
                className="py-3 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl font-bold text-xs transition-colors border border-transparent hover:border-emerald-100"
              >
                {parseInt(val).toLocaleString()}
              </button>
            ))}
          </div>
          <button className="w-full bg-emerald-600 text-white py-5 rounded-[1.5rem] font-black tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3">
            <CreditCard size={20} /> PAY VIA MOBILE MONEY
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MATERIAL_OPTIONS.map(item => (
              <div 
                key={item.id}
                onDoubleClick={() => handleItemClick(item.id)}
                onClick={() => handleItemClick(item.id)}
                className="group relative bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer select-none overflow-hidden"
              >
                {selectedItems[item.id] > 0 && (
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black animate-in zoom-in">
                    {selectedItems[item.id]}
                  </div>
                )}
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{item.emoji}</div>
                <p className="font-black text-slate-800 text-sm tracking-tight">{item.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">~UGX {item.value.toLocaleString()}</p>
                <div className="mt-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                    onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                    className="p-1 hover:bg-red-50 text-red-500 rounded-lg"
                   >
                    <Minus size={14} />
                   </button>
                   <span className="text-xs font-black w-4">{selectedItems[item.id] || 0}</span>
                   <button 
                    onClick={(e) => { e.stopPropagation(); handleItemClick(item.id); }}
                    className="p-1 hover:bg-emerald-50 text-emerald-500 rounded-lg"
                   >
                    <Plus size={14} />
                   </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl space-y-6">
            <div className="flex justify-between items-center pb-6 border-b border-white/10">
              <div>
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Estimated Value</p>
                <h3 className="text-3xl font-black">UGX {totalValue.toLocaleString()}</h3>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl">
                <Package className="text-emerald-400" size={32} />
              </div>
            </div>
            <div className="space-y-3">
              {Object.entries(selectedItems).map(([id, qty]) => {
                const item = MATERIAL_OPTIONS.find(o => o.id === id);
                return (
                  <div key={id} className="flex justify-between items-center text-sm font-medium text-slate-400">
                    <span>{item?.emoji} {item?.name} x {qty}</span>
                    {/* Fix: Explicitly wrap qty in Number() to resolve right-hand side arithmetic type error */}
                    <span className="text-white font-bold">UGX {((item?.value || 0) * Number(qty)).toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
            <button className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3">
              <Heart size={20} /> COMMIT PLEDGE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PledgeCenter;
