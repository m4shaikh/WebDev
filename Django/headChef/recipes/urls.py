from django.urls import path
from .views import get_categories,get_recipes,get_category_detail,get_recipe_detail,count_view,popular,start_cooking,get_session

urlpatterns = [
    path('categories/',get_categories,name='categories'),
    path('recipes/',get_recipes,name='recipes'),
    path('categories/<uuid:category_id>/',get_category_detail),
    path("recipes/<uuid:recipe_id>/",get_recipe_detail,name="recipe_detail"),
    path("recipes/<uuid:recipe_id>/view/", count_view, name="count_view",),
    
    path("recipes/<uuid:recipe_id>/start/", start_cooking, name="start_cooking",),
    path("session/<uuid:session_id>/",get_session, name = "session"),
    
    path("popular/",popular,name="top-viewed-recipes",),
    
]
