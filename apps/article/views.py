import time

from django.shortcuts import render
from django.views.generic.base import View

from pure_pagination import Paginator, PageNotAnInteger

from .models import Articles
from users.models import UserProfile


class ArticleIndexView(View):
    """首页view"""

    def get(self, request):
        date = time.strftime("%Y-%m-%d", time.localtime())
        articles = Articles.objects.filter(t_date=date).order_by("-total_id")

        try:
            page = request.GET.get("page", 1)
        except PageNotAnInteger:
            page = 1
        p = Paginator(articles, 10, request=request)
        articles = p.page(page)

        # if request.user.id != None:
        #     if UserProfile.objects.filter(id=request.user.id).exists():
        #         user = UserProfile.objects.get(id=request.user.id)
        #         return render(request, 'ithome_index.html', {"articles": articles, "user": user})

        return render(request, 'ithome/ithome_index.html', {"articles": articles})


class DateArticleListView(View):
    def get(self, request, t_date):
        articles = Articles.objects.filter(t_date=t_date).order_by("-total_id")

        try:
            page = request.GET.get("page", 1)
        except PageNotAnInteger:
            page = 1
        p = Paginator(articles, 10, request=request)
        articles = p.page(page)

        # if request.user.id != None:
        #     if UserProfile.objects.filter(id=request.user.id).exists():
        #         user = UserProfile.objects.get(id=request.user.id)
        #         return render(request, 'ithome_index.html', {"articles": articles, "user": user})

        return render(request, 'ithome/ithome_index.html', {"articles": articles})


class ArticleView(View):
    """文章页view"""

    def get(self, request, total_id):
        article = Articles.objects.filter(total_id=total_id)

        # if request.user.id != None:
        #     if UserProfile.objects.filter(id=request.user.id).exists():
        #         user = UserProfile.objects.get(id=request.user.id)
        #         return render(request, 'ithome_article.html', {"article": article[0], "user": user})

        return render(request, 'ithome/ithome_article.html', {"article": article[0]})
