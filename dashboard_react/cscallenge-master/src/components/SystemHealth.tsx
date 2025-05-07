// SystemHealth.tsx
import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Server, Activity } from 'lucide-react';

const SystemHealth: React.FC = () => {
  const [stats, setStats] = useState({
    cpuUsage: 45,
    memoryUsage: 68,
    diskUsage: 75,
    networkLatency: 20,
    uptime: 99.99,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpuUsage: Math.floor(Math.random() * 20) + 40,
        memoryUsage: Math.floor(Math.random() * 20) + 60,
        diskUsage: Math.floor(Math.random() * 10) + 70,
        networkLatency: Math.floor(Math.random() * 10) + 15,
        uptime: 99.99,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Cpu className="mr-2 text-blue-500" />
          CPU Usage
        </h3>
        <p>{stats.cpuUsage}%</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <HardDrive className="mr-2 text-green-500" />
          Memory Usage
        </h3>
        <p>{stats.memoryUsage}%</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Server className="mr-2 text-purple-500" />
          Disk Usage
        </h3>
        <p>{stats.diskUsage}%</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Activity className="mr-2 text-yellow-500" />
          Network Latency
        </h3>
        <p>{stats.networkLatency} ms</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Activity className="mr-2 text-red-500" />
          System Uptime
        </h3>
        <p>{stats.uptime}%</p>
      </div>
    </div>
  );
};

export default SystemHealth;
