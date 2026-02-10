
import React, { useState } from 'react';
import { 
  Menu, Bell, Search, Plus, Minus, Wallet, TrendingUp, CircleDollarSign, 
  Briefcase, Users, Megaphone, CheckCheck, ChevronRight, Sparkles, 
  ShieldCheck, Info, MessageSquare, Radio, QrCode, Calendar, Heart, 
  ArrowLeft, Clock, MapPin, ExternalLink, Share2, Gavel, HandCoins,
  History, Receipt, Send, ShieldAlert, CheckCircle2, Zap
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import CampaignCard from './components/CampaignCard';
import WhatsAppSimulator from './components/WhatsAppSimulator';
import BottomNav from './components/BottomNav';
import RadarView from './components/RadarView';
import PledgeCenter from './components/PledgeCenter';
import CampaignDetails from './components/CampaignDetails';
import QRScreen from './components/QRScreen';
import ShareCenter from './components/ShareCenter';
import CommunityHub from './components/CommunityHub';
import EngagementCenter from './components/EngagementCenter';
import FinanceCenter from './components/FinanceCenter';
import { Campaign, CampaignType, PaymentStatus } from './types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    title: "Community School Renovation",
    description: "Support our project to rebuild the local elementary school. We are focusing on new roof tiles and classroom flooring.",
    type: CampaignType.COMMUNITY,
    goal: 50000000,
    raised: 32500000,
    pledged: 45000000,
    deadline: "2024-12-30",
    organizer: "Sarah Namubiru",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    isPublic: true,
    contributors: [
      { id: '1', name: 'John Doe', amount: 2000000, status: PaymentStatus.PAID, date: '2024-01-20', phone: '+256789123456', relationship: 'Friend' },
      { id: '2', name: 'Sarah Kimani', amount: 1500000, status: PaymentStatus.PAID, date: '2024-02-15', phone: '+256789123457', relationship: 'Colleague' },
      { id: '3', name: 'Mike Robert', amount: 0, status: PaymentStatus.PLEDGED, date: '2024-01-25', phone: '+256789123458', relationship: 'Brother', materialEmoji: 'Sound System' }
    ]
  },
  {
    id: 'mzee-kato',
    title: "Mzee Kato's Final send-off",
    description: "Support the Kato family to give our beloved patriarch a decent send-off in Masaka. Every contribution counts.",
    type: CampaignType.FUNERAL,
    goal: 15000000,
    raised: 8200000,
    pledged: 12000000,
    deadline: "2024-05-15",
    organizer: "Ivan Kato",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
    isPublic: true,
    contributors: [
      { id: 'k1', name: 'James Kato', amount: 1000000, status: PaymentStatus.PAID, date: '2024-05-01', phone: '+256777111222', relationship: 'Son' }
    ]
  },
  {
    id: 'kabaka-marathon',
    title: "Kabaka Birthday Marathon",
    description: "Run for a cause! Supporting the fight against HIV/AIDS in the Buganda Kingdom.",
    type: CampaignType.COMMUNITY,
    goal: 200000000,
    raised: 145000000,
    pledged: 180000000,
    deadline: "2024-04-07",
    organizer: "Buganda Kingdom",
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=800",
    isPublic: true
  },
  {
    id: 'marvin-heart',
    title: "Marvin's Heart Surgery",
    description: "Marvin needs urgent cardiac surgery in India. Every shilling counts to save this brave 5-year old.",
    type: CampaignType.MEDICAL,
    goal: 45000000,
    raised: 12000000,
    pledged: 18000000,
    deadline: "2024-07-15",
    organizer: "Mary Mukasa",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800",
    isPublic: true
  },
  {
    id: 'political-rally',
    title: "Regional Youth Political Rally",
    description: "Mobilizing resources for the upcoming regional convention for youth leadership and empowerment.",
    type: CampaignType.COMMUNITY,
    goal: 30000000,
    raised: 12500000,
    pledged: 16500000,
    deadline: "2024-08-12",
    organizer: "Youth Council",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800",
    isPublic: true
  },
  {
    id: 'music-show',
    title: "Afro-Jazz Night Fundraiser",
    description: "An evening of smooth jazz to support music education in under-privileged schools.",
    type: CampaignType.COMMUNITY,
    goal: 12000000,
    raised: 9200000,
    pledged: 10500000,
    deadline: "2024-11-20",
    organizer: "Music Collective",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    isPublic: false
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pledgingTo, setPledgingTo] = useState<string | null>(null);
  const [viewingCampaign, setViewingCampaign] = useState<Campaign | null>(null);

  const openWhatsApp = (text: string) => {
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShareCampaign = (campaign: Campaign) => {
    const percent = Math.round((campaign.raised / campaign.goal) * 100);
    const text = `🎉 *Join Our Campaign!* 🎉

📋 *${campaign.title}*

🎯 *Our Goal:* UGX ${campaign.goal.toLocaleString()}
💰 *Raised so far:* UGX ${campaign.raised.toLocaleString()}
📊 *Progress:* ${percent}% Complete
⏰ *Days Left:* 12 days
👥 *Contributors:* ${campaign.contributors?.length || 3} people

🏫 *Your contribution makes a difference!*
Join us in making this goal a reality.

🎯 *Click here to contribute:*
https://pledgecircle.app/campaign/${campaign.id}

📱 *Or scan the QR code:*
https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://pledgecircle.app/campaign/${campaign.id}

_Together we can achieve more • Powered by Pledge Circle_ 💪`;
    
    openWhatsApp(text);
  };

  const handleShareList = (campaign: Campaign) => {
    const contributors = campaign.contributors || [
       { id: '1', name: 'John Doe', amount: 2000000, status: PaymentStatus.PAID, date: '2024-01-20', phone: '+256789123456', relationship: 'Friend' },
       { id: '2', name: 'Sarah Kimani', amount: 1500000, status: PaymentStatus.PAID, date: '2024-02-15', phone: '+256789123457', relationship: 'Colleague' },
       { id: '3', name: 'Mike Robert', amount: 0, status: PaymentStatus.PLEDGED, date: '2024-01-25', phone: '+256789123458', relationship: 'Brother', materialEmoji: 'Sound System' }
    ];

    const contributorsText = contributors.map(c => {
      const balance = c.status === PaymentStatus.PAID ? 0 : c.amount;
      const giftStr = c.materialEmoji 
        ? `  Gift: ${c.materialEmoji}\n  Status: pending` 
        : `  Pledged: UGX ${c.amount.toLocaleString()}\n  Paid: UGX ${(c.status === PaymentStatus.PAID ? c.amount : 500000).toLocaleString()}\n  Balance: UGX ${balance.toLocaleString()}`;
      
      return `• ${c.name} (${c.relationship})
${giftStr}
  Due: ${c.date}
  Phone: ${c.phone}`;
    }).join('\n\n');

    const text = `📋 *${campaign.title}* - Contributors List

🎯 Goal: UGX ${campaign.goal.toLocaleString()}
💰 Raised: UGX ${campaign.raised.toLocaleString()}
👥 ${contributors.length} Contributors

*Contributors Details:*

${contributorsText}

_Powered by RoughSkills_`;

    openWhatsApp(text);
  };

  const renderContent = () => {
    if (pledgingTo) {
      return <PledgeCenter campaignName={pledgingTo} onBack={() => setPledgingTo(null)} />;
    }

    if (viewingCampaign) {
      return (
        <CampaignDetails 
          campaign={viewingCampaign} 
          onBack={() => setViewingCampaign(null)} 
          onPledge={() => setPledgingTo(viewingCampaign.title)}
          onShareList={() => handleShareList(viewingCampaign)}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* ARRANGED HERO SECTION */}
            <div className="relative group overflow-hidden bg-white border border-slate-200/60 p-10 md:p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/50">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-100/40 via-white to-transparent rounded-full -mr-48 -mt-48 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em] flex items-center gap-2">
                      <Zap size={12} fill="currentColor" /> Welcome Back
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                      Sarah Namubiru
                    </h1>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="bg-orange-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-orange-200 group/btn hover:scale-105 transition-all cursor-default text-left">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                        <TrendingUp size={20} className="relative" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Campaign Funding</span>
                        <span className="text-lg font-black leading-tight">82% Funded</span>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl">
                      <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                      <p className="text-xs font-bold text-slate-500">
                        Trends are <span className="text-slate-900">highly active</span> today.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveTab('campaigns')}
                    className="flex-1 md:flex-none bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-300 hover:bg-orange-600 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Plus size={18} /> NEW CAMPAIGN
                  </button>
                  <button 
                    onClick={() => setActiveTab('qr')}
                    className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm"
                  >
                    <QrCode size={24} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Treasury Balance" value="UGX 4.5M" icon={Wallet} color="bg-emerald-50 text-emerald-600" />
              <StatCard title="Live Pledges" value="UGX 12.8M" icon={HandCoins} color="bg-orange-50 text-orange-600" />
              <StatCard title="Community Reach" value="2.4k People" icon={Users} color="bg-indigo-50 text-indigo-600" />
              <StatCard title="Growth Rate" value="+12.5%" icon={TrendingUp} color="bg-pink-50 text-pink-600" />
            </div>

            <div className="space-y-8">
              <div className="flex items-end justify-between px-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Recommended Causes</h2>
                  <p className="text-slate-400 font-medium italic">Verified by community members you trust</p>
                </div>
                <button className="text-emerald-600 font-black text-xs tracking-[0.1em] hover:text-emerald-700 flex items-center gap-2 group">
                  VIEW ALL <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20 lg:pb-0">
                {MOCK_CAMPAIGNS.map(c => (
                  <CampaignCard key={c.id} campaign={c} onClick={() => setViewingCampaign(c)} onShare={() => handleShareCampaign(c)} />
                ))}
              </div>
            </div>
          </div>
        );
      case 'radar': return <RadarView />;
      case 'share': return <ShareCenter />;
      case 'community': return <CommunityHub />;
      case 'engagement': return <EngagementCenter />;
      case 'finance': return <FinanceCenter />;
      case 'qr': return <QRScreen />;
      default: return <div className="p-20 text-center font-black text-slate-300">Feature Coming Soon</div>;
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-emerald-100 selection:text-emerald-800 bg-[#f8fafc]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0 pb-32 lg:pb-0">
        <header className="h-24 glass-effect border-b border-slate-200/50 sticky top-0 z-40 px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 bg-white border border-slate-200 rounded-xl text-slate-600">
              <Menu size={20} />
            </button>
            <div className="hidden lg:flex items-center gap-4 text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
              <span className="text-emerald-500">PLEDGECIRCLE OS</span>
              <span className="w-1 h-1 rounded-full bg-slate-200"></span>
              <span>STABLE v2.0</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-all group text-left">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Network Secure</span>
            </div>
            <div className="flex items-center gap-4">
              <div 
                onClick={() => setActiveTab('finance')}
                className="w-14 h-14 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-slate-200 hover:bg-emerald-600 transition-all cursor-pointer group"
              >
                <Wallet size={24} className="group-hover:rotate-12 transition-transform" />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-12 lg:p-16 max-w-[1600px] mx-auto w-full">
          {renderContent()}
        </main>
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
