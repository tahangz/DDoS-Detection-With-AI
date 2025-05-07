from django.urls import path
from api.views import traffic_analysis_form, TrafficAnalysisAPIView

urlpatterns = [
    path('', traffic_analysis_form, name='traffic_analysis_form'),  # Form at root
    path('api/analyze/', TrafficAnalysisAPIView.as_view(), name='analyze'),  # API endpoint
]
