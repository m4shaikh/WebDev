from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Recipes ,Categories, Views
from .serializer import RecipesSerializer, CategorySerializer, RecipeDetailSerializer
from django.db.models import Count

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

@api_view(['GET'])
def get_category_detail(request, category_id):
    try:
        category = Categories.objects.get(id=category_id)
    except Categories.DoesNotExist:
        return Response(
            {"error": "Category not found"},
            status=404
        )

    recipes = Recipes.objects.filter(
        recipe_categories__category=category
    ).distinct()

    return Response({
        "category": CategorySerializer(category).data,
        "recipes": RecipesSerializer(
            recipes,
            many=True
        ).data
    })
    

@api_view(['GET'])
def get_recipe_detail(request, recipe_id):

    try:
        recipe = Recipes.objects.prefetch_related(
            'used_ingredients',
            
            'steps'
        ).get(id=recipe_id)

    except Recipes.DoesNotExist:
        return Response(
            {"error": "Recipe not found"},
            status=404
        )

    serializer = RecipeDetailSerializer(recipe)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def count_view(request,recipe_id):
    try:
        recipe = Recipes.objects.get(id=recipe_id)
    except Recipes.DoesNotExist:
        return Response(
            {'error':"Reipe not found"},
            status=404
        ) 
    
    Views.objects.create(
        user = request.user,
        recipe = recipe
    )
    
    return Response(
        {"message": "View counted"},
        status=201
    )
    
@api_view(['GET'])
def popular(request):

    popular = Recipes.objects.annotate(view_count=Count("views")).order_by("-view_count")[:5]
           
    serializer = RecipesSerializer(popular, many=True)

    return Response(serializer.data)