// App.tsx
import React, { useState } from 'react';
import {
  Shield,
  Activity,
  Wifi,
  AlertTriangle,
  Plug,
  Cpu,
  Users,
  Database,
  MessageSquare,
  Share2,
} from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', icon: Shield, label: 'Overview' },
    { id: 'threat-monitoring', icon: AlertTriangle, label: 'Threat Monitoring' },
    { id: 'data-collection', icon: Database, label: 'Data Collection' },
    { id: 'traffic-analytics', icon: Wifi, label: 'Traffic Analytics' },
    { id: 'ai-models', icon: Cpu, label: 'AI Models' },
    { id: 'incident-response', icon: Users, label: 'Incident Response' },
    { id: 'collaboration', icon: Share2, label: 'Collaboration' },
    { id: 'security-integrations', icon: Plug, label: 'Security Integrations' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <Dashboard activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
};

export default App;
