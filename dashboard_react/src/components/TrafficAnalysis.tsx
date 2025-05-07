import React, { useState, useEffect } from 'react';
import { analyzeTraffic, TrafficAnalysisResult } from '../api/trafficAnalysis';
import { AlertTriangle, Shield, Activity } from 'lucide-react';

const TrafficAnalysis: React.FC = () => {
  const [result, setResult] = useState<TrafficAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const analysisResult = await analyzeTraffic({} as any); // Empty object since backend generates random values
      setResult(analysisResult);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Auto-analyze every 30 seconds
  useEffect(() => {
    handleAnalyze();
    const interval = setInterval(handleAnalyze, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Traffic Analysis Dashboard</h1>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 flex items-center gap-2"
        >
          <Activity className="w-5 h-5" />
          {loading ? 'Analyzing...' : 'Analyze Now'}
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Prediction Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Prediction
            </h2>
            <div className={`text-2xl font-bold ${
              result.prediction === 'Attack Detected' ? 'text-red-600' : 'text-green-600'
            }`}>
              {result.prediction}
            </div>
          </div>

          {/* Confidence Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Confidence</h2>
            <div className="text-2xl font-bold">
              {(result.confidence * 100).toFixed(2)}%
            </div>
          </div>

          {/* Probabilities Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Probabilities</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Normal Traffic</span>
                <span className="text-green-600 font-semibold">
                  {(result.probabilities.normal * 100).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Attack</span>
                <span className="text-red-600 font-semibold">
                  {(result.probabilities.attack * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {lastUpdated && (
        <div className="mt-6 text-sm text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default TrafficAnalysis; 