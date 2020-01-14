import time

from django.shortcuts import render
from django.views.generic.base import View

from pure_pagination import Paginator, EmptyPage, PageNotAnInteger

from .models import Articles

from ithome_spider import ithome_spider


class ArticleIndexView(View):
    """首页view"""

    def get(self, request):
        obj_spider = ithome_spider.SpiderMain()
        obj_spider.craw()
        date = time.strftime("%Y-%m-%d", time.localtime())
        articles = Articles.objects.filter(t_date=date).order_by("-total_id")

        try:
            page = request.GET.get("page", 1)
        except PageNotAnInteger:
            page = 1
        p = Paginator(articles, 10, request=request)
        articles = p.page(page)

        return render(request, 'ithome_index.html', {"articles": articles})


class DateArticleListView(View):
    def get(self, request, t_date):
        articles = Articles.objects.filter(t_date=t_date).order_by("-total_id")

        try:
            page = request.GET.get("page", 1)
        except PageNotAnInteger:
            page = 1
        p = Paginator(articles, 10, request=request)
        articles = p.page(page)

        return render(request, 'ithome_index.html', {"articles": articles})


class ArticleView(View):
    """文章页view"""

    def get(self, request, total_id):
        article = Articles.objects.filter(total_id=total_id)
        return render(request, 'ithome_article.html', {"article": article[0]})
