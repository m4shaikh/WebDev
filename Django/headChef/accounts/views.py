from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework import status
from rest_framework_simplejwt .tokens import RefreshToken
from .models import User
from .serializers import RegisterSerializer 
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes , permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
# Create your views here.

from decouple import config
    
    
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
    
@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(
        data = request.data 
    )
    if serializer.is_valid():
        serializer.save()
        
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
    return Response(
        serializer.errors,
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )
    

@api_view(["POST"])
def google_login(request):
    token = request.data.get("token")

    if not token:
        return Response(
            {"error": "Token is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user_info = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            config('GOOGLE_CLIENT_ID')
        )
    
        email = user_info["email"]
        name = user_info.get("name", "")

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "name": name
            },
        )
        tokens = get_tokens_for_user(user)

        return Response({
            "access":tokens["access"],
            "refresh":tokens["refresh"],
            "user": {
                "id": str(user.id),
                "email": user.email,
                "name": user.name,
            }
        })

    except ValueError:
        return Response(
            {"error": "Invalid Google token"},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    return Response({'email':request.user.email,'name':request.user.name})





api_view(['POST'])
authentication_classes([IsAuthenticated])
def Favorite():
    try:
        print('s')
    except:
        print('G')