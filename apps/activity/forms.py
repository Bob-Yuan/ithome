from django import forms

from captcha.fields import CaptchaField
from .models import Records2048


class LoginForm(forms.Form):
    """登录表单验证"""
    # 用户名密码不能为空
    email = forms.EmailField(required=True)
    # 密码不能小于5位
    password = forms.CharField(required=True, min_length=5)
    captcha = CaptchaField(error_messages={"invalid": u"验证码错误"})


class UserInfoForm(forms.ModelForm):
    """用于个人中心修改个人信息"""
    class Meta:
        model = Records2048
        fields = ['nick_name', 'gender', 'birthday', 'address', 'mobile']


class Records2048Form(forms.ModelForm):
    class Meta:
        model = Records2048
        fields = ['score']


class BigLottery(forms.ModelForm):
    #user_id date type issue number1 number2 number3 number4 number5 number6 number7 times zhongjiang duijiang
    class Meta:
        pass

