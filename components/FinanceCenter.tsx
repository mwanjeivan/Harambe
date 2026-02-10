
import React, { useState } from 'react';
import { 
  Wallet, TrendingUp, HandCoins, History, Receipt, ShieldCheck, 
  Download, Plus, ArrowUpRight, ArrowDownLeft, ChevronDown, 
  Check, Smartphone, Banknote, Building2, CreditCard,
  AlertCircle, CheckCircle2, Zap, Send, User, Mail, Calendar, 
  MessageSquare, Info, LayoutGrid, PieChart
} from 'lucide-react';

const FinanceCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'payment' | 'pledge' | 'statement' | 'distribution'>('payment');
  
  // Form States
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mtn');
  const [pledgeAmount, setPledgeAmount] = useState('0');
  const [pledgeType, setPledgeType] = useState<'one-time' | 'monthly'>('one-time');
  const [pledgeDate, setPledgeDate] = useState('');

  const paymentPresets = ['100K', '250K', '500K', '1000K'];
  const pledgePresets = ['50K', '100K', '500K', '1000K'];

  const methods = [
    { id: 'mtn', name: 'MTN Mobile Money', logo: 'https://seeklogo.com/images/M/mtn-mobile-money-logo-1100C46B1F-seeklogo.com.png' },
    { id: 'airtel', name: 'Airtel Money', logo: 'https://seeklogo.com/images/A/airtel-money-logo-27CC9B3E3C-seeklogo.com.png' },
    { id: 'bank', name: 'Bank Transfer', logo: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png' },
    { id: 'card', name: 'Debit/Credit Card', logo: 'https://cdn-icons-png.flaticon.com/512/633/633611.png' }
  ];

  const renderPayment = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Select Campaign</h3>
          <div className="relative">
            <select className="w-full bg-slate-50 border border-slate-100 rounded-[1.75rem] p-6 font-bold text-slate-700 appearance-none outline-none focus:ring-4 focus:ring-emerald-50">
              <option>Choose a campaign to support</option>
              <option>Community School Renovation</option>
              <option>Medical Emergency Fund</option>
              <option>Mzee Kato's Send-off</option>
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Payment Amount (UGX)</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paymentPresets.map(preset => (
              <button 
                key={preset}
                onClick={() => setPaymentAmount(preset.replace('K', '000'))}
                className="bg-slate-50 border border-slate-100 py-6 rounded-[1.5rem] font-black text-slate-900 hover:bg-emerald-50 hover:border-emerald-200 transition-all uppercase tracking-widest text-xs"
              >
                {preset}
              </button>
            ))}
          </div>
          <input 
            type="number"
            placeholder="Enter custom amount..."
            className="w-full bg-slate-50 border-none outline-none rounded-2xl p-6 text-xl font-black placeholder:text-slate-200 focus:ring-4 focus:ring-emerald-50 transition-all"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map(m => (
            <div 
              key={m.id}
              onClick={() => setPaymentMethod(m.id)}
              className={`p-6 rounded-[2.5rem] border-2 cursor-pointer transition-all flex flex-col items-center gap-4 relative group ${
                paymentMethod === m.id ? 'border-emerald-500 bg-emerald-50/10' : 'border-slate-50 bg-slate-50 hover:bg-white hover:border-slate-200'
              }`}
            >
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                <img src={m.logo} alt={m.name} className="h-6 w-auto object-contain" />
              </div>
              <span className="font-black text-slate-900 tracking-tight text-[9px] uppercase tracking-widest text-center">{m.name}</span>
            </div>
          ))}
        </div>

        <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-6">
          <div className="flex items-center gap-3">
            <Smartphone className="text-emerald-600" />
            <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Phone Number</h4>
          </div>
          <input 
            type="text" 
            placeholder="e.g., +256 700 123 456" 
            className="w-full bg-white border border-slate-100 rounded-2xl p-6 font-black text-lg outline-none focus:ring-4 focus:ring-emerald-100 transition-all"
          />
          <p className="text-[10px] font-bold text-slate-400 italic">You will receive a USSD prompt to complete the payment</p>
        </div>

        <button className="w-full py-7 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-slate-200 hover:bg-emerald-600 transition-all flex items-center justify-center gap-4 active:scale-95">
          <Send size={20} /> PAY UGX {Number(paymentAmount || 0).toLocaleString()}
        </button>
      </div>
    </div>
  );

  const renderPledge = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
        <div className="space-y-8">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Your Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name *</label>
              <div className="relative group">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-600 transition-colors" size={18} />
                <input type="text" placeholder="Names" className="w-full bg-slate-50 border-none outline-none rounded-2xl p-5 pl-14 font-bold text-slate-700 focus:ring-4 focus:ring-orange-50 transition-all" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address *</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-600 transition-colors" size={18} />
                <input type="email" placeholder="abc@gmail.com" className="w-full bg-slate-50 border-none outline-none rounded-2xl p-5 pl-14 font-bold text-slate-700 focus:ring-4 focus:ring-orange-50 transition-all" />
              </div>
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number *</label>
              <div className="relative group">
                <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-600 transition-colors" size={18} />
                <input type="text" placeholder="+256 700 123 456" className="w-full bg-slate-50 border-none outline-none rounded-2xl p-5 pl-14 font-bold text-slate-700 focus:ring-4 focus:ring-orange-50 transition-all" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Select Campaign to Pledge</h3>
          <div className="relative">
            <select className="w-full bg-slate-50 border border-slate-100 rounded-[1.75rem] p-6 font-bold text-slate-700 appearance-none outline-none focus:ring-4 focus:ring-orange-50">
              <option>Choose a campaign to pledge to</option>
              <option>Community School Renovation</option>
              <option>Medical Emergency Fund</option>
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Pledge Amount (UGX) *</p>
          <input 
            type="number"
            placeholder="Enter pledge amount"
            className="w-full bg-slate-50 border-none outline-none rounded-2xl p-6 text-xl font-black placeholder:text-slate-200 focus:ring-4 focus:ring-orange-50 transition-all"
            value={pledgeAmount}
            onChange={(e) => setPledgeAmount(e.target.value)}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pledgePresets.map(preset => (
              <button 
                key={preset}
                onClick={() => setPledgeAmount(preset.replace('K', '000'))}
                className="bg-slate-50 border border-slate-100 py-4 rounded-[1.25rem] font-black text-slate-900 hover:bg-orange-50 hover:border-orange-200 transition-all uppercase tracking-widest text-[10px]"
              >
                UGX {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pledge Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => setPledgeType('one-time')}
              className={`p-8 rounded-[2.5rem] border-2 text-left transition-all ${pledgeType === 'one-time' ? 'border-orange-500 bg-orange-50/20' : 'border-slate-50 bg-slate-50 hover:bg-white'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <Zap className={pledgeType === 'one-time' ? 'text-orange-600' : 'text-slate-400'} />
                {pledgeType === 'one-time' && <CheckCircle2 className="text-orange-600" />}
              </div>
              <p className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">One-Time Pledge</p>
              <p className="text-xs text-slate-500 font-medium">Make a single pledge commitment</p>
            </button>
            <button 
              onClick={() => setPledgeType('monthly')}
              className={`p-8 rounded-[2.5rem] border-2 text-left transition-all ${pledgeType === 'monthly' ? 'border-orange-500 bg-orange-50/20' : 'border-slate-50 bg-slate-50 hover:bg-white'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <Calendar className={pledgeType === 'monthly' ? 'text-orange-600' : 'text-slate-400'} />
                {pledgeType === 'monthly' && <CheckCircle2 className="text-orange-600" />}
              </div>
              <p className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">Monthly Pledge</p>
              <p className="text-xs text-slate-500 font-medium">Recurring monthly commitment</p>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pledge Due Date</h3>
          <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">When should this pledge be fulfilled? *</label>
             <input 
              type="date" 
              className="w-full bg-slate-50 border-none outline-none rounded-2xl p-6 font-bold text-slate-700 focus:ring-4 focus:ring-orange-50"
              value={pledgeDate}
              onChange={(e) => setPledgeDate(e.target.value)}
            />
             <p className="text-[10px] font-bold text-slate-400 italic">This is when your one-time pledge payment will be due.</p>
          </div>
        </div>

        <div className="bg-orange-50 p-8 rounded-[3rem] border border-orange-100 flex items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-orange-100">
            <AlertCircle size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="font-black text-orange-900 uppercase tracking-widest text-[10px]">Payment Notification</h4>
            <p className="text-xs font-medium text-orange-800 leading-relaxed">
              An STK push notification will be sent to your registered mobile number when your pledge due date is reached. Please ensure your mobile money account has sufficient funds to complete the payment.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pledge Details</h3>
          <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Personal Message (Optional)</label>
             <textarea 
              rows={4}
              placeholder="Why are you pledging to this campaign?"
              className="w-full bg-slate-50 border-none outline-none rounded-3xl p-6 font-bold text-slate-700 focus:ring-4 focus:ring-orange-50 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl space-y-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        
        <div className="flex items-center gap-4">
          <PieChart className="text-orange-500" />
          <h3 className="text-2xl font-black tracking-tight">Pledge Summary</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</p>
            <p className="text-3xl font-black">UGX {Number(pledgeAmount || 0).toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Type</p>
            <p className="text-3xl font-black capitalize">{pledgeType.replace('-', ' ')}</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
              <p className="text-lg font-black text-orange-400">Pre-Approved</p>
            </div>
          </div>
        </div>

        <button className="w-full py-7 bg-orange-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-orange-900/40 hover:bg-orange-500 transition-all flex items-center justify-center gap-4 active:scale-95">
          MAKE PLEDGE OF UGX {Number(pledgeAmount || 0).toLocaleString()}
        </button>
      </div>
    </div>
  );

  const renderStatement = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Treasury History</h3>
          <p className="text-slate-400 font-medium italic text-sm">Full audit trail of all campaign movements</p>
        </div>
        <button className="bg-white border border-slate-200 px-6 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <Download size={16} className="text-emerald-500" /> Export Statement (PDF)
        </button>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Date</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { id: '1', type: 'in', name: 'Mary Atuhairwe', amount: 50000, date: 'Today, 10:45 AM', status: 'Completed' },
                { id: '2', type: 'out', name: "Mama Kemi's Catering", amount: 800000, date: 'Yesterday', status: 'Settled' },
                { id: '3', type: 'in', name: 'John Bosco', amount: 150000, date: '2 days ago', status: 'Completed' }
              ].map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                        {tx.type === 'in' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 leading-none mb-1">{tx.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.type === 'in' ? 'Contribution' : 'Disbursement'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center text-sm font-bold text-slate-400">{tx.date}</td>
                  <td className="px-10 py-8 text-center">
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">{tx.status}</span>
                  </td>
                  <td className="px-10 py-8 text-right font-black text-slate-900">
                    <span className={tx.type === 'in' ? 'text-emerald-600' : 'text-slate-900'}>
                      {tx.type === 'in' ? '+' : '-'} UGX {tx.amount.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDistribution = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Treasury Pool</p>
            <h3 className="text-5xl font-black tracking-tighter">UGX 12.8M</h3>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs bg-white/5 px-4 py-2 rounded-xl w-fit">
              <ShieldCheck size={14} /> FUNDS VERIFIED & HELD
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/10 p-6 rounded-[2rem] border border-white/5 flex flex-col justify-center text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Allocated</p>
              <p className="text-lg font-black">UGX 4.5M</p>
            </div>
            <div className="bg-white/10 p-6 rounded-[2rem] border border-white/5 flex flex-col justify-center text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Available</p>
              <p className="text-lg font-black text-emerald-400">UGX 8.3M</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Fund Distribution</h3>
            <p className="text-sm font-medium text-slate-400">Release funds to vendors or beneficiaries</p>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Select Recipient</p>
              <div className="relative">
                <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 font-bold text-slate-700 appearance-none outline-none focus:ring-4 focus:ring-emerald-50">
                  <option>Select vendor or family trust...</option>
                  <option>Mama Kemi's Catering</option>
                  <option>Lakeside Gardens</option>
                  <option>Education Trust Fund</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Disbursement Amount</p>
              <div className="relative">
                <input type="number" placeholder="0.00" className="w-full bg-slate-50 border-none outline-none rounded-2xl p-6 text-3xl font-black text-slate-900 placeholder:text-slate-200" />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-300">UGX</span>
              </div>
            </div>
            <button className="w-full py-6 bg-emerald-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-100 flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95">
              <Zap size={20} fill="currentColor" /> AUTHORIZE DISBURSEMENT
            </button>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">Pending Settlements</h4>
          <div className="space-y-4">
            {[
              { name: "Mama Kemi's Catering", balance: "UGX 1.2M", category: "Catering" },
              { name: "Lakeside Gardens", balance: "UGX 3.5M", category: "Venue" }
            ].map((v, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-xl transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 leading-none mb-1">{v.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{v.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900">{v.balance}</p>
                  <p className="text-[10px] font-bold text-orange-600 uppercase">Awaiting</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 mb-24">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Payment Center</h2>
        <p className="text-slate-500 font-medium text-lg px-10">Make contributions and manage your payments</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 bg-slate-100 p-1.5 rounded-[2.5rem] shadow-inner">
        {[
          { id: 'payment', icon: CreditCard, label: 'Make Payment' },
          { id: 'pledge', icon: HandCoins, label: 'Make Pledge' },
          { id: 'statement', icon: History, label: 'Statement' },
          { id: 'distribution', icon: LayoutGrid, label: 'Distribution' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-col items-center gap-2 py-4 rounded-[2rem] transition-all ${
              activeTab === tab.id ? 'bg-white text-slate-900 shadow-xl scale-[1.02]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon size={20} className={activeTab === tab.id ? 'text-orange-600' : ''} />
            <span className="font-black text-[10px] uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'payment' && renderPayment()}
        {activeTab === 'pledge' && renderPledge()}
        {activeTab === 'statement' && renderStatement()}
        {activeTab === 'distribution' && renderDistribution()}
      </div>
    </div>
  );
};

export default FinanceCenter;
