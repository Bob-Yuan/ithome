from django.shortcuts import render
from django.views.generic.base import View

from .models import Articles


class IndexView(View):
    """首页view"""

    def get(self, request):
        articles = Articles.objects.filter(t_date="2020-01-10")[:6]
        return render(request, 'index.html', {"articles": articles})
