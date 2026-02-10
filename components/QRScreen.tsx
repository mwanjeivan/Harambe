
import React, { useState } from 'react';
import { QrCode, ShieldCheck, User, Share2, Download, Megaphone, CheckCircle2 } from 'lucide-react';

const QRScreen: React.FC = () => {
  const [view, setView] = useState<'personal' | 'campaign'>('personal');

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-in zoom-in duration-500 flex flex-col items-center">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Rapid Scan Center</h2>
        <p className="text-slate-500 font-medium text-lg">Instant identification for seamless contributions</p>
      </div>

      <div className="flex bg-white p-1.5 rounded-3xl shadow-sm border border-slate-100 w-full max-w-sm">
        <button 
          onClick={() => setView('personal')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
            view === 'personal' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400'
          }`}
        >
          <User size={14} /> My Profile
        </button>
        <button 
          onClick={() => setView('campaign')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
            view === 'campaign' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400'
          }`}
        >
          <Megaphone size={14} /> Event Code
        </button>
      </div>

      <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-slate-200 border border-slate-100 relative group overflow-hidden max-w-md w-full">
        <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000"></div>
        
        <div className="relative z-10 p-8 bg-slate-50 rounded-[3rem] border-4 border-slate-900/5 transition-transform duration-700 group-hover:scale-105">
          <QrCode size={300} className="text-slate-900 w-full h-auto" />
        </div>
        
        <div className="mt-10 flex items-center justify-center gap-4">
           {view === 'personal' ? (
             <>
               <img 
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100" 
                  alt="Profile" 
                  className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                />
                <div className="text-left">
                  <p className="text-lg font-black text-slate-900 tracking-tight">Sarah Namubiru</p>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    <ShieldCheck size={12} /> Verified Identity
                  </div>
                </div>
             </>
           ) : (
             <div className="text-center">
                <p className="text-lg font-black text-slate-900 tracking-tight">Sarah & John's Wedding</p>
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  <CheckCircle2 size={12} /> Live Event Code
                </div>
             </div>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <button className="group flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-[1.75rem] font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200">
          <Download size={18} className="group-hover:translate-y-1 transition-transform" /> Save To Gallery
        </button>
        <button className="group flex items-center justify-center gap-3 bg-emerald-600 text-white py-5 rounded-[1.75rem] font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-100">
          <Share2 size={18} className="group-hover:rotate-12 transition-transform" /> Quick Share
        </button>
      </div>

      <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 w-full max-w-md">
        <h4 className="font-black text-slate-900 text-xs uppercase tracking-[0.2em] mb-4 text-center">How to use</h4>
        <p className="text-xs text-slate-500 font-medium leading-relaxed text-center">
          Ask others to point their phone camera at this code. It will automatically open the payment gateway for 
          {view === 'personal' ? ' your personal wallet' : " this specific event campaign"}.
        </p>
      </div>
    </div>
  );
};

export default QRScreen;
