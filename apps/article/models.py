from django.db import models

# Create your models here.


class Articles(models.Model):
    """文章"""

    total_id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    t_date = models.CharField(max_length=32, verbose_name="日期")
    day_id = models.IntegerField(verbose_name="当日ID")
    url = models.CharField(max_length=100, verbose_name="url")
    title = models.CharField(max_length=100, verbose_name="标题")
    meta = models.CharField(max_length=500, verbose_name="meta")
    excerpt = models.CharField(max_length=150, verbose_name="摘录")
    paragraph = models.TextField(verbose_name="段落")

    class Meta:
        verbose_name = u"课程"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title