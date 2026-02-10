
import React, { useState, useEffect } from 'react';
import { Radio, MapPin, Compass, Navigation, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

interface NearbyCampaign {
  id: string;
  title: string;
  distance: number;
  angle: number; // in degrees
  type: string;
  lat: number;
  lng: number;
}

const RadarView: React.FC = () => {
  const [scanning, setScanning] = useState(true);
  const [selectedItem, setSelectedItem] = useState<NearbyCampaign | null>(null);
  
  const [items, setItems] = useState<NearbyCampaign[]>([
    { id: '1', title: 'Sarah Wedding Reception', distance: 2.4, angle: 45, type: 'Wedding', lat: 0.3476, lng: 32.5825 },
    { id: '2', title: 'Education Hall Renovation', distance: 6.1, angle: 180, type: 'Community', lat: 0.3150, lng: 32.5850 },
    { id: '3', title: 'Masaka Send-off Ceremony', distance: 0.8, angle: 290, type: 'Funeral', lat: 0.3300, lng: 32.5700 },
    { id: '4', title: 'Buganda Marathon Start', distance: 4.5, angle: 110, type: 'Community', lat: 0.3200, lng: 32.6000 }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setScanning(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const openGoogleMaps = (item: NearbyCampaign) => {
    // Uganda default coordinates if none provided
    const url = `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-10 animate-in fade-in duration-1000 pb-32">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black text-slate-900 flex items-center justify-center gap-4 tracking-tighter">
          <div className="bg-emerald-100 p-3 rounded-2xl">
            <Compass className="text-emerald-600" size={32} />
          </div>
          Proximity Radar
        </h2>
        <p className="text-slate-500 font-medium italic text-lg px-6">Live detection of verified community events within 10km</p>
      </div>

      <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
        {/* Radar Circles */}
        <div className="absolute inset-0 border-2 border-emerald-500/10 rounded-full"></div>
        <div className="absolute inset-[25%] border-2 border-emerald-500/10 rounded-full"></div>
        <div className="absolute inset-[50%] border-2 border-emerald-500/5 rounded-full"></div>
        <div className="absolute inset-[75%] border-2 border-emerald-500/5 rounded-full"></div>
        
        {/* Radar Crosshair */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-emerald-500/5 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-emerald-500/5 -translate-y-1/2"></div>

        {/* Scanning Sweep */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 animate-[spin_5s_linear_infinite]"></div>

        {/* Center Point (User) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer">
          <div className="w-8 h-8 bg-slate-900 rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-2xl">
            <Zap size={16} fill="white" />
          </div>
          <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            You are here
          </div>
        </div>

        {/* Campaign Blips */}
        {items.map((item) => {
          const radius = (item.distance / 10) * 100; // 10km max range
          const rad = (item.angle * Math.PI) / 180;
          const x = 50 + (radius / 2.2) * Math.cos(rad);
          const y = 50 + (radius / 2.2) * Math.sin(rad);

          return (
            <div 
              key={item.id}
              className="absolute transition-all duration-700 hover:z-30"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className={`relative -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}>
                <div className={`
                  w-5 h-5 rounded-full border-2 transition-all duration-300
                  ${selectedItem?.id === item.id 
                    ? 'bg-orange-600 scale-150 border-white shadow-2xl ring-4 ring-orange-100' 
                    : 'bg-slate-900 border-emerald-400 group-hover:scale-125 pulse-indicator'}
                `}></div>
                
                {/* Desktop Hover Label */}
                <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white px-4 py-3 rounded-[1.5rem] shadow-2xl border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none w-48">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{item.type}</p>
                  <p className="text-sm font-black text-slate-900 truncate">{item.title}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-slate-400">
                    <MapPin size={10} /> {item.distance}km away
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RESULT CARDS & GOOGLE SCAN DRAWER */}
      <div className="w-full max-w-2xl bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-2xl animate-in slide-in-from-bottom-10 duration-700">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Activities Nearby</h3>
            <p className="text-slate-400 font-medium italic text-sm">Select a pin to pin location or get directions</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{items.length} Pins</span>
          </div>
        </div>

        <div className="space-y-4">
          {items.map(item => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className={`flex items-center justify-between p-6 rounded-[2.5rem] transition-all cursor-pointer border-2 ${
                selectedItem?.id === item.id 
                ? 'border-orange-500 bg-orange-50/20' 
                : 'border-slate-50 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  selectedItem?.id === item.id ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1">{item.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.type}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{item.distance} km away</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); openGoogleMaps(item); }}
                className={`p-4 rounded-2xl transition-all ${
                  selectedItem?.id === item.id 
                  ? 'bg-orange-600 text-white shadow-xl shadow-orange-100' 
                  : 'bg-white border border-slate-200 text-slate-400 hover:text-orange-600'
                }`}
              >
                <Navigation size={20} />
              </button>
            </div>
          ))}
        </div>

        {selectedItem && (
          <div className="mt-10 pt-10 border-t border-slate-50 animate-in slide-in-from-top-4">
             <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Google Scan Active</span>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="text-white/40 hover:text-white">Close</button>
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-black">{selectedItem.title}</h4>
                  <p className="text-white/60 font-medium">Masaka - Kampala Road Highway, Level 3</p>
                </div>
                <button 
                  onClick={() => openGoogleMaps(selectedItem)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"
                >
                  <Navigation size={18} fill="white" /> OPEN GOOGLE DIRECTIONS
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RadarView;
