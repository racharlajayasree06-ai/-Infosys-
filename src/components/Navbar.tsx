import React from 'react';
import { User, StoreLocation } from '../types';
import { 
  LogOut, 
  Building2, 
  ShieldCheck, 
  UserCircle2, 
  LayoutDashboard, 
  Users, 
  Brain, 
  BarChart3, 
  Settings, 
  Layers 
} from 'lucide-react';

interface NavbarProps {
  user: User;
  stores: StoreLocation[];
  selectedStoreId: string;
  activeNavTab: string;
  onSelectNavTab: (tab: string) => void;
  onSelectStore: (id: string) => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  stores,
  selectedStoreId,
  activeNavTab,
  onSelectNavTab,
  onSelectStore,
  onSignOut,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'model', label: 'ML Model Card', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'agents', label: 'Multi-Agents', icon: Layers },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="bg-white border-b border-orange-100 text-slate-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div className="h-16 flex items-center justify-between">
          
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white font-bold flex items-center justify-center text-xl shadow-md shadow-orange-500/20 shrink-0">
              ⚡
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                FranchiseOps <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 font-bold">AI 2.0</span>
              </h1>
              <p className="text-[11px] text-slate-500 hidden sm:block">Enterprise Multi-Agent Franchise Control System</p>
            </div>
          </div>

          {/* Center: Store Selector */}
          <div className="hidden lg:flex items-center gap-2 bg-orange-50/80 border border-orange-200/80 rounded-xl px-3 py-1.5">
            <Building2 className="w-4 h-4 text-orange-600" />
            <span className="text-xs text-slate-600 font-medium">Store Unit:</span>
            <select
              value={selectedStoreId}
              onChange={(e) => onSelectStore(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer pr-2"
            >
              <option value="all" className="bg-white text-slate-900">All Locations (Network Overview)</option>
              {stores.map(s => (
                <option key={s.id} value={s.id} className="bg-white text-slate-900">
                  {s.name} ({s.city}, {s.state})
                </option>
              ))}
            </select>
          </div>

          {/* Right: User Admin Info & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center gap-1.5">
                <UserCircle2 className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-bold text-slate-800">{user.username}</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                {user.role}
              </span>
            </div>

            <button
              onClick={onSignOut}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 hover:border-rose-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>

        {/* Bottom Navigation Links Bar */}
        <div className="flex border-t border-orange-100 overflow-x-auto gap-1 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNavTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectNavTab(item.id)}
                className={`py-1.5 px-3 rounded-lg font-semibold text-xs transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
