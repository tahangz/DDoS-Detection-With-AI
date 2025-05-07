import React, { useState, useEffect } from 'react';
import { UserCheck, UserX, Activity, DollarSign } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserBehavior: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: ['Normal', 'Suspicious', 'Anomalous', 'Fraudulent'],
    datasets: [
      {
        data: [1850, 15, 11, 3],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const [stats, setStats] = useState({
    normalUsers: 1850,
    suspiciousUsers: 15,
    anomalousBehavior: 11,
    fraudAttempts: 3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [
        Math.floor(Math.random() * 2000) + 1500,
        Math.floor(Math.random() * 30),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 10),
      ];
      setChartData(prevState => ({
        ...prevState,
        datasets: [{
          ...prevState.datasets[0],
          data: newData,
        }],
      }));

      setStats({
        normalUsers: newData[0],
        suspiciousUsers: newData[1],
        anomalousBehavior: newData[2],
        fraudAttempts: newData[3],
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
        text: 'User Behavior Distribution',
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Behavior Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="text-green-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Normal Users</span>
            </div>
            <p className="text-2xl font-bold">{stats.normalUsers}</p>
            <p className="text-sm text-gray-500">No suspicious activity</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <UserX className="text-red-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Suspicious Users</span>
            </div>
            <p className="text-2xl font-bold">{stats.suspiciousUsers}</p>
            <p className="text-sm text-gray-500">Under investigation</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Activity className="text-blue-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Anomalous Behavior</span>
            </div>
            <p className="text-2xl font-bold">{stats.anomalousBehavior}</p>
            <p className="text-sm text-gray-500">Detected this week</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-yellow-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Fraud Attempts</span>
            </div>
            <p className="text-2xl font-bold">{stats.fraudAttempts}</p>
            <p className="text-sm text-gray-500">Prevented this month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBehavior;