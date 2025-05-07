// IncidentResponse.tsx
import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

const IncidentResponse: React.FC = () => {
  const [incidents, setIncidents] = useState([
    { id: 1, type: 'DDoS Attack', status: 'Mitigated', time: new Date().toLocaleTimeString() },
    { id: 2, type: 'Phishing Email', status: 'Pending', time: new Date().toLocaleTimeString() },
  ]);

  useEffect(() => {
    // Simulate incident updates
    const interval = setInterval(() => {
      const newIncident = {
        id: incidents.length + 1,
        type: 'Unauthorized Access Attempt',
        status: 'In Progress',
        time: new Date().toLocaleTimeString(),
      };
      setIncidents((prevIncidents) => [...prevIncidents.slice(-4), newIncident]);
    }, 10000);

    return () => clearInterval(interval);
  }, [incidents]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Incident Response</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul>
          {incidents.map((incident) => (
            <li key={incident.id} className="flex items-center mb-4">
              <Users className="mr-2 text-blue-500" />
              <div className="flex-1">
                <h4 className="font-semibold">{incident.type}</h4>
                <p className="text-sm text-gray-500">Time: {incident.time}</p>
              </div>
              <span
                className={`text-sm ${
                  incident.status === 'Mitigated'
                    ? 'text-green-500'
                    : incident.status === 'Pending'
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`}
              >
                {incident.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IncidentResponse;
