import uuid
from django.db import models
UNIT_CHOICES = [
    ('g', 'Gram (g)'),
    ('kg', 'Kilogram (kg)'),

    ('ml', 'Milliliter (ml)'),
    ('l', 'Liter (L)'),

    ('tsp', 'Teaspoon'),
    ('tbsp', 'Tablespoon'),

    ('cup', 'Cup'),

    ('pinch', 'Pinch'),
    ('dash', 'Dash'),

    ('piece', 'Piece'),
    ('slice', 'Slice'),
    ('clove', 'Clove'),
    ('stalk', 'Stalk'),

    ('oz', 'Ounce'),
    ('lb', 'Pound'),
]
# Create your models here.
class Recipes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    title = models.CharField(max_length=255, editable=True, unique=False, blank=False)
    description = models.CharField(null=True, blank=True)
    difficulty =  models.CharField( max_length=12, choices=[ ('beginner','Beginner'),('intermediate','Intermediate'),('professional','Professional'),('headchef','Headchef') ] )
    thumbnail = models.ImageField(upload_to='uploads/thumbnails/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) 
    
    def total_calories(self):
        total = 0

        for item in self.used_ingredients.all():

            calories = item.total_calories()

            if calories:
                total += calories
                
        return total
    
    def total_cooking_time(self):
        return sum(
            step.duration or 0
            for step in self.steps.all()
        )

    def total_ingredients(self):
        return self.used_ingredients.count()

    def __str__(self):
        return self.title
    
    
class Images(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    recipe = models.ForeignKey( Recipes, on_delete=models.CASCADE, related_name='images' )
    image = models.ImageField(upload_to='recipes/')
    

class Ingredients(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255 , unique=True, blank=False)
    image = models.ImageField(upload_to='ingredients/')
    calories_per_gram = models.DecimalField( max_digits=6, blank=True, decimal_places=2, null=True )
    
    def __str__(self):
        return self.name
        
class Categories(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to='categories/')

    def __str__(self):
        return self.name

class UsedIngredients(models.Model):
    recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE ,related_name='used_ingredients')
    ingredient = models.ForeignKey(Ingredients, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=8, decimal_places=2)
    unit = models.CharField(max_length=10, choices = UNIT_CHOICES)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['ingredient','recipe'],
                name = 'unique_recipe_ingredient' 
            )
        ]

    def total_calories(self):

        if self.ingredient.calories_per_gram is None:
            return 0

        if self.unit == 'g':
            grams = self.quantity

        elif self.unit == 'kg':
            grams = self.quantity * 1000

        else:
            return 0

        return grams * self.ingredient.calories_per_gram
    
    def __str__(self):
        return f"{self.recipe.title} - {self.ingredient.name}"
        

class RecipeCategory(models.Model):
    recipe =  models.ForeignKey(Recipes, on_delete=models.CASCADE, related_name='recipe_categories')
    category = models.ForeignKey(Categories, on_delete=models.CASCADE , related_name='recipe_categories')
    def __str__(self):
        return f"{self.recipe.title} - {self.category.name}"

class Steps(models.Model):
    recipe = models.ForeignKey(Recipes, on_delete=models.CASCADE, related_name='steps')
    step_number = models.PositiveIntegerField()
    duration = models.PositiveIntegerField(blank = True, null=True)
    requires_timer = models.BooleanField(default=False)
    instruction = models.TextField(blank=False,max_length=455 )
    special_note = models.CharField(max_length=255 , blank=True)
    
    def __str__(self):
        return f"{self.recipe.title} - Step {self.step_number}"
    
    class Meta:
        ordering = ['step_number']
        constraints = [
            models.UniqueConstraint(
                fields=['step_number','recipe'],
                name =  'unique_step'
            )
        ]
        
        