import datetime

from django.db import models

from users.models import UserProfile
# Create your models here.


class Records2048(models.Model):
    send_time = models.DateTimeField(default=datetime.date.today, verbose_name=u"游戏日期")
    user_id = models.CharField(max_length=11, default=0, verbose_name=u"用户id")
    user_name = models.CharField(max_length=50, default=0, verbose_name=u"用户名称")
    score = models.IntegerField(default=0, verbose_name=u"得分")

    class Meta:
        verbose_name = "2048得分"
        verbose_name_plural = verbose_name

    # 重载str方法使后台不再直接显示object
    def __str__(self):
        return '{0}-{1}'.format(self.send_time, self.user_name)


class LotteryInfo(models.Model):
    type = models.CharField(max_length=20, default="", verbose_name=u"彩票类型")
    issue = models.CharField(max_length=8, default="", verbose_name=u"期号")
    kaijiang_date = models.CharField(max_length=36, default="", verbose_name=u"开奖日期")


class BigLotteryUserBuy(models.Model):
    user_id = models.CharField(max_length=11, default=0, verbose_name=u"用户id")
    goupiao_date = models.DateTimeField(default=datetime.date.today, verbose_name=u"购票日期")
    kaijiang_date = models.CharField(max_length=36, default="", verbose_name=u"开奖日期")
    type = models.CharField(max_length=50, default="", verbose_name=u"彩种")
    issue = models.IntegerField(default=0,verbose_name=u"期号")
    number1 = models.IntegerField(default=0,verbose_name=u"号码1")
    number2 = models.IntegerField(default=0, verbose_name=u"号码2")
    number3 = models.IntegerField(default=0, verbose_name=u"号码3")
    number4 = models.IntegerField(default=0, verbose_name=u"号码4")
    number5 = models.IntegerField(default=0, verbose_name=u"号码5")
    number6 = models.IntegerField(default=0, verbose_name=u"号码6")
    number7 = models.IntegerField(default=0, verbose_name=u"号码7")
    times = models.IntegerField(default=1, verbose_name=u"倍数")
    LotteryStatus = models.IntegerField(default=0, verbose_name=u"中奖状态")


class BigLotteryWinningNumbers(models.Model):
    issue = models.CharField(max_length=24, default="", verbose_name=u"期号")
    kaijiang_date = models.CharField(max_length=36, default="", verbose_name=u"开奖日期")
    red_balls = models.CharField(max_length=250, default="", verbose_name=u"红球")
    blue_ball = models.CharField(max_length=60, default="", verbose_name=u"蓝球")
