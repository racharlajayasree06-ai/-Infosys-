import React, { useState, useEffect } from 'react';
import { User } from './types';
import { AuthPortal } from './components/AuthPortal';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/views/HomeView';
import { LLMTestLabView } from './components/views/LLMTestLabView';
import { WeatherDemoView } from './components/views/WeatherDemoView';
import { KMeansView } from './components/views/KMeansView';
import { AdminPanelView } from './components/views/AdminPanelView';
import { AICopilot } from './components/AICopilot';
import { MLPricingCalculator } from './components/MLPricingCalculator';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');

  // Global Toast Notifications State
  const [toastNotification, setToastNotification] = useState<{
    id: number;
    message: string;
    type: 'success' | 'error' | 'warning';
  } | null>(null);

  // Load session from sessionStorage on mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem('franchiseops_active_session');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse active user session', e);
      }
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    const newToast = { id: Date.now(), message, type };
    setToastNotification(newToast);
    setTimeout(() => {
      setToastNotification(prev => (prev?.id === newToast.id ? null : prev));
    }, 4000);
  };

  const handleSuccessLogin = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem('franchiseops_active_session', JSON.stringify(user));
    setActiveTab('home');
    showToast(`Login Successful. Welcome back, ${user.username}!`, 'success');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('franchiseops_active_session');
    showToast('Logged out successfully.', 'success');
  };

  if (!currentUser) {
    return (
      <div className="relative">
        {toastNotification && (
          <div className="fixed top-4 right-4 z-50 animate-fade-in">
            <div className={`px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-lg ${
              toastNotification.type === 'success' ? 'bg-emerald-500 text-white border-emerald-600' :
              toastNotification.type === 'warning' ? 'bg-amber-500 text-white border-amber-600' :
              'bg-rose-500 text-white border-rose-600'
            }`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastNotification.message}</span>
            </div>
          </div>
        )}
        <AuthPortal onSuccessLogin={handleSuccessLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 font-sans flex antialiased">
      
      {/* Toast Notification Stack */}
      {toastNotification && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in max-w-md w-full px-4">
          <div className={`p-4 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-between shadow-xl ${
            toastNotification.type === 'success'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-emerald-950/10'
              : toastNotification.type === 'warning'
              ? 'bg-amber-500 text-white border-amber-600 shadow-amber-950/10'
              : 'bg-rose-600 text-white border-rose-700 shadow-rose-950/10'
          }`}>
            <div className="flex items-center gap-2.5">
              {toastNotification.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-white" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-white" />
              )}
              <span>{toastNotification.message}</span>
            </div>
            <button
              onClick={() => setToastNotification(null)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Left Sidebar (Fixed) */}
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLogout={handleSignOut}
      />

      {/* Main Content Area (Offset for Left Sidebar) */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4 sticky top-0 z-20 shadow-xs flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className="text-slate-400">FranchiseOps AI</span>
            <span>/</span>
            <span className="text-orange-600 capitalize">
              {activeTab === 'home' && 'Milestone 2 Overview'}
              {activeTab === 'ai_copilot' && 'AI Operations Copilot'}
              {activeTab === 'pricing_calc' && 'ML Setup Pricing Calculator'}
              {activeTab === 'llm_lab' && 'LLM Test Lab'}
              {activeTab === 'weather' && 'Weather Demo'}
              {activeTab === 'kmeans' && 'Outlet Tiers (K-Means)'}
              {activeTab === 'admin_panel' && 'Admin Panel'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Connected
            </span>
            <div className="text-right">
              <span className="block text-slate-900 font-bold leading-none">{currentUser.username}</span>
              <span className="text-[10px] text-slate-400 font-medium">{currentUser.role}</span>
            </div>
          </div>
        </header>

        {/* Dynamic View Body */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'home' && (
            <HomeView currentUser={currentUser} onNavigateTab={setActiveTab} />
          )}

          {activeTab === 'ai_copilot' && (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <h1 className="text-xl font-bold text-slate-900">AI Copilot - Multi-Agent Intelligence</h1>
                <p className="text-xs text-slate-500">Ask questions about setup costs, sales predictions, or operational staffing.</p>
              </div>
              <AICopilot />
            </div>
          )}

          {activeTab === 'pricing_calc' && (
            <div className="space-y-4">
              <MLPricingCalculator />
            </div>
          )}

          {activeTab === 'llm_lab' && (
            <LLMTestLabView />
          )}

          {activeTab === 'weather' && (
            <WeatherDemoView />
          )}

          {activeTab === 'kmeans' && (
            <KMeansView />
          )}

          {activeTab === 'admin_panel' && (
            <AdminPanelView currentUser={currentUser} onShowToast={showToast} />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/80 bg-white py-4 px-8 text-center text-xs text-slate-500 mt-auto">
          <p>© 2026 FranchiseOps AI Admin System • Milestone 2 Operations Dashboard</p>
        </footer>

      </div>

    </div>
  );
}
