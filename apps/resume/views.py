from django.shortcuts import render
from django.http import FileResponse
from django.views.generic.base import View

# Create your views here.
from .models import UserMessage


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
    file = open('./static/download/袁博-python-web.docx', 'rb')
    response = FileResponse(file)
    response['Content-Type'] = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    response['Content-Disposition'] = 'attachment;filename= '+'袁博-python-web'.encode('utf-8').decode('ISO-8859-1')+'.docx'
    return response
