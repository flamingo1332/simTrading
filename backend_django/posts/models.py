from django.db import models
from django_extensions.db.fields import CreationDateTimeField, ModificationDateTimeField
from user.models import User

# Create your models here.
class Post(models.Model):
    id = models.BigAutoField(primary_key=True)
    body = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts', null=True)
    coin = models.CharField(max_length=150)
    date_created = CreationDateTimeField()
    date_updated = ModificationDateTimeField()
