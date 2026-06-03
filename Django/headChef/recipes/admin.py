from django.contrib import admin
from .models import Recipes , Images,Ingredients,Categories,UsedIngredients,RecipeCategory,Steps
# Register your models here.

admin.site.register([Recipes,Images,Ingredients,Categories,UsedIngredients,RecipeCategory,Steps])