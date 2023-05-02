from django.urls import path
from .views import UserView

urlpatterns = [
    path("userinfo/", UserView.as_view()),
]
