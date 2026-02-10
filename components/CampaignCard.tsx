
import React from 'react';
import { Calendar, Target, Users, MoreHorizontal, ArrowUpRight, ShieldCheck, Share2 } from 'lucide-react';
import { Campaign, PaymentStatus } from '../types';

interface CampaignCardProps {
  campaign: Campaign;
  onClick: () => void;
  onShare: (campaign: Campaign) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onClick, onShare }) => {
  const raisedPercent = Math.min((campaign.raised / campaign.goal) * 100, 100);
  const pledgedPercent = Math.min((campaign.pledged / campaign.goal) * 100, 100);
  const totalContributors = campaign.contributors?.length || 45;
  
  const materialEmojis = campaign.contributors?.filter(c => c.materialEmoji).map(c => c.materialEmoji) || ['🐄', '🍚', '🐐'];

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer relative flex flex-col h-full"
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={campaign.image} 
          alt={campaign.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-white/95 backdrop-blur shadow-sm text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-wider">
            {campaign.type}
          </span>
          {campaign.isPublic && (
            <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg">
              <ShieldCheck size={10} /> VERIFIED
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-extrabold text-xl text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-1">
            {campaign.title}
          </h3>
          <button className="text-slate-300 hover:text-slate-600 p-1">
            <MoreHorizontal size={20} />
          </button>
        </div>
        
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
          {campaign.description}
        </p>

        <div className="mt-auto space-y-5">
          <div className="space-y-2">
            <div className="flex items-end justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-emerald-600">Raised: {Math.round(raisedPercent)}%</span>
              <span className="text-orange-500">Pledged: {Math.round(pledgedPercent)}%</span>
            </div>
            
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative p-0.5">
              <div 
                className="absolute top-0.5 bottom-0.5 left-0.5 bg-orange-200 rounded-full transition-all duration-1000 opacity-60"
                style={{ width: `calc(${pledgedPercent}% - 4px)` }}
              />
              <div 
                className="absolute top-0.5 bottom-0.5 left-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.3)] z-10"
                style={{ width: `calc(${raisedPercent}% - 4px)` }}
              />
            </div>
            
            <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-1">
              <span>{campaign.raised.toLocaleString()} UGX</span>
              <span>Goal: {campaign.goal.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/${i + campaign.id}/32/32`} 
                  alt="Contributor" 
                  className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-slate-100"
                />
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              {totalContributors} Contributors
            </span>
            <div className="flex gap-1 ml-auto">
              {materialEmojis.slice(0, 3).map((emoji, i) => (
                <span key={i} className="text-sm bg-slate-50 w-6 h-6 rounded-lg flex items-center justify-center border border-slate-100 shadow-sm animate-in fade-in zoom-in" style={{ animationDelay: `${i * 100}ms` }}>
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="flex-1 bg-slate-900 text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200"
          >
            View Details <ArrowUpRight size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onShare(campaign); }}
            className="w-14 bg-white border border-slate-200 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-all shadow-sm"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
