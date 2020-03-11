import json

import smtplib
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication

from django.shortcuts import render
from django.http import FileResponse, HttpResponse
from django.views.generic.base import View
from django.core.mail import EmailMultiAlternatives

# Create your views here.
from .models import UserMessage
from ithome.settings import EMAIL_FROM


class IndexView(View):
    def get(self, request):
        return render(request, "resume/index.html", {'sendMessageFlag': 0})


class DaxianView(View):
    def get(self, request):
        return render(request, "daxian/index.html", {'sendMessageFlag': 0})


class LeaveMessageView(View):
    user_message = UserMessage()

    def post(self, request):
        page_sign = request.POST.get("page_sign", "resume_index")
        self.user_message.message = request.POST.get("message", "")
        self.user_message.save()
        if page_sign == "resume_index":
            return render(request, "resume/index.html", {'sendMessageFlag': 1})
        elif page_sign == "daxian_index":
            return render(request, "daxian/index.html", {'sendMessageFlag': 1})


def download_resume(request):
    file = open('./static/download/pythonweb-袁博-15850587369.pdf', 'rb')
    response = FileResponse(file)
    response['Content-Type'] = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    response['Content-Disposition'] = 'attachment;filename= '+'pythonweb-袁博-15850587369'.encode('utf-8').decode('ISO-8859-1')+'.pdf'
    return response


class SendResumeView(View):
    def post(self, request):
        # subject 主题 content 内容 to_addr 是一个列表，发送给哪些人
        # data = json.loads(request.body)
        # to_addr = data["email"]
        # subject = "袁博-python-15850587369"
        # content = "简历请查收"
        #
        # try:
        #     msg = EmailMultiAlternatives(subject, content, EMAIL_FROM, [to_addr])
        #
        #     msg.content_subtype = "html"
        #
        #     # 添加附件（可选）
        #     msg.attach_file('./static/download/pythonweb-袁博-15850587369.pdf')
        #
        #     # 发送
        #     msg.send()
        #     return HttpResponse('{"status":"1"}', content_type='application/json')
        # except:
        #     return HttpResponse('{"status":"2"}', content_type='application/json')
        try:
            data = json.loads(request.body)
            to_addr = data["email"]

            sender = EMAIL_FROM
            receiver = to_addr
            smtpserver = 'smtp.qq.com'
            username = 'yuanbo95@qq.com'
            password = 'mppyzxmyaaxgbebh'
            mail_title = '袁博-python-15850587369'

            message = MIMEMultipart()
            message['From'] = sender
            message['To'] = receiver
            message['Subject'] = Header(mail_title, 'utf-8')

            message.attach(MIMEText('简历请查收', 'plain', 'utf-8'))

            part = MIMEApplication(open('./static/download/pythonweb-袁博-15850587369.pdf', 'rb').read())
            part.add_header('Content-Disposition', 'attachment', filename="pythonweb-袁博-15850587369.pdf")
            message.attach(part)

            smtpObj = smtplib.SMTP_SSL(host=smtpserver)
            smtpObj.connect(host=smtpserver, port=465)
            smtpObj.login(username, password)
            smtpObj.sendmail(sender, receiver, message.as_string())
            print("邮件发送成功！！！")
            smtpObj.quit()

            return HttpResponse('{"status":"1"}', content_type='application/json')
        except:
            print("邮件发送失败！！！")
            return HttpResponse('{"status":"2"}', content_type='application/json')