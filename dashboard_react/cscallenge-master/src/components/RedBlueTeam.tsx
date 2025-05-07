import React, { useState, useEffect } from 'react';
import { Target, Shield, Zap, Activity } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RedBlueTeam: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: ['Penetration Testing', 'Defense Simulation', 'Exploit Generation', 'Threat Emulation', 'Incident Response', 'Risk Assessment'],
    datasets: [
      {
        label: 'Red Team Capabilities',
        data: [85, 70, 75, 80, 65, 90],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
      {
        label: 'Blue Team Capabilities',
        data: [75, 90, 65, 85, 95, 80],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  });

  const [stats, setStats] = useState({
    redTeamExercises: 12,
    blueTeamResponses: 28,
    avgDetectionTime: 4.5,
    securityPosture: 87,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newRedTeamData = chartData.datasets[0].data.map(() => Math.floor(Math.random() * 30) + 60);
      const newBlueTeamData = chartData.datasets[1].data.map(() => Math.floor(Math.random() * 30) + 60);

      setChartData(prevState => ({
        ...prevState,
        datasets: [
          { ...prevState.datasets[0], data: newRedTeamData },
          { ...prevState.datasets[1], data: newBlueTeamData },
        ],
      }));

      setStats({
        redTeamExercises: Math.floor(Math.random() * 5) + 10,
        blueTeamResponses: Math.floor(Math.random() * 10) + 20,
        avgDetectionTime: (Math.random() * 3 + 2).toFixed(1),
        securityPosture: Math.floor(Math.random() * 10) + 80,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Red Team vs Blue Team Capabilities',
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Red & Blue Team Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Radar data={chartData} options={chartOptions} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Target className="text-red-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Red Team Exercises</span>
            </div>
            <p className="text-2xl font-bold">{stats.redTeamExercises}</p>
            <p className="text-sm text-gray-500">Completed this quarter</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Shield className="text-blue-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Blue Team Responses</span>
            </div>
            <p className="text-2xl font-bold">{stats.blueTeamResponses}</p>
            <p className="text-sm text-gray-500">Successful mitigations</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Zap className="text-yellow-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Avg. Detection Time</span>
            </div>
            <p className="text-2xl font-bold">{stats.avgDetectionTime}m</p>
            <p className="text-sm text-gray-500">For simulated attacks</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Activity className="text-green-500" size={24} />
              <span className="text-sm font-semibold text-gray-500">Security Posture</span>
            </div>
            <p className="text-2xl font-bold">{stats.securityPosture}%</p>
            <p className="text-sm text-gray-500">Improvement since last assessment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedBlueTeam;