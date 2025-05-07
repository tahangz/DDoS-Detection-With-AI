// Dashboard.tsx
import React from 'react';
import Overview from './Overview';
import ThreatMonitoring from './ThreatMonitoring';
import SystemHealth from './SystemHealth';
import TrafficAnalytics from './TrafficAnalytics';
import SecurityIntegrations from './SecurityIntegrations';
import AutoMLDashboard from './AIAgents';
import ChatAssistant from './Chat';
import NLPAnalysis from './NLPAnalysis';
import Collaboration from './Collaboration';
import IncidentResponse from './IncidentResponse';
import DataCollection from './DataCollection';

interface DashboardProps {
  activeTab: string;
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'threat-monitoring':
        return <ThreatMonitoring />;
      case 'data-collection':
          return <DataCollection />;
      case 'traffic-analytics':
        return <TrafficAnalytics />;
      case 'ai-models':
        return <AutoMLDashboard />;
      case 'incident-response':
        return <IncidentResponse />;
      case 'nlp-analysis':
        return <ChatAssistant />;
      case 'collaboration':
        return <Collaboration />;
      case 'security-integrations':
        return <SecurityIntegrations />;
      default:
        return <Overview />;
    }
  };

  return <div className="h-full">{renderContent()}</div>;
};

export default Dashboard;
