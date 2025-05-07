import React from 'react';
import { Database, Activity, FileText, Download } from 'lucide-react';

const DataCollection: React.FC = () => {
  const dataSources = [
    {
      name: 'Firewall Logs',
      type: 'Logs',
      size: '2.3 GB',
      lastUpdated: '2024-03-20 14:30:00',
      status: 'Active',
    },
    {
      name: 'Network Traffic',
      type: 'Packet Capture',
      size: '5.7 GB',
      lastUpdated: '2024-03-20 14:25:00',
      status: 'Active',
    },
    {
      name: 'System Events',
      type: 'Events',
      size: '1.2 GB',
      lastUpdated: '2024-03-20 14:20:00',
      status: 'Active',
    },
    {
      name: 'Security Alerts',
      type: 'Alerts',
      size: '0.8 GB',
      lastUpdated: '2024-03-20 14:15:00',
      status: 'Active',
    },
  ];

  const collectionStats = [
    {
      name: 'Total Data',
      value: '10 GB',
      change: '+15%',
      changeType: 'increase',
    },
    {
      name: 'Data Sources',
      value: '4',
      change: '+1',
      changeType: 'increase',
    },
    {
      name: 'Collection Rate',
      value: '1.2 GB/day',
      change: '+0.3 GB',
      changeType: 'increase',
    },
    {
      name: 'Storage Used',
      value: '75%',
      change: '+5%',
      changeType: 'increase',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Collection</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {collectionStats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <Database className="h-6 w-6 text-blue-600" />
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'increase'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">from last week</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Data Sources</h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataSources.map((source, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {source.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {source.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {source.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {source.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {source.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Download className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Collection Schedule</h3>
          </div>
          <div className="border-t border-gray-200 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-900">Firewall Logs</span>
                </div>
                <span className="text-sm text-gray-500">Every 5 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-900">Network Traffic</span>
                </div>
                <span className="text-sm text-gray-500">Every 15 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-900">System Events</span>
                </div>
                <span className="text-sm text-gray-500">Every 10 minutes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Storage Usage</h3>
          </div>
          <div className="border-t border-gray-200 p-4">
            <div className="space-y-4">
              {dataSources.map((source, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{source.name}</span>
                    <span className="text-gray-900">{source.size}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(parseFloat(source.size) / 10) * 100}%`,
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

export default DataCollection; 