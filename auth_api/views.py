from django.shortcuts import render
from .serializers import UserSerializers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

class UserView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        user = UserSerializers(user)
        return Response(user.data)