from rest_framework import serializers
from .models import MobileApp, UserMobileApp
from django.contrib.auth.models import User


class MobileAppSerializers(serializers.ModelSerializer):

    class Meta:
        model = MobileApp
        fields = "__all__"

class UserMobileAppSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserMobileApp
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")