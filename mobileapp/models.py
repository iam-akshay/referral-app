from django.db import models

class MobileApp(models.Model):
    name = models.CharField(max_length=64, unique=True)
    link = models.URLField(max_length=256)
    category = models.CharField(max_length=100)
    sub_category = models.CharField(max_length=100)
    points = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now=True)
    
    # TODO: upload App Logo
    # logo = models.ImageField


    def __str__(self):
        return f"{self.name} - {self.points}"
