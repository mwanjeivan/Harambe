
import React from 'react';
import { Home, Radio, Share2, Store, Bell, Wallet } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'radar', icon: Radio, label: 'Radar' },
    { id: 'share', icon: Share2, label: 'Share' },
    { id: 'community', icon: Store, label: 'Hub' },
    { id: 'engagement', icon: Bell, label: 'Alerts' },
    { id: 'finance', icon: Wallet, label: 'Finance' }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg lg:hidden">
      <div className="glass-effect rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 p-1.5 flex items-center justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-3 rounded-3xl transition-all duration-500 relative group ${
              activeTab === tab.id 
              ? 'bg-slate-900 text-emerald-400' 
              : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon size={18} className={`${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
            <span className="text-[8px] font-black mt-1 uppercase tracking-tighter">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
