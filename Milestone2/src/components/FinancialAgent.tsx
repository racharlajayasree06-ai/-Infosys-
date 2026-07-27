import React, { useState } from 'react';
import { StoreLocation } from '../types';
import { DollarSign, TrendingUp, Calculator, PieChart, FileSpreadsheet, ArrowUpRight } from 'lucide-react';

interface FinancialAgentProps {
  stores: StoreLocation[];
}

export const FinancialAgent: React.FC<FinancialAgentProps> = ({ stores }) => {
  const [royaltyRate, setRoyaltyRate] = useState<number>(5.0); // 5%

  const totalRevenue = stores.reduce((acc, s) => acc + s.monthlyRevenue, 0);
  const totalTarget = stores.reduce((acc, s) => acc + s.targetRevenue, 0);
  const totalRoyalty = Math.round((totalRevenue * royaltyRate) / 100);

  return (
    <div className="space-y-6">
      {/* Top Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500">Total Network Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">${totalRevenue.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+${(totalRevenue - totalTarget).toLocaleString()} vs Network Target</span>
          </div>
        </div>

        <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500">Total Calculated Royalty Fees</span>
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
              <Calculator className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">${totalRoyalty.toLocaleString()}</div>
          <div className="text-xs text-orange-700 mt-2 font-medium">
            Standard Royalty Fee Agreement ({royaltyRate}%)
          </div>
        </div>

        <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500">Average Unit EBITDA Margin</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">24.2%</div>
          <div className="text-xs text-amber-700 mt-2 font-medium">
            +1.8% over industry franchise benchmark
          </div>
        </div>

      </div>

      {/* Royalty Fee Calculator */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-600" />
              <span>Interactive Franchise Royalty Fee Model</span>
            </h3>
            <p className="text-xs text-slate-500">Adjust agreement percentage to calculate net royalty revenue.</p>
          </div>

          <div className="flex items-center gap-3 bg-orange-50 p-2.5 rounded-xl border border-orange-200">
            <label className="text-xs font-semibold text-slate-700">Royalty Rate:</label>
            <input
              type="range"
              min="3"
              max="10"
              step="0.5"
              value={royaltyRate}
              onChange={(e) => setRoyaltyRate(parseFloat(e.target.value))}
              className="accent-orange-500 cursor-pointer w-28"
            />
            <span className="text-xs font-bold text-orange-600 font-mono w-10 text-right">{royaltyRate}%</span>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-orange-100 text-xs font-semibold text-slate-500 uppercase">
                <th className="py-3 px-3">Franchise Location</th>
                <th className="py-3 px-3">Monthly Revenue</th>
                <th className="py-3 px-3">Target Revenue</th>
                <th className="py-3 px-3">Target Variance</th>
                <th className="py-3 px-3 text-right">Calculated Royalty ({royaltyRate}%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {stores.map(store => {
                const calculatedRoyalty = Math.round((store.monthlyRevenue * royaltyRate) / 100);
                const diff = store.monthlyRevenue - store.targetRevenue;

                return (
                  <tr key={store.id} className="hover:bg-orange-50/30 transition-all">
                    <td className="py-3.5 px-3 font-semibold text-slate-900">{store.name}</td>
                    <td className="py-3.5 px-3 font-mono text-slate-800">${store.monthlyRevenue.toLocaleString()}</td>
                    <td className="py-3.5 px-3 font-mono text-slate-500">${store.targetRevenue.toLocaleString()}</td>
                    <td className="py-3.5 px-3 font-mono">
                      <span className={`font-semibold ${diff >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {diff >= 0 ? `+$${diff.toLocaleString()}` : `-$${Math.abs(diff).toLocaleString()}`}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-orange-600">
                      ${calculatedRoyalty.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
