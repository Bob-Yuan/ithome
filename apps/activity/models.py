from datetime import datetime, date

from django.db import models

from users.models import UserProfile
# Create your models here.


class GoldCoinPrize(models.Model):
    """奖品列表"""

    name = models.CharField(max_length=50, verbose_name=u"奖品名")
    desc = models.CharField(max_length=300, verbose_name=u"奖品描述")
    price = models.IntegerField(default=999999, verbose_name=u"价格")
    is_banner = models.BooleanField(default=False, verbose_name=u"是否轮播")
    Stock_status = models.BooleanField(default=0, verbose_name=u"库存状态")
    # 修改image path,不能传y m 进来，不能加斜杠是一个相对路径，相对于setting中配置的media root
    image = models.ImageField(
        upload_to="GoldCoinPrize/%Y/%m",
        verbose_name=u"奖品封面图",
        max_length=100)
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"奖品"
        verbose_name_plural = verbose_name

    # 替代标签:course.lesson_set.count
    # def get_zj_nums(self):
    #     # 获取课程章节数的方法
    #     return self.lesson_set.all().count()

    # 获取学习这门课程的用户
    # 替代标签:course.usercourse_set.get_queryset|slice:":1"
    # def get_learn_users(self):
    #     # 谁的里面添加了它做外键，他都可以取出来
    #     return self.usercourse_set.all()[:5]

    def __str__(self):
        return self.name


class Records2048(models.Model):
    send_time = models.DateTimeField(default=date.today, verbose_name=u"游戏日期")
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
    goupiao_date = models.DateTimeField(default=date.today, verbose_name=u"购票日期")
    kaijiang_date = models.CharField(max_length=36, default="", verbose_name=u"开奖日期")
    type = models.CharField(max_length=50, default="", verbose_name=u"彩种")
    issue = models.IntegerField(default=0, verbose_name=u"期号")
    number1 = models.CharField(max_length=2, default=0, verbose_name=u"号码1")
    number2 = models.CharField(max_length=2, default=0, verbose_name=u"号码2")
    number3 = models.CharField(max_length=2, default=0, verbose_name=u"号码3")
    number4 = models.CharField(max_length=2, default=0, verbose_name=u"号码4")
    number5 = models.CharField(max_length=2, default=0, verbose_name=u"号码5")
    number6 = models.CharField(max_length=2, default=0, verbose_name=u"号码6")
    number7 = models.CharField(max_length=2, default=0, verbose_name=u"号码7")
    times = models.IntegerField(default=1, verbose_name=u"倍数")
    LotteryStatus = models.IntegerField(default=0, verbose_name=u"中奖状态")
    #LotteryStatus: 0:未开奖 1：一等奖 2：二等奖 3：三等奖 4：四等奖 5：五等奖 6：六等奖 10：未中奖
    # 11：一等奖 已兑奖 12：二等奖 已兑奖 13：三等奖 已兑奖 14：四等奖 已兑奖 15：五等奖 已兑奖 16：六等奖 已兑奖


class BigLotteryWinningNumbers(models.Model):
    issue_html = models.CharField(max_length=24, default="", verbose_name=u"期号html")
    issue_num = models.CharField(max_length=8, default="", verbose_name=u"期号")
    kaijiang_date = models.CharField(max_length=36, default="", verbose_name=u"开奖日期")
    red_balls_html = models.CharField(max_length=250, default="", verbose_name=u"红球html")
    blue_ball_html = models.CharField(max_length=60, default="", verbose_name=u"蓝球html")
    red_balls_nums = models.CharField(max_length=24, default="", verbose_name=u"红球号码")
    blue_ball_num = models.CharField(max_length=8, default="", verbose_name=u"蓝球号码")
