from django.urls import path
from . import views

urlpatterns = [
    path('trending/', views.getTrending),
    path('markets/', views.getMarkets),
    path('price/', views.getPrices),
    path('data/', views.getCoin),
    path('market_chart/', views.getMarketChart),
    path('search/', views.getSearch),
    path('ohlc/', views.getOhlc),
    path('news/', views.getNews),
]