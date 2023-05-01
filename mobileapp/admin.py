from django.contrib import admin
from .models import MobileApp

class MobileAppAdmin(admin.ModelAdmin):
    list_display = ("name", "link", "points", "category", "sub_category", "created_at", "updated_at")

admin.site.register(MobileApp, MobileAppAdmin)