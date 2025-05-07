// server/index.ts
import express from 'express';
import cors from 'cors';
import { FirewallRule } from '../src/api/firewall';

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for firewall rules
let firewallRules: FirewallRule[] = [
  {
    id: 1,
    name: 'Allow HTTP Traffic',
    action: 'allow',
    protocol: 'TCP',
    source: '0.0.0.0/0',
    destination: '80',
    status: 'active',
  },
  {
    id: 2,
    name: 'Allow HTTPS Traffic',
    action: 'allow',
    protocol: 'TCP',
    source: '0.0.0.0/0',
    destination: '443',
    status: 'active',
  },
  {
    id: 3,
    name: 'Block Suspicious IPs',
    action: 'deny',
    protocol: 'ALL',
    source: '192.168.1.100',
    destination: '0.0.0.0/0',
    status: 'active',
  },
];

// Simulated traffic counters
let blockedAttempts = 0;
let allowedTraffic = 0;

// Update traffic counters periodically
setInterval(() => {
  blockedAttempts += Math.floor(Math.random() * 10);
  allowedTraffic += Math.floor(Math.random() * 100);
}, 5000);

// API Routes
app.get('/api/firewall/stats', (req, res) => {
  const activeRules = firewallRules.filter(rule => rule.status === 'active').length;
  
  res.json({
    totalRules: firewallRules.length,
    activeRules,
    blockedAttempts,
    allowedTraffic,
    rules: firewallRules,
  });
});

app.post('/api/firewall/rules', (req, res) => {
  const newRule: Omit<FirewallRule, 'id'> = req.body;
  const id = Math.max(...firewallRules.map(rule => rule.id)) + 1;
  
  const rule: FirewallRule = {
    id,
    ...newRule,
  };
  
  firewallRules.push(rule);
  res.status(201).json(rule);
});

app.patch('/api/firewall/rules/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;
  
  const ruleIndex = firewallRules.findIndex(rule => rule.id === id);
  if (ruleIndex === -1) {
    return res.status(404).json({ error: 'Rule not found' });
  }
  
  firewallRules[ruleIndex] = {
    ...firewallRules[ruleIndex],
    ...updates,
  };
  
  res.json(firewallRules[ruleIndex]);
});

app.delete('/api/firewall/rules/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  const ruleIndex = firewallRules.findIndex(rule => rule.id === id);
  if (ruleIndex === -1) {
    return res.status(404).json({ error: 'Rule not found' });
  }
  
  firewallRules.splice(ruleIndex, 1);
  res.status(204).send();
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 