from django.urls import path
from .views import get_categories,get_recipes

urlpatterns = [
    path('categories/',get_categories,name='categories'),
    path('recipes/',get_recipes,name='recipes')
    
]
