import os
import pickle
import logging
import json
import random
from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods
import numpy as np

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the model and scaler
MODEL_PATH = os.path.join(settings.BASE_DIR, 'api', 'ml_models', 'random_forest_model.pkl')
SCALER_PATH = os.path.join(settings.BASE_DIR, 'api', 'ml_models', 'scaler.pkl')
FEATURE_LIST_PATH = os.path.join(settings.BASE_DIR, 'api', 'ml_models', 'feature_list.pkl')

logger.info(f"Looking for model files at:")
logger.info(f"Model path: {MODEL_PATH}")
logger.info(f"Scaler path: {SCALER_PATH}")
logger.info(f"Feature list path: {FEATURE_LIST_PATH}")

def generate_random_features():
    """Generate random values for traffic features."""
    return {
        'Bwd Packet Length Min': random.uniform(0, 1000),
        'Bwd Packet Length Std': random.uniform(0, 5000),
        'Init Win bytes forward': random.uniform(0, 65535),
        'Init Win bytes backward': random.uniform(0, 65535),
        'Fwd PSH Flags': random.uniform(0, 1),
        'Average Packet Size': random.uniform(0, 5000),
        'PSH Flag Count': random.uniform(0, 100),
        'Bwd Packets/s': random.uniform(0, 100000),
        'Bwd Header Length': random.uniform(0, 5000),
        'Bwd Packet Length Mean': random.uniform(0, 5000),
        'Fwd Header Length': random.uniform(0, 5000),
        'Packet Length Std': random.uniform(0, 5000),
        'Packet Length Mean': random.uniform(0, 5000),
        'Avg Bwd Segment Size': random.uniform(0, 5000),
        'Fwd Header Length 1': random.uniform(0, 5000),
        'min seg size forward': random.uniform(0, 1000),
        'Bwd Packet Length Max': random.uniform(0, 10000),
        'Packet Length Variance': random.uniform(0, 1000000),
        'Fwd Packet Length Max': random.uniform(0, 10000),
        'Fwd Packet Length Mean': random.uniform(0, 5000),
        'Flow Bytes/s': random.uniform(0, 10000000),
        'Fwd IAT Min': random.uniform(0, 0.001),
        'Total Length of Fwd Packets': random.uniform(0, 1000000),
        'Flow IAT Mean': random.uniform(0, 0.001)
    }

try:
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
    if not os.path.exists(SCALER_PATH):
        raise FileNotFoundError(f"Scaler file not found at {SCALER_PATH}")
    if not os.path.exists(FEATURE_LIST_PATH):
        raise FileNotFoundError(f"Feature list file not found at {FEATURE_LIST_PATH}")

    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
    with open(SCALER_PATH, 'rb') as f:
        scaler = pickle.load(f)
    with open(FEATURE_LIST_PATH, 'rb') as f:
        feature_list = pickle.load(f)
    logger.info(f"Model loaded successfully: {type(model).__name__}")
    logger.info(f"Model parameters: {model.get_params()}")
    logger.info(f"Feature list: {feature_list}")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    model = None
    scaler = None
    feature_list = None

@ensure_csrf_cookie
def traffic_analysis_form(request):
    """Render the traffic analysis form."""
    return render(request, 'detection_form.html')

@method_decorator(ensure_csrf_cookie, name='dispatch')
class TrafficAnalysisAPIView(View):
    """API view for traffic analysis predictions."""
    
    def get(self, request):
        """Handle GET requests to set CSRF cookie."""
        return JsonResponse({'status': 'ok'})
    
    def post(self, request):
        """Handle POST requests for traffic analysis."""
        if model is None or scaler is None or feature_list is None:
            logger.error("Model, scaler, or feature list not loaded")
            return JsonResponse({
                'error': 'Model not properly loaded. Please check server logs.'
            }, status=500)

        try:
            # Parse JSON data from request
            data = json.loads(request.body)
            features = data.get('features', generate_random_features())
            logger.info(f"Received features: {features}")
            
            # Prepare input data
            input_data = np.array([features[feature] for feature in feature_list]).reshape(1, -1)
            logger.info(f"Input data shape: {input_data.shape}")
            
            # Scale the input data
            scaled_data = scaler.transform(input_data)
            logger.info(f"Scaled data shape: {scaled_data.shape}")
            
            # Make prediction
            prediction = model.predict(scaled_data)[0]
            probabilities = model.predict_proba(scaled_data)[0]
            
            # Get prediction confidence
            confidence = max(probabilities)
            
            # Prepare response
            result = {
                'prediction': 'Attack Detected' if prediction == 1 else 'Normal Traffic',
                'confidence': float(confidence),
                'probabilities': {
                    'normal': float(probabilities[0]),
                    'attack': float(probabilities[1])
                },
                'input_values': features
            }
            
            logger.info(f"Prediction made: {result['prediction']} with confidence {result['confidence']:.2f}")
            
            return JsonResponse(result)
            
        except Exception as e:
            logger.error(f"Error making prediction: {str(e)}")
            return JsonResponse({
                'error': f'Error processing request: {str(e)}'
            }, status=500)
