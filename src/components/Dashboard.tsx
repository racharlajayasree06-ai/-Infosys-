import React, { useState } from 'react';
import { User, StoreLocation } from '../types';
import { MOCK_STORES, MOCK_INSIGHTS } from '../data/mockData';
import { OperationsAgent } from './OperationsAgent';
import { SupplyChainAgent } from './SupplyChainAgent';
import { FinancialAgent } from './FinancialAgent';
import { AIChatAgent } from './AIChatAgent';
import { 
  Building2, 
  Activity, 
  DollarSign, 
  ShieldCheck, 
  Truck, 
  Calculator, 
  Bot, 
  AlertTriangle, 
  ArrowUpRight,
  TrendingUp,
  Layers
} from 'lucide-react';

interface DashboardProps {
  user: User;
  selectedStoreId: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, selectedStoreId }) => {
  const [activeTab, setActiveTab] = useState<'operations' | 'supply' | 'financial' | 'chat'>('operations');

  // Filter stores based on store selector
  const displayStores = selectedStoreId === 'all'
    ? MOCK_STORES
    : MOCK_STORES.filter(s => s.id === selectedStoreId);

  const totalRev = displayStores.reduce((acc, s) => acc + s.monthlyRevenue, 0);
  const totalRoyalty = displayStores.reduce((acc, s) => acc + s.royaltyDue, 0);
  const avgHealth = Math.round(displayStores.reduce((acc, s) => acc + s.healthScore, 0) / displayStores.length);
  const avgCompliance = Math.round(displayStores.reduce((acc, s) => acc + s.complianceRate, 0) / displayStores.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-orange-100 p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-slate-900">
              Welcome back, {user.username} 👋
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 font-semibold">
              {user.role}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Enterprise Multi-Agent Franchise Control Tower • Active Store Filter: <strong className="text-slate-800">{selectedStoreId === 'all' ? 'All 4 Network Locations' : displayStores[0]?.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 px-3.5 py-2 rounded-xl text-xs text-orange-800 font-medium">
          <Activity className="w-4 h-4 text-orange-600 animate-pulse" />
          <span>4 Autonomous AI Agents Operational</span>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500">Monthly Network Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">${totalRev.toLocaleString()}</div>
          <div className="text-xs text-emerald-600 mt-2 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+6.4% MoM Revenue Growth</span>
          </div>
        </div>

        <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500">Average Unit Health Score</span>
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{avgHealth}%</div>
          <div className="text-xs text-orange-700 mt-2 font-medium">
            Optimal Performance Threshold
          </div>
        </div>

        <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500">Calculated Royalty Fees</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Calculator className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">${totalRoyalty.toLocaleString()}</div>
          <div className="text-xs text-amber-700 mt-2 font-medium">
            5% Standard Agreement Fee
          </div>
        </div>

        <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500">Audit Compliance Rate</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{avgCompliance}%</div>
          <div className="text-xs text-blue-700 mt-2 font-medium">
            Food Safety & Operations Passed
          </div>
        </div>

      </div>

      {/* Agent Selector Navigation Tabs */}
      <div className="flex border-b border-orange-100 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('operations')}
          className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'operations'
              ? 'border-orange-500 text-orange-600 bg-orange-50/60 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>⚡ Operations Agent</span>
        </button>

        <button
          onClick={() => setActiveTab('supply')}
          className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'supply'
              ? 'border-orange-500 text-orange-600 bg-orange-50/60 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>🚚 Supply Chain Agent</span>
        </button>

        <button
          onClick={() => setActiveTab('financial')}
          className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'financial'
              ? 'border-orange-500 text-orange-600 bg-orange-50/60 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>💰 Financial Intelligence</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'chat'
              ? 'border-orange-500 text-orange-600 bg-orange-50/60 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>🤖 AI Assistant Chat</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="pt-2">
        {activeTab === 'operations' && <OperationsAgent stores={displayStores} />}
        {activeTab === 'supply' && <SupplyChainAgent stores={displayStores} />}
        {activeTab === 'financial' && <FinancialAgent stores={displayStores} />}
        {activeTab === 'chat' && <AIChatAgent stores={displayStores} />}
      </div>

      {/* Multi-Agent Insights Realtime Alert Stream */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-orange-600" />
          <span>Autonomous Multi-Agent Intelligence Stream</span>
        </h3>

        <div className="space-y-3">
          {MOCK_INSIGHTS.map((insight) => (
            <div
              key={insight.id}
              className="p-4 bg-orange-50/30 border border-orange-100 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-200 uppercase">
                    {insight.agent} Agent
                  </span>
                  <span className="text-xs font-bold text-slate-900">{insight.title}</span>
                </div>
                <p className="text-xs text-slate-600">{insight.description}</p>
                {insight.actionableStep && (
                  <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    💡 Suggested Action: {insight.actionableStep}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-mono text-slate-400 shrink-0">{insight.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
