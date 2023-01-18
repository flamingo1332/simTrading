from django.forms.models import model_to_dict

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from user.models import User
import jwt
from backend_django import settings
from posts.models import Post
from .serializers import PostSerializer
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPost(request):
    post_request = request.data
    user_id = request.user.id
    user = User.objects.get(id=user_id)
    post = Post.objects.create(body = post_request["body"],
                                coin = post_request["coin"],
                                user = user)
                                
    return Response(model_to_dict(post))

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePost(request, post_id):
    post_request = request.data

    post = Post.objects.get(id=post_id)

    post.body=post_request["body"]
    post.save()

    return Response(model_to_dict(post))

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePost(request, post_id):
    post = Post.objects.get(id=post_id)
    post.delete()
    return Response("deleted")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPostsByCoin(request, coin):
    posts = Post.objects.filter(coin=coin)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

