import os
from django.shortcuts import render
from django.template.response import TemplateResponse
from django.http import JsonResponse
import logging

logger = logging.getLogger(__name__)

def telegramBots(request):
    return TemplateResponse(request, "react-pages/sites/telegram-bots/index.html")

def parse_visual_events(lines):
    """Parse raw log lines into visual 3-step pipeline event cards."""
    events = []
    for idx, line in enumerate(lines):
        timestamp = line.split(" - ")[0] if " - " in line else ""
        
        if "[UPDATE_RECEIVED]" in line:
            detail = line.split("[UPDATE_RECEIVED]")[-1].strip()
            events.append({
                "id": f"evt-{idx}",
                "timestamp": timestamp,
                "step": 1,
                "stage": "RECEIVE",
                "stage_label": "📩 1. Telegram Webhook Request Received",
                "badge": "INCOMING REQUEST",
                "color": "#60a5fa",
                "bg": "rgba(96, 165, 250, 0.12)",
                "border": "rgba(96, 165, 250, 0.3)",
                "raw": line,
                "detail": detail
            })
        elif "HTTP Request: POST" in line or "sendMessage" in line or "sendPhoto" in line or "sendDocument" in line:
            detail = line.split("- ")[-1].strip() if "- " in line else line
            events.append({
                "id": f"evt-{idx}",
                "timestamp": timestamp,
                "step": 3,
                "stage": "RESPONSE",
                "stage_label": "📤 3. Response Delivered to Telegram API",
                "badge": "SERVER RESPONSE SENT",
                "color": "#34d399",
                "bg": "rgba(52, 211, 153, 0.12)",
                "border": "rgba(52, 211, 153, 0.3)",
                "raw": line,
                "detail": detail
            })
        elif "starting" in line or "started" in line or "Processing" in line or "Rendering" in line or "Converting" in line:
            detail = line.split("- ")[-1].strip() if "- " in line else line
            events.append({
                "id": f"evt-{idx}",
                "timestamp": timestamp,
                "step": 2,
                "stage": "PROCESS",
                "stage_label": "⚙️ 2. Django Server Task Execution",
                "badge": "SERVER PROCESSING",
                "color": "#c084fc",
                "bg": "rgba(192, 132, 252, 0.12)",
                "border": "rgba(192, 132, 252, 0.3)",
                "raw": line,
                "detail": detail
            })
        else:
            events.append({
                "id": f"evt-{idx}",
                "timestamp": timestamp,
                "step": 2,
                "stage": "LOG",
                "stage_label": "ℹ️ Backend Event Log",
                "badge": "SYSTEM EVENT",
                "color": "#38bdf8",
                "bg": "rgba(56, 189, 248, 0.08)",
                "border": "rgba(56, 189, 248, 0.2)",
                "raw": line,
                "detail": line
            })
    return events

def bot_logs(request):
    """
    Returns structured visual pipeline events filtered by `user_id` query parameter.
    """
    user_id = request.GET.get('user_id', '').strip()
    log_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'logs', 'bots.log')
    
    if not os.path.exists(log_file_path):
        return JsonResponse({'logs': [], 'events': [], 'filtered_by': user_id if user_id else None})
    
    try:
        with open(log_file_path, 'r') as f:
            lines = [line.strip() for line in f.readlines() if line.strip()]
            
            if user_id:
                user_pattern = f"User ID: {user_id}"
                filtered_lines = [l for l in lines if user_pattern in l or f"[{user_id}]" in l]
                selected = filtered_lines[-60:]
                return JsonResponse({
                    'logs': selected,
                    'events': parse_visual_events(selected),
                    'filtered_by': user_id,
                    'total_matches': len(filtered_lines)
                })
            else:
                system_logs = [l for l in lines if "User ID:" not in l][-30:]
                return JsonResponse({
                    'logs': system_logs,
                    'events': parse_visual_events(system_logs),
                    'filtered_by': None,
                    'notice': 'Enter your Telegram User ID to stream your private 3-step interaction pipeline.'
                })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)