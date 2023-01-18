from rest_framework import serializers
from accounts.models import Account, BuyOrder, SellOrder

class BuyOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyOrder
        fields = '__all__'

class SellOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellOrder
        fields = '__all__'

class AccountSerializer(serializers.ModelSerializer):
    buy_orders = serializers.SerializerMethodField()
    sell_orders = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = ['id', 'coins', 'prices', 'buy_orders', 'sell_orders', 'user', 'name', 'description', 'balance', 'total', 'initial_balance']
    
    def get_buy_orders(self, obj):
        return BuyOrderSerializer(obj.buy_orders.all(), many=True).data

    def get_sell_orders(self, obj):
        return SellOrderSerializer(obj.sell_orders.all(), many=True).data
    
    
    # buy_order = BuyOrderSerializer(many=True)
    # sell_order = SellOrderSerializer(many=True)

    # class Meta:
    #     model = Account
    #     fields = '__all__'
