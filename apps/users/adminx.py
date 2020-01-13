from django.contrib.auth.models import Group, Permission
import xadmin
from xadmin.models import Log
from xadmin import views

from .models import UserProfile  #EmailVerifyRecord, Banner,


class BaseSetting(object):
    """X admin的全局配置设置"""
    # 主题功能开启
    enable_themes = True
    use_bootswatch = True


class GlobalSettings(object):
    """xadmin 全局配置参数信息设置"""
    site_title = "qxdq.Xyz"
    site_footer = "Copyright 2019-2020 boy"
    # 收起菜单
    menu_style = "accordion"

    def get_site_menu(self):
        return (
            {'title': '用户管理', 'menus': (
                {'title': '用户信息', 'url': self.get_model_url(UserProfile, 'changelist')},
            #    {'title': '用户验证', 'url': self.get_model_url(EmailVerifyRecord, 'changelist')},
            )},
            {'title': '系统管理', 'menus': (
             #   {'title': '首页轮播', 'url': self.get_model_url(Banner, 'changelist')},
                {'title': '用户分组', 'url': self.get_model_url(Group, 'changelist')},
                {'title': '用户权限', 'url': self.get_model_url(Permission, 'changelist')},
                {'title': '日志记录', 'url': self.get_model_url(Log, 'changelist')},
            )},
        )


class EmailVerifyRecordAdmin(object):
    """创建admin的管理类,这里不再是继承admin，而是继承object"""
    # 配置后台我们需要显示的列
    list_display = ['code', 'email', 'send_type', 'send_time']
    # 配置搜索字段,不做时间搜索
    search_fields = ['code', 'email', 'send_type']
    # 配置筛选字段
    list_filter = ['code', 'email', 'send_type', 'send_time']


class BannerAdmin(object):
    """创建banner的管理类"""
    list_display = ['title', 'image', 'url', 'index', 'add_time']
    search_fields = ['title', 'image', 'url', 'index']
    list_filter = ['title', 'image', 'url', 'index', 'add_time']


# 将model与admin管理器进行关联注册
#xadmin.site.register(EmailVerifyRecord, EmailVerifyRecordAdmin)
#xadmin.site.register(Banner, BannerAdmin)

# 将Xadmin全局管理器与我们的view绑定注册。
xadmin.site.register(views.BaseAdminView, BaseSetting)

# 将头部与脚部信息进行注册:
xadmin.site.register(views.CommAdminView, GlobalSettings)
