from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_signature, name='get_signature'),
    path('getHash', views.getHash, name='getHash'),
    path('keyGenerator', views.keyGenerator, name='keyGenerator')
]