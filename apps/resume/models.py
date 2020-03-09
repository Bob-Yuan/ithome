from django.db import models
from django.utils import timezone
# Create your models here.


class UserMessage(models.Model):
    message = models.CharField(max_length=500, verbose_name="留言信息")
    add_date = models.DateTimeField(verbose_name='保存日期', default=timezone.now)

    class Meta:
        verbose_name = "用户留言信息"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.message
