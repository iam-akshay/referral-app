from django.shortcuts import render
from .serializers import UserSerializers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
class UserView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        user = UserSerializers(user)
        return Response(user.data)        

class LogoutView(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request):
        token = request.auth
        if token is not None:
            token.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
