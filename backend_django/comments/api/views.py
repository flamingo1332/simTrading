from django.forms.models import model_to_dict
from rest_framework.permissions import IsAuthenticated
from user.models import User
from django.http import JsonResponse
from .serializers import CommentSerializer
import jwt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from backend_django import settings
from posts.models import Post
from comments.models import Comment

@api_view(['GET', 'POST','DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def comment_crud(request, id):
    if request.method == 'GET':
        comments = Comment.objects.filter(post_id=id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
        comment_request = request.data
        user_id = request.user.id

        user = User.objects.get(id=user_id)
        post = Post.objects.get(id=id)

        comment = Comment.objects.create(body = comment_request["body"],
                                post = post,
                                user = user)
                                
        return Response(model_to_dict(comment))

    elif request.method == 'PUT':
        comment = Comment.objects.get(id=id)
        comment_request = request.data
    
        comment.body=comment_request["body"]
        comment.save()

        return Response(model_to_dict(comment))

    elif request.method == 'DELETE':
        comment = Comment.objects.get(id=id)
        comment.delete()
        return Response("deleted")




# @api_view(['GET'])
# def getCommentsByPostId(request, post_id):
#     comments = Comment.objects.filter(post_id=post_id)
#     serializer = CommentSerializer(comments, many=True)
#     return Response(serializer.data)


# @api_view(['PUT'])
# def updateComment(request, comment_id):
#     comment = Comment.objects.get(id=comment_id)
#     comment_request = request.data
    
#     comment.body=comment_request["body"]
#     comment.save()

#     return Response(model_to_dict(comment))

# @api_view(['DELETE'])
# def deleteComment(request, comment_id):
#     comment = Comment.objects.get(id=comment_id)
#     comment.delete()
#     return Response("deleted")





