from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_signature, name='get_signature'),
    path('getHash', views.getHash, name='getHash'),
    path('getHash/', views.getHash, name='getHash_slash'),
    path('keyGenerator', views.keyGenerator, name='keyGenerator'),
    path('keyGenerator/', views.keyGenerator, name='keyGenerator_slash'),
    path('userKeys/', views.get_user_keys, name='user_keys'),
    path('deleteKey/<int:key_id>/', views.delete_key, name='delete_key'),
    path('signDocument/', views.sign_document_view, name='sign_document'),
    path('verifyDocument/', views.verify_document_view, name='verify_document'),
]