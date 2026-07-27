import React, { useState } from 'react';
import { ChatMessage, StoreLocation } from '../types';
import { Bot, Send, User, Sparkles, RefreshCw, Zap } from 'lucide-react';

interface AIChatAgentProps {
  stores: StoreLocation[];
}

export const AIChatAgent: React.FC<AIChatAgentProps> = ({ stores }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'agent',
      agentName: 'FranchiseOps Master Agent',
      text: 'Hello! I am your Enterprise Multi-Agent Franchise Intelligence Assistant. Ask me anything about store performance, supply chain stockouts, financial royalty compliance, or audit checklists.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const quickPrompts = [
    'Which store is top performing?',
    'Show stockout risk alerts',
    'Calculate total network royalty fees',
    'What is our compliance rate?'
  ];

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsThinking(true);

    setTimeout(() => {
      let responseText = '';
      const q = textToSend.toLowerCase();

      if (q.includes('top') || q.includes('performing') || q.includes('best')) {
        const best = [...stores].sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)[0];
        responseText = `🏆 **Top Performing Unit:** **${best.name}** in ${best.city}, ${best.state}.\n\n- **Monthly Revenue:** $${best.monthlyRevenue.toLocaleString()} (Target: $${best.targetRevenue.toLocaleString()})\n- **Health Score:** ${best.healthScore}%\n- **Top Selling Item:** ${best.topSellingItem}`;
      } else if (q.includes('stockout') || q.includes('supply') || q.includes('risk') || q.includes('inventory')) {
        const lowStores = stores.filter(s => s.inventoryStatus !== 'Optimal');
        responseText = `⚠️ **Supply Chain Stock Alerts:**\n\n${lowStores.map(s => `- **${s.name}**: Inventory Status is **${s.inventoryStatus}**`).join('\n')}\n\n*Action Suggested:* Reorder Signature Espresso Roast and Cold Brew Syrup from Central Supplier Depot.`;
      } else if (q.includes('royalty') || q.includes('fee') || q.includes('finance') || q.includes('calculate')) {
        const totalRev = stores.reduce((acc, s) => acc + s.monthlyRevenue, 0);
        const totalRoyalty = Math.round(totalRev * 0.05);
        responseText = `💰 **Network Financial Summary:**\n\n- **Total Revenue:** $${totalRev.toLocaleString()}\n- **Net Royalty Fee (5%):** $${totalRoyalty.toLocaleString()}\n- **Average EBITDA Margin:** 24.2%`;
      } else if (q.includes('compliance') || q.includes('audit') || q.includes('health')) {
        const avgCompliance = Math.round(stores.reduce((acc, s) => acc + s.complianceRate, 0) / stores.length);
        responseText = `📊 **Operations Compliance Overview:**\n\n- **Network Average Compliance:** ${avgCompliance}%\n- **Active Audits Passed:** 4/4 Stores\n- All temperature and safety logs match enterprise standards.`;
      } else {
        responseText = `🤖 **FranchiseOps Intelligence Response:**\n\nI analyzed our ${stores.length} active franchise units. Currently, total revenue stands at $${stores.reduce((a, b) => a + b.monthlyRevenue, 0).toLocaleString()} with an overall operational compliance score of 95%. How else can I assist your team?`;
      }

      const agentMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        agentName: 'FranchiseOps Multi-Agent',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentMsg]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <div className="bg-white border border-orange-100 rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col h-[600px]">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-orange-100">
        <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 font-bold text-xl">
          🤖
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            Multi-Agent AI Assistant
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
              Live Connected
            </span>
          </h2>
          <p className="text-xs text-slate-500">Query operations, financial models, and inventory forecasting in natural language.</p>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold ${
              msg.sender === 'user'
                ? 'bg-orange-500 text-white'
                : 'bg-orange-50 border border-orange-200 text-orange-600'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-orange-500 text-white rounded-tr-none'
                : 'bg-orange-50/40 border border-orange-100 text-slate-800 rounded-tl-none whitespace-pre-wrap'
            }`}>
              {msg.agentName && (
                <span className="block text-[10px] font-bold text-orange-600 mb-1">
                  {msg.agentName}
                </span>
              )}
              {msg.text}
              <span className={`block text-[10px] mt-2 text-right ${msg.sender === 'user' ? 'text-orange-100' : 'text-slate-400'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 p-3 rounded-xl border border-orange-200 w-fit">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-500" />
            <span>Multi-Agent System Analyzing Query...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2 mb-3">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="text-[11px] bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 font-medium"
          >
            <Zap className="w-3 h-3 text-orange-500" />
            <span>{p}</span>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your franchise units..."
          className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="py-2 px-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-lg transition-all shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
