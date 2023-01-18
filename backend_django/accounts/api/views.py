from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.forms.models import model_to_dict
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from accounts.models import Account, BuyOrder, SellOrder
from pycoingecko import CoinGeckoAPI
from user.models import User
from django.http import HttpResponseBadRequest
from .serializers import AccountSerializer
from decimal import Decimal

coinApi = CoinGeckoAPI()


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def createOrGetAccount(request):
    if request.method == 'GET':
        user_id = request.user.id
        user = User.objects.get(id=user_id)

        try:
            accounts = Account.objects.filter(user_id=user_id)
        except:
            return Response(list())

        input_str = ""

        for account in accounts:
            if account.coins != None:
                for coin in account.coins.keys():
                    input_str += coin + ","
        
        updated_prices = coinApi.get_price(input_str, "usd")

        for account in accounts:
            coins = account.coins
            prices = account.prices
            total = account.balance
            if coins != None:
                for coin in coins.keys():
                    p = updated_prices.get(coin).get("usd")
                    prices[coin] = p
                    total += Decimal(p) * Decimal(coins[coin])
                    account.total = total
            account.save()

        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        user_id = request.user.id
        user = User.objects.get(id=user_id)
        if user.accounts.all().count() >= 5 :
            return HttpResponse("maximum number of accounts is 5", status=500)
        account_data = request.data
        Account.objects.create(user=user,
                            total=account_data['balance'],
                            initial_balance = account_data['balance'],
                            **account_data)
        return Response("account created")
    
def createAccount(request):
    user_id = request.user.id 
    user = User.objects.get(id=user_id)
    account_data = request.data
    new_account = Account.objects.create(user=user,
                                    total=account_data['balance'],
                                    initial_balance = account_data['balance'],
                                    **account_data)
    return Response(new_account)


def getAccountsByUserId(request):
    user_id = request.user.id 
    accounts = User.objects.get(id=user_id).accounts
    print(accounts)

    input_str = ""
    for account in accounts:
        for coin in account.coins.keys():
            input_str += coin + ","
    updated_prices = coinApi.get_price(input_str, "usd")

    for account in accounts:
        coins = account.coins
        prices = account.prices
        total = account.balance
        
        for coin in coins.keys():
            p = updated_prices.get(coin).get("usd")
            prices[coin] = p
            total += Decimal(p) * Decimal(coins[coin])
            account.total = total 
            
        account.save()
    
    return Response(accounts)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteAccount(request, accountId):
    user_id = request.user.id
    user = User.objects.get(id=user_id)
    
    account = Account.objects.get(id=accountId)
    if account.user == user:
        account.delete()
    
    return Response("deleted")


    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def buyCoin(request, accountId):
    coin = request.GET["coin"]
    amount = float(request.GET["amount"])
    price = float(request.GET["price"])

    account = Account.objects.get(id=accountId)
    coins = account.coins

    if amount * price > account.balance :
        return HttpResponse("Not enough balance", status=500)
    elif amount <= 0:
        return HttpResponse("invalid input", status=500)

    if coin in coins:
        coins[coin] += amount
    else:
        coins[coin] = amount

    BuyOrder.objects.create(symbol=coin,
                    amount=amount,
                    price=price,
                    account=account)

    account.save()
    return Response(model_to_dict(account))

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sellCoin(request, accountId):
    coin = request.GET["coin"]
    amount = float(request.GET["amount"])
    price = float(request.GET["price"])

    account = Account.objects.get(id=accountId)
    coins = account.coins

    
    if coin in coins and coins[coin] < amount :
        return HttpResponse("cant sell more than you have", status=500)
    elif amount <= 0:
        return HttpResponse("invalid input", status=500)

    if coins[coin] - amount == 0:
        coins[coin]
    else:
        coins[coin] -= float(amount)
        

    SellOrder.objects.create(symbol=coin,
                    amount=amount,
                    price=price,
                    account=account)

    account.save()
    return Response(model_to_dict(account))