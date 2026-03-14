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

def test_api(request):
    manual = get_projects_manual(request)
    print(manual.content.decode())
    serializer = get_projects_serializer(request)
    return JsonResponse({
        "manual": manual,
        "serializer": serializer
    })