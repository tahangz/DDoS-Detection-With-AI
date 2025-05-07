import React, { useState, useEffect } from 'react';
import { Bot, Shield, Zap, GitBranch } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const AutoMLDashboard: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: ['Data Preprocessing', 'Feature Engineering', 'Model Optimization', 'Hyperparameter Tuning', 'Deployment Readiness'],
    datasets: [
      {
        label: 'AutoML Performance',
        data: [78, 85, 92, 88, 95],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  });

  const [stats, setStats] = useState({
    activePipelines: 16,
    modelsTrained: 142,
    avgTrainingTime: 2.5,
    productionModels: 6,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = Array(5).fill(0).map(() => Math.floor(Math.random() * 30) + 70);
      setChartData(prevState => ({
        ...prevState,
        datasets: [{
          ...prevState.datasets[0],
          data: newData,
        }],
      }));

      setStats({
        activePipelines: Math.floor(Math.random() * 5) + 15,
        modelsTrained: Math.floor(Math.random() * 40) + 120,
        avgTrainingTime: (Math.random() * 2 + 1.5).toFixed(1),
        productionModels: Math.floor(Math.random() * 2) + 5,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'AutoML Performance Metrics',
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">AutoML System Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Radar data={chartData} options={chartOptions} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Bot className="text-blue-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Active Pipelines</span>
            </div>
            <p className="text-2xl font-bold">{stats.activePipelines}</p>
            <p className="text-sm text-gray-500">Running Automations</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Shield className="text-green-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Models Trained</span>
            </div>
            <p className="text-2xl font-bold">{stats.modelsTrained}</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Zap className="text-yellow-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Avg Training Time</span>
            </div>
            <p className="text-2xl font-bold">{stats.avgTrainingTime}s</p>
            <p className="text-sm text-gray-500">Per Model</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <GitBranch className="text-purple-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Production Models</span>
            </div>
            <p className="text-2xl font-bold">{stats.productionModels}</p>
            <p className="text-sm text-gray-500">Currently Deployed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoMLDashboard;
