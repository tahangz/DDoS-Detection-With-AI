// ThreatMonitoring.tsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { AlertTriangle } from 'lucide-react';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ThreatMonitoring: React.FC = () => {
  const [currentThreats, setCurrentThreats] = useState([
    { id: 1, type: 'DDoS Attack', severity: 'High', time: new Date().toLocaleTimeString() },
    { id: 2, type: 'SQL Injection', severity: 'Medium', time: new Date().toLocaleTimeString() },
  ]);

  const [threatData, setThreatData] = useState({
    labels: [] as Date[],
    datasets: [
      {
        label: 'Threats Over Time',
        data: [] as number[],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setThreatData((prevData) => {
        const labels = [...prevData.labels, now];
        const data = [...prevData.datasets[0].data, Math.floor(Math.random() * 10)];
        return {
          labels,
          datasets: [
            {
              ...prevData.datasets[0],
              data,
            },
          ],
        };
      });

      setCurrentThreats((prevThreats) => {
        const newThreat = {
          id: prevThreats.length + 1,
          type: 'Malware Detected',
          severity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          time: now.toLocaleTimeString(),
        };
        return [...prevThreats.slice(-4), newThreat];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'minute',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Threats Over Time',
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Threat Monitoring</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <Line data={threatData} options={chartOptions} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Current Threats</h3>
        <ul>
          {currentThreats.map((threat) => (
            <li key={threat.id} className="mb-2">
              <div className="flex items-center">
                <AlertTriangle
                  className={`mr-2 ${
                    threat.severity === 'High'
                      ? 'text-red-500'
                      : threat.severity === 'Medium'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                />
                <span>
                  {threat.type} - Severity: {threat.severity} - Detected at: {threat.time}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThreatMonitoring;
