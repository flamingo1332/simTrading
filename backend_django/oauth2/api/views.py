from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView

import requests
from django.core.exceptions import ValidationError
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import get_user_model
from user.models import User, UserManager
from rest_framework_simplejwt.tokens import AccessToken
from oauth2.api.serializers import CustomTokenObtainPairSerializer




GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'

User = get_user_model()

class GoogleLoginApi(APIView):
    def get(self, request, *args, **kwargs):
        app_key = settings.GOOGLE_OAUTH2_CLIENT_ID
        scope = "https://www.googleapis.com/auth/userinfo.email " + \
                "https://www.googleapis.com/auth/userinfo.profile"
        
        redirect_uri = settings.BASE_BACKEND_URL + "/api/oauth2/callback/google"
        google_auth_api = "https://accounts.google.com/o/oauth2/v2/auth"
        
        response = redirect(
            f"{google_auth_api}?client_id={app_key}&response_type=code&redirect_uri={redirect_uri}&scope={scope}"
        )
        
        return response

class GoogleSigninCallBackApi(APIView):
    def get(self, request, *args, **kwargs):
        code = request.GET.get('code')
        google_token_api = "https://oauth2.googleapis.com/token"
        
        print(code)
        access_token = google_get_access_token(google_token_api, code)
        user_data = google_get_user_info(access_token=access_token)
    
        print("*******************************")
        print(user_data)

        user, created = User.objects.get_or_create(email=user_data['email'],
                                    name = user_data.get('name', ''),
                                    image_url = user_data.get('picture', None),
                                    provider = "google",
                                    provider_id = user_data['sub'],
                                    is_active = True,
                                    is_staff = False,
                                    is_superuser = False )
        
        # user_manager = UserManager()
        # user = user_manager.create_user(
        #                             email = user_data['email'],
        #                             name = user_data.get('name', ''),
        #                             image_url = user_data.get('picture', None),
        #                             provider = "google",
        #                             provider_id = user_data['sub'],)
        
        # print(user)
        # print(user.email)
        # print(user.provider)
        # print(user.provider_id)
        
      
        token = AccessToken.for_user(user)
        
        response = redirect(settings.BASE_FRONTEND_URL + '/oauth2/redirect?token=' + str(token))
        return response



def google_get_access_token(google_token_api, code):
    client_id = settings.GOOGLE_OAUTH2_CLIENT_ID
    client_secret = settings.GOOGLE_OAUTH2_CLIENT_SECRET
    code = code
    grant_type = 'authorization_code'
    redirection_uri = settings.BASE_BACKEND_URL + "/api/oauth2/callback/google"
    state = "random_string"

    
    google_token_api += \
        f"?client_id={client_id}&client_secret={client_secret}&code={code}&grant_type={grant_type}&redirect_uri={redirection_uri}&state={state}"
    
    token_response = requests.post(google_token_api)
    
    if not token_response.ok:
        raise ValidationError('google_token is invalid')
    
    access_token = token_response.json().get('access_token')
    
    return access_token


def google_get_user_info(access_token):
    user_info_response = requests.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        params={
            'access_token': access_token
        }
    )

    if not user_info_response.ok:
        raise ValidationError('Failed to obtain user info from Google.')
    
    user_info = user_info_response.json()
    
    return user_info


