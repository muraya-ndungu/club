from django.shortcuts import render
from rest_framework import generics, status
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .models import UserProfile
from .serializers import UserProfileSerializer
from .models import Project
from .serializers import ProjectSerializer
from .models import Attendance
from .serializers import AttendanceSerializer
from .models import Event
from .serializers import EventSerializer
from .models import Notification
from .serializers import NotificationSerializer
from django.core.mail import send_mail
from django.conf import settings
from .models import Payment
from .serializers import PaymentSerializer
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Attendance


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserProfileDetail(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class ProjectListCreate(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class AttendanceListCreate(generics.ListCreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class AttendanceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer



class NotificationListCreate(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class NotificationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


def send_notification_email(user_email, message):
    send_mail(
        'New Notification from Karatina University Innovation Club',
        message,
        settings.EMAIL_HOST_USER,
        [user_email],
        fail_silently=False,
    )

class PaymentListCreate(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


def mpesa_payment(user, amount):
    # Replace the following with actual Mpesa API integration
    url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    headers = {
        'Authorization': 'Bearer ' + 'your_access_token',
        'Content-Type': 'application/json',
    }
    payload = {
        'BusinessShortCode': 'your_shortcode',
        'Password': 'your_password',
        'Timestamp': 'your_timestamp',
        'TransactionType': 'CustomerPayBillOnline',
        'Amount': amount,
        'PartyA': user.phone_number,
        'PartyB': 'your_shortcode',
        'PhoneNumber': user.phone_number,
        'CallBackURL': 'your_callback_url',
        'AccountReference': 'AccountReference',
        'TransactionDesc': 'Payment for membership',
    }
    response = requests.post(url, headers=headers, json=payload)
    return response.json()

@api_view(['POST'])
def record_attendance(request):
    user = request.user
    date = request.data.get('date')
    status = request.data.get('status')
    attendance = Attendance.objects.create(user=user, date=date, status=status)
    return Response({'message': 'Attendance recorded successfully', 'attendance': attendance.id})
