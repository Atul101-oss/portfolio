from django.shortcuts import render
from django.http import HttpResponse, JsonResponse


# Create your views here.
def dashboard(request):
    return HttpResponse(f"Welcome back {request.user} to the dashboard!")