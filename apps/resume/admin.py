from django.contrib import admin

# Register your models here.
from .models import UserMessage

admin.site.register(UserMessage)