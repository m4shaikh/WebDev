from rest_framework import serializers
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
     
    password = serializers.CharField(
        write_only=True,
        min_length=8
    ) 
    
    class Meta:
        model = User
        fields = (
            'email',
            'name',
            'password',
            'phone'
        )
    
    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            phone=validated_data.get('phone',''),
        )
    
class GoogleAuthSerializer(serializers.Serializer):
    token = serializers.CharField()