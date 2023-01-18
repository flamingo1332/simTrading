from rest_framework import serializers
from posts.models import Post
from user.api.serializers import UserSerializer

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Post
        fields = '__all__'