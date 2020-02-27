from django.shortcuts import render
from django.views.generic.base import View

# Create your views here.


class Game2048(View):
    """2048view"""

    def get(self, request):
        return render(request, '2048.html')

    def post(self, request):
        # 不像用户咨询是一个新的。需要指明instance。不然无法修改，而是新增用户
        user_info_form = UserInfoForm(request.POST, instance=request.user)
        if user_info_form.is_valid():
            user_info_form.save()
            return HttpResponse(
                '{"status":"success"}',
                content_type='application/json')
        else:
            # 通过json的dumps方法把字典转换为json字符串
            return HttpResponse(
                json.dumps(
                    user_info_form.errors),
                content_type='application/json')