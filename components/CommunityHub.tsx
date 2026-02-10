
import React, { useState } from 'react';
import { 
  Store, Gavel, Star, ChevronRight, Clock, Search, MapPin, 
  Phone, Calendar as CalendarIcon, Heart, Music, Utensils, Car, Radio, 
  Trees, Hotel, Tent, Mic2, Laugh, Shirt, Scissors, 
  Sparkles, Cake, Hammer, Navigation, Timer, X, ChevronLeft, ChevronRight as ChevronRightIcon,
  CheckCircle2
} from 'lucide-react';
import { AuctionItem, Vendor } from '../types';

// Extend Vendor type locally for this component to include booked dates
interface BookableVendor extends Vendor {
  categoryId: string;
  bookedDates: string[]; // ISO strings YYYY-MM-DD
}

const CATEGORIES = [
  { id: 'all', name: 'All Services', icon: Store },
  { id: 'catering', name: 'Catering', icon: Utensils },
  { id: 'sounds', name: 'Sounds', icon: Music },
  { id: 'foods', name: 'Foods & Beverages', icon: Utensils },
  { id: 'transport', name: 'Transport services', icon: Car },
  { id: 'communication', name: 'Communication', icon: Radio },
  { id: 'gardens', name: 'Gardens', icon: Trees },
  { id: 'accommodation', name: 'Accommodations', icon: Hotel },
  { id: 'chairs', name: 'Events chairs and Tents', icon: Tent },
  { id: 'artists', name: 'Artists', icon: Mic2 },
  { id: 'comedians', name: 'Comedians', icon: Laugh },
  { id: 'dressing', name: 'Dressing', icon: Shirt },
  { id: 'tailor', name: 'Tailor Services', icon: Scissors },
  { id: 'decorations', name: 'Decorations', icon: Sparkles },
  { id: 'cakes', name: 'Cakes & Designers', icon: Cake },
  { id: 'auction', name: 'Auction', icon: Hammer },
];

const MOCK_SERVICES: BookableVendor[] = [
  { id: '1', name: "Mama Kemi's Catering", category: 'Catering', categoryId: 'catering', rating: 4.8, priceRange: 'UGX 800k+', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=400', description: 'Authentic Nigerian and Ugandan buffet for large crowds.', tags: ['Traditional', 'Bulk Orders'], bookedDates: ['2024-05-20', '2024-05-21', '2024-05-25'] },
  { id: '2', name: 'SoundBlast Audio', category: 'Sounds', categoryId: 'sounds', rating: 4.9, priceRange: 'UGX 1.2M+', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400', description: 'Pro-grade line arrays and bass bins for weddings.', tags: ['PA System', 'Microphones'], bookedDates: ['2024-05-18', '2024-05-19'] },
  { id: '3', name: 'Elite Limo Services', category: 'Transport', categoryId: 'transport', rating: 4.7, priceRange: 'UGX 2.5M+', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400', description: 'Luxury convoys for wedding parties and VIPs.', tags: ['Luxury', 'Escort'], bookedDates: ['2024-05-24'] },
  { id: '4', name: 'Sugar High Bakery', category: 'Cakes', categoryId: 'cakes', rating: 5.0, priceRange: 'UGX 500k+', image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=400', description: 'Custom architectural cakes that taste as good as they look.', tags: ['Fondant', 'Tiered'], bookedDates: ['2024-05-15', '2024-05-28'] },
  { id: '5', name: 'Lakeside Gardens', category: 'Gardens', categoryId: 'gardens', rating: 4.6, priceRange: 'UGX 3.5M+', image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800', description: 'Breathtaking floral scenery and manicured lawns for outdoor receptions.', tags: ['Outdoor', 'Photo-ready'], bookedDates: ['2024-05-10', '2024-05-11', '2024-05-12', '2024-05-25', '2024-05-26'] },
];

const MOCK_AUCTIONS: AuctionItem[] = [
  { id: 'a1', title: 'Signed Uganda Cranes Jersey', description: 'Proceeds to support Local Sports Academy building. Collector edition.', currentBid: 450000, donor: 'FUFA', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400', endTime: '4h 20m', emoji: '⚽' },
  { id: 'a2', title: 'Weekend at Chobe Lodge', description: 'Luxury stay for two. All inclusive safari experience.', currentBid: 3200000, donor: 'Marasa Africa', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=400', endTime: '1h 15m', emoji: '🐆' },
];

const CommunityHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingVendor, setBookingVendor] = useState<BookableVendor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredServices = MOCK_SERVICES.filter(s => 
    (selectedCategory === 'all' || s.categoryId === selectedCategory) &&
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderAuctionHouse = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {MOCK_AUCTIONS.map(item => (
        <div key={item.id} className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl group relative">
          <div className="relative h-64 overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/95 backdrop-blur px-4 py-2 rounded-2xl shadow-lg">
              <Timer size={16} className="text-orange-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{item.endTime} left</span>
            </div>
            
            <div className="absolute top-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-2xl text-xl shadow-lg">
              {item.emoji}
            </div>

            <div className="absolute bottom-6 left-8 right-8">
              <div className="h-1.5 w-full bg-white/20 rounded-full mb-3 overflow-hidden">
                 <div className="h-full bg-emerald-400 w-3/4"></div>
              </div>
              <h4 className="text-2xl font-black tracking-tight text-white">{item.title}</h4>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Bid</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-400">UGX</span>
                  <p className="text-3xl font-black text-slate-900">{item.currentBid.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Verified Donor</p>
                <p className="font-black text-emerald-600 flex items-center justify-end gap-1.5 uppercase text-xs">
                  <Heart size={12} fill="currentColor" /> {item.donor}
                </p>
              </div>
            </div>

            <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">{item.description}</p>
            
            <div className="flex gap-4">
              <button className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                <Hammer size={18} /> PLACE BID
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const BookingCalendar = ({ vendor }: { vendor: BookableVendor }) => {
    // Generate a simple calendar for current month (May 2024 for demo)
    const daysInMonth = 31;
    const monthName = "May 2024";
    const startDay = 3; // Friday

    const calendarDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateString = `2024-05-${i.toString().padStart(2, '0')}`;
      const isBooked = vendor.bookedDates.includes(dateString);
      const isSelected = selectedDate === dateString;
      
      calendarDays.push(
        <button
          key={i}
          disabled={isBooked}
          onClick={() => setSelectedDate(dateString)}
          className={`
            aspect-square rounded-2xl flex items-center justify-center font-black text-sm transition-all
            ${isBooked 
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed border border-dashed border-slate-200' 
              : isSelected 
                ? 'bg-orange-600 text-white shadow-xl shadow-orange-200 scale-110' 
                : 'bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-600 border border-slate-100'}
          `}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><ChevronLeft /></button>
          <h5 className="font-black text-slate-900 uppercase tracking-widest text-xs">{monthName}</h5>
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><ChevronRightIcon /></button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {['S','M','T','W','T','F','S'].map(d => (
            <div key={d} className="text-center text-[10px] font-black text-slate-300 py-2">{d}</div>
          ))}
          {Array(startDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
          {calendarDays}
        </div>
        <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white border border-slate-200"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-100 border border-dashed border-slate-200"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Booked</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 mb-24 max-w-5xl mx-auto">
      {/* BOOKING MODAL */}
      {bookingVendor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => { setBookingVendor(null); setSelectedDate(null); }}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 bg-slate-50 p-8 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden shadow-lg mx-auto md:mx-0">
                  <img src={bookingVendor.image} className="w-full h-full object-cover" alt={bookingVendor.name} />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">{bookingVendor.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{bookingVendor.category}</p>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-600 font-black text-sm">
                  <Star size={14} fill="currentColor" /> {bookingVendor.rating}
                </div>
              </div>
              <div className="pt-6 border-t border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting Price</p>
                <p className="text-xl font-black text-slate-900">{bookingVendor.priceRange}</p>
              </div>
            </div>
            
            <div className="flex-1 p-8 md:p-10 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Availability Calendar</h3>
                <button onClick={() => { setBookingVendor(null); setSelectedDate(null); }} className="text-slate-300 hover:text-slate-900 transition-colors">
                  <X />
                </button>
              </div>
              
              <BookingCalendar vendor={bookingVendor} />

              <div className="pt-6 border-t border-slate-50 flex flex-col gap-4">
                {selectedDate ? (
                  <div className="bg-emerald-50 p-4 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-2">
                    <CheckCircle2 className="text-emerald-600" />
                    <div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Selection confirmed</p>
                      <p className="text-sm font-black text-slate-900">{selectedDate}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-xs font-bold text-slate-400 italic">Please select an available date to continue booking</p>
                )}
                
                <button 
                  disabled={!selectedDate}
                  className={`
                    w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl
                    ${selectedDate 
                      ? 'bg-slate-900 text-white hover:bg-orange-600 shadow-slate-200' 
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'}
                  `}
                >
                  CONFIRM BOOKING
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Community Hub</h2>
        <p className="text-slate-500 font-medium text-lg px-10">Trusted vendors & community treasures for your events</p>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 group px-8">
        <Search className="text-slate-400 group-focus-within:text-orange-600 transition-colors" size={24} />
        <input 
          type="text" 
          placeholder="Search for tailors, gardens, or auction items..." 
          className="flex-1 bg-transparent border-none outline-none font-black text-slate-700 text-lg placeholder:text-slate-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* CATEGORY SLIDER */}
      <div className="flex bg-slate-50 p-2 rounded-[2.5rem] overflow-x-auto no-scrollbar gap-2">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat.id} 
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-[1.75rem] font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
              selectedCategory === cat.id 
              ? 'bg-orange-600 text-white shadow-xl shadow-orange-100 scale-105' 
              : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
            }`}
          >
            <cat.icon size={16} />
            {cat.name}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      {selectedCategory === 'auction' ? (
        renderAuctionHouse()
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          {filteredServices.map(v => (
            <div key={v.id} className="bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-orange-200 transition-all duration-500 flex flex-col md:flex-row gap-10">
              <div className="w-full md:w-64 h-64 rounded-[3rem] overflow-hidden relative shrink-0 shadow-lg group/img">
                <img src={v.image} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700" alt={v.name} />
                <button className="absolute top-6 right-6 bg-white/90 backdrop-blur w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 shadow-md transition-all">
                  <Heart size={24} />
                </button>
                <div className="absolute bottom-6 left-6 bg-orange-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {v.priceRange}
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="text-3xl font-black text-slate-900 tracking-tight leading-none">{v.name}</h4>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{v.category}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl font-black">
                      <Star size={18} fill="currentColor" /> {v.rating}
                    </div>
                  </div>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed">{v.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {v.tags?.map(t => (
                      <span key={t} className="bg-slate-50 text-slate-400 border border-slate-100 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button 
                    onClick={() => setBookingVendor(v)}
                    className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-slate-200 hover:bg-orange-600 transition-all active:scale-95"
                  >
                    <CalendarIcon size={18} /> BOOK NOW
                  </button>
                  <button className="flex-1 bg-white border-2 border-slate-100 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                    <Phone size={18} /> Contact Vendor
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredServices.length === 0 && (
            <div className="py-24 text-center space-y-6 bg-slate-50 rounded-[4rem] border border-dashed border-slate-200">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto text-slate-200 shadow-sm">
                <Search size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">No vendors found</h3>
                <p className="text-slate-400 font-medium max-w-xs mx-auto">Try selecting a different category or searching for general keywords.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityHub;
