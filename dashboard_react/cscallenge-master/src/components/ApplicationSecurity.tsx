import React, { useState, useEffect } from 'react';
import { FileCode, Search, Shield, Zap } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ApplicationSecurity: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        data: [4, 8, 15, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const [stats, setStats] = useState({
    codeScanned: 1.2,
    vulnerabilitiesFound: 47,
    criticalIssues: 4,
    avgFixTime: 2.5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [
        Math.floor(Math.random() * 5) + 1,
        Math.floor(Math.random() * 10) + 5,
        Math.floor(Math.random() * 15) + 10,
        Math.floor(Math.random() * 20) + 15,
      ];

      setChartData(prevState => ({
        ...prevState,
        datasets: [{
          ...prevState.datasets[0],
          data: newData,
        }],
      }));

      setStats({
        codeScanned: (Math.random() * 0.5 + 1).toFixed(1),
        vulnerabilitiesFound: Math.floor(Math.random() * 30) + 30,
        criticalIssues: newData[0],
        avgFixTime: (Math.random() * 2 + 1).toFixed(1),
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
        text: 'Application Vulnerabilities by Severity',
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Application Security</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <FileCode className="text-blue-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Code Scanned</span>
            </div>
            <p className="text-2xl font-bold">{stats.codeScanned}M</p>
            <p className="text-sm text-gray-500">Lines of code</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Search className="text-green-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Vulnerabilities Found</span>
            </div>
            <p className="text-2xl font-bold">{stats.vulnerabilitiesFound}</p>
            <p className="text-sm text-gray-500">This week</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Shield className="text-red-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Critical Issues</span>
            </div>
            <p className="text-2xl font-bold">{stats.criticalIssues}</p>
            <p className="text-sm text-gray-500">Require immediate attention</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Zap className="text-yellow-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Avg. Fix Time</span>
            </div>
            <p className="text-2xl font-bold">{stats.avgFixTime}d</p>
            <p className="text-sm text-gray-500">For critical issues</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSecurity;