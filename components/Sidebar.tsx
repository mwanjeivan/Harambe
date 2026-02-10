
import React from 'react';
import { 
  LayoutDashboard, 
  Radio, 
  Share2, 
  Store, 
  Bell, 
  Wallet,
  Settings,
  X,
  Shield,
  QrCode
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Home Dashboard' },
    { id: 'radar', icon: Radio, label: 'Proximity Radar' },
    { id: 'qr', icon: QrCode, label: 'Scan to Pay' },
    { id: 'share', icon: Share2, label: 'Share & Refer' },
    { id: 'community', icon: Store, label: 'Community Hub' },
    { id: 'engagement', icon: Bell, label: 'Alerts & Events' },
    { id: 'finance', icon: Wallet, label: 'Finance Center' },
    { id: 'settings', icon: Settings, label: 'System Prefs' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`
        fixed top-0 left-0 z-50 h-screen transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 w-[300px] bg-white border-r border-slate-100 flex flex-col
      `}>
        <div className="p-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-900 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-slate-100 group cursor-pointer overflow-hidden relative">
              <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Shield className="relative z-10" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter">PledgeCircle</h1>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">SOCO-FINTECH</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-900">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto mt-2 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 px-6 py-4 rounded-[1.75rem] transition-all duration-500
                ${activeTab === item.id 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300 font-bold' 
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}
              `}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-emerald-400' : 'inherit'} />
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8">
          <div className="bg-emerald-50 p-6 rounded-[2.5rem] border border-emerald-100 flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100" 
                alt="Profile" 
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-sm"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-slate-900 truncate">Sarah Namubiru</p>
              <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Premium Partner</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
