// FirewallMonitoring.tsx
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Lock, Wifi } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getFirewallStats, FirewallRule, FirewallStats } from '../api/firewall';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FirewallMonitoring: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Blocked Attempts',
        data: [] as number[],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Allowed Traffic',
        data: [] as number[],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  });

  const [stats, setStats] = useState<FirewallStats>({
    totalRules: 0,
    activeRules: 0,
    blockedAttempts: 0,
    allowedTraffic: 0,
    rules: [],
  });

  useEffect(() => {
    const fetchFirewallData = async () => {
      try {
        const data = await getFirewallStats();
        setStats(data);

        // Update chart data
        const now = new Date().toLocaleTimeString();
        setChartData(prevData => ({
          labels: [...prevData.labels.slice(-11), now],
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data.slice(-11), data.blockedAttempts],
            },
            {
              ...prevData.datasets[1],
              data: [...prevData.datasets[1].data.slice(-11), data.allowedTraffic],
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching firewall data:', error);
      }
    };

    // Initial fetch
    fetchFirewallData();

    // Set up polling interval
    const interval = setInterval(fetchFirewallData, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Firewall Traffic Analysis',
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Firewall Monitoring</h2>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Shield className="text-blue-500" size={24} />
            <span className="text-sm font-semibold text-gray-500">Total Rules</span>
          </div>
          <p className="text-2xl font-bold">{stats.totalRules}</p>
          <p className="text-sm text-gray-500">Configured rules</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Lock className="text-green-500" size={24} />
            <span className="text-sm font-semibold text-gray-500">Active Rules</span>
          </div>
          <p className="text-2xl font-bold">{stats.activeRules}</p>
          <p className="text-sm text-gray-500">Currently enforced</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="text-red-500" size={24} />
            <span className="text-sm font-semibold text-gray-500">Blocked Attempts</span>
          </div>
          <p className="text-2xl font-bold">{stats.blockedAttempts}</p>
          <p className="text-sm text-gray-500">Last 24 hours</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Wifi className="text-purple-500" size={24} />
            <span className="text-sm font-semibold text-gray-500">Allowed Traffic</span>
          </div>
          <p className="text-2xl font-bold">{stats.allowedTraffic}</p>
          <p className="text-sm text-gray-500">Last 24 hours</p>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Firewall Rules Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Active Firewall Rules</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.rules.map((rule) => (
                <tr key={rule.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      rule.action === 'allow' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {rule.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.protocol}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      rule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {rule.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FirewallMonitoring; 