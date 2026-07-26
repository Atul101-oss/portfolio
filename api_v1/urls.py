from django.urls import path
from . import views

urlpatterns = [
    path('', views.test_api, name="test_api"),
    path("dashboard/", views.dashboard_api, name="dashboard_api"),
    path("projects_serializer/", views.get_projects_serializer, name="get_projects_serializer"),
    path("projects_manual/", views.get_projects_manual, name="get_projects_manual"),
    # path("projects/<int:id>/", views.get_project, name="get_project"),
]