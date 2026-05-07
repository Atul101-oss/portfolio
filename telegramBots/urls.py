from django.urls import path
from . import views

urlpatterns = [
    path("", views.telegramBots, name="telegramBots"),
    path("logs/", views.bot_logs, name="bot_logs"),
]
    