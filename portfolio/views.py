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

def login(request):
	pass

def logout(request):
	pass