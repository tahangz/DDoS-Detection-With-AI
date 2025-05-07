import React from 'react';
import { Shield, AlertTriangle, Activity, CheckCircle } from 'lucide-react';

const Overview: React.FC = () => {
  const stats = [
    {
      name: 'Active Rules',
      value: '1,234',
      icon: Shield,
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Blocked Attempts',
      value: '45,678',
      icon: AlertTriangle,
      change: '-5%',
      changeType: 'negative',
    },
    {
      name: 'Traffic Volume',
      value: '2.3 TB',
      icon: Activity,
      change: '+8%',
      changeType: 'positive',
    },
    {
      name: 'System Health',
      value: '98%',
      icon: CheckCircle,
      change: '+2%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Overview</h2>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span
                    className={`font-medium ${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-gray-500"> from last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {/* Add activity items here */}
            <p className="text-gray-500">No recent activity to display</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            System Status
          </h3>
          <div className="space-y-4">
            {/* Add system status items here */}
            <p className="text-gray-500">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 