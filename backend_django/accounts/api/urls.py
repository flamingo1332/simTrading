from django.urls import path
from . import views

urlpatterns = [
    path('', views.createOrGetAccount),
    path('<int:accountId>/', views.deleteAccount),
    path('<int:accountId>/buy/', views.buyCoin),
    path('<int:accountId>/sell/', views.sellCoin),
    
]