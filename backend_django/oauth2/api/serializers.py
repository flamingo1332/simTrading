from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from user.models import User
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.tokens import AccessToken

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    token_type = 'Bearer'
    lifetime = 3600 * 24   # 1 day
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['is_superuser'] = user.is_superuser
        return token

    def validate(self, attrs):
        try:
            user = User.objects.get(email=attrs['email'])
        except User.DoesNotExist:
            raise ValidationError('Invalid credentials')

        data = super().validate(attrs)
        refresh =self.get_token(self.user)
        data['access'] = str(refresh.access_token)
        data.pop('refresh', None)
        return data

    # def create(self, validated_data):
    #     # Check if the user exists
    #     try:
    #         user = User.objects.get(email=validated_data['email'])
    #     except User.DoesNotExist:
    #         raise ValidationError('Invalid credentials')

    #     # Generate an access token for the user
    #     access_token = user.jwt_token()

    #     # Return the access token and exclude the refresh token
    #     return {
    #         'access': access_token,
    #         'refresh': None
    #     }
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer