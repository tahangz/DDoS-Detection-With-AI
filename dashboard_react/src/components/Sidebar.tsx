import React from 'react';
import { 
  LayoutDashboard, 
  Shield, 
  Activity, 
  Settings, 
  Users, 
  MessageSquare,
  BarChart2,
  AlertTriangle,
  Database,
  Bot
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const navigation = [
    { name: 'Overview', icon: LayoutDashboard, section: 'overview' },
    { name: 'Firewall Monitoring', icon: Shield, section: 'firewall' },
    { name: 'Threat Monitoring', icon: AlertTriangle, section: 'threats' },
    { name: 'Traffic Analytics', icon: Activity, section: 'traffic' },
    { name: 'System Health', icon: BarChart2, section: 'health' },
    { name: 'Security Integrations', icon: Shield, section: 'integrations' },
    { name: 'AI Agents', icon: Bot, section: 'ai' },
    { name: 'Chat Assistant', icon: MessageSquare, section: 'chat' },
    { name: 'Collaboration', icon: Users, section: 'collaboration' },
    { name: 'Incident Response', icon: AlertTriangle, section: 'incidents' },
    { name: 'Data Collection', icon: Database, section: 'data' },
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => onSectionChange(item.section)}
                className={`${
                  activeSection === item.section
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
              >
                <Icon
                  className={`${
                    activeSection === item.section ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                  } mr-3 flex-shrink-0 h-6 w-6`}
                />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
        <button
          className="flex-shrink-0 w-full group block"
          onClick={() => onSectionChange('settings')}
        >
          <div className="flex items-center">
            <Settings className="h-6 w-6 text-gray-400 group-hover:text-gray-300" />
            <span className="ml-3 text-sm font-medium text-gray-400 group-hover:text-gray-300">
              Settings
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 