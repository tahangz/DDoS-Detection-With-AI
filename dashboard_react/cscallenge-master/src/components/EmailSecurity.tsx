import React, { useState, useEffect } from 'react';
import { Mail, AlertTriangle, Shield, FileText } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmailSecurity: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: ['Spam', 'Phishing', 'Malware', 'Legitimate'],
    datasets: [
      {
        label: 'Email Classification',
        data: [1050, 87, 97, 9766],
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const [stats, setStats] = useState({
    totalEmails: 11000,
    threatsBlocked: 184,
    phishingDetection: 99.7,
    attachmentsScanned: 3245,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [
        Math.floor(Math.random() * 500) + 800,
        Math.floor(Math.random() * 50) + 50,
        Math.floor(Math.random() * 50) + 50,
        Math.floor(Math.random() * 2000) + 8000,
      ];

      setChartData(prevState => ({
        ...prevState,
        datasets: [{
          ...prevState.datasets[0],
          data: newData,
        }],
      }));

      setStats({
        totalEmails: newData.reduce((a, b) => a + b, 0),
        threatsBlocked: Math.floor(Math.random() * 100) + 100,
        phishingDetection: (99 + Math.random()).toFixed(1),
        attachmentsScanned: Math.floor(Math.random() * 1000) + 2500,
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
        text: 'Email Security Analysis',
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Email Security</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Mail className="text-blue-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Total Emails</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalEmails}</p>
            <p className="text-sm text-gray-500">Processed today</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="text-red-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Threats Blocked</span>
            </div>
            <p className="text-2xl font-bold">{stats.threatsBlocked}</p>
            <p className="text-sm text-gray-500">In the last 24 hours</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Shield className="text-green-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Phishing Detection</span>
            </div>
            <p className="text-2xl font-bold">{stats.phishingDetection}%</p>
            <p className="text-sm text-gray-500">Accuracy rate</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <FileText className="text-yellow-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Attachments Scanned</span>
            </div>
            <p className="text-2xl font-bold">{stats.attachmentsScanned}</p>
            <p className="text-sm text-gray-500">Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSecurity;