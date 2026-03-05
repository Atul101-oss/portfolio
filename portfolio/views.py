from django.shortcuts import redirect, render
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
    path = os.path.join(settings.BASE_DIR, "static/reactHome/index.html")
    return FileResponse(open(path, "rb"))
    
def medical_diagnose(request):
    path = os.path.join(settings.BASE_DIR, "static/Medical-diagnose/index.html")
    return FileResponse(open(path, "rb"))
def login(request):
	pass

def logout(request):
	pass