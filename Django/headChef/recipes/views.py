from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Recipes ,Categories, Views, CookingSession, CookedRecipe
from .serializer import RecipesSerializer, CategorySerializer, RecipeDetailSerializer ,SessionSerializer
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.utils import timezone


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



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_recipe(request):
    pass


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_cooking(request,recipe_id):
    
    recipe = get_object_or_404(
        Recipes,
        id = recipe_id
    )
    
    session = CookingSession.objects.filter(user = request.user , recipe = recipe , status = 'active').first()
    if session:
        serializer = SessionSerializer(session)
        return Response(serializer.data)
    
    first_step = recipe.steps.first().step_number
    
    if first_step is None:
        return Response(
            {"detail": "Recipe has no cooking steps."},
            status=status.HTTP_400_BAD_REQUEST
        ) 
        
    session = CookingSession.objects.create(
        user=request.user,
        recipe=recipe,
        current_step=first_step,
        status="active",
        started_at=timezone.now(),
        step_started_at=timezone.now()
    )
    
    serializer = SessionSerializer(session)
    
    return Response(
        serializer.data,
        status=status.HTTP_201_CREATED
    )
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_session(request , session_id):

    session = get_object_or_404(CookingSession,id=session_id)
    
    serializer = SessionSerializer(session)
    
    return Response(
        serializer.data,
        status=status.HTTP_200_OK
    )
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def next_step(request,session_id):
    
    session = get_object_or_404(
        CookingSession,
        id=session_id,
        user = request.user
    )
    
    if session.status != 'active':
        return Response(
            {"detail": "Session is not active."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    
    total_steps = session.recipe.steps.count()
    
    if session.current_step >= total_steps:

        session.status = "completed"
        session.completed_at = timezone.now()
        session.save()

        serializer = SessionSerializer(session)

        return Response(serializer.data)
    
    session.current_step += 1
    session.step_started_at = timezone.now()
    session.save()
    
    serializer = SessionSerializer(session)

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def previous_step(request, session_id):

    session = get_object_or_404(
        CookingSession,
        id=session_id,
        user=request.user,
    )

    if session.status != "active":
        return Response(
            {"detail": "Session is not active."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    first_step = session.recipe.steps.first()

    if first_step is None:
        return Response(
            {"detail": "Recipe has no steps."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if session.current_step <= first_step.step_number:
        serializer = SessionSerializer(session)
        return Response(serializer.data)

    session.current_step -= 1
    session.step_started_at = timezone.now()
    session.save()

    serializer = SessionSerializer(session)

    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def exit_cooking(request, session_id):

    session = get_object_or_404(
        CookingSession,
        id=session_id,
        user=request.user,
    )

    if session.status in ["completed", "cancelled"]:
        return Response(
            {"detail": "Session already finished."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    session.status = "cancelled"
    session.completed_at = timezone.now()
    session.save()

    return Response(
        {
            "detail": "Cooking session cancelled.",
            "recipe_id": session.recipe.id,
        },
        status=status.HTTP_200_OK,
    )
    
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def complete_cooking(request, session_id):

    session = get_object_or_404(
        CookingSession,
        id=session_id,
        user=request.user,
    )

    if session.status != "active":
        return Response(
            {"detail": "Session is not active."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    last_step = session.recipe.steps.last()

    if session.current_step != last_step.step_number:
        return Response(
            {"detail": "Recipe is not finished yet."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    session.status = "completed"
    session.completed_at = timezone.now()
    session.save()

    CookedRecipe.objects.get_or_create(
        user=request.user,
        recipe=session.recipe,
    )

    serializer = SessionSerializer(session)

    return Response(serializer.data)