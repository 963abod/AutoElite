'use client';

import React, { useState } from 'react';
import { Vehicle, ChatMessage } from '@/types/vehicle';
import { MOCK_VEHICLES } from '@/data/vehicles';
import { Bot, X, Send, Sparkles, MessageSquare, Car, ArrowRight, Star } from 'lucide-react';

interface ConciergeWidgetProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

const PRESET_PROMPTS = [
  'Family SUV under $40k',
  'Luxury weekend rental in Dubai',
  'Best EV for daily commute',
  'Track capable supercar'
];

export const ConciergeWidget: React.FC<ConciergeWidgetProps> = ({ onSelectVehicle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Greetings. I am your AutoElite AI Car Concierge. How may I assist your vehicle selection or rental needs today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedVehicles: [MOCK_VEHICLES[0], MOCK_VEHICLES[2]]
    }
  ]);

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // AI Concierge Dynamic Match Logic
    setTimeout(() => {
      const query = promptText.toLowerCase();
      let matched = MOCK_VEHICLES;

      if (query.includes('suv') || query.includes('family')) {
        matched = MOCK_VEHICLES.filter((v) => v.bodyType === 'SUV');
      } else if (query.includes('ev') || query.includes('commute') || query.includes('electric')) {
        matched = MOCK_VEHICLES.filter((v) => v.bodyType === 'EV');
      } else if (query.includes('dubai') || query.includes('rental') || query.includes('weekend')) {
        matched = MOCK_VEHICLES.filter((v) => v.location.includes('Dubai') || v.rentalPricePerDay > 500);
      } else if (query.includes('supercar') || query.includes('track') || query.includes('fast')) {
        matched = MOCK_VEHICLES.filter((v) => v.bodyType === 'Sports Car' || v.bodyType === 'Coupe');
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `I have curated ${matched.length} vehicles matching your exact criteria:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedVehicles: matched.slice(0, 2)
      };

      setMessages((prev) => [...prev, assistantMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Floating Toggle Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Car Concierge"
          className="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 text-white font-bold text-xs shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20"
        >
          <div className="w-7 h-7 rounded-xl bg-slate-950 flex items-center justify-center text-blue-400">
            <Bot className="w-4 h-4 animate-pulse" />
          </div>
          <span>AI Concierge</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {/* Concierge Drawer Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-slate-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] animate-in slide-in-from-bottom-8 duration-300">

          {/* Header */}
          <div className="p-4 bg-slate-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-amber-500 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white font-sans">AutoElite AI Concierge</h3>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Concierge"
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Body */}
          <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col space-y-2 ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-gray-200 border border-white/10 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>

                {/* Embedded Vehicle Mini Cards */}
                {msg.suggestedVehicles && msg.suggestedVehicles.length > 0 && (
                  <div className="w-full space-y-2 pt-1">
                    {msg.suggestedVehicles.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => {
                          setIsOpen(false);
                          onSelectVehicle(v);
                        }}
                        className="p-2.5 rounded-xl bg-slate-950 border border-white/10 hover:border-blue-500/50 flex items-center gap-3 cursor-pointer transition-all group"
                      >
                        <img src={v.image} alt={v.model} className="w-14 h-10 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                            {v.make} {v.model}
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono">
                            ${v.rentalPricePerDay}/day • ${v.purchasePrice.toLocaleString()}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-gray-500 font-mono px-1">{msg.timestamp}</span>
              </div>
            ))}
          </div>

          {/* Prompt Chips Bar */}
          <div className="p-2.5 bg-slate-950/80 border-t border-white/5 overflow-x-auto flex gap-1.5 scrollbar-none">
            {PRESET_PROMPTS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(chip)}
                className="px-2.5 py-1 rounded-full bg-slate-800 border border-white/10 text-[10px] text-gray-300 hover:text-white hover:bg-slate-700 whitespace-nowrap transition-colors shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Text Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(input);
            }}
            className="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask AI concierge..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              aria-label="Send message to AI concierge"
              className="p-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
