from django.urls import path, include
from django.views.generic import TemplateView

from activity.views import Game2048View, LotteryView, MyLotteryView

app_name = "activity"

urlpatterns = [
    path('2048/', Game2048View.as_view(), name="2048"),
    path('lottery/', LotteryView.as_view(), name="lottery"),
    path('lottery_my', MyLotteryView.as_view(), name="mylottery")
]