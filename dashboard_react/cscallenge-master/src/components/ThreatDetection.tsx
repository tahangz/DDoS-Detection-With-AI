// src/components/ThreatDetection.tsx

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Zap, Wifi, Cloud, Target } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ThreatDetection: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [
      'Intrusions',
      'Malware',
      'Zero-Day',
      'IoT Threats',
      'Cloud Anomalies',
      'Honeypot Attacks',
    ],
    datasets: [
      {
        label: 'Detected Threats',
        data: [3, 5, 2, 8, 4, 8],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const [stats, setStats] = useState({
    networkIntrusions: 3,
    malwareBlocked: 5,
    zeroDay: 2,
    iotThreats: 8,
    cloudAnomalies: 4,
    honeypotAttacks: 8,
    f1Score: 99.8,
    modelAccuracy: 99.8,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = Array(6)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10) + 1);
      setChartData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: newData,
          },
        ],
      }));

      setStats({
        networkIntrusions: newData[0],
        malwareBlocked: newData[1],
        zeroDay: newData[2],
        iotThreats: newData[3],
        cloudAnomalies: newData[4],
        honeypotAttacks: newData[5],
        f1Score: parseFloat((99 + Math.random()).toFixed(1)),
        modelAccuracy: parseFloat((99 + Math.random()).toFixed(1)),
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
        text: 'Threat Detection Overview',
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Threat Detection and Prevention</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="text-red-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">
                Network Intrusions
              </span>
            </div>
            <p className="text-2xl font-bold">{stats.networkIntrusions}</p>
            <p className="text-sm text-gray-500">Detected in last 24h</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Shield className="text-blue-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">
                Malware Blocked
              </span>
            </div>
            <p className="text-2xl font-bold">{stats.malwareBlocked}</p>
            <p className="text-sm text-gray-500">In the past week</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Zap className="text-yellow-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">
                Zero-Day Threats
              </span>
            </div>
            <p className="text-2xl font-bold">{stats.zeroDay}</p>
            <p className="text-sm text-gray-500">Identified this month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Wifi className="text-green-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">IoT Threats</span>
            </div>
            <p className="text-2xl font-bold">{stats.iotThreats}</p>
            <p className="text-sm text-gray-500">Mitigated in last 30 days</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Cloud className="text-purple-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">
                Cloud Anomalies
              </span>
            </div>
            <p className="text-2xl font-bold">{stats.cloudAnomalies}</p>
            <p className="text-sm text-gray-500">Detected and resolved</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Target className="text-orange-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">
                Honeypot Attacks
              </span>
            </div>
            <p className="text-2xl font-bold">{stats.honeypotAttacks}</p>
            <p className="text-sm text-gray-500">Recorded this week</p>
          </div>
          {/* Additional Metrics */}
          <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
            <div className="flex items-center justify-between mb-2">
              <Shield className="text-green-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">F1-Score</span>
            </div>
            <p className="text-2xl font-bold">{stats.f1Score}%</p>
            <p className="text-sm text-gray-500">Model Performance</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
            <div className="flex items-center justify-between mb-2">
              <Shield className="text-blue-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Model Accuracy</span>
            </div>
            <p className="text-2xl font-bold">{stats.modelAccuracy}%</p>
            <p className="text-sm text-gray-500">Overall Accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatDetection;
