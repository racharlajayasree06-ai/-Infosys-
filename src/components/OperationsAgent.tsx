import React, { useState } from 'react';
import { StoreLocation } from '../types';
import { CheckCircle2, AlertTriangle, ShieldCheck, FileCheck, RefreshCw, Activity, ArrowUpRight } from 'lucide-react';

interface OperationsAgentProps {
  stores: StoreLocation[];
}

export const OperationsAgent: React.FC<OperationsAgentProps> = ({ stores }) => {
  const [runningAudit, setRunningAudit] = useState(false);
  const [auditCompleteMsg, setAuditCompleteMsg] = useState('');

  const [checklist, setChecklist] = useState([
    { id: 1, task: 'Daily Espresso Machine Pressure & Temp Logs', done: true, time: '07:30 AM' },
    { id: 2, task: 'Milk Refrigeration Digital Sensor Check (< 38°F)', done: true, time: '08:00 AM' },
    { id: 3, task: 'Front-of-House Hygiene & Sanitization Standard', done: true, time: '09:15 AM' },
    { id: 4, task: 'POS System Sync & Shift Reconciliation', done: false, time: 'Pending' },
    { id: 5, task: 'Evening Safe Deposit & Daily Cash Audit', done: false, time: 'Pending' },
  ]);

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done, time: !item.done ? 'Just now' : 'Pending' } : item));
  };

  const handleRunAiAudit = () => {
    setRunningAudit(true);
    setAuditCompleteMsg('');
    setTimeout(() => {
      setRunningAudit(false);
      setAuditCompleteMsg('AI Operations Audit completed! Overall network compliance calculated at 94.8%. All health safety records verified.');
    }, 1500);
  };

  const avgCompliance = Math.round(stores.reduce((a, b) => a + b.complianceRate, 0) / stores.length);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-orange-100 text-orange-600 border border-orange-200">
              ⚡
            </span>
            <h2 className="text-xl font-bold text-slate-900">Operations Agent Intelligence</h2>
          </div>
          <p className="text-xs text-slate-500">
            Real-time compliance monitoring, automated safety audits, and store operational health scores.
          </p>
        </div>

        <button
          onClick={handleRunAiAudit}
          disabled={runningAudit}
          className="py-2.5 px-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${runningAudit ? 'animate-spin' : ''}`} />
          <span>{runningAudit ? 'Running AI Audit...' : 'Run Automated AI Audit'}</span>
        </button>
      </div>

      {auditCompleteMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{auditCompleteMsg}</span>
        </div>
      )}

      {/* Network Health Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stores.map(store => (
          <div key={store.id} className="bg-white border border-orange-100 hover:border-orange-200 rounded-2xl p-5 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{store.name}</h3>
                <p className="text-[11px] text-slate-500">Manager: {store.manager}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                store.healthScore >= 90
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {store.healthScore}% Health
              </span>
            </div>

            <div className="space-y-2 mt-4 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Compliance Rate:</span>
                <span className="font-semibold text-slate-800">{store.complianceRate}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all"
                  style={{ width: `${store.complianceRate}%` }}
                />
              </div>

              <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-100">
                <span>Inventory Status:</span>
                <span className={`font-semibold ${
                  store.inventoryStatus === 'Optimal' ? 'text-emerald-600' :
                  store.inventoryStatus === 'Low Stock' ? 'text-amber-600' : 'text-rose-600'
                }`}>
                  {store.inventoryStatus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Operational Compliance Checklist */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-orange-600" />
            <h3 className="text-base font-bold text-slate-900">Store Opening & Compliance Checklist</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {checklist.filter(c => c.done).length} / {checklist.length} Completed
          </span>
        </div>

        <div className="space-y-2.5">
          {checklist.map(item => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                item.done
                  ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-5 h-5 ${item.done ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className={`text-xs sm:text-sm font-medium ${item.done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                  {item.task}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
