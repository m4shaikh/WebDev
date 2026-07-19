# serializers.py

from rest_framework import serializers
from .models import Recipes, Categories,Images,UsedIngredients,Ingredients,Steps,CookingSession

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'
        

class RecipesSerializer(serializers.ModelSerializer):
    cooking_time = serializers.SerializerMethodField()
    calories = serializers.SerializerMethodField()
    views = serializers.SerializerMethodField()
    class Meta:
        model = Recipes
        fields = [
            'id',
            'title',
            'thumbnail',
            'difficulty',
            'cooking_time',
            'calories',
            'views'
        ]
    
    def get_cooking_time(self, obj):
        return obj.total_cooking_time()

    def get_calories(self, obj):
        return obj.total_calories()
    
    def get_views(self, obj):
        return obj.total_views()

    
class RecipeImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ['id', 'image']

from rest_framework import serializers
from .models import (
    Recipes,
    UsedIngredients,
    Steps,
)


class RecipeIngredientSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        source='ingredient.name'
    )

    class Meta:
        model = UsedIngredients
        fields = [
            'name',
            'quantity',
            'unit',
        ]

class UsedIngredientSerializer(serializers.ModelSerializer):
    ingredient_name = serializers.CharField(
        source='ingredient.name',
        read_only=True
    )

    ingredient_image = serializers.ImageField(
        source='ingredient.image',
        read_only=True
    )

    class Meta:
        model = UsedIngredients
        fields = [
            'ingredient_name',
            'ingredient_image',
            'quantity',
            'unit',
        ]
    
class RecipeStepSerializer(serializers.ModelSerializer):

    class Meta:
        model = Steps
        fields = [
            'step_number',
            'instruction',
            'duration',
            'special_note',
        ]
    
class RecipeDetailSerializer(serializers.ModelSerializer):

    calories = serializers.SerializerMethodField()

    cooking_time = serializers.SerializerMethodField()

    views = serializers.SerializerMethodField()
    cooked = serializers.SerializerMethodField()
    
    ingredients = RecipeIngredientSerializer(
        source='used_ingredients',
        many=True,
        read_only=True
    )

    steps = RecipeStepSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Recipes

        fields = [
            'id',
            'title',
            'description',
            'difficulty',
            'thumbnail',

            'calories',
            'cooking_time',

            'ingredients',
            'steps',
            
            'views',
            'cooked'
        ]

    def get_calories(self, obj):
        return obj.total_calories()

    def get_cooking_time(self, obj):
        return obj.total_cooking_time()
    
    def get_views(self, obj):
        return obj.total_views()

    def get_cooked(self, obj):
        return obj.total_cooked()
    

class SessionStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Steps
        fields = [
            "step_number",
            "instruction",
            "duration",
            "requires_timer",
            "special_note",
        ]


class SessionSerializer(serializers.ModelSerializer):
    recipe_title = serializers.CharField(source="recipe.title", read_only=True)
    
    total_steps = serializers.SerializerMethodField()
    current_step_data = serializers.SerializerMethodField()

    ingredients = UsedIngredientSerializer(
        source="recipe.used_ingredients",
        many=True,
        read_only=True
    )
        
    class Meta:
        model = CookingSession
        fields = [
            "id",
            "recipe",
            "recipe_title",
            "ingredients",
            "status",
            "started_at",
            "completed_at",
            "current_step",
            "step_started_at",
            "total_steps",
            "current_step_data",
        ]

    def get_total_steps(self, obj):
        return obj.recipe.steps.count()

    def get_current_step_data(self, obj):
        step = obj.recipe.steps.filter(
            step_number=obj.current_step
        ).first()

        if not step:
            return None

        return SessionStepSerializer(step).data