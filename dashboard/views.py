from django.template.response import TemplateResponse
from django.contrib.auth.decorators import login_required

@login_required(login_url='login')
def dashboard(request):
    return TemplateResponse(request, "react-pages/sites/dashboard/index.html", {
        'user': request.user
    })