from django.urls import path

from .views import IndexView, UnicodeView, FuliView

app_name = "QurtyAssistant"

urlpatterns = [
    path('index/', IndexView.as_view(), name="index"),
    path('fuli/', FuliView.as_view(), name="fuli"),
    path('unicode/', UnicodeView.as_view(), name="unicode"),
]