from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    # path('generate_keys/', views.generate_keys, name='generate_keys'),
    # path('sign_document/', views.sign_document, name='sign_document'),
    # path('verify_signature/', views.verify_signature, name='verify_signature'),
]
