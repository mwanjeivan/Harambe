
import React, { useState } from 'react';
import { 
  ArrowLeft, Share2, Mail, Check, Search, 
  Phone, Clock, Zap, ShieldCheck, Users,
  Receipt, FileSpreadsheet, Heart, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Campaign, Contributor, PaymentStatus } from '../types';

interface CampaignDetailsProps {
  campaign: Campaign;
  onBack: () => void;
  onPledge: () => void;
  onShareList: () => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign, onBack, onPledge, onShareList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const raisedPercent = Math.min((campaign.raised / campaign.goal) * 100, 100);
  const pledgedPercent = Math.min((campaign.pledged / campaign.goal) * 100, 100);

  const maskPhone = (phone: string) => {
    if (!phone) return '***';
    // Format: +256 701 *** 567 as seen in the user reference image
    return phone.slice(0, 4) + ' ' + phone.slice(4, 7) + ' *** ' + phone.slice(-3);
  };

  const contributors: Contributor[] = campaign.contributors || [
    { id: '1', name: 'Mary Atuhairwe', amount: 50000, status: PaymentStatus.PAID, date: '2024-05-10', phone: '+256701234567', relationship: 'Cousin', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200' },
    { id: '2', name: 'John Bosco', amount: 150000, status: PaymentStatus.PLEDGED, date: '2024-05-11', phone: '+256781234888', relationship: 'Brother', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', materialEmoji: '🐄', isDelivered: false },
    { id: '3', name: 'Sarah Mukasa', amount: 1000000, status: PaymentStatus.PAID, date: '2024-05-12', phone: '+256702222333', relationship: 'Aunt', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
    { id: '4', name: 'James Kato', amount: 200000, status: PaymentStatus.PLEDGED, date: '2024-05-13', phone: '+256755444333', relationship: 'Friend', materialEmoji: '🍚', isDelivered: true },
    { id: '5', name: 'Grace Namubiru', amount: 500000, status: PaymentStatus.PAID, date: '2024-05-14', phone: '+256777666555', relationship: 'Sister', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
  ];

  const filteredContributors = contributors.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.relationship.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-32">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 transition-colors">
          <ArrowLeft size={20} /> BACK
        </button>
        <div className="flex gap-3">
          <button className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <Mail size={16} /> E-Invite
          </button>
          <button onClick={onShareList} className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            <Share2 size={16} /> Share List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-12">
          {/* Campaign Hero Card */}
          <div className="relative h-[350px] md:h-[450px] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-white">
            <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-95"></div>
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white space-y-4 pr-12">
              <div className="flex gap-2">
                <span className="bg-emerald-500/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{campaign.type}</span>
                <span className="bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={12} /> Verified
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.9]">{campaign.title}</h1>
              <p className="text-slate-200 font-medium max-w-2xl text-base md:text-lg leading-relaxed line-clamp-2">{campaign.description}</p>
            </div>
          </div>

          {/* Stats Bar - Improved for Fit */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white p-5 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-center min-w-0">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">Target Goal</p>
              <p className="text-lg md:text-xl font-black text-slate-900 truncate">UGX {campaign.goal.toLocaleString()}</p>
            </div>
            <div className="bg-emerald-50 p-5 md:p-6 rounded-[2rem] border border-emerald-100 shadow-sm flex flex-col justify-center min-w-0">
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1 truncate">Collected</p>
              <div className="flex items-center gap-1.5 min-w-0">
                <p className="text-lg md:text-xl font-black text-emerald-700 truncate">UGX {campaign.raised.toLocaleString()}</p>
                <span className="shrink-0 text-[10px] font-bold bg-emerald-100 px-1.5 py-0.5 rounded-lg text-emerald-600">{Math.round(raisedPercent)}%</span>
              </div>
            </div>
            <div className="bg-orange-50 p-5 md:p-6 rounded-[2rem] border border-orange-100 shadow-sm flex flex-col justify-center min-w-0">
              <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-1 truncate">Commitments</p>
              <p className="text-lg md:text-xl font-black text-orange-700 truncate">UGX {campaign.pledged.toLocaleString()}</p>
            </div>
          </div>

          {/* CONTRIBUTORS LIST SECTION */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
              <div className="space-y-1">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Contributor List</h2>
                <p className="text-slate-400 font-medium italic text-sm">Transparency for the {campaign.type} community</p>
              </div>
              <button className="bg-white border border-slate-200 px-6 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                <FileSpreadsheet size={16} className="text-emerald-500" /> Download Report (CSV)
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="px-4">
              <div className="relative group flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input 
                  type="text"
                  placeholder="Search by name or relationship..."
                  className="w-full bg-white border border-slate-200 rounded-[1.5rem] py-4 md:py-5 pl-14 pr-6 text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Contributor Cards Grid - Redesigned to match image exactly */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
              {filteredContributors.map((contributor) => (
                <div 
                  key={contributor.id} 
                  className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 flex items-start gap-5 md:gap-6 group relative"
                >
                  {/* Photo Container */}
                  <div className="shrink-0 pt-2">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] overflow-hidden bg-slate-100 ring-4 ring-slate-50 shadow-inner">
                      {contributor.photo ? (
                        <img src={contributor.photo} alt={contributor.name} className="w-full h-full object-cover transition-all duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-700 font-black text-2xl uppercase">
                          {contributor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    {contributor.materialEmoji && (
                      <div className="absolute -bottom-1 left-20 md:left-24 -translate-x-1/2 bg-white shadow-lg rounded-xl w-8 h-8 flex items-center justify-center text-sm border-2 border-slate-50">
                        {contributor.materialEmoji}
                      </div>
                    )}
                  </div>

                  {/* Info Content - Structured like the reference image */}
                  <div className="flex-1 min-w-0 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 min-w-0">
                        <h4 className="font-black text-slate-900 text-lg md:text-xl tracking-tight truncate leading-tight">{contributor.name}</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                           <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
                             {contributor.relationship}
                           </span>
                           <span className="text-[10px] font-bold text-slate-400 font-mono">
                             {maskPhone(contributor.phone)}
                           </span>
                        </div>
                      </div>
                      <span className={`shrink-0 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        contributor.status === PaymentStatus.PAID 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-orange-50 text-orange-600'
                      }`}>
                        {contributor.status}
                      </span>
                    </div>

                    <div className="flex items-end justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">UGX</span>
                        <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">
                          {contributor.amount.toLocaleString()}
                        </p>
                      </div>
                      
                      {contributor.status === PaymentStatus.PAID ? (
                        <button className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 transition-colors py-1.5 px-3 rounded-xl hover:bg-emerald-50 group/receipt font-black text-[10px] uppercase tracking-widest">
                          <Receipt size={14} className="group-hover/receipt:rotate-12 transition-transform" />
                          E-Receipt
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">
                          <Clock size={12} /> Pending
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredContributors.length === 0 && (
              <div className="py-24 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                  <Search size={40} />
                </div>
                <div>
                  <p className="font-black text-slate-900">No results found</p>
                  <p className="text-slate-400 text-sm font-medium">Try searching for a different name</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Status Column */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group lg:sticky lg:top-24">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:opacity-100 transition-opacity opacity-50"></div>
            
            <h3 className="text-xl md:text-2xl font-black mb-10 flex items-center gap-3">
              <Zap size={24} className="text-orange-500 fill-current" /> Campaign Pulse
            </h3>
            
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400 ring-1 ring-white/5">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="font-black text-base md:text-lg tracking-tight">Verified Live</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-2xl flex items-center justify-center text-orange-400 ring-1 ring-white/5">
                  <Clock size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Closing</p>
                  <p className="font-black text-base md:text-lg tracking-tight">{campaign.deadline}</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400 ring-1 ring-white/5">
                  <Users size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Supporters</p>
                  <p className="font-black text-base md:text-lg tracking-tight">{contributors.length} Verified</p>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <button 
                onClick={onPledge}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white py-5 rounded-2xl font-black text-sm tracking-[0.2em] transition-all shadow-2xl shadow-orange-900/40 active:scale-95 flex items-center justify-center gap-3"
              >
                <Heart size={20} className="fill-white" /> CONTRIBUTE
              </button>
              <button className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all border border-white/5">
                Official PDF
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Organized By</h4>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-white text-lg uppercase">
                {campaign.organizer?.split(' ').map(n => n[0]).join('') || "SN"}
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg leading-none mb-1.5">{campaign.organizer || "Sarah Namubiru"}</p>
                <div className="flex items-center gap-1 text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-lg w-fit">
                  <CheckCircle2 size={10} /> Trusted
                </div>
              </div>
            </div>
            <button className="w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              <Phone size={14} /> Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
