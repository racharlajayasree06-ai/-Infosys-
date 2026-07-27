import React, { useState } from 'react';
import { StoreLocation } from '../types';
import { Truck, PackageCheck, AlertCircle, ShoppingCart, Check, RefreshCcw } from 'lucide-react';

interface SupplyChainAgentProps {
  stores: StoreLocation[];
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  unit: string;
  status: 'Optimal' | 'Reorder Warning' | 'Critical Stockout';
  autoReorder: boolean;
}

export const SupplyChainAgent: React.FC<SupplyChainAgentProps> = ({ stores }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 'inv-1', name: 'Signature Espresso Roast Beans', category: 'Coffee Supply', currentStock: 48, minThreshold: 50, unit: 'lbs', status: 'Reorder Warning', autoReorder: true },
    { id: 'inv-2', name: 'Organic Oat Milk Cartons (1L)', category: 'Dairy & Alternatives', currentStock: 120, minThreshold: 40, unit: 'cartons', status: 'Optimal', autoReorder: true },
    { id: 'inv-3', name: 'Artisanal Cold Brew Syrup (750ml)', category: 'Syrups & Flavors', currentStock: 12, minThreshold: 20, unit: 'bottles', status: 'Critical Stockout', autoReorder: false },
    { id: 'inv-4', name: 'Eco-Friendly Hot Cups 12oz', category: 'Packaging', currentStock: 1400, minThreshold: 500, unit: 'units', status: 'Optimal', autoReorder: true },
    { id: 'inv-5', name: 'Matcha Green Tea Powder Grade A', category: 'Specialty Teas', currentStock: 18, minThreshold: 15, unit: 'tins', status: 'Optimal', autoReorder: false },
  ]);

  const [orderSentId, setOrderSentId] = useState<string | null>(null);

  const handleTriggerReorder = (item: InventoryItem) => {
    setOrderSentId(item.id);
    setTimeout(() => {
      setInventory(prev => prev.map(inv => inv.id === item.id ? { ...inv, currentStock: inv.currentStock + 50, status: 'Optimal' } : inv));
      setOrderSentId(null);
    }, 1200);
  };

  const toggleAutoReorder = (id: string) => {
    setInventory(prev => prev.map(inv => inv.id === id ? { ...inv, autoReorder: !inv.autoReorder } : inv));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Truck className="w-5 h-5 text-orange-600" />
            <h2 className="text-xl font-bold text-slate-900">Supply Chain & Inventory Agent</h2>
          </div>
          <p className="text-xs text-slate-500">
            Automated inventory depletion forecasting, depot auto-reordering, and supplier logistics.
          </p>
        </div>

        <div className="bg-orange-50 px-3.5 py-2 rounded-xl border border-orange-200 text-xs font-medium text-slate-700">
          Supplier Depot: <strong className="text-emerald-700 font-bold">TX-Central Hub Active</strong>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <PackageCheck className="w-5 h-5 text-orange-600" />
          <span>Real-time Franchise Stock Levels</span>
        </h3>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-orange-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-3">Item Description</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Stock Level</th>
              <th className="py-3 px-3">Threshold</th>
              <th className="py-3 px-3">Stock Status</th>
              <th className="py-3 px-3">Auto-Reorder</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-orange-50/30 transition-all">
                <td className="py-3.5 px-3 font-semibold text-slate-900">{item.name}</td>
                <td className="py-3.5 px-3 text-slate-500">{item.category}</td>
                <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                  {item.currentStock} {item.unit}
                </td>
                <td className="py-3.5 px-3 font-mono text-slate-500">
                  {item.minThreshold} {item.unit}
                </td>
                <td className="py-3.5 px-3">
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] border ${
                    item.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    item.status === 'Reorder Warning' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <button
                    onClick={() => toggleAutoReorder(item.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                      item.autoReorder
                        ? 'bg-orange-100 text-orange-800 border-orange-200 font-semibold'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {item.autoReorder ? '⚡ Enabled' : 'Disabled'}
                  </button>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <button
                    onClick={() => handleTriggerReorder(item)}
                    disabled={orderSentId === item.id}
                    className="py-1.5 px-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-xs transition-all flex items-center gap-1.5 ml-auto shadow-sm"
                  >
                    {orderSentId === item.id ? (
                      <>
                        <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
                        <span>Ordering...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
