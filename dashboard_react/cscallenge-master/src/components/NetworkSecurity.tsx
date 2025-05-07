import React, { useState, useEffect } from 'react';
import { Network, Lock, Wifi, Shield, RefreshCw } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NetworkSecurity: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Blocked Attempts',
        data: [1200, 1900, 3000, 5000, 4200, 3000],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Self-Healed Issues',
        data: [10, 15, 8, 25, 18, 23],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  const [stats, setStats] = useState({
    networkUptime: 99.99,
    secureConnections: 3245,
    bandwidthUsage: 78,
    selfHealedIssues: 23,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newBlockedAttempts = chartData.datasets[0].data.slice(1).concat(Math.floor(Math.random() * 3000) + 1000);
      const newSelfHealedIssues = chartData.datasets[1].data.slice(1).concat(Math.floor(Math.random() * 20) + 5);

      setChartData(prevState => ({
        ...prevState,
        datasets: [
          { ...prevState.datasets[0], data: newBlockedAttempts },
          { ...prevState.datasets[1], data: newSelfHealedIssues },
        ],
      }));

      setStats({
        networkUptime: (99 + Math.random()).toFixed(2),
        secureConnections: Math.floor(Math.random() * 1000) + 3000,
        bandwidthUsage: Math.floor(Math.random() * 20) + 70,
        selfHealedIssues: Math.floor(Math.random() * 10) + 15,
      });
    }, 5000);

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
        text: 'Network Security Trends',
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Network Security</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Network className="text-blue-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Network Uptime</span>
            </div>
            <p className="text-2xl font-bold">{stats.networkUptime}%</p>
            <p className="text-sm text-gray-500">Last 30 days</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Lock className="text-green-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Secure Connections</span>
            </div>
            <p className="text-2xl font-bold">{stats.secureConnections}</p>
            <p className="text-sm text-gray-500">Active now</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Wifi className="text-yellow-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Bandwidth Usage</span>
            </div>
            <p className="text-2xl font-bold">{stats.bandwidthUsage}%</p>
            <p className="text-sm text-gray-500">Of total capacity</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <RefreshCw className="text-purple-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Self-Healed Issues</span>
            </div>
            <p className="text-2xl font-bold">{stats.selfHealedIssues}</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSecurity;