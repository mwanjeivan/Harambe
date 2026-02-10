
import React, { useState } from 'react';
import { QrCode, Mail, FileText, Share2, Users, Copy, CheckCircle2, Download, ChevronRight, Eye, Calendar, Clock, MapPin, X, Send, Search, Hash } from 'lucide-react';

const ShareCenter: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'qr' | 'invites' | 'personal'>('qr');
  const [selectedCampaign, setSelectedCampaign] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [step, setStep] = useState(1);
  const [showInvitationModal, setShowInvitationModal] = useState(false);

  const campaigns = [
    { id: '1', title: 'Community School Renovation', raised: '32.5M', goal: '50.0M', percent: 65 },
    { id: '2', title: 'Medical Emergency Fund', raised: '18.0M', goal: '25.0M', percent: 72 },
    { id: 'FUN-992', title: 'Elderly Care Support', raised: '5.2M', goal: '10.0M', percent: 52 },
    { id: 'WED-042', title: 'Sarah & John Wedding', raised: '12.0M', goal: '15.0M', percent: 80 }
  ];

  const filteredCampaigns = campaigns.filter(c => 
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const templates = [
    { id: 'elegant', name: 'Elegant Gold', color: 'bg-yellow-50', border: 'border-yellow-200', text: 'Elegant Template', preview: 'You\'re Invited' },
    { id: 'modern', name: 'Modern Blue', color: 'bg-blue-50', border: 'border-blue-200', text: 'Modern Blue', preview: 'INVITATION' },
    { id: 'fresh', name: 'Fresh Green', color: 'bg-emerald-50', border: 'border-emerald-200', text: 'Fresh Green', preview: 'Join Us' },
    { id: 'vibrant', name: 'Vibrant Purple', color: 'bg-purple-50', border: 'border-purple-200', text: 'Vibrant Purple', preview: 'CELEBRATE' }
  ];

  const InvitationModal = () => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowInvitationModal(false)}></div>
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🏫</div>
            <div>
              <h3 className="font-black text-slate-900 text-xl tracking-tight">
                {step === 4 ? 'Confirm & Send' : step === 3 ? 'Choose Template' : 'Select Contributors'}
              </h3>
              <p className="text-xs font-bold text-slate-400">Community School Renovation</p>
            </div>
          </div>
          <button onClick={() => setShowInvitationModal(false)} className="p-2 text-slate-400 hover:text-slate-900"><X size={24} /></button>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-center gap-3 mb-10">
            {[1, 2, 3, 4].map(s => (
              <React.Fragment key={s}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${
                  s <= step ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {s}
                </div>
                {s < 4 && <div className={`h-1 w-8 rounded-full ${s < step ? 'bg-orange-600' : 'bg-slate-100'}`}></div>}
              </React.Fragment>
            ))}
          </div>

          <div className="min-h-[400px]">
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-slate-900">Choose Contributors</h4>
                  <button className="text-sm font-bold text-slate-600 border px-4 py-1.5 rounded-xl">Select All</button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'John Doe', role: 'Friend', status: 'completed' },
                    { name: 'Sarah Kimani', role: 'Colleague', status: 'partial' },
                    { name: 'Mike Robert', role: 'Brother', status: 'pending' }
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center">
                        {i < 2 && <div className="w-2.5 h-2.5 bg-orange-600 rounded-full"></div>}
                      </div>
                      <img src={`https://picsum.photos/seed/${c.name}/40/40`} className="w-12 h-12 rounded-full" />
                      <div className="flex-1">
                        <p className="font-black text-slate-900 leading-tight">{c.name}</p>
                        <p className="text-xs text-slate-400 font-bold">{c.role}</p>
                      </div>
                      <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-lg ${
                        c.status === 'completed' ? 'bg-orange-100 text-orange-600' : 
                        c.status === 'partial' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                      }`}>{c.status}</span>
                      <Eye size={16} className="text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-2 gap-4">
                {templates.map(t => (
                  <div key={t.id} className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all ${t.border} ${t.color} hover:scale-105`}>
                    <div className="h-40 flex flex-col items-center justify-center text-center space-y-2">
                      <div className="text-orange-400">✨</div>
                      <p className="font-black text-orange-800 leading-tight">{t.preview}</p>
                    </div>
                    <p className="mt-4 text-[10px] font-black uppercase text-slate-500 text-center">{t.name}</p>
                  </div>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                  <p className="text-xs font-black uppercase text-slate-400">Selected Template</p>
                  <p className="text-lg font-black text-slate-900">Elegant Template</p>
                  <button className="flex items-center gap-2 px-6 py-2 bg-white rounded-xl text-xs font-black shadow-sm"><Eye size={14}/> Preview Invitation</button>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                  <p className="text-xs font-black uppercase text-slate-400">Recipients (2)</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img src="https://picsum.photos/seed/john/32/32" className="w-8 h-8 rounded-full" />
                      <span className="font-bold text-slate-900 text-sm">John Doe <span className="text-slate-400 font-medium">(Friend)</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-black text-orange-600">SK</div>
                      <span className="font-bold text-slate-900 text-sm">Sarah Kimani <span className="text-slate-400 font-medium">(Colleague)</span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-8 bg-slate-50 flex gap-4">
          <button onClick={() => setStep(s => s - 1)} className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest">Back</button>
          <button onClick={() => step < 4 ? setStep(s => s + 1) : setShowInvitationModal(false)} className="flex-[2] py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-orange-100">
            {step === 4 ? <><Send size={16}/> Send Invitations</> : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12 mb-24">
      {showInvitationModal && <InvitationModal />}
      
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Share Your Campaign</h2>
        <p className="text-slate-500 font-medium text-lg px-10">Extend your reach through QR codes and social sharing</p>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="font-black text-slate-900 text-lg">Select Campaign</h3>
          
          <div className="relative group w-full md:w-80">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
              <Search size={18} />
            </div>
            <input 
              type="text"
              placeholder="Search by Campaign ID..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-14 pr-6 text-sm font-bold outline-none focus:ring-4 focus:ring-orange-50 focus:bg-white transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map(c => (
              <div 
                key={c.id} 
                onClick={() => setSelectedCampaign(c.id)}
                className={`p-6 md:p-8 rounded-[2rem] border-2 cursor-pointer transition-all flex items-center justify-between ${
                  selectedCampaign === c.id ? 'border-orange-200 bg-orange-50/30 shadow-md' : 'border-slate-50 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Hash size={12} className="text-orange-500" />
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{c.id}</span>
                  </div>
                  <h4 className="font-black text-slate-900 text-lg md:text-xl leading-tight">{c.title}</h4>
                  <p className="text-sm font-bold text-slate-400 mt-1">UGX {c.raised} / UGX {c.goal}</p>
                </div>
                {selectedCampaign === c.id && (
                  <span className="bg-orange-600 text-white px-5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-100">Selected</span>
                )}
              </div>
            ))
          ) : (
            <div className="py-12 text-center space-y-3 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Search size={24} />
              </div>
              <p className="font-bold text-slate-400">No campaigns found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
        {[
          { id: 'qr', label: 'QR Code' },
          { id: 'invites', label: 'E-Invitation' },
          { id: 'personal', label: 'Personal Invites' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
              activeSubTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[500px] flex items-center justify-center">
        {activeSubTab === 'qr' && (
          <div className="w-full space-y-8 animate-in zoom-in duration-500">
            <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl flex flex-col items-center">
              <QrCode size={260} className="text-slate-900" />
              <p className="mt-8 font-black text-slate-900 text-lg">
                {campaigns.find(c => c.id === selectedCampaign)?.title || 'Campaign'}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                <Hash size={10} /> {selectedCampaign} • Scan to view campaign details
              </div>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
               <h4 className="font-black text-slate-900 flex items-center gap-2"><Share2 size={18}/> Share Options</h4>
               <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Campaign Link</p>
                  <div className="flex bg-slate-50 border border-slate-200 p-4 rounded-2xl justify-between items-center group">
                    <code className="text-xs font-mono truncate mr-4 italic">https://circle-pay-gather.lovable.app/campaign/{selectedCampaign}</code>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-orange-600">
                      <Copy size={18} />
                    </button>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4 pt-2">
                 <button className="bg-emerald-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-transform">
                   <div className="text-lg">💬</div> WhatsApp
                 </button>
                 <button className="bg-white border border-slate-200 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                   <Download size={16}/> Download QR
                 </button>
               </div>
            </div>
          </div>
        )}

        {activeSubTab === 'invites' && (
          <div className="w-full space-y-8 animate-in slide-in-from-bottom-6 duration-500">
             <div className="relative group overflow-hidden bg-gradient-to-br from-orange-500 to-emerald-600 h-[450px] rounded-[3.5rem] p-12 text-white flex flex-col items-center justify-center text-center space-y-6 shadow-2xl shadow-emerald-100">
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <QrCode size={40} />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">You are invited to support</p>
                  <h3 className="text-4xl font-black tracking-tighter leading-tight">
                    {campaigns.find(c => c.id === selectedCampaign)?.title || 'Campaign'}
                  </h3>
                </div>
                <div className="bg-white/10 backdrop-blur p-8 rounded-[2.5rem] border border-white/20 w-full max-w-xs space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="text-left">
                      <p className="text-2xl font-black leading-none">
                        UGX {campaigns.find(c => c.id === selectedCampaign)?.raised || '0'}
                      </p>
                      <p className="text-[10px] opacity-70">raised so far</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold leading-none opacity-80">
                        UGX {campaigns.find(c => c.id === selectedCampaign)?.goal || '0'}
                      </p>
                      <p className="text-[10px] opacity-70">target goal</p>
                    </div>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white transition-all duration-1000" style={{ width: `${campaigns.find(c => c.id === selectedCampaign)?.percent || 0}%` }} />
                  </div>
                  <p className="text-xl font-black">{campaigns.find(c => c.id === selectedCampaign)?.percent || 0}% Complete</p>
                </div>
                <p className="text-xs font-bold leading-relaxed opacity-90 max-w-xs">
                  Your contribution makes a difference! Join us in making this goal a reality.
                </p>
             </div>
             <div className="grid grid-cols-1 gap-4">
               <button onClick={() => { setStep(2); setShowInvitationModal(true); }} className="bg-emerald-600 text-white py-5 rounded-[1.75rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
                 <div className="text-lg">💬</div> Share E-Invitation to WhatsApp
               </button>
               <button className="bg-white border border-slate-200 py-5 rounded-[1.75rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors">
                 <Download size={18}/> Download E-Invitation Card
               </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareCenter;
