from django.shortcuts import render
from rest_framework import status
from .models import User
from .serializers import RegisterSerializer 
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes , permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
# Create your views here.

    
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
        status=status.HTTP_201_CREATED
    )
    
    
