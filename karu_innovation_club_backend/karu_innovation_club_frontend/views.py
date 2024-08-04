
# Create your views here.
from django.shortcuts import render

def index(request, *args, **kwargs):
    return render(request, 'karu_innovation_club_frontend/index.html')
