import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface FirewallStats {
  totalRules: number;
  activeRules: number;
  blockedAttempts: number;
  allowedTraffic: number;
  rules: FirewallRule[];
}

export interface FirewallRule {
  id: number;
  name: string;
  action: 'allow' | 'deny';
  protocol: string;
  source: string;
  destination: string;
  status: 'active' | 'inactive';
}

export const getFirewallStats = async (): Promise<FirewallStats> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/firewall/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching firewall stats:', error);
    throw error;
  }
};

export const updateFirewallRule = async (ruleId: number, updates: Partial<FirewallRule>): Promise<FirewallRule> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/firewall/rules/${ruleId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating firewall rule:', error);
    throw error;
  }
};

export const createFirewallRule = async (rule: Omit<FirewallRule, 'id'>): Promise<FirewallRule> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/firewall/rules`, rule);
    return response.data;
  } catch (error) {
    console.error('Error creating firewall rule:', error);
    throw error;
  }
};

export const deleteFirewallRule = async (ruleId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/firewall/rules/${ruleId}`);
  } catch (error) {
    console.error('Error deleting firewall rule:', error);
    throw error;
  }
}; 