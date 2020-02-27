import datetime

from django.db import models

from users.models import UserProfile
# Create your models here.


class Records2048(models.Model):
    send_time = models.DateTimeField(default=datetime.date.today, verbose_name=u"游戏日期")
    user_id = models.CharField(max_length=11, default=0, verbose_name=u"用户id")
    # 未设置null = true blank = true 默认不可为空
    score = models.IntegerField(default=0, verbose_name=u"得分")

    class Meta:
        verbose_name = "2048得分"
        verbose_name_plural = verbose_name

    # 重载str方法使后台不再直接显示object
    def __str__(self):
        return '{0}'.format(self.user_id)
