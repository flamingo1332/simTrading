from django.urls import path
from . import views

urlpatterns = [
    path('', views.createPost),
    path('<int:post_id>/', views.updatePost),
    path('<int:post_id>/', views.deletePost),
    path('<str:coin>/', views.getPostsByCoin),
    
]