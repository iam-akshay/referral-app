from rest_framework import serializers
from .models import MobileApp

class MobileAppSerializers(serializers.ModelSerializer):

    class Meta:
        model = MobileApp
        fields = "__all__"