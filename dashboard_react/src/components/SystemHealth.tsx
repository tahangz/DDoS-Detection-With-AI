import React from 'react';
import { Activity, Cpu, HardDrive, Server } from 'lucide-react';

const SystemHealth: React.FC = () => {
  const systemMetrics = [
    {
      name: 'CPU Usage',
      value: '45%',
      icon: Cpu,
      status: 'healthy',
    },
    {
      name: 'Memory Usage',
      value: '62%',
      icon: Activity,
      status: 'warning',
    },
    {
      name: 'Disk Usage',
      value: '78%',
      icon: HardDrive,
      status: 'warning',
    },
    {
      name: 'Network Load',
      value: '35%',
      icon: Server,
      status: 'healthy',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">System Health</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {systemMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <Icon className={`h-6 w-6 ${getStatusColor(metric.status)}`} />
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">System Status</h3>
          </div>
          <div className="border-t border-gray-200 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Cpu className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-900">CPU Temperature</span>
                </div>
                <span className="text-sm text-gray-500">45°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-900">Memory Available</span>
                </div>
                <span className="text-sm text-gray-500">7.2 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HardDrive className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-900">Disk Space Free</span>
                </div>
                <span className="text-sm text-gray-500">256 GB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Resource Usage</h3>
          </div>
          <div className="border-t border-gray-200 p-4">
            <div className="space-y-4">
              {systemMetrics.map((metric) => (
                <div key={metric.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{metric.name}</span>
                    <span className="text-gray-900">{metric.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metric.status === 'healthy'
                          ? 'bg-green-600'
                          : metric.status === 'warning'
                          ? 'bg-yellow-600'
                          : 'bg-red-600'
                      }`}
                      style={{
                        width: metric.value,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth; 