from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserCreate

urlpatterns = [
    path('register/', UserCreate.as_view(), name='user-create'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

from .views import UserProfileDetail

urlpatterns += [
    path('profile/<int:pk>/', UserProfileDetail.as_view(), name='user-profile-detail'),
]


from .views import ProjectListCreate, ProjectDetail

urlpatterns += [
    path('projects/', ProjectListCreate.as_view(), name='project-list-create'),
    path('projects/<int:pk>/', ProjectDetail.as_view(), name='project-detail'),
]
from .views import AttendanceListCreate, AttendanceDetail

urlpatterns += [
    path('attendance/', AttendanceListCreate.as_view(), name='attendance-list-create'),
    path('attendance/<int:pk>/', AttendanceDetail.as_view(), name='attendance-detail'),
]

from .views import EventListCreate, EventDetail

urlpatterns += [
    path('events/', EventListCreate.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventDetail.as_view(), name='event-detail'),
]

from .views import NotificationListCreate, NotificationDetail

urlpatterns += [
    path('notifications/', NotificationListCreate.as_view(), name='notification-list-create'),
    path('notifications/<int:pk>/', NotificationDetail.as_view(), name='notification-detail'),
]

from .views import PaymentListCreate

urlpatterns += [
    path('payments/', PaymentListCreate.as_view(), name='payment-list-create'),
]

from .views import record_attendance

urlpatterns += [
    path('attendance/record/', record_attendance, name='record-attendance'),
]
