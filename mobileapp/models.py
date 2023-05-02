from django.db import models
from django.contrib.auth.models import User

class MobileApp(models.Model):
    name = models.CharField(max_length=64, unique=True)
    link = models.URLField(max_length=256)
    category = models.CharField(max_length=100)
    sub_category = models.CharField(max_length=100)
    points = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now=True)

    logo = models.ImageField(upload_to="app-logo/", null=True)


    def __str__(self):
        return f"{self.name} - {self.points}"
    

class UserMobileApp(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mobile_app = models.ForeignKey(MobileApp, on_delete=models.CASCADE)
    screenshot = models.ImageField(upload_to="screenshot/")
