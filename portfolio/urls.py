"""
URL configuration for portfolio project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls')
)"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView
from . import views
# from . import DigitalSignature

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.react_home, name='react_home'),
    path('medical-diagnose/', views.medical_diagnose, name='medical_diagnose'),
    path('notesync/', views.notesync, name='notesync'),
    path('voicetype/', views.voicetype, name='voicetype'),
    path('react-testing/', views.react_testing, name='react-testing'),
    path('DigitalSignature/', include('DigitalSignature.urls'), name='digital_signature'),
    path('dashboard/', include('dashboard.urls'), name='dashboard'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('register/', views.register, name='register'),
    path("api/get/", views.get_message),
    path("api/post/", views.send_name),
    path("api/v1/", include("api_v1.urls")),
    # path(
    #     "/",
    #     # RedirectView.as_view(url="/static/reactHome/index.html")
    # ),
]
