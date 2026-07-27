import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { 
  Home, 
  Brain, 
  CloudSun, 
  PieChart, 
  ShieldCheck, 
  LogOut, 
  Sparkles,
  ChevronRight,
  Bot,
  Calculator
} from 'lucide-react';

interface SidebarProps {
  currentUser: User;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activeTab,
  onSelectTab,
  onLogout
}) => {
  const [llmStatus, setLlmStatus] = useState<'loading' | 'ready'>('loading');

  useEffect(() => {
    // Simulate initial LLM connection check
    const timer = setTimeout(() => {
      setLlmStatus('ready');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ai_copilot', label: 'AI Copilot', icon: Bot },
    { id: 'pricing_calc', label: 'ML Pricing Calculator', icon: Calculator },
    { id: 'llm_lab', label: 'LLM Test Lab', icon: Brain },
    { id: 'weather', label: 'Weather Demo', icon: CloudSun },
    { id: 'kmeans', label: 'Outlet Tiers (K-Means)', icon: PieChart },
    { id: 'admin_panel', label: 'Admin Panel', icon: ShieldCheck },
  ];

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200/80 fixed top-0 left-0 bottom-0 z-30 flex flex-col justify-between p-4 shadow-sm select-none font-sans overflow-y-auto">
      
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-1 pt-1">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-xl shadow-md shadow-orange-500/20 shrink-0">
            ⚡
          </div>
          <div className="overflow-hidden">
            <h1 className="text-base font-black text-slate-900 tracking-tight leading-tight">
              FranchiseOps AI
            </h1>
            <p className="text-[11px] text-slate-500 font-medium truncate">
              Milestone 2 Platform
            </p>
          </div>
        </div>

        {/* User Admin Info & Status Badges Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-sm space-y-2.5">
          <div className="overflow-hidden">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Active Session
            </div>
            <div className="text-xs font-bold text-slate-900 truncate" title={currentUser.email || 'admin@franchiseops.ai'}>
              {currentUser.email || 'admin@franchiseops.ai'}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
            {/* Green Admin Badge */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              ADMIN
            </span>

            {/* LLM Status Badge */}
            {llmStatus === 'loading' ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                LLM Loading...
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                LLM Ready
              </span>
            )}
          </div>
        </div>

        {/* Navigation Menu Header */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-orange-600'
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Logout Action at Bottom */}
      <div className="pt-4 border-t border-slate-200/80">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 border border-transparent hover:border-rose-200 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 text-rose-500" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};
