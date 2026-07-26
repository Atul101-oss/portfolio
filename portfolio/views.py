from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.template.response import TemplateResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import FileResponse
from django.conf import settings
import os

@api_view(["GET"])
def get_message(request):
    return Response({
        "message": "Hello from Django API"
    })

@api_view(["POST"])
def send_name(request):
    print("request")
    name = request.data.get("name")
    return Response({
        "reply": f"Hello {name}, data received!"
    })

def react_home(request):
      return TemplateResponse(request, "react-pages/sites/portfolio/index.html")
    
def medical_diagnose(request):
    return TemplateResponse(request, "react-pages/sites/medical-diagnose/index.html")

def notesync(request):
    return TemplateResponse(request, "react-pages/sites/notesync/index.html")

def voicetype(request):
    return TemplateResponse(request, "react-pages/sites/voicetype/index.html")

def react_testing(request):
    return HttpResponse("GoodBye!")




from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.forms import UserCreationForm
from django.middleware.csrf import get_token

def register(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    next_url = request.GET.get('next', 'dashboard')
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect(next_url)
    else:
        form = UserCreationForm()
    return render(request, 'accounts/register.html', {'form': form, 'next': next_url})

def login(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    next_url = request.GET.get('next', 'dashboard')
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                auth_login(request, user)
                return redirect(next_url if next_url else 'dashboard')
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form, 'next': next_url})

def logout(request):
    auth_logout(request)
    next_url = request.GET.get('next', 'react_home')
    return redirect(next_url)

