import React, { useState, useEffect } from 'react';
import { Network, Lock, Wifi, Shield, RefreshCw } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrafficAnalytics: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Blocked 5G/6G Attack Attempts',
        data: [1400, 2200, 3400, 5100, 4600, 3800],
        borderColor: 'rgb(255, 69, 0)',
        backgroundColor: 'rgba(255, 69, 0, 0.5)',
      },
      {
        label: 'Anomalies Detected in 5G/6G Bandwidth Usage',
        data: [8, 12, 10, 27, 18, 25],
        borderColor: 'rgb(34, 139, 34)',
        backgroundColor: 'rgba(34, 139, 34, 0.5)',
      },
    ],
  });

  const [stats, setStats] = useState({
    networkUptime: 99.97,
    secureConnections: 5420,
    bandwidthThreatLevel: 82,
    selfHealedIncidents: 19,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newBlockedAttempts = chartData.datasets[0].data.slice(1).concat(Math.floor(Math.random() * 3000) + 1500);
      const newAnomalies = chartData.datasets[1].data.slice(1).concat(Math.floor(Math.random() * 20) + 10);

      setChartData(prevState => ({
        ...prevState,
        datasets: [
          { ...prevState.datasets[0], data: newBlockedAttempts },
          { ...prevState.datasets[1], data: newAnomalies },
        ],
      }));

      setStats({
        networkUptime: (99.5 + Math.random()).toFixed(2),
        secureConnections: Math.floor(Math.random() * 1500) + 5000,
        bandwidthThreatLevel: Math.floor(Math.random() * 25) + 75,
        selfHealedIncidents: Math.floor(Math.random() * 15) + 10,
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
        text: '5G/6G Network Security Trends',
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">5G/6G Network Security</h2>
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
            <p className="text-sm text-gray-500">Current active sessions</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Wifi className="text-yellow-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Bandwidth Threat Level</span>
            </div>
            <p className="text-2xl font-bold">{stats.bandwidthThreatLevel}%</p>
            <p className="text-sm text-gray-500">Potential risk detected</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <RefreshCw className="text-purple-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Self-Healed Incidents</span>
            </div>
            <p className="text-2xl font-bold">{stats.selfHealedIncidents}</p>
            <p className="text-sm text-gray-500">Auto-resolved this month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficAnalytics;
