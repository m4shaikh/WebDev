import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager , PermissionsMixin


   
class UserManager(BaseUserManager):
    def _create_user(self , email, name , password,**extra_fields):
        if not email:
            raise ValueError("Email field is rerquired")
            
        email = self.normalize_email(email)
            
        user = self.model(
            email = email,
            name = name,
            **extra_fields
        )
            
        user.set_password(password)       
        user.save(using = self._db) 
        
        return user
        
    def create_user(self ,email , name, password = None , **extra_fields ):
        extra_fields.setdefault('is_staff',False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email , name, password , **extra_fields)
    
    def create_superuser(self ,email , name, password = None , **extra_fields ):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email , name, password , **extra_fields)



# Create your models here.
class User(AbstractBaseUser,PermissionsMixin):
    
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    name = models.CharField(max_length=255) 
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15 ,blank= True)
    profile = models.ImageField(
        upload_to ='profiles/',
        blank = True,
        null = True
    )
    date_joined = models.DateTimeField(auto_now_add = True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default = False)
    
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    def __str__(self):
        return self.name
    
    