from rest_framework import serializers
from comments.models import Comment
from user.api.serializers import UserSerializer

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Comment
        fields = '__all__'