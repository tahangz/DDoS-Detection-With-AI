// DataCollection.tsx
import React, { useState, useEffect } from 'react';
import { Server } from 'lucide-react';

const DataCollection: React.FC = () => {
  const [dataSources, setDataSources] = useState([
    { name: 'Security Logs', status: 'Collecting' },
    { name: 'Network Traffic', status: 'Collecting' },
    { name: 'Endpoint Devices', status: 'Collecting' },
    { name: 'Threat Intelligence Feeds', status: 'Collecting' },
  ]);

  useEffect(() => {
    // Simulate data source status changes
    const interval = setInterval(() => {
      setDataSources((prevSources) =>
        prevSources.map((source) => ({
          ...source,
          status: Math.random() > 0.95 ? 'Disconnected' : 'Collecting',
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Data Collection</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul>
          {dataSources.map((source, index) => (
            <li key={index} className="flex items-center mb-4">
              <Server className="mr-2 text-blue-500" />
              <span className="flex-1">{source.name}</span>
              <span
                className={`text-sm ${
                  source.status === 'Collecting' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {source.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataCollection;
