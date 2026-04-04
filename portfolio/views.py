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
      return TemplateResponse(request, "reactHome/index.html")
    
def medical_diagnose(request):
    return TemplateResponse(request, "Medical-diagnose/index.html")

def notesync(request):
    return TemplateResponse(request, "notesync/index.html")

def voicetype(request):
    return TemplateResponse(request, "voicetype/index.html")

def react_testing(request):
    return TemplateResponse(request, "react-testing/index.html")




from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.forms import UserCreationForm
from django.middleware.csrf import get_token

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('dashboard')
    else:
        form = UserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})

def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                auth_login(request, user)
                return redirect('dashboard')
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})

def logout(request):
    auth_logout(request)
    next_url = request.GET.get('next', 'react_home')
    return redirect(next_url)
