import datetime
import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.generic.base import View
from django.db.models import Q

from .models import Records2048, BigLotteryUserBuy, BigLotteryWinningNumbers, LotteryInfo
from users.models import UserProfile
# Create your views here.


class Game2048View(View):
    """2048view"""

    def get(self, request):
        #rep = render(request, '2048.html')
        #rep.set_cookie("session_id", 12345)
        #print(request.user.id, request.user.username, request.user.email)
        #print(request.user.is_authenticated())

        records = Records2048.objects.filter(send_time=datetime.date.today()).order_by("-score")[0:10]
        return render(request, 'activity/2048.html', {"records": records})

    def post(self, request):
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
        else:
            return HttpResponse(
                '{"status":"fail","error":"未登录！"}',
                content_type='application/json')


class LotteryView(View):
    def get(self, request):
        #需要向前端返回期号
        credits = 0
        lottery_info = LotteryInfo.objects.order_by('-id')[0]
        if request.user.id != None:
            user = UserProfile.objects.get(id=request.user.id)
            credits = user.credits
        return render(request, 'activity/lottery.html', {"credits": credits, "lottery_info": lottery_info})

    def post(self, request):
        data = json.loads(request.body)

        if request.user.id != None:
            user = UserProfile.objects.get(id=request.user.id)
            credits = int(user.credits)
            if credits<2*len(data["tickets"])*int(data["times"]):
                data = {
                    'status': 2,
                    "msg": "积分不足，投注失败！",
                    'credits': credits
                }
                return JsonResponse(data)
            else:
                user.credits = user.credits - 2*len(data["tickets"])*int(data["times"])
                user.save()

                tickets = data["tickets"]
                num_tickets = len(tickets)
                for i in range(0, num_tickets):
                    ABiglotteryTickets = BigLotteryUserBuy()
                    ABiglotteryTickets.user_id = request.user.id
                    ABiglotteryTickets.kaijiang_date = data["kaijiang_date"]
                    print(data["kaijiang_date"])
                    ABiglotteryTickets.goupiaodate = datetime.date.today()
                    ABiglotteryTickets.type = data["type"]
                    # 需要校验是否在该期购买时间内
                    ABiglotteryTickets.issue = int(data["issue"])
                    nums = tickets[i].split(" ")
                    ABiglotteryTickets.number1 = nums[0]
                    ABiglotteryTickets.number2 = nums[1]
                    ABiglotteryTickets.number3 = nums[2]
                    ABiglotteryTickets.number4 = nums[3]
                    ABiglotteryTickets.number5 = nums[4]
                    ABiglotteryTickets.number6 = nums[5]
                    ABiglotteryTickets.number7 = nums[6]
                    ABiglotteryTickets.times = int(data["times"])
                    ABiglotteryTickets.save()

                data = {
                    'status': 1,
                    "msg": "投注成功！",
                    "credits": user.credits
                }
                return JsonResponse(data)
        else:
            data = {
                'status': 2,
                "msg": "未登录！"
            }
            return JsonResponse(data)


class MyLotteryView(View):
    def checkStatus(self, request):
        if request.user.id != None:
            user_buy_status_0 = BigLotteryUserBuy.objects.filter(user_id=request.user.id, LotteryStatus=0)
            newest_lottery = LotteryInfo.objects.filter(type="fcssq")
            for a_user_buy in user_buy_status_0:
                aa

    def get(self, request):
        credits = 0

        if request.user.id != None:
            user = UserProfile.objects.get(id=request.user.id)
            credits = user.credits

            user_buy_big_lottery = BigLotteryUserBuy.objects.filter(user_id=request.user.id)
            big_lottery_winning_numbers = BigLotteryWinningNumbers.objects.all().order_by('-id')[:15]
            return render(request, 'activity/lottery_my.html', {"user_buy_big_lottery": user_buy_big_lottery, "big_lottery_winning_numbers": big_lottery_winning_numbers,
                                                        "credits": credits})

        return render(request, 'activity/lottery_my.html', {"credits": credits})