"""ithome URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.static import serve
from django.views.generic import TemplateView
import xadmin

from users.views import IndexView, LoginView, LogoutView, RegisterView #, ActiveUserView, ForgetPwdView, ResetView
from ithome.settings import MEDIA_ROOT

urlpatterns = [
    path('admin/', admin.site.urls),
    path('xadmin/', xadmin.site.urls),
    path('captcha/', include('captcha.urls')),
    path('ueditor/', include('DjangoUeditor.urls')),

    path('', TemplateView.as_view(template_name="main_index.html"), name="index"),
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),
    path("register/", RegisterView.as_view(), name="register"),
    # path('active/<active_code>/', ActiveUserView.as_view(), name="user_active"),
    # path('forget/', ForgetPwdView.as_view(), name="forget_pwd"),
    # path('reset/<active_code>/', ResetView.as_view(), name="reset_pwd"),

    path("users/", include("users.urls", namespace="users")),
    path("article/", include("article.urls", namespace="article")),
    path("activity/", include("activity.urls", namespace="activity")),

    path("media/<path:path>", serve, {"document_root": MEDIA_ROOT}),
]
