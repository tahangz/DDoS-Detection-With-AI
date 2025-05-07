import React, { useState } from 'react';
import {
  Shield,
  Activity,
  Settings,
  Users,
  MessageSquare,
  BarChart2,
  AlertTriangle,
  Database,
  Bot,
  Lock,
  Cpu,
} from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import ThreatMonitoring from './components/ThreatMonitoring';
import TrafficAnalytics from './components/TrafficAnalytics';
import SecurityIntegrations from './components/SecurityIntegrations';
import AIAgents from './components/AIAgents';
import Chat from './components/Chat';
import Collaboration from './components/Collaboration';
import IncidentResponse from './components/IncidentResponse';
import DataCollection from './components/DataCollection';
import TrafficAnalysis from './components/TrafficAnalysis';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'firewall':
        return <ThreatMonitoring />;
      case 'threats':
        return <ThreatMonitoring />;
      case 'traffic':
        return <TrafficAnalysis />;
      case 'health':
        return <Overview />;
      case 'integrations':
        return <SecurityIntegrations />;
      case 'ai':
        return <AIAgents />;
      case 'chat':
        return <Chat />;
      case 'collaboration':
        return <Collaboration />;
      case 'incidents':
        return <IncidentResponse />;
      case 'data':
        return <DataCollection />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App; 