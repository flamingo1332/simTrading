from django.shortcuts import render
from django.http import JsonResponse
from pycoingecko import CoinGeckoAPI
from newsapi import NewsApiClient
from backend_django.settings import NEWS_API_KEY
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

newsApi = NewsApiClient(api_key=NEWS_API_KEY)
coinApi = CoinGeckoAPI()

# @permission_classes([IsAuthenticated])


@api_view(['GET'])
def getTrending(request):
    # user_id = request.user.id 
    trending = coinApi.get_search_trending()
    return Response(trending)

@api_view(['GET'])
def getMarkets(request):
    id = request.GET["id"]
    perPage = request.GET["per_page"]
    page = request.GET["page"]

    
    markets = coinApi.get_coins_markets(vs_currency="usd", per_page=perPage, page=page, ids=id)
    return Response(markets)

@api_view(['GET'])
def getPrices(request):
    id = request.GET["id"]
    prices = coinApi.get_price(ids=id, vs_currencies="usd")
    return Response(prices)

@api_view(['GET'])
def getCoin(request):
    id = request.GET["id"]
    localization = request.GET["localization"]
    tickers = request.GET["tickers"]
    # market_data = request.GET["market_data"]
    # community_data = request.GET["community_data"]
    # sparkline = request.GET["sparkline"]

    coin = coinApi.get_coin_by_id(id=id, localization=localization,
     tickers=tickers, market_data=True, developer_data=False, community_data=False, sparkline=False )
    return Response(coin)


@api_view(['GET'])
def getMarketChart(request, id):
    
    id = request.GET["id"]
    days = request.GET["days"]
    interval = request.GET["interval"]

    marketChart = coinApi.get_coin_by_id(id=id, vs_currentcy="usd", days=days, interval=interval )
    return Response(marketChart)


@api_view(['GET'])
def getSearch(request):
    query = request.GET["query"]

    search = coinApi.search(query=query)
    return Response(search)

@api_view(['GET'])
def getOhlc(request):
    id = request.GET["id"]
    days = request.GET["days"]

    Ohlc = coinApi.get_coin_ohlc_by_id(id=id, vs_currency="usd", days=days)
    return Response(Ohlc)

@api_view(['GET'])
def getNews(request):
    query = str(request.GET["id"])

    news = newsApi.get_everything(page_size=3, q=query, language="en")
    return Response(news)