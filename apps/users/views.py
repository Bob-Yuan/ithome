import json

from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.views.generic.base import View
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.hashers import make_password
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q
from pure_pagination import Paginator, EmptyPage, PageNotAnInteger

from ithome.settings import ip_addr
from utils.email_send import send_register_eamil
# from courses.models import Course
# from operation.models import UserCourse, UserFavorite
# from organization.models import CourseOrg, Teacher
from .models import UserProfile, UserMessage, EmailVerifyRecord #, Banner
from .forms import LoginForm, RegisterForm, ActiveForm, ForgetForm, ModifyPwdForm, UploadImageForm, UserInfoForm


# Create your views here.


class CustomBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UserProfile.objects.get(Q(username=username)|Q(email=username))
            if user.check_password(password):
                return user
        except Exception as e:
            return None


class IndexView(View):
    """首页view"""
    def get(self, requset):
        return render(requset, 'main_index.html')

    # def get(self, request):
    #     # 取出轮播图
    #     all_banner = Banner.objects.all().order_by('index')[:5]
    #     # 正常位课程
    #     courses = Course.objects.filter(is_banner=False)[:6]
    #     # 轮播图课程取三个
    #     banner_courses = Course.objects.filter(is_banner=True)[:3]
    #     # 课程机构
    #     course_orgs = CourseOrg.objects.all()[:15]
    #     return render(request, 'index.html', {
    #         "all_banner": all_banner,
    #         "courses": courses,
    #         "banner_courses": banner_courses,
    #         "course_orgs": course_orgs,
    #     })


class UserInfoView(LoginRequiredMixin, View):
    login_url = '/login/'
    redirect_field_name = 'next'

    def get(self, request):
        return render(request, "user/userinfo.html")

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


class LoginView(View):
    # 直接调用get方法免去判断
    def get(self, request):
        # render就是渲染html返回用户
        # render三变量: request 模板名称 一个字典写明传给前端的值
        redirect_url = request.GET.get('next', '')
        login_form = LoginForm()
        return render(request, "user/login.html", {"redirect_url": redirect_url, "login_form": login_form, "myflag": 0})

    def post(self, request):
        # 类实例化需要一个字典参数dict:request.POST就是一个QueryDict所以直接传入
        # POST中的usernamepassword，会对应到form中
        data = json.loads(request.body)
        login_form = LoginForm(data)

        # is_valid判断我们字段是否有错执行我们原有逻辑，验证失败跳回login页面
        if login_form.is_valid():
            # 取不到时为空，username，password为前端页面name值
            email_account = data["email"]
            pass_word = data["password"]
            redirect_url = data["redirect_url"]

            # 成功返回user对象,失败返回null
            user = authenticate(username=email_account, password=pass_word)

            # 如果不是null说明验证成功
            if user is not None:
                # 只有当用户激活时才给登录
                if user.is_active:
                    # login_in 两参数：request, user
                    # 实际是对request写了一部分东西进去，然后在render的时候：
                    # request是要render回去的。这些信息也就随着返回浏览器。完成登录
                    login(request, user)
                    # 跳转到首页 user request会被带回到首页
                    # 增加重定向回原网页。

                    data = {
                        "status": 1,
                        "msg": "登录成功",
                        'redirect_url': redirect_url,
                    }
                    return JsonResponse(data)
                # 即用户未激活跳转登录，提示未激活
                else:
                    data = {
                        "status": 2,
                        'msg': "用户未激活! 请前往邮箱进行激活!",
                    }
                    return JsonResponse(data)
            # 仅当用户真的密码出错时
            else:
                data = {
                    "status": 2,
                    'msg': "用户名或密码错误!",
                }
                return JsonResponse(data)
        # 验证不成功跳回登录页面
        # 没有成功说明里面的值是None，并再次跳转回主页面
        else:
            data = {
                "status": 2,
                'msg': "验证码错误!",
            }
            return JsonResponse(data)


class LogoutView(View):
    def get(self, request):
        # django自带的logout
        logout(request)
        # 重定向到首页,
        return HttpResponseRedirect(reverse("index"))


class RegisterView(View):
    """注册功能的view"""
    def get(self, request):
        # 添加验证码
        register_form = RegisterForm()
        return render(request, "user/register.html", {'register_form': register_form, "myflag": 0})

    def post(self, request):
        # 实例化form
        data = json.loads(request.body)
        register_form = RegisterForm(data)
        if register_form.is_valid():
            email_account = data["email"]
            pass_word = data["password"]

            # 用户查重
            if UserProfile.objects.filter(email=email_account):
                data = {
                    'status': 2,
                    "msg": "用户已存在！"
                }
                return JsonResponse(data)

            # 发送注册激活邮件
            # send_register_eamil(ip_addr, email_account, "register")  暂时先不开启
            data = {
                'status': 1,
                "msg": "注册成功！请注意邮箱激活链接！"
            }

            # 实例化一个user_profile对象，将前台值存入
            user_profile = UserProfile()
            user_profile.email = email_account
            user_profile.username = email_account

            # 默认激活状态为false
            user_profile.is_active = True        #暂时先不用激活，注意部署时改为False

            # 加密password进行保存
            user_profile.password = make_password(pass_word)
            user_profile.save()

            # 邮件激活
            user_message = UserMessage()
            user_message.user = user_profile.id
            user_message.message = "欢迎注册慕学在线网!! --系统自动消息"
            user_message.save()

            return JsonResponse(data)
        # 注册邮箱form验证失败
        else:
            data = {
                'status': 2,
                "msg": "验证码错误！"
            }
            return JsonResponse(data)


class ActiveUserView(View):
    """激活用户的view"""

    def get(self, request, active_code):
        # 查询邮箱验证记录是否存在
        all_record = EmailVerifyRecord.objects.filter(code=active_code)
        # 如果不为空也就是有用户
        print("request.GET", request.GET)
        print("active_code", active_code)
        active_form = ActiveForm(request.GET)
        if all_record:
            for record in all_record:
                # 获取到对应的邮箱
                email = record.email
                # 查找到邮箱对应的user
                user = UserProfile.objects.get(email=email)
                user.is_active = True
                user.save()
                # 激活成功跳转到登录页面
                return render(request, "user/login.html", {
                    "msg": "激活成功！您现在可以登录了！", "active_form": active_form, "myflag": 1 })
        # 自己瞎输的验证码
        else:
            return render(request, "user/register.html", {"msg": "您的激活链接无效", "active_form": active_form, "myflag": 2})


class ForgetPwdView(View):
    """用户忘记密码的处理view"""
    # get方法直接返回页面

    def get(self, request):
        # 给忘记密码页面加上验证码
        active_form = ActiveForm(request.POST)
        return render(request, "user/forgetpwd.html", {"active_form": active_form, "myflag": 0})
    # post方法实现

    def post(self, request):
        data = json.loads(request.body)
        forget_form = ForgetForm(data)
        # form验证合法情况下取出email
        if forget_form.is_valid():
            email = data["email"]
            #
            all_record = UserProfile.objects.filter(email=email)
            if all_record:
                send_register_eamil(ip_addr, email, "forget")
                # 发送完毕返回登录页面并显示发送邮件成功。
                data = {
                    'status': 1,
                    "msg": "重置密码邮件已发送,请注意查收"
                }
                return JsonResponse(data)
            else:
                data = {
                    'status': 2,
                    "msg": "您的邮箱未注册！"
                }
                return JsonResponse(data)
        # 如果表单验证失败也就是他验证码输错等。
        else:
            data = {
                'status': 2,
                "msg": "验证码错误"
            }
            return JsonResponse(data)


class ResetView(View):
    """重置密码的view"""
    def get(self, request, active_code):
        # 查询邮箱验证记录是否存在
        all_record = EmailVerifyRecord.objects.filter(code=active_code)
        # 如果不为空也就是有用户
        active_form = ActiveForm(request.GET)
        if all_record:
            for record in all_record:
                # 获取到对应的邮箱
                email = record.email
                # 将email传回来
                # 只传回active_code
                return render(request, "user/password_reset.html", {"active_code": active_code})
        # 自己瞎输的验证码
        else:
            return render(
                request, "user/forgetpwd.html", {"msg": "您的重置密码链接无效,请重新请求", "active_form": active_form, "myflag": 0})

    def post(self, request, active_code):
        modiypwd_form = ModifyPwdForm(request.POST)
        login_form = LoginForm()
        if modiypwd_form.is_valid():
            pwd1 = request.POST.get("password1", "")
            pwd2 = request.POST.get("password2", "")
            # email = request.POST.get("email", "")
            # 如果两次密码不相等，返回错误信息
            if pwd1 != pwd2:
                return render(request, "user/password_reset.html", {"active_code": active_code, "msg": "密码不一致"})
            # 如果密码一致
            # 找到激活码对应的邮箱
            all_record = EmailVerifyRecord.objects.filter(code=active_code)
            for record in all_record:
                email = record.email
            user = UserProfile.objects.get(email=email)
            # 加密成密文
            user.password = make_password(pwd2)
            # save保存到数据库
            user.save()
            return render(request, "user/login.html", {"user": user, "msg": "密码修改成功，请登录", "login_form": login_form, "myflag": 1})

        # 验证失败说明密码位数不够。
        else:
            active_code = request.POST.get("active_code", "")
            return render(
                request, "user/password_reset.html", {
                    "active_code": active_code,  "msg": "密码小于5位"})


class UploadImageView(LoginRequiredMixin, View):
    """用户上传图片的view:用于修改头像"""
    login_url = '/login/'
    redirect_field_name = 'next'

    def post(self, request):
        # 这时候用户上传的文件就已经被保存到imageform了 ，为modelform添加instance值直接保存
        image_form = UploadImageForm(
            request.POST, request.FILES, instance=request.user)
        if image_form.is_valid():
            image_form.save()
            # # 取出cleaned data中的值,一个dict
            # image = image_form.cleaned_data['image']
            # request.user.image = image
            # request.user.save()
            return HttpResponse(
                '{"status":"success"}',
                content_type='application/json')
        else:
            return HttpResponse(
                '{"status":"fail"}',
                content_type='application/json')


class UpdatePwdView(LoginRequiredMixin, View):
    """在个人中心修改用户密码"""
    login_url = '/login/'
    redirect_field_name = 'next'

    def post(self, request):
        modify_form = ModifyPwdForm(request.POST)
        if modify_form.is_valid():
            pwd1 = request.POST.get("password1", "")
            pwd2 = request.POST.get("password2", "")
            # 如果两次密码不相等，返回错误信息
            if pwd1 != pwd2:
                return HttpResponse(
                    '{"status":"fail", "msg":"密码不一致"}',
                    content_type='application/json')
            # 如果密码一致
            user = request.user
            # 加密成密文
            user.password = make_password(pwd2)
            # save保存到数据库
            user.save()
            return HttpResponse(
                '{"status":"success"}',
                content_type='application/json')
        # 验证失败说明密码位数不够。
        else:
            # 通过json的dumps方法把字典转换为json字符串
            return HttpResponse(
                json.dumps(
                    modify_form.errors),
                content_type='application/json')


class SendEmailCodeView(LoginRequiredMixin, View):
    """发送邮箱验证码的view:"""

    def get(self, request):
        # 取出需要发送的邮件
        email = request.GET.get("email", "")

        # 不能是已注册的邮箱
        if UserProfile.objects.filter(email=email):
            return HttpResponse(
                '{"email":"邮箱已经存在"}',
                content_type='application/json')
        send_register_eamil(ip_addr, email, "update_email")
        return HttpResponse(
            '{"status":"success"}',
            content_type='application/json')


class UpdateEmailView(LoginRequiredMixin, View):
    """修改邮箱的view:"""
    login_url = '/login/'
    redirect_field_name = 'next'

    def post(self, request):
        email = request.POST.get("email", "")
        code = request.POST.get("code", "")

        existed_records = EmailVerifyRecord.objects.filter(
            email=email, code=code, send_type='update_email')
        if existed_records:
            user = request.user
            user.email = email
            user.save()
            return HttpResponse(
                '{"status":"success"}',
                content_type='application/json')
        else:
            return HttpResponse(
                '{"email":"验证码无效"}',
                content_type='application/json')


# class MyMessageView(LoginRequiredMixin, View):
#     """我的消息"""
#     login_url = '/login/'
#     redirect_field_name = 'next'
#
#     def get(self, request):
#         all_message = UserMessage.objects.filter(user=request.user.id)
#
#         # 用户进入个人中心消息页面，清空未读消息记录
#         all_unread_messages = UserMessage.objects.filter(
#             user=request.user.id, has_read=False)
#         for unread_message in all_unread_messages:
#             unread_message.has_read = True
#             unread_message.save()
#         # 对课程机构进行分页
#         # 尝试获取前台get请求传递过来的page参数
#         # 如果是不合法的配置参数默认返回第一页
#         try:
#             page = request.GET.get('page', 1)
#         except PageNotAnInteger:
#             page = 1
#         # 这里指从allorg中取五个出来，每页显示5个
#         p = Paginator(all_message, 4)
#         messages = p.page(page)
#         return render(request, "usercenter-message.html", {
#             "messages": messages,
#         })
#
#
# class MyCourseView(LoginRequiredMixin, View):
#     """个人中心页我的课程"""
#     login_url = '/login/'
#     redirect_field_name = 'next'
#
#     def get(self, request):
#         user_courses = UserCourse.objects.filter(user=request.user)
#         return render(request, "usercenter-mycourse.html", {
#             "user_courses": user_courses,
#         })
#
#
# class MyFavOrgView(LoginRequiredMixin, View):
#     """我收藏的机构"""
#     login_url = '/login/'
#     redirect_field_name = 'next'
#
#     def get(self, request):
#         org_list = []
#         fav_orgs = UserFavorite.objects.filter(user=request.user, fav_type=2)
#         # 上面的fav_orgs只是存放了id。我们还需要通过id找到机构对象
#         for fav_org in fav_orgs:
#             # 取出fav_id也就是机构的id。
#             org_id = fav_org.fav_id
#             # 获取这个机构对象
#             org = CourseOrg.objects.get(id=org_id)
#             org_list.append(org)
#         return render(request, "usercenter-fav-org.html", {
#             "org_list": org_list,
#         })
#
#
# class MyFavTeacherView(LoginRequiredMixin, View):
#     """我收藏的授课讲师"""
#     login_url = '/login/'
#     redirect_field_name = 'next'
#
#     def get(self, request):
#         teacher_list = []
#         fav_teachers = UserFavorite.objects.filter(
#             user=request.user, fav_type=3)
#         # 上面的fav_orgs只是存放了id。我们还需要通过id找到机构对象
#         for fav_teacher in fav_teachers:
#             # 取出fav_id也就是机构的id。
#             teacher_id = fav_teacher.fav_id
#             # 获取这个机构对象
#             teacher = Teacher.objects.get(id=teacher_id)
#             teacher_list.append(teacher)
#         return render(request, "usercenter-fav-teacher.html", {
#             "teacher_list": teacher_list,
#         })
#
#
# class MyFavCourseView(LoginRequiredMixin, View):
#     """我收藏的课程"""
#     login_url = '/login/'
#     redirect_field_name = 'next'
#
#     def get(self, request):
#         course_list = []
#         fav_courses = UserFavorite.objects.filter(
#             user=request.user, fav_type=1)
#         # 上面的fav_orgs只是存放了id。我们还需要通过id找到机构对象
#         for fav_course in fav_courses:
#             # 取出fav_id也就是机构的id。
#             course_id = fav_course.fav_id
#             # 获取这个机构对象
#             course = Course.objects.get(id=course_id)
#             course_list.append(course)
#         return render(request, "usercenter-fav-course.html", {
#             "course_list": course_list,
#         })
#
#
