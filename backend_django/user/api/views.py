from django.forms.models import model_to_dict
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from user.models import User
import jwt
from backend_django import settings


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCurrentUser(request):
    # auth_header = request.META.get('HTTP_AUTHORIZATION')
    # jwt_token = auth_header.split()[1]

    # decoded_token = jwt.decode(jwt_token, key=settings.SECRET_KEY, algorithms=['HS256'])
    # user_id = decoded_token['user_id']

    user_id = request.user.id 
    user = User.objects.get(id=user_id)
    return Response(model_to_dict(user))

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUser(request, id):
    # auth_header = request.META.get('HTTP_AUTHORIZATION')
    # jwt_token = auth_header.split()[1]

    # decoded_token = jwt.decode(jwt_token, key=settings.SECRET_KEY, algorithms=['HS256'])
    # user_id = decoded_token['user_id']


    user_id = request.user.id 
    user = User.objects.get(id=user_id)

    if id == user_id:
        user.delete()

    return Response("Deleted")
