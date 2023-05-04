from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.status import *
from .serializers import MobileAppSerializers, UserMobileAppSerializers, UserSerializer
from rest_framework.response import Response

from .models import MobileApp


class MobileAppView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Get all mobile apps
        """
        apps = MobileApp.objects.all()
        apps = MobileAppSerializers(apps, many=True)
        return Response(apps.data, status=200)

    def post(self, request):
        """
        Add new mobile app
        """
        if not request.user.is_superuser:
            return Response(
                {'error': 'You are not authorized to perform this action.'}, 
                status=401
            )

        apps = MobileAppSerializers(data=request.data)
        if not apps.is_valid():
            errors = apps.errors
            return Response(data=errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        apps.save()

        return Response(
            data={"message": "Mobile App added successfully!"}, status=201
        )


class MobileAppDetailView(APIView):

    permission_classes = [IsAdminUser, IsAuthenticated]

    def get_data(self, app_id: int):
        """
        Helper method to get app based on id
        """
        try:
            app = MobileApp.objects.get(id=app_id)
            return app
        except Exception as err:
            print(
                f"An error occurred while performing database operation: Get app by id {str(err)}"
            )
            return None

    def get(self, request, id):
        """
        Get app based on id
        """
        app = self.get_data(app_id=id)
        if not app:
            return Response({"error": "Mobile app not found!"}, 400)
        app = MobileAppSerializers(app)
        return Response(app.data)

    def put(self, request, id):
        """
        Update app based on id
        """
        app = self.get_data(app_id=id)
        if not app:
            return Response({"error": "Mobile app not found!"}, 400)

        _app = MobileAppSerializers(
            instance=app, data=request.data, partial=True
        )
        if not _app.is_valid():
            return Response(data=_app.errors, status=422)
        _app.save()
        return Response(
            {
                "message": "App details updated successfully!",
                "data": _app.data,
            },
            status=201,
        )

    def delete(self, request, id):
        """
        Delete app based on id
        """
        app = self.get_data(app_id=id)
        if not app:
            return Response({"error": "Mobile app not found!"}, 400)

        app = app.delete()
        return Response({"message": "App deleted successfully"}, status=200)


class UserMobileAppView(APIView):

    permission_classes = [IsAuthenticated]


    def post(self, request, id):
        data = request.data.copy()
        user = UserSerializer(request.user)
        user = user.data

        data.update({
            "mobile_app":id,
            "user": user.get("id")
        })
        user_app = UserMobileAppSerializers(data=data)
        
        if not user_app.is_valid():
            return Response(data=user_app.errors, status=422)

        user_app = user_app.save()
        
        return Response(data={"message": "Screenshot uploaded successfully"}, status=201)
