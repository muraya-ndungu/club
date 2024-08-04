
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', include('karu_innovation_club_frontend.urls')),  # This should point to your frontend app
]
