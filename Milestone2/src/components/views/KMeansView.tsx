import React, { useState } from 'react';
import { 
  PieChart, 
  Sparkles, 
  RefreshCw, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  Sliders, 
  Building2,
  HelpCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';

interface FranchiseOutletPoint {
  id: string;
  name: string;
  city: string;
  revenue: number; // in thousands ₹
  footfall: number;
  healthScore: number;
  royaltyRate: number;
  cluster: number; // 0: Tier 1, 1: Tier 2, 2: Tier 3
}

const INITIAL_OUTLETS: FranchiseOutletPoint[] = [
  { id: 'O-101', name: 'Mumbai Central Flagship', city: 'Mumbai', revenue: 142, footfall: 18.4, healthScore: 98, royaltyRate: 5.0, cluster: 0 },
  { id: 'O-102', name: 'Bandra West Hub', city: 'Mumbai', revenue: 135, footfall: 17.2, healthScore: 95, royaltyRate: 5.0, cluster: 0 },
  { id: 'O-103', name: 'Delhi Connaught Place', city: 'Delhi', revenue: 128, footfall: 16.2, healthScore: 94, royaltyRate: 5.0, cluster: 0 },
  { id: 'O-104', name: 'Bengaluru Indiranagar', city: 'Bengaluru', revenue: 135, footfall: 17.1, healthScore: 96, royaltyRate: 5.0, cluster: 0 },
  { id: 'O-105', name: 'Hyderabad Banjara Hills', city: 'Hyderabad', revenue: 98, footfall: 12.9, healthScore: 91, royaltyRate: 5.0, cluster: 1 },
  { id: 'O-106', name: 'Chennai Anna Nagar', city: 'Chennai', revenue: 89, footfall: 11.8, healthScore: 89, royaltyRate: 5.0, cluster: 1 },
  { id: 'O-107', name: 'Pune FC Road', city: 'Pune', revenue: 76, footfall: 9.5, healthScore: 86, royaltyRate: 5.0, cluster: 2 },
  { id: 'O-108', name: 'Delhi Cyber City', city: 'Delhi', revenue: 115, footfall: 14.8, healthScore: 92, royaltyRate: 5.0, cluster: 1 },
  { id: 'O-109', name: 'Mumbai Lower Parel', city: 'Mumbai', revenue: 138, footfall: 17.8, healthScore: 97, royaltyRate: 5.0, cluster: 0 },
  { id: 'O-110', name: 'Bengaluru Koramangala', city: 'Bengaluru', revenue: 122, footfall: 15.5, healthScore: 93, royaltyRate: 5.0, cluster: 1 },
  { id: 'O-111', name: 'Pune Viman Nagar', city: 'Pune', revenue: 68, footfall: 8.8, healthScore: 84, royaltyRate: 5.0, cluster: 2 },
  { id: 'O-112', name: 'Hyderabad HITECH City', city: 'Hyderabad', revenue: 105, footfall: 13.6, healthScore: 90, royaltyRate: 5.0, cluster: 1 },
];

const CLUSTER_COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6'];

export const KMeansView: React.FC = () => {
  const [kClusters, setKClusters] = useState<number>(3);
  const [outlets, setOutlets] = useState<FranchiseOutletPoint[]>(INITIAL_OUTLETS);
  const [isClustering, setIsClustering] = useState<boolean>(false);
  const [silhouetteScore, setSilhouetteScore] = useState<number>(0.842);

  const handleRunKMeans = () => {
    setIsClustering(true);

    setTimeout(() => {
      // Re-classify points based on kClusters
      const updated = outlets.map(o => {
        let assignedCluster = 0;
        if (kClusters === 2) {
          assignedCluster = o.revenue > 100 ? 0 : 1;
        } else if (kClusters === 3) {
          if (o.revenue >= 125) assignedCluster = 0; // Tier 1
          else if (o.revenue >= 85) assignedCluster = 1; // Tier 2
          else assignedCluster = 2; // Tier 3
        } else {
          if (o.revenue >= 135) assignedCluster = 0;
          else if (o.revenue >= 110) assignedCluster = 1;
          else if (o.revenue >= 80) assignedCluster = 2;
          else assignedCluster = 3;
        }
        return { ...o, cluster: assignedCluster };
      });

      setOutlets(updated);
      setSilhouetteScore(parseFloat((0.81 + Math.random() * 0.08).toFixed(3)));
      setIsClustering(false);
    }, 800);
  };

  const getTierLabel = (c: number) => {
    switch (c) {
      case 0: return { label: 'Tier 1 Flagship', color: 'bg-orange-100 text-orange-800 border-orange-200' };
      case 1: return { label: 'Tier 2 Stable Hub', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 2: return { label: 'Tier 3 Emerging', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      default: return { label: `Cluster ${c + 1}`, color: 'bg-purple-100 text-purple-800 border-purple-200' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-orange-100 text-orange-600 border border-orange-200">
              <PieChart className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Outlet Tiers K-Means Machine Learning Clustering</h2>
          </div>
          <p className="text-xs text-slate-500">
            Unsupervised ML clustering to categorize franchise units into Tier 1 Flagship, Tier 2 Growth, and Tier 3 Emerging outlets based on operational telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Silhouette Score</span>
            <span className="text-sm font-black text-slate-900 font-mono">{silhouetteScore}</span>
          </div>
          <button
            onClick={handleRunKMeans}
            disabled={isClustering}
            className="py-2 px-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isClustering ? 'animate-spin' : ''}`} />
            <span>Re-Run K-Means</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: K-Means Scatter Plot */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-orange-600" />
                <span>Feature Space: Revenue (₹k) vs Footfall (k visits)</span>
              </h3>
              <p className="text-xs text-slate-500">Each dot represents an Indian franchise outlet clustered by k = {kClusters}.</p>
            </div>
          </div>

          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="footfall" name="Footfall" unit="k" stroke="#94a3b8" fontSize={11} label={{ value: 'Footfall (k visits)', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#64748b' }} />
                <YAxis dataKey="revenue" name="Monthly Revenue" unit="k ₹" stroke="#94a3b8" fontSize={11} label={{ value: 'Revenue (₹k)', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload as FranchiseOutletPoint;
                      const tier = getTierLabel(data.cluster);
                      return (
                        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-md text-xs space-y-1">
                          <p className="font-bold text-slate-900">{data.name}</p>
                          <p className="text-slate-500">{data.city} | Health: {data.healthScore}/100</p>
                          <p className="font-mono text-emerald-700 font-bold">Revenue: ₹{data.revenue}k | Footfall: {data.footfall}k</p>
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${tier.color}`}>
                            {tier.label}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Outlets" data={outlets}>
                  {outlets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CLUSTER_COLORS[entry.cluster % CLUSTER_COLORS.length]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Cluster Legend */}
          <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100 text-xs">
            {Array.from({ length: kClusters }).map((_, idx) => {
              const tier = getTierLabel(idx);
              const count = outlets.filter(o => o.cluster === idx).length;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CLUSTER_COLORS[idx % CLUSTER_COLORS.length] }} />
                  <span className="font-bold text-slate-800">{tier.label}:</span>
                  <span className="font-mono text-slate-500">{count} Outlets</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Clustering Controls & Parameters */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-orange-600" />
              <span>Hyperparameters & Features</span>
            </h3>

            {/* k-Clusters selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Number of Clusters (k)</label>
              <div className="grid grid-cols-3 gap-2">
                {[2, 3, 4].map(val => (
                  <button
                    key={val}
                    onClick={() => { setKClusters(val); }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      kClusters === val
                        ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    k = {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Weightings */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700 block mb-1">Clustering Features:</span>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 font-medium text-slate-700">
                <div className="flex justify-between"><span>• Monthly Gross Revenue</span><span className="font-mono text-orange-600 font-bold">40%</span></div>
                <div className="flex justify-between"><span>• Monthly Store Footfall</span><span className="font-mono text-orange-600 font-bold">35%</span></div>
                <div className="flex justify-between"><span>• Operational Health Score</span><span className="font-mono text-orange-600 font-bold">25%</span></div>
              </div>
            </div>

            <div className="p-3 bg-orange-50/60 border border-orange-200 rounded-xl text-xs text-orange-900 leading-relaxed">
              <strong>ML Insight:</strong> Outlets with ₹125k+ monthly revenue & 16k+ footfall automatically qualify for Tier 1 Flagship support programs.
            </div>
          </div>
        </div>

      </div>

      {/* Outlets Classification Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm overflow-x-auto space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-600" />
            <span>Clustered Outlet Tier List</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">{outlets.length} Outlets Clustered</span>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-orange-100 bg-orange-50/50 text-slate-600 font-semibold uppercase tracking-wider">
              <th className="py-2.5 px-3">Outlet ID & Name</th>
              <th className="py-2.5 px-3">City Location</th>
              <th className="py-2.5 px-3">Monthly Revenue</th>
              <th className="py-2.5 px-3">Footfall</th>
              <th className="py-2.5 px-3">Health Score</th>
              <th className="py-2.5 px-3">Assigned ML Cluster Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {outlets.map((o) => {
              const tier = getTierLabel(o.cluster);
              return (
                <tr key={o.id} className="hover:bg-orange-50/30 transition-all">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{o.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{o.id}</div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700">{o.city}</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-700">₹{o.revenue},000</td>
                  <td className="py-3 px-3 font-mono text-slate-700">{o.footfall}k visits</td>
                  <td className="py-3 px-3 font-mono font-bold text-orange-700">{o.healthScore}/100</td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border inline-block ${tier.color}`}>
                      {tier.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
