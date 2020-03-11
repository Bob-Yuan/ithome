"""
Django settings for ithome project.

Generated by 'django-admin startproject' using Django 2.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))
sys.path.insert(0, os.path.join(BASE_DIR, 'extra_apps'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'y1gp(&mt+=kvvcp$@)19x9-ot0a=%+30_*77jz=zz-%5i=_(fg'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'pure_pagination',
    'captcha',
    'DjangoUeditor',
    'xadmin',
    'crispy_forms',
    'article',
    'users',
    'activity',
    'QueryAssistant',
    'resume',
]

AUTH_USER_MODEL = "users.UserProfile"

AUTHENTICATION_BACKENDS = (
    'users.views.CustomBackend',
)


# cron tasks
CRONJOBS = [
    #('*/1 * * * *', 'ithome_spider.ithome_spider.start', '>>' + os.path.join(BASE_DIR, 'log/time.log'))
    ('*/1 * * * *', 'ithome_spider.ithome_spider.start')
]
"""
     python3 manage.py crontab add  添加定时任务
     python3 manage.py crontab remove 删除定时任务
     python3 manage.py crontab show 查看定时任务
    * * * * * command
    第一个*表示分钟(0-59) 第二个*表示小时(0-23) 依次类推 每个月的哪一天(1-31) 月份(1-12) 周几(0-6) shell脚本或者命令
    两种表示方法，
    一种写具体数字，表示定时
     0 6 * * * commands >> /tmp/test.log # 每天早上6点执行, 并将信息追加到test.log中
     */n  n代表每多长时间
     * */2 * * * commands >> /tmp/test.log    #2小时

"""

PAGINATION_SETTINGS = {
    'PAGE_RANGE_DISPLAYED': 4,
    'MARGIN_PAGES_DISPLAYED': 2,
    'SHOW_FIRST_PAGE_WHEN_INVALID': True,
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ithome.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.media',
            ],
        },
    },
]

WSGI_APPLICATION = 'ithome.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES_HOST = '127.0.0.1'
DATABASES_NAME = 'ithome'
DATABASES_USER = 'root'
DATABASES_PASSWORD = '123456'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': DATABASES_NAME,
        'USER': DATABASES_USER,
        'PASSWORD': DATABASES_PASSWORD,
        'HOST': DATABASES_HOST
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

EMAIL_HOST = "smtp.qq.com"
EMAIL_PORT = 25
EMAIL_HOST_USER = "yuanbo95@qq.com"
EMAIL_HOST_PASSWORD = "83812355qq=="   #这个是授权码，不是密码
EMAIL_USE_TLS = False
EMAIL_FROM = "yuanbo95@qq.com"

CAPTCHA_LENGTH = 4
CAPTCHA_IMAGE_SIZE = (80, 35)
CAPTCHA_TEXT_FIELD_TEMPLATE = BASE_DIR+"/templates/captcha/field_template.html"
CAPTCHA_OUTPUT_FORMAT = "%(text_field)s %(hidden_field)s %(image)s"
#CAPTCHA_FIELD_TEMPLATE =

ip_addr = "http://127.0.0.1:8000"