from django.urls import path
from . import views
from oauth2.api.views import ( 
    GoogleLoginApi, 
    GoogleSigninCallBackApi
)


urlpatterns = [
    path('login/google/', GoogleLoginApi.as_view(), name='google_login'),
    path('callback/google/', GoogleSigninCallBackApi.as_view(), name='google_login_callback'),
]