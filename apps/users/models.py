from datetime import datetime

from django.db import models
from django.contrib.auth.models import AbstractUser


class UserProfile(AbstractUser):
    # 自定义的性别选择规则
    GENDER_CHOICES = (
        ("male", u"男"),
        ("female", u"女")
    )
    # 昵称
    nick_name = models.CharField(max_length=50, verbose_name=u"昵称", default="")
    # 生日，可以为空
    birthday = models.DateField(verbose_name=u"生日", null=True, blank=True)
    # 性别 只能男或女，默认女
    gender = models.CharField(
        max_length=6,
        verbose_name=u"性别",
        choices=GENDER_CHOICES,
        default="female")
    # 地址
    address = models.CharField(max_length=100, verbose_name="地址", default="")
    # 电话
    mobile = models.CharField(
        max_length=11,
        null=True,
        blank=True,
        verbose_name=u"电话")
    # 头像 默认使用default.png
    image = models.ImageField(
        upload_to="image/%Y/%m",
        default=u"image/default.png",
        max_length=100,
        verbose_name=u"头像"
    )

    # meta信息，即后台栏目名
    class Meta:
        verbose_name = "用户信息"
        verbose_name_plural = verbose_name

    # 重载__str__方法，打印实例会打印username，username为继承自AbstractUser
    def __str__(self):
        return self.username

    # 获取用户未读消息的数量
    # def unread_nums(self):
    #     from operation.models import UserMessage
    #     return UserMessage.objects.filter(has_read=False, user=self.id).count()


class EmailVerifyRecord(models.Model):
    """邮箱验证码model"""
    SEND_CHOICES = (
        ("register", u"注册"),
        ("forget", u"找回密码"),
        ("update_email", u"修改邮箱"),
    )
    code = models.CharField(max_length=20, verbose_name=u"验证码")
    # 未设置null = true blank = true 默认不可为空
    email = models.EmailField(max_length=50, verbose_name=u"邮箱")
    send_type = models.CharField(
        choices=SEND_CHOICES,
        max_length=20,
        verbose_name=u"验证码类型")
    # 这里的now得去掉(),不去掉会根据编译时间。而不是根据实例化时间。
    send_time = models.DateTimeField(default=datetime.now, verbose_name=u"发送时间")

    class Meta:
        verbose_name = "邮箱验证码"
        verbose_name_plural = verbose_name

    # 重载str方法使后台不再直接显示object
    def __str__(self):
        return '{0}({1})'.format(self.code, self.email)


# class Banner(models.Model):
#     """轮播图model"""
#     title = models.CharField(max_length=100, verbose_name=u"标题")
#     image = models.ImageField(
#         upload_to="banner/%Y/%m",
#         verbose_name=u"轮播图",
#         max_length=100)
#     url = models.URLField(max_length=200, verbose_name=u"访问地址")
#     # 默认index很大靠后。想要靠前修改index值。
#     index = models.IntegerField(default=100, verbose_name=u"顺序")
#     add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")
#
#     class Meta:
#         verbose_name = u"轮播图"
#         verbose_name_plural = verbose_name
#
#     # 重载__str__方法使后台不再直接显示object
#
#     def __str__(self):
#         return '{0}(位于第{1}位)'.format(self.title, self.index)

class UserMessage(models.Model):
    """用户消息表"""
    # 因为我们的消息有两种:发给全员和发给某一个用户。
    # 所以如果使用外键，每个消息会对应要有用户。很难实现全员消息。

    # 机智版 为0发给所有用户，不为0就是发给用户的id
    user = models.IntegerField(default=0, verbose_name=u"接收用户")
    message = models.CharField(max_length=500, verbose_name=u"消息内容")

    # 是否已读: 布尔类型 BooleanField False未读,True表示已读
    has_read = models.BooleanField(default=False, verbose_name=u"是否已读")
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"用户消息"
        verbose_name_plural = verbose_name

    def __str__(self):
        return '用户({0})接收了{1} '.format(self.user, self.message)