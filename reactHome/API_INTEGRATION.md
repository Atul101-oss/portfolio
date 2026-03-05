# Portfolio Website - Django API Integration Guide

## Overview
This portfolio website is built with React and ready to connect to a Django REST API backend.

## Django Backend Setup

### Expected API Endpoints

#### 1. Projects API
**Endpoint:** `GET /api/projects/`

**Expected Response:**
```json
[
  {
    "id": 1,
    "title": "Project Title",
    "description": "Project description",
    "technologies": ["React", "Django", "PostgreSQL"],
    "github_url": "https://github.com/username/repo",
    "live_url": "https://demo.com",
    "image_url": "https://example.com/image.jpg",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

**Django Model Example:**
```python
from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.JSONField(default=list)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    image_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
```

#### 2. Contact API
**Endpoint:** `POST /api/contact/`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss..."
}
```

**Django Model Example:**
```python
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
```

### Django REST Framework Setup

1. Install required packages:
```bash
pip install djangorestframework django-cors-headers
```

2. Add to `settings.py`:
```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',
    'your_app',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

# CORS Settings (adjust for production)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ]
}
```

3. Create serializers:
```python
from rest_framework import serializers

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
```

4. Create views:
```python
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

@api_view(['POST'])
def contact_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Message sent successfully'})
    return Response(serializer.errors, status=400)
```

5. Configure URLs:
```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/contact/', contact_message),
]
```

## Frontend Configuration

Update `/src/app/api/config.ts` with your Django backend URL:

```typescript
export const API_BASE_URL = 'https://your-backend-url.com/api';
```

## Features Ready for Backend Integration

✅ **Projects Section** - Fetches and displays projects from Django API
✅ **Contact Form** - Sends messages to Django backend
✅ **Loading States** - Shows loading indicators during API calls
✅ **Error Handling** - Graceful error handling for failed requests

## Next Steps

1. Set up your Django backend with the models and endpoints described above
2. Update the `API_BASE_URL` in `/src/app/api/config.ts`
3. Test the API integration
4. Add authentication if needed
5. Deploy both frontend and backend

## Optional Enhancements

- Add authentication (JWT tokens)
- Add admin panel for managing projects
- Add blog functionality
- Add image upload for projects
- Add analytics
