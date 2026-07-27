import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { BarChart3, TrendingUp, Users, Activity, Lock, CheckCircle2 } from 'lucide-react';
import { getStoredUsers } from '../../utils/authUtils';

export const AnalyticsView: React.FC = () => {
  const users = getStoredUsers();

  const activeCount = users.filter(u => u.status === 'Active').length;
  const lockedCount = users.filter(u => u.status === 'Locked').length;

  const userStatusData = [
    { name: 'Active Users', value: activeCount, color: '#10b981' },
    { name: 'Locked Users', value: lockedCount, color: '#f43f5e' }
  ];

  // Time Series Analytics Mock Dataset
  const analyticsTrendData = [
    { date: 'Jul 18', registrations: 4, predictions: 1200, loginActivity: 45, failedAttempts: 2 },
    { date: 'Jul 19', registrations: 7, predictions: 1850, loginActivity: 62, failedAttempts: 1 },
    { date: 'Jul 20', registrations: 3, predictions: 1600, loginActivity: 58, failedAttempts: 4 },
    { date: 'Jul 21', registrations: 9, predictions: 2400, loginActivity: 89, failedAttempts: 3 },
    { date: 'Jul 22', registrations: 12, predictions: 3100, loginActivity: 110, failedAttempts: 2 },
    { date: 'Jul 23', registrations: 8, predictions: 2900, loginActivity: 95, failedAttempts: 5 },
    { date: 'Jul 24', registrations: 15, predictions: 3800, loginActivity: 142, failedAttempts: 1 },
    { date: 'Jul 25', registrations: 18, predictions: 4250, loginActivity: 168, failedAttempts: 3 },
    { date: 'Jul 26', registrations: 22, predictions: 4890, loginActivity: 195, failedAttempts: 2 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            <h2 className="text-xl font-bold text-slate-900">System Analytics & Traffic Performance</h2>
          </div>
          <p className="text-xs text-slate-500">
            Real-time analytics visualization on user activity, prediction execution trends, and login security metrics.
          </p>
        </div>

        <div className="flex gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-semibold">
            Active Users: <strong>{activeCount}</strong>
          </div>
          <div className="px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 font-semibold">
            Locked Accounts: <strong>{lockedCount}</strong>
          </div>
        </div>
      </div>

      {/* Grid 1: Predictions Trend & User Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ML Prediction Count Trend */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span>ML Prediction Execution Volume</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Daily Inferences</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsTrendData}>
                <defs>
                  <linearGradient id="colorPredictions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#fed7aa', borderRadius: '0.75rem', color: '#0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Area type="monotone" dataKey="predictions" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorPredictions)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Registrations Trend */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-600" />
              <span>Enterprise User Registrations</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">New Onboardings</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#fed7aa', borderRadius: '0.75rem', color: '#0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="registrations" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Grid 2: Login Activity & Account Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Login Activity & Failed Attempts */}
        <div className="lg:col-span-2 bg-white border border-orange-100 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" />
              <span>Login Activity vs Security Exceptions</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Sessions vs Failures</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsTrendData}>
                <defs>
                  <linearGradient id="colorLogin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#fed7aa', borderRadius: '0.75rem', color: '#0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Area type="monotone" dataKey="loginActivity" name="Successful Logins" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorLogin)" />
                <Area type="monotone" dataKey="failedAttempts" name="Failed Attempts" stroke="#f43f5e" strokeWidth={2} fill="#f43f5e" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Account Status Distribution Pie */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-500" />
            <span>Account Security Distribution</span>
          </h3>

          <div className="h-52 w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userStatusData}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#fed7aa', borderRadius: '0.75rem', color: '#0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-100 text-xs font-mono text-slate-700 text-center">
            <span>Security Lockout Ratio: <strong>{((lockedCount / Math.max(1, users.length)) * 100).toFixed(1)}%</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
};
