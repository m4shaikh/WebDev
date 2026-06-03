from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from .models import Recipes ,Categories
from .serializer import RecipesSerializer, CategorySerializer

@api_view(['GET'])
def get_home():
    pass


@api_view(['GET'])
def get_categories(request):
    categories = Categories.objects.all()
    serializer = CategorySerializer(categories, many=True)

    return Response(serializer.data)
    
@api_view(['GET'])
def get_recipes(requst):
    recipes = Recipes.objects.all()
    serializer = RecipesSerializer(recipes, many=True)
    
    return Response(serializer.data)