from django.urls import path
from .views import UserView, LogoutView

urlpatterns = [
    path("userinfo/", UserView.as_view()),
    path("logout/", LogoutView.as_view()),
]
