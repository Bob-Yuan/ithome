from django.urls import path
from .views import IndexView, DaxianView, LeaveMessageView, download_resume, SendResumeView

app_name = 'resume'

urlpatterns = [
    path('', IndexView.as_view(), name="index"),
    path('daxian/', DaxianView.as_view(), name="daxian"),
    path('leaveMessage/', LeaveMessageView.as_view()),
    path('download/resume/', download_resume, name="download"),
    path('send_resume/', SendResumeView.as_view(), name="send_resume"),
]
