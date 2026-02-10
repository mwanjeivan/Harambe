
import React, { useState } from 'react';
import { Bell, Calendar, Clock, CheckCircle2, AlertCircle, ArrowRight, UserPlus, Info, Trash2, Check, Video, Plus, Users } from 'lucide-react';

const EngagementCenter: React.FC = () => {
  const [view, setView] = useState<'notifications' | 'meetings'>('notifications');

  const notifications = [
    { id: '1', type: 'contribution', title: 'New Contribution Received', text: 'John Doe contributed UGX 5,000 to Community School Renovation', campaign: 'Community School Renovation', time: '2 minutes ago', unread: true },
    { id: '2', type: 'meeting', title: 'Meeting Reminder', text: 'Planning meeting for Medical Emergency Fund starts in 30 minutes', campaign: 'Medical Emergency Fund', time: '28 minutes ago', unread: true },
    { id: '3', type: 'message', title: 'WhatsApp Group Message', text: 'Sarah Smith: "Great progress on the campaign! Keep it up everyone 🎉"', campaign: 'Community School Renovation', time: 'about 1 hour ago', unread: false }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 mb-24">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">
          {view === 'notifications' ? 'Alerts' : 'E-Meetings'}
        </h2>
        <p className="text-slate-500 font-medium text-lg">
          {view === 'notifications' ? 'Stay updated on contributions and coordination' : 'Plan and host virtual meetings for your campaigns'}
        </p>
      </div>

      <div className="flex bg-slate-100 p-1.5 rounded-2xl max-w-sm mx-auto">
        <button 
          onClick={() => setView('notifications')}
          className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
            view === 'notifications' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
          }`}
        >
          Alerts
        </button>
        <button 
          onClick={() => setView('meetings')}
          className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
            view === 'meetings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
          }`}
        >
          Meetings
        </button>
      </div>

      {view === 'notifications' ? (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex bg-slate-50 p-1.5 rounded-xl w-fit overflow-x-auto no-scrollbar">
            {['All (5)', 'Unread (3)', 'Payments', 'Meetings'].map((f, i) => (
              <button key={i} className={`px-5 py-2 rounded-lg text-xs font-black whitespace-nowrap transition-all ${i === 0 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>{f}</button>
            ))}
          </div>

          <div className="space-y-6">
            {notifications.map(n => (
              <div key={n.id} className="bg-[#fff9f3] p-8 rounded-[2.5rem] border border-orange-100 relative group overflow-hidden">
                <div className="flex items-start gap-5">
                  <div className={`p-4 rounded-2xl shrink-0 ${
                    n.type === 'contribution' ? 'bg-emerald-50 text-emerald-600' : 
                    n.type === 'meeting' ? 'bg-orange-50 text-orange-600' : 'bg-purple-50 text-purple-600'
                  }`}>
                    {n.type === 'contribution' ? <CheckCircle2 size={24} /> : n.type === 'meeting' ? <Calendar size={24} /> : <Info size={24} />}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black text-slate-900 text-lg">{n.title}</h4>
                      {n.unread && <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>}
                    </div>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-lg">{n.text}</p>
                    <div className="flex items-center gap-4 pt-4">
                      <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{n.type}</span>
                      <span className="text-[10px] font-bold text-slate-400">{n.campaign}</span>
                      <span className="text-[10px] font-bold text-slate-400">{n.time}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-orange-100 flex gap-8">
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-orange-600 transition-colors">
                    <Check size={16}/> Mark as Read
                  </button>
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors">
                    <Trash2 size={16}/> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-500">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight invisible">Dashboard</h3>
            <button className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-orange-100">
              <Plus size={18}/> Schedule
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Upcoming', val: '2', sub: 'Scheduled meetings', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Completed', val: '1', sub: 'Successfully held', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Total', val: '7', sub: 'Attendees across all', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' }
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center space-y-4">
                <div className={`w-14 h-14 ${s.bg} ${s.color} rounded-2xl mx-auto flex items-center justify-center`}>
                  <s.icon size={28} />
                </div>
                <div>
                  <p className="text-4xl font-black text-slate-900">{s.val}</p>
                  <p className="text-sm font-black text-slate-900 mt-1">{s.label}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex bg-slate-100 p-1.5 rounded-xl w-fit">
              <button className="px-8 py-2.5 rounded-lg text-xs font-black bg-white text-slate-900 shadow-sm">Upcoming (2)</button>
              <button className="px-8 py-2.5 rounded-lg text-xs font-black text-slate-400">Past (1)</button>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Community School Renovation Planning</h4>
                  <p className="text-sm font-bold text-slate-400">Community School Renovation</p>
                </div>
                <span className="bg-orange-100 text-orange-600 px-5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">upcoming</span>
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                   <Calendar size={18} className="text-orange-600"/> Today 16:56
                 </div>
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                   <Clock size={18} className="text-purple-600"/> 60 min
                 </div>
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                   <Video size={18} className="text-emerald-600"/> Virtual Meeting
                 </div>
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                   <Users size={18} className="text-blue-600"/> 3 attendees
                 </div>
              </div>
              <div className="flex items-center gap-6 pt-6 border-t border-slate-50">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(u => (
                    <img key={u} src={`https://picsum.photos/seed/user${u}/40/40`} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" />
                  ))}
                </div>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all">Join Virtual Room</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngagementCenter;
