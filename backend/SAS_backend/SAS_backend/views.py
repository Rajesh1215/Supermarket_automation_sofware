from django.shortcuts import render
from django.http import HttpResponse


def Home(request):
    return HttpResponse("This is first project")