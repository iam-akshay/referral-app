from django.contrib import admin
from django.urls import path
from .views import MobileAppView, MobileAppDetailView
from rest_framework import routers

urlpatterns = [
    path("", MobileAppView.as_view()),
    path("<int:id>", MobileAppDetailView.as_view()),
]
