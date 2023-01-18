from django.db import models

# Create your models here.
from django.db import models
from django.utils import timezone
from django_extensions.db.fields import CreationDateTimeField, ModificationDateTimeField
from user.models import User
from posts.models import Post

# Create your models here.
class Comment(models.Model):
    id = models.BigAutoField(primary_key=True)
    body = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments', null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='commnets', null=True)
    date_created = CreationDateTimeField()
    date_updated = ModificationDateTimeField()

   
    