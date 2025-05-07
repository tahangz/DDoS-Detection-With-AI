import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Configure axios to handle CSRF tokens
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export interface TrafficAnalysisResult {
  prediction: string;
  confidence: number;
  probabilities: {
    normal: number;
    attack: number;
  };
  input_values: TrafficFeatures;
}

export interface TrafficFeatures {
  'Bwd Packet Length Min': number;
  'Bwd Packet Length Std': number;
  'Init Win bytes forward': number;
  'Init Win bytes backward': number;
  'Fwd PSH Flags': number;
  'Average Packet Size': number;
  'PSH Flag Count': number;
  'Bwd Packets/s': number;
  'Bwd Header Length': number;
  'Bwd Packet Length Mean': number;
  'Fwd Header Length': number;
  'Packet Length Std': number;
  'Packet Length Mean': number;
  'Avg Bwd Segment Size': number;
  'Fwd Header Length 1': number;
  'min seg size forward': number;
  'Bwd Packet Length Max': number;
  'Packet Length Variance': number;
  'Fwd Packet Length Max': number;
  'Fwd Packet Length Mean': number;
  'Flow Bytes/s': number;
  'Fwd IAT Min': number;
  'Total Length of Fwd Packets': number;
  'Flow IAT Mean': number;
}

export const analyzeTraffic = async (features: TrafficFeatures): Promise<TrafficAnalysisResult> => {
  try {
    // First, get the CSRF token
    const csrfResponse = await axios.get(`${API_BASE_URL}/analyze/`, {
      withCredentials: true
    });
    
    // Then make the POST request with the features
    const response = await axios.post(`${API_BASE_URL}/analyze/`, {}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': document.cookie.split('csrftoken=')[1]?.split(';')[0] || ''
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error analyzing traffic:', error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data.error || 'Server error occurred');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server. Please check if the backend is running.');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error setting up the request: ' + error.message);
      }
    }
    throw new Error('An unexpected error occurred');
  }
}; 