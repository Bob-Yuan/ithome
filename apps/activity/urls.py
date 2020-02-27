from django.urls import path, include
from django.views.generic import TemplateView

from activity.views import Game2048

app_name = "activity"

urlpatterns = [
    path('2048/', Game2048.as_view(), name="2048"),
]