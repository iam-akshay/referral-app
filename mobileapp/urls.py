from django.contrib import admin
from django.urls import path
from .views import MobileAppView, MobileAppDetailView, UserMobileAppView

urlpatterns = [
    path("", MobileAppView.as_view()),
    path("<int:id>", MobileAppDetailView.as_view()),
    path("<int:id>/user", UserMobileAppView.as_view()),
]
