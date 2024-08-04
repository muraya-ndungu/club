from django.urls import path
from .views import index

urlpatterns = [
    path('', index),  # Ensure the view name is correct
]
