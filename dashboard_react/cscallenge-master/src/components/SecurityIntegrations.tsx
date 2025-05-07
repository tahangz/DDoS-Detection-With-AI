// SecurityIntegrations.tsx
import React, { useState, useEffect } from 'react';
import { Plug, CheckCircle, XCircle } from 'lucide-react';

const SecurityIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState([
    { name: 'Intrusion Detection System (IDS)', status: 'Connected' },
    { name: 'Intrusion Prevention System (IPS)', status: 'Connected' },
    { name: 'Security Orchestration, Automation, and Response (SOAR)', status: 'Disconnected' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIntegrations((prevIntegrations) =>
        prevIntegrations.map((integration) => ({
          ...integration,
          status: Math.random() > 0.1 ? 'Connected' : 'Disconnected',
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Security Integrations</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul>
          {integrations.map((integration, index) => (
            <li key={index} className="flex items-center mb-4">
              <Plug className="mr-2 text-blue-500" />
              <span className="flex-1">{integration.name}</span>
              {integration.status === 'Connected' ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SecurityIntegrations;
