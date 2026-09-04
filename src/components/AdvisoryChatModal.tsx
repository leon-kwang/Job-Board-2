import React, { useState } from 'react';
import { X, Send, User, Bot, CheckCircle2 } from 'lucide-react';

interface AdvisoryChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
}

export const AdvisoryChatModal: React.FC<AdvisoryChatModalProps> = ({
  isOpen,
  onClose,
  candidateName,
}) => {
  const [messages, setMessages] = useState<{ sender: 'coach' | 'user'; text: string; time: string }[]>([
    {
      sender: 'coach',
      text: `Hello ${candidateName}! I'm Rachel Lee, your assigned Senior Workforce Development Coach. I reviewed your GovTech application and your Skills Compatibility Index (94%). Do you have any questions about structuring your case study presentation for Thursday's panel?`,
      time: '10:15 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = { sender: 'user' as const, text: inputText, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let replyText = "That's a very common question. For GovTech and Singapore public agencies, panels care about how you handled trade-offs when conflicting user needs arose, especially regarding accessibility. Mentioning the Singapore Government Design System (SGDS) principles will score very high points!";
      if (userMsg.text.toLowerCase().includes('salary') || userMsg.text.toLowerCase().includes('offer')) {
        replyText = "The benchmark for Senior UX roles in Singapore CBD is S$6,500 – S$9,200. With 5 years of verified experience, aiming for S$7,500 – S$8,500 is very well within the validated bracket.";
      }
      setMessages(prev => [...prev, { sender: 'coach', text: replyText, time: 'Just now' }]);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-[#E5E7EB] shadow-xl overflow-hidden text-left flex flex-col h-[32rem]">
        {/* Header */}
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-BLbG9XJ7Bti2VOSY_AD4Mrms0dcDukk_ZCKvTV9ze8jLF9KnCdlyzZmfRep6koHE8l5-HxeShp1cz9xvfSlvX0n8O5OK-MJ5QLEQPkFkzrCFjeCqWFgBAb5M3j0VOeZjWqn4YffqedN-L-7HAVRauYwlV0eMHWiKS5K3bT3zu01iY-QoHfVnq_aUdIeLEemSHr4h3k8C-c10xK4CiCDzV9laAj9yoHPiIZ9rddf2OY0Quousc8Sr"
                alt="Rachel Lee"
                className="w-10 h-10 rounded-full object-cover border border-[#c3c6d3]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10b981] border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1a1b21]">Rachel Lee</h2>
              <span className="text-[11px] text-[#0F766E] font-semibold">
                Senior Workforce Dev Coach • Online
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#737783] hover:text-[#1a1b21] hover:bg-[#ededf5] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f9f9ff]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#003f8b] text-white rounded-tr-none'
                    : 'bg-white border border-[#E5E7EB] text-[#1a1b21] rounded-tl-none shadow-2xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#737783] mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-[#E5E7EB] bg-white flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Rachel about case studies, salary negotiation..."
            className="flex-1 text-xs p-2.5 border border-[#c3c6d3] rounded-xl focus:border-[#003f8b] focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="p-2.5 bg-[#003f8b] hover:bg-[#2557a7] text-white rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
