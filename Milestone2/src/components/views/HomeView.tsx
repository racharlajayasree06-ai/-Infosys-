import React from 'react';
import { User } from '../../types';
import { getStoredUsers } from '../../utils/authUtils';
import { MOCK_STORES } from '../../data/mockData';
import { AICopilot } from '../AICopilot';
import { MLPricingCalculator } from '../MLPricingCalculator';
import { 
  Users, 
  Store, 
  Brain, 
  Activity, 
  Target, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  MapPin, 
  ArrowUpRight,
  Sparkles,
  Server,
  Database,
  CheckCircle2,
  Bot,
  Calculator
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

interface HomeViewProps {
  currentUser: User;
  onNavigateTab: (tabId: string) => void;
}

const REQUEST_TREND_DATA = [
  { time: '08:00', requests: 1200, accuracy: 96.1 },
  { time: '10:00', requests: 2400, accuracy: 96.4 },
  { time: '12:00', requests: 3800, accuracy: 96.8 },
  { time: '14:00', requests: 4900, accuracy: 96.2 },
  { time: '16:00', requests: 3100, accuracy: 96.5 },
  { time: '18:00', requests: 2800, accuracy: 96.9 },
  { time: '20:00', requests: 1900, accuracy: 96.4 },
];

const CITY_OUTLET_DATA = [
  { city: 'Mumbai', outlets: 6, revenue: 142000, footfall: 18400 },
  { city: 'Delhi', outlets: 5, revenue: 128000, footfall: 16200 },
  { city: 'Bengaluru', outlets: 5, revenue: 135000, footfall: 17100 },
  { city: 'Hyderabad', outlets: 3, revenue: 98000, footfall: 12900 },
  { city: 'Chennai', outlets: 3, revenue: 89000, footfall: 11800 },
  { city: 'Pune', outlets: 2, revenue: 76000, footfall: 9500 },
];

export const HomeView: React.FC<HomeViewProps> = ({ currentUser, onNavigateTab }) => {
  const users = getStoredUsers();
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'Admin').length;
  const managerCount = users.filter(u => u.role !== 'Admin').length;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title & Headline Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-extrabold mb-2 border border-orange-200">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>AI Franchise Intelligence & Analytics Platform</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            FranchiseOps AI
          </h1>
          <h2 className="text-xl font-bold text-orange-600 mt-0.5">
            Milestone 2 Overview
          </h2>
          <p className="text-xs text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Centralized multi-agent AI dashboard, K-Means outlet clustering, weather-impact forecasting, and enterprise user access control for Indian franchise operations.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab('llm_lab')}
            className="py-2.5 px-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
          >
            <Brain className="w-4 h-4" />
            <span>Open LLM Test Lab</span>
          </button>
          <button
            onClick={() => onNavigateTab('admin_panel')}
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl border border-slate-200 transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Admin Control Panel</span>
          </button>
        </div>
      </div>

      {/* 6 Responsive Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* 1. Registered Users */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-orange-200 transition-all">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registered Users</span>
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">{totalUsers}</div>
          <div className="text-xs text-slate-600 mt-2 font-medium flex items-center justify-between pt-2 border-t border-slate-100">
            <span>Role Breakdown:</span>
            <span className="font-bold text-orange-700">{managerCount} Mgrs + {adminCount} Admins</span>
          </div>
        </div>

        {/* 2. Seeded Outlets */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-orange-200 transition-all">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Seeded Outlets</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">24 Outlets</div>
          <div className="text-xs text-slate-600 mt-2 font-medium flex items-center justify-between pt-2 border-t border-slate-100">
            <span>Indian Cities:</span>
            <span className="font-bold text-blue-700">Mumbai, Delhi, BLR +3</span>
          </div>
        </div>

        {/* 3. Active Models */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-orange-200 transition-all">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Models</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">4 Models</div>
          <div className="text-xs text-emerald-700 mt-2 font-bold flex items-center gap-1.5 pt-2 border-t border-slate-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>All Status Deployed</span>
          </div>
        </div>

        {/* 4. System Health */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-orange-200 transition-all">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Health</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-emerald-700 font-mono">Online</div>
          <div className="text-[11px] text-slate-600 mt-2 font-medium space-y-0.5 pt-2 border-t border-slate-100">
            <div className="flex justify-between"><span>API Status:</span><span className="text-emerald-600 font-bold">99.98%</span></div>
            <div className="flex justify-between"><span>DB Status:</span><span className="text-emerald-600 font-bold">Connected</span></div>
          </div>
        </div>

        {/* 5. Average Prediction Accuracy */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-orange-200 transition-all">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Prediction Accuracy</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">96.4%</div>
          <div className="text-xs text-amber-700 mt-2 font-semibold flex items-center gap-1 pt-2 border-t border-slate-100">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+1.2% XGBoost Improvement</span>
          </div>
        </div>

        {/* 6. Today's Requests */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-orange-200 transition-all">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Requests</span>
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">14,280</div>
          <div className="text-xs text-slate-600 mt-2 font-medium flex items-center justify-between pt-2 border-t border-slate-100">
            <span>Avg Latency:</span>
            <span className="font-bold text-slate-800">18 ms</span>
          </div>
        </div>

      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Request & Prediction Trend Chart */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span>Today's System Inference Load</span>
              </h3>
              <p className="text-xs text-slate-500">Hourly API inference requests and model prediction accuracy trend.</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold">
              Real-time
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REQUEST_TREND_DATA}>
                <defs>
                  <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#fed7aa', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#reqGrad)" name="Inference Requests" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Franchise Outlet Revenue & Footfall by City */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Indian Franchise Cities Footfall & Revenue</span>
              </h3>
              <p className="text-xs text-slate-500">Seeded franchise locations across top tier Indian metro centers.</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold">
              24 Outlets
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CITY_OUTLET_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="city" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Monthly Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* AI Copilot Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-orange-600" />
            <span>AI Operations Copilot</span>
          </h2>
          <button
            onClick={() => onNavigateTab('ai_copilot')}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700"
          >
            Expand Full Screen →
          </button>
        </div>
        <AICopilot />
      </div>

      {/* ML Pricing Calculator Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-orange-600" />
            <span>ML Franchise Setup Pricing Model</span>
          </h2>
          <button
            onClick={() => onNavigateTab('pricing_calc')}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700"
          >
            Open Dedicated Calculator →
          </button>
        </div>
        <MLPricingCalculator />
      </div>

    </div>
  );
};
