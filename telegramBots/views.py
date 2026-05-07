import os
from django.shortcuts import render
from django.template.response import TemplateResponse
from django.http import JsonResponse
import logging

# Create your views here.
def telegramBots(request):
    return TemplateResponse(request, "react-pages/sites/telegram-bots/index.html")

def bot_logs(request):
    """
    Returns the last 50 lines of the bots log file as JSON.
    """
    log_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'logs', 'bots.log')
    
    if not os.path.exists(log_file_path):
        return JsonResponse({'logs': []})
    
    try:
        with open(log_file_path, 'r') as f:
            # Read last 50 lines
            lines = f.readlines()
            last_lines = lines[-50:]
            return JsonResponse({'logs': [line.strip() for line in last_lines]})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)