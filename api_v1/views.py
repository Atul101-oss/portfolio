from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from . import models
# Create your views here.

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Technology
        fields = ["name"]

class ProjectSerializer(serializers.ModelSerializer):
    # technologies = TechnologySerializer(many=True)
    technologies = serializers.StringRelatedField(many=True)
    class Meta:
        model = models.Projects
        fields = '__all__'


@api_view(["GET"])
def get_projects_serializer(request):
    projects = models.Projects.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)
    # return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def get_projects_manual(request):
    projects = models.Projects.objects.all()
    data = []
    for project in projects:
        data.append({
            "id": project.id,
            "title": project.title,
            "description": project.description,
            "technologies": [tech.name for tech in project.technologies.all()],
            "github_url": project.github_url,
            "live_url": project.live_url,
            "image_url": project.image_url.url if project.image_url else None,
            "created_at": project.created_at,
        })
    return JsonResponse(data, safe=False)

@api_view(["GET"])
def get_project(request, project_id):
    try:
        project = models.Projects.objects.get(website=project_id)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
    except models.Projects.DoesNotExist:
        return Response({"error": "Project not found"}, status=404)

@api_view(["GET"])
def test_api(request):
    projects = models.Projects.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response({
        "status": "ok",
        "message": "API v1 is active",
        "projects_count": projects.count(),
        "projects": serializer.data
    })


@api_view(["GET"])
def dashboard_api(request):
    user_data = {
        "is_authenticated": request.user.is_authenticated,
        "username": request.user.username if request.user.is_authenticated else "",
        "email": request.user.email if request.user.is_authenticated else "",
    }
    
    projects = models.Projects.objects.all()
    project_serializer = ProjectSerializer(projects, many=True)
    
    return Response({
        "user": user_data,
        "projects": project_serializer.data
    })