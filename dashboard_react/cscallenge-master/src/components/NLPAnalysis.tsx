// NLPAnalysis.tsx
import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

const NLPAnalysis: React.FC = () => {
  const [analyses, setAnalyses] = useState([
    { id: 1, report: 'Security Report 1', summary: 'No critical issues found.', sentiment: 'Neutral' },
    { id: 2, report: 'Threat Intelligence Feed', summary: 'Potential malware detected.', sentiment: 'Negative' },
  ]);

  useEffect(() => {
    // Simulate analysis updates
    const interval = setInterval(() => {
      const newAnalysis = {
        id: analyses.length + 1,
        report: `Incident Ticket ${analyses.length + 1}`,
        summary: 'User reported phishing attempt.',
        sentiment: 'Negative',
      };
      setAnalyses((prevAnalyses) => [...prevAnalyses.slice(-4), newAnalysis]);
    }, 10000);

    return () => clearInterval(interval);
  }, [analyses]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">NLP Analysis</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul>
          {analyses.map((analysis) => (
            <li key={analysis.id} className="mb-4">
              <div className="flex items-center">
                <FileText className="mr-2 text-blue-500" />
                <div>
                  <h4 className="font-semibold">{analysis.report}</h4>
                  <p>{analysis.summary}</p>
                  <p className="text-sm text-gray-500">Sentiment: {analysis.sentiment}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NLPAnalysis;
