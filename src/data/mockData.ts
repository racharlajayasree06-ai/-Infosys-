import { StoreLocation, AgentInsight } from '../types';

export const MOCK_STORES: StoreLocation[] = [
  {
    id: 'store-101',
    name: 'Austin Downtown Flagship',
    city: 'Austin',
    state: 'TX',
    manager: 'Sarah Jenkins',
    healthScore: 96,
    monthlyRevenue: 142500,
    targetRevenue: 135000,
    royaltyDue: 7125,
    complianceRate: 98,
    inventoryStatus: 'Optimal',
    topSellingItem: 'Artisanal Cold Brew & Pastry Combo'
  },
  {
    id: 'store-102',
    name: 'Chicago Loop Central',
    city: 'Chicago',
    state: 'IL',
    manager: 'Marcus Vance',
    healthScore: 84,
    monthlyRevenue: 118000,
    targetRevenue: 125000,
    royaltyDue: 5900,
    complianceRate: 91,
    inventoryStatus: 'Low Stock',
    topSellingItem: 'Classic Espresso Roast (12oz)'
  },
  {
    id: 'store-103',
    name: 'Seattle Tech Hub',
    city: 'Seattle',
    state: 'WA',
    manager: 'Elena Rostova',
    healthScore: 92,
    monthlyRevenue: 165000,
    targetRevenue: 150000,
    royaltyDue: 8250,
    complianceRate: 95,
    inventoryStatus: 'Optimal',
    topSellingItem: 'Matcha Oat Latte'
  },
  {
    id: 'store-104',
    name: 'Miami Beach Boulevard',
    city: 'Miami',
    state: 'FL',
    manager: 'Carlos Mendez',
    healthScore: 78,
    monthlyRevenue: 98500,
    targetRevenue: 110000,
    royaltyDue: 4925,
    complianceRate: 86,
    inventoryStatus: 'Critical',
    topSellingItem: 'Iced Tropical Coconut Brew'
  }
];

export const MOCK_INSIGHTS: AgentInsight[] = [
  {
    id: 'ins-1',
    agent: 'Supply Chain',
    title: 'Predicted Coffee Bean Deficit at Miami Store',
    description: 'Current consumption velocity indicates Espresso Bean stock will drop below buffer in 48 hours. Auto-reorder recommended.',
    timestamp: '10 mins ago',
    severity: 'high',
    actionableStep: 'Approve expedited shipment from Regional Depot TX-2'
  },
  {
    id: 'ins-2',
    agent: 'Operations',
    title: 'Food Safety Audit Scheduled - Chicago Loop',
    description: 'Q3 Unannounced Compliance Audit window opens Monday. Pre-audit checklist compliance is currently at 91%.',
    timestamp: '1 hour ago',
    severity: 'medium',
    actionableStep: 'Run automated temperature log verification'
  },
  {
    id: 'ins-3',
    agent: 'Financial',
    title: 'Royalty Payment Auto-Reconciled',
    description: 'Austin Downtown achieved 105.5% target revenue. Royalty fee $7,125 calculated via standard 5% agreement.',
    timestamp: '3 hours ago',
    severity: 'low',
    actionableStep: 'View itemized breakdown report'
  },
  {
    id: 'ins-4',
    agent: 'Executive',
    title: 'Network-wide EBITDA Target Beat by 6.2%',
    description: 'Cost optimization algorithms across 4 regional units reduced raw ingredient wastage by $4,200 this week.',
    timestamp: '5 hours ago',
    severity: 'low'
  }
];
