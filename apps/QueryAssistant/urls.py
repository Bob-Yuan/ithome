from django.urls import path

from .views import FuliView

app_name = "QurtyAssistant"

urlpatterns = [
    path('fuli/', FuliView.as_view(), name="fuli"),
]