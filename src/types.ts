export type EnterpriseRole = 
  | 'Franchise Owner'
  | 'Regional Operations Manager'
  | 'Store Manager'
  | 'Supply Chain Analyst'
  | 'Admin';

export interface User {
  id?: string;
  username: string;
  email: string;
  passwordHash: string;
  securityQuestion: string;
  securityAnswerHash: string;
  role: EnterpriseRole;
  createdAt: string;
  failedAttempts: number;
  lockUntilTimestamp: number | null; // epoch timestamp in ms
  status: 'Active' | 'Locked';
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  manager: string;
  healthScore: number;
  monthlyRevenue: number;
  targetRevenue: number;
  royaltyDue: number;
  complianceRate: number;
  inventoryStatus: 'Optimal' | 'Low Stock' | 'Critical';
  topSellingItem: string;
}

export interface AgentInsight {
  id: string;
  agent: 'Operations' | 'Supply Chain' | 'Financial' | 'Executive';
  title: string;
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  actionableStep?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  agentName?: string;
  text: string;
  timestamp: string;
}

export interface MLModelDetails {
  modelName: string;
  algorithm: string;
  dataset: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rmse: number;
  r2Score: number;
  trainingDate: string;
  predictionCount: number;
  status: 'Deployed' | 'Training' | 'Deprecated';
}

export interface AnalyticsMetric {
  date: string;
  registrations: number;
  predictions: number;
  loginActivity: number;
  failedAttempts: number;
}
