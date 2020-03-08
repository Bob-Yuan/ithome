from django.shortcuts import render
from django.views.generic.base import View
# Create your views here.


class FuliView(View):
    def get(self, request):
        return render(request, 'QueryAssistant/fuli.html')
