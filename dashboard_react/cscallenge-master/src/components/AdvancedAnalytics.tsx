import React, { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, GitBranch, Globe, Database } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdvancedAnalytics: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Threats Predicted',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Anomalies Detected',
        data: [8, 15, 12, 17, 10, 20],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Intelligence Reports',
        data: [20, 25, 18, 30, 28, 35],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  });

  const [stats, setStats] = useState({
    predictiveAccuracy: 94.7,
    anomaliesDetected: 127,
    aiModels: 8,
    dataProcessed: 1.2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newDatasets = chartData.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.map(() => Math.floor(Math.random() * 30) + 5),
      }));

      setChartData(prevState => ({
        ...prevState,
        datasets: newDatasets,
      }));

      setStats({
        predictiveAccuracy: (Math.random() * 5 + 90).toFixed(1),
        anomaliesDetected: Math.floor(Math.random() * 50) + 100,
        aiModels: Math.floor(Math.random() * 3) + 7,
        dataProcessed: (Math.random() * 0.5 + 1).toFixed(1),
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
        text: 'Advanced Analytics Trends',
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Advanced Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <BarChart2 className="text-blue-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Predictive Accuracy</span>
            </div>
            <p className="text-2xl font-bold">{stats.predictiveAccuracy}%</p>
            <p className="text-sm text-gray-500">For threat predictions</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-green-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Anomalies Detected</span>
            </div>
            <p className="text-2xl font-bold">{stats.anomaliesDetected}</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <GitBranch className="text-purple-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">AI Models</span>
            </div>
            <p className="text-2xl font-bold">{stats.aiModels}</p>
            <p className="text-sm text-gray-500">In production</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Database className="text-yellow-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Data Processed</span>
            </div>
            <p className="text-2xl font-bold">{stats.dataProcessed} TB</p>
            <p className="text-sm text-gray-500">Daily average</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;