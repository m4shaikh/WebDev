from django.urls import path 
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView 
from .views import register,google_login,get_profile
urlpatterns = [
    path('signup/', register, name ='register'),
    path('login/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('google/', google_login, name ='google_login'),
    path('profile/',get_profile, name='get_profile')
]
