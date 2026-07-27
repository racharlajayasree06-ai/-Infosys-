import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Copy, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  Terminal,
  Zap,
  Building2,
  TrendingUp,
  Brain
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: "Hello! I am your FranchiseOps AI Copilot. I can assist with franchise setup costing, outlet performance analytics, weather impact forecasting, or staff allocation across your Indian outlets. How can I assist you today?",
    timestamp: '10:00 AM'
  }
];

export const AICopilot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presetPrompts = [
    "What is the estimated setup cost for a 1,500 sq ft Tier-1 outlet in Mumbai?",
    "How does heavy monsoon rainfall impact footfall for Delhi outlets?",
    "Recommend optimal staffing for 8 employees during peak weekend hours.",
    "Compare revenue performance between Tier-1 Metros and Tier-2 Urban hubs."
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isGenerating) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentPrompt = inputText.trim();
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsGenerating(true);

    // Simulate streaming response
    setTimeout(() => {
      const simulatedText = generateCopiedResponse(currentPrompt);
      const assistantMsgId = `assistant-${Date.now()}`;
      
      // Initialize assistant message as empty
      setMessages(prev => [
        ...prev,
        {
          id: assistantMsgId,
          sender: 'assistant',
          text: '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isStreaming: true
        }
      ]);

      // Stream character chunks
      let index = 0;
      const interval = setInterval(() => {
        index += 3;
        if (index >= simulatedText.length) {
          clearInterval(interval);
          setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, text: simulatedText, isStreaming: false } : m));
          setIsGenerating(false);
        } else {
          setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, text: simulatedText.substring(0, index) } : m));
        }
      }, 30);

    }, 800);
  };

  const generateCopiedResponse = (p: string): string => {
    const query = p.toLowerCase();
    if (query.includes('cost') || query.includes('tier-1') || query.includes('mumbai') || query.includes('setup')) {
      return `Based on our XGBoost ML Pricing Model for a 1,500 sq ft outlet in a Tier-1 Metro like Mumbai:\n\n` +
             `• **Fit-Out & Equipment**: ₹22,50,000\n` +
             `• **Franchise License Fee**: ₹5,00,000\n` +
             `• **Initial Working Capital (3 Mos)**: ₹12,00,000\n` +
             `• **Marketing Launch Reserve**: ₹3,00,000\n\n` +
             `👉 **Total Estimated Setup Investment**: **₹42,50,000** (Confidence Score: 96.8%). Expected ROI Payback Period: 18 - 22 Months.`;
    } else if (query.includes('weather') || query.includes('rain') || query.includes('delhi')) {
      return `Weather Telemetry Analysis for Delhi Outlets:\n\n` +
             `• Heavy monsoon precipitation is expected to cause a **18% - 24% decline** in walk-in dining footfall.\n` +
             `• **Mitigation Plan**: Shift 30% of floor staff to packaging & delivery dispatch. Launch a "Monsoon Special 15% Off" promotion on Swiggy and Zomato to maintain target daily order velocity.`;
    } else if (query.includes('staff') || query.includes('employee')) {
      return `Optimal Shift Allocation Recommendation (8 Employees):\n\n` +
             `• **Peak Weekend Hours (12:00 PM - 3:30 PM & 7:00 PM - 10:30 PM)**:\n` +
             `  - 3 Kitchen / Prep Specialists\n` +
             `  - 2 Order Takers / Cashiers\n` +
             `  - 2 Delivery Packers\n` +
             `  - 1 Shift Supervisor\n\n` +
             `This structure maximizes order throughput by **28%** during peak demand spikes.`;
    } else {
      return `I have analyzed your query across our multi-agent database:\n\n` +
             `• **System Status**: All 24 seeded Indian outlets are reporting normal operational telemetry.\n` +
             `• **Insight**: Current nationwide franchise sales trend is up **+12.4% MoM** with an average customer satisfaction score of 4.8/5.0.`;
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear chat history?")) {
      setMessages(INITIAL_MESSAGES);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col h-[620px] overflow-hidden">
      
      {/* Top Header */}
      <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500 text-white rounded-xl shadow-md shadow-orange-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>AI Copilot</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                LIVE
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Interactive Multi-Agent Franchise Intelligence Assistant
            </p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="px-3 py-1.5 text-xs text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg transition-all flex items-center gap-1.5 font-medium"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="text-[10px] font-bold text-slate-400">
                {msg.sender === 'user' ? 'You' : 'FranchiseOps Copilot'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs relative group ${
                msg.sender === 'user'
                  ? 'bg-orange-500 text-white rounded-br-xs font-medium'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">
                {msg.text}
                {msg.isStreaming && (
                  <span className="inline-block w-2 h-4 bg-orange-500 ml-1 animate-pulse align-middle" />
                )}
              </div>

              {msg.sender === 'assistant' && !msg.isStreaming && msg.text && (
                <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleCopyMessage(msg.id, msg.text)}
                    className="text-[11px] text-slate-500 hover:text-orange-600 flex items-center gap-1 font-medium transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Response</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isGenerating && messages[messages.length - 1]?.sender === 'user' && (
          <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 border border-orange-200 p-3 rounded-xl w-fit animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin text-orange-500" />
            <span className="font-semibold">AI Copilot thinking & processing multi-agent telemetry...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Preset Prompt Pills */}
      <div className="px-6 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px] shrink-0">
        <span className="text-slate-400 font-bold shrink-0">Quick Prompts:</span>
        {presetPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => { setInputText(p); }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-orange-50 hover:text-orange-700 border border-slate-200 hover:border-orange-200 text-slate-600 rounded-lg shrink-0 transition-all text-left truncate max-w-xs"
          >
            ⚡ {p}
          </button>
        ))}
      </div>

      {/* Input Box & Ask Button */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200/80 flex items-center gap-3 shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask AI Copilot about setup costs, sales predictions, weather impact..."
          disabled={isGenerating}
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-sans"
        />

        <button
          type="submit"
          disabled={isGenerating || !inputText.trim()}
          className="py-2.5 px-5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 shrink-0"
        >
          {isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          <span>Ask</span>
        </button>
      </form>

    </div>
  );
};
