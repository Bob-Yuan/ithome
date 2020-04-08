from django.shortcuts import render
from django.views.generic.base import View
# Create your views here.


class IndexView(View):
    def get(self, request):
        return render(request, 'QueryAssistant/index.html')


class UnicodeView(View):
    def get(self, request):
        return render(request, 'QueryAssistant/Unicode.html')


class FuliView(View):
    def get(self, request):
        return render(request, 'QueryAssistant/fuli.html')
