import datetime
import json

from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.base import View
from django.db.models import Q

from .models import Records2048
from users.models import UserProfile
# Create your views here.


class Game2048(View):
    """2048view"""

    def get(self, request):
        #rep = render(request, '2048.html')
        #rep.set_cookie("session_id", 12345)
        #print(request.user.id, request.user.username, request.user.email)
        #print(request.user.is_authenticated())

        records = Records2048.objects.filter(send_time=datetime.date.today()).order_by("-score")[0:10]

        if request.user.id != None:
            if UserProfile.objects.filter(id=request.user.id).exists():
                user = UserProfile.objects.get(id=request.user.id)
                return render(request, '2048.html', {"user": user, "records": records})
        return render(request, '2048.html', {"records": records})

    def post(self, request):
        print(hasattr(request.user, 'id'))
        print(request.user.id)
        data = json.loads(request.body)
        new_score = data["score"]
        if request.user.id != None:
            if Records2048.objects.filter(Q(user_id=request.user.id), Q(send_time=datetime.date.today())).exists():
                #更新记录
                database_score_obj = Records2048.objects.get(Q(user_id=request.user.id), Q(send_time=datetime.date.today()))
                if new_score > database_score_obj.score:
                    database_score_obj.score = new_score
                    database_score_obj.save()
            else:
                #创建新记录
                new_record = Records2048()
                new_record.send_time = datetime.date.today()
                new_record.user_id = request.user.id
                if request.user.nick_name != "":
                    new_record.user_name = request.user.nick_name
                else:
                    new_record.user_name = request.user.email
                new_record.score = new_score
                new_record.save()
            #数据库比较数据，存入或舍弃
        #print(request.user.id, request.user.username, request.user.email)
        return HttpResponse(
                    '{"status":"success"}',
                    content_type='application/json')
    #     # 不像用户咨询是一个新的。需要指明instance。不然无法修改，而是新增用户
    #     user_info_form = UserInfoForm(request.POST, instance=request.user)
    #     if user_info_form.is_valid():
    #         user_info_form.save()
    #         return HttpResponse(
    #             '{"status":"success"}',
    #             content_type='application/json')
    #     else:
    #         # 通过json的dumps方法把字典转换为json字符串
    #         return HttpResponse(
    #             json.dumps(
    #                 user_info_form.errors),
    #             content_type='application/json')