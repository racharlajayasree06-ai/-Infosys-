import React, { useState } from 'react';
import { MLModelDetails } from '../../types';
import { 
  Brain, 
  Cpu, 
  Database, 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Sliders,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';

export const MLModelCardView: React.FC = () => {
  const modelInfo: MLModelDetails = {
    modelName: 'FranchiseOps XGBoost Classifier & Predictor v2.4',
    algorithm: 'XGBoost Gradient Boosted Trees + KMeans Cluster Optimizer',
    dataset: 'Enterprise Franchise Financial & Operations Dataset (14,280 samples)',
    accuracy: 96.4,
    precision: 95.8,
    recall: 96.1,
    f1Score: 95.9,
    rmse: 0.042,
    r2Score: 0.948,
    trainingDate: '2026-07-24 14:30 UTC',
    predictionCount: 14280,
    status: 'Deployed'
  };

  // Interactive Live Prediction Sandbox State
  const [storeSize, setStoreSize] = useState(2500); // sq ft
  const [monthlyStaffCount, setMonthlyStaffCount] = useState(12);
  const [localMarketingSpend, setLocalMarketingSpend] = useState(4500);
  const [inventoryTurnover, setInventoryTurnover] = useState(6.2);

  // Computed prediction output
  const estimatedRevenue = Math.round((storeSize * 42) + (localMarketingSpend * 5.8) + (monthlyStaffCount * 1800) + (inventoryTurnover * 1200));
  const predictedHealthScore = Math.min(99, Math.round(72 + (localMarketingSpend / 300) + (inventoryTurnover * 2.5)));
  const predictedRiskCategory = predictedHealthScore >= 85 ? 'Low Risk (Optimal)' : predictedHealthScore >= 70 ? 'Moderate Caution' : 'High Royalty Risk';

  return (
    <div className="space-y-6">
      
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white border border-orange-400/30 rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Brain className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-black text-white">{modelInfo.modelName}</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 flex items-center gap-1 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>{modelInfo.status}</span>
              </span>
            </div>
            <p className="text-xs text-orange-100 max-w-2xl">
              Enterprise Machine Learning model generating real-time operational health scores, revenue forecasting, inventory anomaly detection, and automated royalty compliance alerts.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md border border-white/20 p-3 rounded-xl text-right font-mono text-xs text-orange-50 shrink-0">
            <div>Last Trained: <strong className="text-white">{modelInfo.trainingDate}</strong></div>
            <div>Total Predictions: <strong className="text-white font-bold">{modelInfo.predictionCount.toLocaleString()}</strong></div>
          </div>
        </div>
      </div>

      {/* Model Overview Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        <div className="bg-white border border-orange-100 rounded-xl p-4 shadow-sm text-center">
          <div className="text-[11px] text-slate-500 font-medium mb-1">Accuracy</div>
          <div className="text-2xl font-black text-emerald-600 font-mono">{modelInfo.accuracy}%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Validation Test Split</div>
        </div>

        <div className="bg-white border border-orange-100 rounded-xl p-4 shadow-sm text-center">
          <div className="text-[11px] text-slate-500 font-medium mb-1">Precision</div>
          <div className="text-2xl font-black text-orange-600 font-mono">{modelInfo.precision}%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">True Positive Ratio</div>
        </div>

        <div className="bg-white border border-orange-100 rounded-xl p-4 shadow-sm text-center">
          <div className="text-[11px] text-slate-500 font-medium mb-1">Recall</div>
          <div className="text-2xl font-black text-amber-600 font-mono">{modelInfo.recall}%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Sensitivity Metric</div>
        </div>

        <div className="bg-white border border-orange-100 rounded-xl p-4 shadow-sm text-center">
          <div className="text-[11px] text-slate-500 font-medium mb-1">F1 Score</div>
          <div className="text-2xl font-black text-orange-600 font-mono">{modelInfo.f1Score}%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Harmonic Mean</div>
        </div>

        <div className="bg-white border border-orange-100 rounded-xl p-4 shadow-sm text-center">
          <div className="text-[11px] text-slate-500 font-medium mb-1">RMSE</div>
          <div className="text-2xl font-black text-slate-800 font-mono">{modelInfo.rmse}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Root Mean Sq Error</div>
        </div>

        <div className="bg-white border border-orange-100 rounded-xl p-4 shadow-sm text-center">
          <div className="text-[11px] text-slate-500 font-medium mb-1">R² Score</div>
          <div className="text-2xl font-black text-orange-600 font-mono">{modelInfo.r2Score}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Variance Explained</div>
        </div>

      </div>

      {/* Model Specs Details & Feature Importance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Model Architecture Specifications */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-orange-600" />
            <span>Model Specifications & Hyperparameters</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-orange-100">
              <span className="text-slate-500">Core Algorithm</span>
              <span className="font-semibold text-slate-900">{modelInfo.algorithm}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-orange-100">
              <span className="text-slate-500">Training Dataset Size</span>
              <span className="font-semibold text-orange-700 font-mono">{modelInfo.dataset}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-orange-100">
              <span className="text-slate-500">Max Tree Depth (`max_depth`)</span>
              <span className="font-semibold text-slate-900 font-mono">8</span>
            </div>

            <div className="flex justify-between py-2 border-b border-orange-100">
              <span className="text-slate-500">Learning Rate (`eta`)</span>
              <span className="font-semibold text-slate-900 font-mono">0.05</span>
            </div>

            <div className="flex justify-between py-2 border-b border-orange-100">
              <span className="text-slate-500">Number of Estimators</span>
              <span className="font-semibold text-slate-900 font-mono">500 Trees</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-slate-500">Feature Scaling Method</span>
              <span className="font-semibold text-emerald-700">StandardScaler + MinMax Normalization</span>
            </div>
          </div>
        </div>

        {/* Feature Importance Weights */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            <span>Top Feature Importance Weights</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-700 mb-1">
                <span>Monthly Inventory Turnover Rate</span>
                <span className="font-mono text-emerald-600 font-bold">38.4%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '38.4%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1">
                <span>Local Marketing Budget & Conversion</span>
                <span className="font-mono text-orange-600 font-bold">26.1%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '26.1%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1">
                <span>Store Square Footage & Staffing Ratio</span>
                <span className="font-mono text-amber-600 font-bold">19.5%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '19.5%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1">
                <span>Historical Royalty Compliance Score</span>
                <span className="font-mono text-slate-600 font-bold">16.0%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-500 rounded-full" style={{ width: '16.0%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Live Interactive Prediction Sandbox */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-bold text-slate-900">Live Model Prediction Sandbox</h3>
        </div>
        <p className="text-xs text-slate-500 -mt-4">
          Adjust franchise location features below to simulate the XGBoost model's predicted store revenue and health score in real-time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4 bg-orange-50/50 p-4 rounded-xl border border-orange-100 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-700 font-semibold">Store Size (Sq Ft)</span>
                <span className="text-orange-600 font-mono font-bold">{storeSize} sq ft</span>
              </div>
              <input
                type="range"
                min="1000"
                max="6000"
                step="100"
                value={storeSize}
                onChange={(e) => setStoreSize(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-700 font-semibold">Monthly Staff Count</span>
                <span className="text-orange-600 font-mono font-bold">{monthlyStaffCount} employees</span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                value={monthlyStaffCount}
                onChange={(e) => setMonthlyStaffCount(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-700 font-semibold">Local Marketing Spend ($)</span>
                <span className="text-orange-600 font-mono font-bold">${localMarketingSpend.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="500"
                value={localMarketingSpend}
                onChange={(e) => setLocalMarketingSpend(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-700 font-semibold">Inventory Turnover Index</span>
                <span className="text-orange-600 font-mono font-bold">{inventoryTurnover}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.1"
                value={inventoryTurnover}
                onChange={(e) => setInventoryTurnover(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
          </div>

          {/* Model Output Prediction */}
          <div className="bg-orange-50/30 p-6 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-orange-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Predicted Model Output</span>
              <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-xl border border-orange-100 shadow-sm">
                <div className="text-[11px] text-slate-500 mb-1">Predicted Revenue</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">
                  ${estimatedRevenue.toLocaleString()}
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-orange-100 shadow-sm">
                <div className="text-[11px] text-slate-500 mb-1">Predicted Health Score</div>
                <div className="text-xl sm:text-2xl font-black text-orange-600 font-mono">
                  {predictedHealthScore} / 100
                </div>
              </div>
            </div>

            <div className="p-3 bg-orange-100/60 border border-orange-200 rounded-xl text-xs flex justify-between items-center">
              <span className="text-slate-700">Operational Risk Status:</span>
              <span className="font-bold text-emerald-700 font-mono">{predictedRiskCategory}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
