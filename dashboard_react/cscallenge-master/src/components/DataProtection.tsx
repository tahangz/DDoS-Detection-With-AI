import React, { useState, useEffect } from 'react';
import { Lock, FileText, ShieldCheck, Eye, Database } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DataProtection: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: ['Protected', 'At Risk', 'Unknown'],
    datasets: [
      {
        data: [2345, 123, 45],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const [stats, setStats] = useState({
    protectedData: 2345,
    atRiskData: 123,
    complianceScore: 92,
    totalData: 2513,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newProtected = Math.floor(Math.random() * 500) + 2000;
      const newAtRisk = Math.floor(Math.random() * 100) + 50;
      const newUnknown = Math.floor(Math.random() * 50) + 20;

      setChartData(prevState => ({
        ...prevState,
        datasets: [{
          ...prevState.datasets[0],
          data: [newProtected, newAtRisk, newUnknown],
        }],
      }));

      setStats({
        protectedData: newProtected,
        atRiskData: newAtRisk,
        complianceScore: Math.floor(Math.random() * 10) + 85,
        totalData: newProtected + newAtRisk + newUnknown,
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
        text: 'Data Protection Status',
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Data Protection and Privacy</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Pie data={chartData} options={chartOptions} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Lock className="text-green-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Protected Data</span>
            </div>
            <p className="text-2xl font-bold">{stats.protectedData} GB</p>
            <p className="text-sm text-gray-500">Encrypted and secure</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-red-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">At Risk Data</span>
            </div>
            <p className="text-2xl font-bold">{stats.atRiskData} GB</p>
            <p className="text-sm text-gray-500">Needs attention</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <ShieldCheck className="text-blue-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Compliance Score</span>
            </div>
            <p className="text-2xl font-bold">{stats.complianceScore}%</p>
            <p className="text-sm text-gray-500">GDPR compliant</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Database className="text-purple-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Total Data</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalData} GB</p>
            <p className="text-sm text-gray-500">Managed by system</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataProtection;