from django.urls import path, include
from django.views.generic import TemplateView

app_name = "activity"

urlpatterns = [
    path('2048/', TemplateView.as_view(template_name="2048.html"), name="2048"),
]