import time
from random import Random

from users.models import EmailVerifyRecord
from django.core.mail import send_mail, EmailMessage
from ithome.settings import EMAIL_FROM
from django.template import loader


def generate_random_str(random_length=8):
    """生成随机字符串"""
    str = ''
    # 生成字符串的可选字符串
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    length = len(chars) - 1
    random = Random()
    for i in range(random_length):
        str += chars[random.randint(0, length)]
    return str


def send_register_eamil(ip_addr, email, send_type="register"):
    """发送注册邮件"""
    # 发送之前先保存到数据库，到时候查询链接是否存在
    # 实例化一个EmailVerifyRecord对象
    email_record = EmailVerifyRecord()
    # 生成随机的code放入链接
    if send_type == "update_email":
        code = generate_random_str(4)
    else:
        code = generate_random_str(16)
    email_record.code = code
    email_record.email = email
    email_record.send_type = send_type
    email_record.save()

    if send_type == "register":
        email_title = "qxdq.xyz注册激活链接"
        # email_body = "欢迎注册慕学在线网:  请点击下面的链接激活你的账号: http://127.0.0.1:8000/active/{0}".format(code)

        email_body = loader.render_to_string(
            "email/email_register.html",  # 需要渲染的html模板
            {
                "active_code": code,  # 参数
                "ip_addr": ip_addr
            }
        )
        #方法一：EmailMessage对象
        msg = EmailMessage(email_title, email_body, EMAIL_FROM, [email])
        msg.content_subtype = "html"
        # 方法二：使用Django内置函数完成邮件发送。四个参数：主题，邮件内容，从哪里发，接受者list
        # send_status = send_mail(email_title, email_body, EMAIL_FROM, [email])
    elif send_type == "forget":
        email_title = "qxdq.xyz找回密码链接"
        email_body = loader.render_to_string(
            "email/email_forget.html",  # 需要渲染的html模板
            {
                "reset_code": code  # 参数
            }
        )
        msg = EmailMessage(email_title, email_body, EMAIL_FROM, [email])
        msg.content_subtype = "html"
    elif send_type == "update_email":
        email_title = "qxdq.xyz修改邮箱验证码"
        email_body = loader.render_to_string(
            "email/email_update_email.html",  # 需要渲染的html模板
            {
                "active_code": code  # 参数
            }
        )
        msg = EmailMessage(email_title, email_body, EMAIL_FROM, [email])
        msg.content_subtype = "html"
        print(1,email_title)
        print(2,email_body)
        print(3,EMAIL_FROM)
        print(4,email)

    send_status = msg.send()
    # 如果发送成功
    if send_status:
        print(send_type, "邮件发送成功！")
        return 0
