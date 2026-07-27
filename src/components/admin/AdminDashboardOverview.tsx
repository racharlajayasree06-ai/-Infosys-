import React from 'react';
import { User, StoreLocation } from '../../types';
import { getStoredUsers } from '../../utils/authUtils';
import { MOCK_STORES, MOCK_INSIGHTS } from '../../data/mockData';
import { 
  Users, 
  CheckCircle2, 
  Lock, 
  Brain, 
  TrendingUp, 
  BarChart3, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  Store,
  DollarSign,
  Activity,
  ArrowUpRight
} from 'lucide-react';

interface AdminDashboardOverviewProps {
  currentUser: User;
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({ currentUser, onNavigateTab }) => {
  const users = getStoredUsers();

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const lockedUsers = users.filter(u => u.status === 'Locked').length;

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white border border-orange-400/30 rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-2 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FranchiseOps Executive Command Center</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            Welcome back, {currentUser.username}!
          </h1>
          <p className="text-xs text-orange-100 mt-1">
            Role: <strong className="text-white font-bold">{currentUser.role}</strong> | System Status: <span className="text-emerald-300 font-bold">● Operational</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onNavigateTab('users')}
            className="py-2 px-3.5 bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Users className="w-4 h-4 text-orange-600" />
            <span>Manage Users</span>
          </button>
          <button
            onClick={() => onNavigateTab('model')}
            className="py-2 px-3.5 bg-orange-600/60 hover:bg-orange-600 text-white font-semibold text-xs rounded-xl border border-orange-400/40 transition-all flex items-center gap-1.5"
          >
            <Brain className="w-4 h-4 text-amber-200" />
            <span>ML Model Details</span>
          </button>
        </div>
      </div>

      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
        
        {/* Total Users */}
        <div className="bg-white border border-orange-100/80 rounded-2xl p-4 shadow-sm shadow-orange-950/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-500 font-medium">Total Users</span>
            <Users className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{totalUsers}</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-1">Registered</div>
        </div>

        {/* Active Users */}
        <div className="bg-white border border-orange-100/80 rounded-2xl p-4 shadow-sm shadow-orange-950/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-500 font-medium">Active Users</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600 font-mono">{activeUsers}</div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">Unlocked</div>
        </div>

        {/* Locked Users */}
        <div className="bg-white border border-orange-100/80 rounded-2xl p-4 shadow-sm shadow-orange-950/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-500 font-medium">Locked Users</span>
            <Lock className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600 font-mono">{lockedUsers}</div>
          <div className="text-[10px] text-rose-600 font-medium mt-1">Security Hold</div>
        </div>

        {/* ML Model Accuracy */}
        <div className="bg-white border border-orange-100/80 rounded-2xl p-4 shadow-sm shadow-orange-950/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-500 font-medium">ML Accuracy</span>
            <Brain className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-black text-orange-600 font-mono">96.4%</div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">XGBoost v2.4</div>
        </div>

        {/* RMSE */}
        <div className="bg-white border border-orange-100/80 rounded-2xl p-4 shadow-sm shadow-orange-950/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-500 font-medium">RMSE Error</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono">0.042</div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">Low Deviation</div>
        </div>

        {/* R² Score */}
        <div className="bg-white border border-orange-100/80 rounded-2xl p-4 shadow-sm shadow-orange-950/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-500 font-medium">R² Score</span>
            <BarChart3 className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-black text-orange-600 font-mono">0.948</div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">High Correlation</div>
        </div>

        {/* Last Model Update */}
        <div className="bg-white border border-orange-100/80 rounded-2xl p-4 shadow-sm shadow-orange-950/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-500 font-medium">Last Update</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-sm font-black text-slate-900 font-mono mt-1">Jul 24</div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">Automatic Sync</div>
        </div>

        {/* Total Predictions */}
        <div className="bg-white border border-orange-100/80 rounded-2xl p-4 shadow-sm shadow-orange-950/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-500 font-medium">Total Preds</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-emerald-600 font-mono">14,280</div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">Inferences</div>
        </div>

      </div>

      {/* Main Content Layout: Store Locations & Multi-Agent Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Franchise Store Overview */}
        <div className="lg:col-span-2 bg-white border border-orange-100/80 rounded-2xl p-6 shadow-sm shadow-orange-950/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-orange-600" />
              <span>Franchise Store Performance Overview</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">{MOCK_STORES.length} Active Stores</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-orange-100 bg-orange-50/50 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-2">Store Name</th>
                  <th className="py-2.5 px-2">Manager</th>
                  <th className="py-2.5 px-2">Health</th>
                  <th className="py-2.5 px-2">Revenue</th>
                  <th className="py-2.5 px-2">Compliance</th>
                  <th className="py-2.5 px-2">Inventory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_STORES.map((store) => (
                  <tr key={store.id} className="hover:bg-orange-50/30 transition-all">
                    <td className="py-3 px-2 font-bold text-slate-900">
                      {store.name}
                      <span className="block text-[10px] text-slate-500 font-normal">{store.city}, {store.state}</span>
                    </td>
                    <td className="py-3 px-2 text-slate-600">{store.manager}</td>
                    <td className="py-3 px-2 font-mono">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        store.healthScore >= 90 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {store.healthScore}/100
                      </span>
                    </td>
                    <td className="py-3 px-2 font-mono text-emerald-700 font-bold">
                      ${store.monthlyRevenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 font-mono text-orange-700 font-semibold">
                      {store.complianceRate}%
                    </td>
                    <td className="py-3 px-2 font-medium">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        store.inventoryStatus === 'Optimal' ? 'bg-emerald-50 text-emerald-700' :
                        store.inventoryStatus === 'Low Stock' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {store.inventoryStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-Time Agent Intelligence Feed */}
        <div className="bg-white border border-orange-100/80 rounded-2xl p-6 shadow-sm shadow-orange-950/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>Multi-Agent Insights Feed</span>
            </h3>
          </div>

          <div className="space-y-3">
            {MOCK_INSIGHTS.slice(0, 4).map((item) => (
              <div key={item.id} className="p-3.5 bg-orange-50/40 border border-orange-100 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-orange-700 font-mono text-[11px]">{item.agent} Agent</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    item.severity === 'high' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
