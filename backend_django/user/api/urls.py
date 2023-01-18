from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from oauth2.api.serializers import CustomTokenObtainPairView
from . import views

urlpatterns = [
    # path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.getCurrentUser),
    path('<int:id>/', views.deleteUser),
]