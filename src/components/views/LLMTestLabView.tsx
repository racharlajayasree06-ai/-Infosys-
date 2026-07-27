import React, { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  Send, 
  Sliders, 
  Cpu, 
  Zap, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Copy, 
  RefreshCw,
  Database,
  CloudSun,
  Layers
} from 'lucide-react';

export const LLMTestLabView: React.FC = () => {
  const [prompt, setPrompt] = useState('Analyze Footfall & Revenue impact for Mumbai outlets during heavy monsoon rainfall next week.');
  const [selectedModel, setSelectedModel] = useState('Gemini 1.5 Flash (FranchiseOps fine-tuned)');
  const [temperature, setTemperature] = useState(0.3);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [groundingWeather, setGroundingWeather] = useState(true);
  const [groundingSales, setGroundingSales] = useState(true);
  const [groundingInventory, setGroundingInventory] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [responseOutput, setResponseOutput] = useState<string | null>(
    `**AI Operations Analysis & Recommendations**\n\n` +
    `1. **Footfall Prediction**: Heavy monsoon rainfall in Mumbai is forecasted to reduce walk-in store footfall by **22% to 28%** over the 3-day weather window.\n\n` +
    `2. **Revenue Buffer Strategy**: Shift marketing spend to digital delivery platforms (Swiggy / Zomato / Direct App). Offer a "Rainy Day 15% Combo Discount" to maintain unit velocity.\n\n` +
    `3. **Inventory & Staffing Action**: Increase packaging material reserves for delivery by **30%** at Bandra and Lower Parel hubs. Scale down dining room staffing by 2 shifts to optimize labor cost ratio.`
  );
  const [latencyMs, setLatencyMs] = useState(240);
  const [promptTokens, setPromptTokens] = useState(184);
  const [completionTokens, setCompletionTokens] = useState(142);
  const [copied, setCopied] = useState(false);

  const presetPrompts = [
    'Analyze Footfall & Revenue impact for Mumbai outlets during heavy monsoon rainfall next week.',
    'Forecast Q3 royalty collection for Bengaluru South and Delhi Tier-1 franchise hubs.',
    'Recommend automated inventory reorder points for low-stock packaging materials across Pune units.',
    'Evaluate K-Means clustering shift for Tier-2 outlets transitioning into Tier-1 high revenue tier.'
  ];

  const handleRunLLM = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponseOutput(null);

    // Simulate AI model inference
    setTimeout(() => {
      const generated = generateSimulatedResponse(prompt, selectedModel, temperature);
      setResponseOutput(generated.text);
      setLatencyMs(generated.latency);
      setPromptTokens(generated.promptTok);
      setCompletionTokens(generated.compTok);
      setIsLoading(false);
    }, 1200);
  };

  const generateSimulatedResponse = (p: string, model: string, temp: number) => {
    const isMumbai = p.toLowerCase().includes('mumbai') || p.toLowerCase().includes('rain') || p.toLowerCase().includes('footfall');
    const isRoyalty = p.toLowerCase().includes('royalty') || p.toLowerCase().includes('q3') || p.toLowerCase().includes('bengaluru');
    const isReorder = p.toLowerCase().includes('reorder') || p.toLowerCase().includes('inventory') || p.toLowerCase().includes('pune');

    let text = '';
    if (isMumbai) {
      text = `**[${model}] - Weather & Footfall Predictive Inference**\n\n` +
             `• **Monsoon Alert**: Mumbai metro weather models project 110mm precipitation over the weekend.\n` +
             `• **Impact Estimate**: In-store footfall drop of -25.4% across Bandra, Lower Parel, and Andheri outlets.\n` +
             `• **Recommended Action**: Enable automated delivery dispatch routes, deploy targeted push notifications with "Rainy Day Delivery Special", and adjust perishable order volumes by -15%.`;
    } else if (isRoyalty) {
      text = `**[${model}] - Financial Royalty Forecast**\n\n` +
             `• **Bengaluru South**: Projected Q3 Gross Revenue = ₹4,25,00,000. At 5.0% royalty rate, calculated fee = ₹21,25,000.\n` +
             `• **Delhi Tier-1 Hub**: Projected Q3 Gross Revenue = ₹5,10,00,000. At 5.0% royalty rate, calculated fee = ₹25,50,000.\n` +
             `• **System Audit**: Both hubs pass food safety and operational compliance audit thresholds with 95%+ score. No royalty penalty deductions applicable.`;
    } else if (isReorder) {
      text = `**[${model}] - Supply Chain & Inventory Depot Guidance**\n\n` +
             `• **Depot Location**: TX-Central / West India Regional Hub\n` +
             `• **Alert**: Pune Outlets #01 & #02 inventory buffer is at 18% (below threshold of 25%).\n` +
             `• **Auto-Reorder Executed**: 500 units of standard franchise packaging boxes dispatched via express logistics. Estimated delivery: 14 hours.`;
    } else {
      text = `**[${model}] - Franchise Intelligence Inference**\n\n` +
             `Query processed successfully. The FranchiseOps AI engine analyzed multi-agent telemetry including sales records, regional weather patterns, and ML cluster tiers.\n\n` +
             `• **Confidence Score**: 98.4%\n` +
             `• **Key Insight**: Operational efficiency across seeded Indian outlets remains optimal with an average health score of 94.2/100.`;
    }

    return {
      text,
      latency: Math.floor(Math.random() * 200) + 180,
      promptTok: Math.floor(p.length / 3.5) + 40,
      compTok: Math.floor(text.length / 4) + 30
    };
  };

  const handleCopy = () => {
    if (responseOutput) {
      navigator.clipboard.writeText(responseOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-orange-100 text-orange-600 border border-orange-200">
              <Brain className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">LLM Prompt Test Laboratory</h2>
          </div>
          <p className="text-xs text-slate-500">
            Experiment with fine-tuned Gemini model parameters, grounding contexts, and franchise natural language prompts.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Gemini 1.5 Flash Connected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Prompt Input & AI Output */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Prompt Input Box */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-600" />
                <span>Input Prompt</span>
              </label>
              <span className="text-[11px] text-slate-400 font-mono">{prompt.length} chars</span>
            </div>

            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question or enter operational instructions for the Franchise LLM..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-sans leading-relaxed"
            />

            {/* Quick Preset Prompts */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Sample Franchise Queries:
              </span>
              <div className="flex flex-wrap gap-2">
                {presetPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(p)}
                    className="text-[11px] bg-slate-50 hover:bg-orange-50 hover:text-orange-700 border border-slate-200 hover:border-orange-200 text-slate-600 px-2.5 py-1 rounded-lg transition-all text-left truncate max-w-xs"
                  >
                    ⚡ {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRunLLM}
              disabled={isLoading || !prompt.trim()}
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Running Model Inference...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Execute Model Inference</span>
                </>
              )}
            </button>
          </div>

          {/* Model Output Result */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <h3 className="text-base font-bold text-slate-900">LLM Output Response</h3>
              </div>

              {responseOutput && (
                <button
                  onClick={handleCopy}
                  className="text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 font-medium"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{copied ? 'Copied!' : 'Copy Response'}</span>
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-orange-600 space-y-3">
                <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
                <span className="text-xs font-bold text-slate-600">Querying Franchise LLM Engine & Synthesizing Telemetry...</span>
              </div>
            ) : responseOutput ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-800 font-sans whitespace-pre-wrap leading-relaxed">
                  {responseOutput}
                </div>

                {/* Telemetry Metrics Bar */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-orange-50/60 border border-orange-100 p-3 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Latency</span>
                    <span className="text-sm font-black text-orange-700 font-mono">{latencyMs} ms</span>
                  </div>

                  <div className="bg-blue-50/60 border border-blue-100 p-3 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Prompt Tokens</span>
                    <span className="text-sm font-black text-blue-700 font-mono">{promptTokens} tok</span>
                  </div>

                  <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Completion Tokens</span>
                    <span className="text-sm font-black text-emerald-700 font-mono">{completionTokens} tok</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                Enter a prompt and click "Execute Model Inference" to test response generation.
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Model Hyperparameters & Grounding Config */}
        <div className="space-y-6">
          
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-orange-600" />
              <span>Model Hyperparameters</span>
            </h3>

            {/* Model Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Model Engine</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Gemini 1.5 Flash (FranchiseOps fine-tuned)">Gemini 1.5 Flash (Fine-Tuned)</option>
                <option value="Gemini 1.5 Pro (Executive Deep Reasoning)">Gemini 1.5 Pro (Executive)</option>
                <option value="FranchiseOps Llama-3 70B (Edge)">FranchiseOps Llama-3 70B</option>
              </select>
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">Temperature (Creativity)</label>
                <span className="text-xs font-mono font-bold text-orange-600">{temperature}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>0.0 (Deterministic)</span>
                <span>1.0 (Creative)</span>
              </div>
            </div>

            {/* Max Tokens */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Max Output Tokens</label>
              <select
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value={256}>256 Tokens (Brief)</option>
                <option value={512}>512 Tokens (Standard)</option>
                <option value={1024}>1024 Tokens (Detailed)</option>
                <option value={2048}>2048 Tokens (Comprehensive)</option>
              </select>
            </div>
          </div>

          {/* Grounding Telemetry Context Toggles */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-600" />
              <span>Grounding Data Sources</span>
            </h3>

            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-orange-50/50 transition-all">
                <div className="flex items-center gap-2.5">
                  <CloudSun className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold text-slate-800">Weather API Telemetry</span>
                </div>
                <input
                  type="checkbox"
                  checked={groundingWeather}
                  onChange={(e) => setGroundingWeather(e.target.checked)}
                  className="accent-orange-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-orange-50/50 transition-all">
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-semibold text-slate-800">Sales & Royalty Database</span>
                </div>
                <input
                  type="checkbox"
                  checked={groundingSales}
                  onChange={(e) => setGroundingSales(e.target.checked)}
                  className="accent-orange-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-orange-50/50 transition-all">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <span className="text-xs font-semibold text-slate-800">Inventory Depot Logs</span>
                </div>
                <input
                  type="checkbox"
                  checked={groundingInventory}
                  onChange={(e) => setGroundingInventory(e.target.checked)}
                  className="accent-orange-500 w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
