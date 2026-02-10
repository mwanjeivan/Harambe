
import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCheck, User, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';

const WhatsAppSimulator: React.FC = () => {
  const [messages, setMessages] = useState([
    { text: "Welcome to Harambee Bot! 🇰🇪🇺🇬\nHow can I help you today?", type: 'bot' },
    { text: "1. Create a Campaign\n2. Pledge to a Fundraiser\n3. Check Status\n4. Pay Vendor", type: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, type: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated Bot Responses
    setTimeout(() => {
      let botResponse = "";
      if (input.toLowerCase().includes('pledge')) {
        botResponse = "Great! Please provide the Campaign ID or name you'd like to support.";
      } else if (input.toLowerCase().includes('1')) {
        botResponse = "Let's set up your campaign! Is it for a Wedding, Funeral, or School Fees?";
      } else {
        botResponse = "I've logged your request. Our system is processing it now!";
      }
      
      setMessages(prev => [...prev, { text: botResponse, type: 'bot' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto h-[600px] flex flex-col bg-[#efeae2] rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-900">
      {/* WA Header */}
      <div className="bg-[#075e54] p-4 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">H</div>
          </div>
          <div>
            <h4 className="font-semibold text-sm">Harambee Assistant</h4>
            <p className="text-xs text-emerald-100/80">online</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Video size={20} className="opacity-80" />
          <Phone size={18} className="opacity-80" />
          <MoreVertical size={20} className="opacity-80" />
        </div>
      </div>

      {/* WA Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        <div className="mx-auto bg-[#d9fdd3] text-center py-1 px-4 rounded-lg text-[10px] text-slate-500 w-fit mb-4 uppercase tracking-wider font-semibold">
          Messages are end-to-end encrypted
        </div>
        
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[85%] px-3 py-2 rounded-lg text-sm shadow-sm relative group
              ${m.type === 'user' 
                ? 'bg-[#d9fdd3] rounded-tr-none' 
                : 'bg-white rounded-tl-none'}
            `}>
              <p className="whitespace-pre-line text-slate-800 leading-relaxed">{m.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[10px] text-slate-500">12:45 PM</span>
                {m.type === 'user' && <CheckCheck size={14} className="text-blue-500" />}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* WA Input */}
      <div className="p-3 bg-[#f0f2f5] flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 shadow-sm border border-slate-200">
          <Smile className="text-slate-400 mr-2" size={20} />
          <input 
            type="text" 
            placeholder="Type a message" 
            className="flex-1 text-sm bg-transparent outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Paperclip className="text-slate-400 ml-2" size={20} />
        </div>
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-[#00a884] text-white rounded-full flex items-center justify-center hover:bg-[#068e70] transition-colors shadow-md"
        >
          <Send size={18} className="ml-0.5" />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppSimulator;
