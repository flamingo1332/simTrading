from django.db import models
from user.models import User
# Create your models here.

class Account(models.Model):
    id = models.BigAutoField(primary_key=True)
    coins = models.JSONField(default=dict)
    prices = models.JSONField(default=dict)
    # buy_orders = models.ManyToManyField('BuyOrder', related_name='accounts', through='BuyOrderAccount')
    # sell_orders = models.ManyToManyField('SellOrder', related_name='accounts', through='SellOrderAccount')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='accounts')
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.CharField(max_length=255, blank=False, null=False)
    balance = models.DecimalField(max_digits=20, decimal_places=10, blank=False, null=False)
    total = models.DecimalField(max_digits=20, decimal_places=10, blank=True, null=True)
    initial_balance = models.DecimalField(max_digits=20, decimal_places=10, blank=True, null=True)



class BuyOrder(models.Model):
    id = models.BigAutoField(primary_key=True)
    symbol = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=20, decimal_places=10, blank=True, null=True)
    price = models.DecimalField(max_digits=20, decimal_places=10, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)
    account = models.ForeignKey(Account, related_name='buy_orders',  on_delete=models.CASCADE)

class SellOrder(models.Model):
    id = models.BigAutoField(primary_key=True)
    symbol = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=20, decimal_places=10, blank=True, null=True)
    price = models.DecimalField(max_digits=20, decimal_places=10, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)
    account = models.ForeignKey(Account, related_name='sell_orders', on_delete=models.CASCADE)