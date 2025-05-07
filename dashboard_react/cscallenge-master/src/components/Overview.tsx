// Overview.tsx
import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle } from 'lucide-react';

interface OverviewData {
  alerts_today: number;
  active_threats: number;
  last_updated: string;
}

const Overview: React.FC = () => {
  const [stats, setStats] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/overview/')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch data:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <AlertTriangle className="mr-2 text-red-500" />
          Threat Summary
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : stats ? (
          <>
            <p>Alerts Today: {stats.alerts_today}</p>
            <p>Active Threats: {stats.active_threats}</p>
            <p>Last Updated: {new Date(stats.last_updated).toLocaleString()}</p>
          </>
        ) : (
          <p>Failed to load data.</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Activity className="mr-2 text-green-500" />
          System Health
        </h2>
        <p>System Uptime: 99.99%</p>
        <p>CPU Usage: 45%</p>
        <p>Memory Usage: 68%</p>
      </div>
    </div>
  );
};

export default Overview;
