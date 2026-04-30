from django.shortcuts import render
from django.http import JsonResponse
import hashlib
from django.views.decorators.csrf import csrf_exempt
from .utils import hashGenerator
from .utils.keyGenerator import generate_user_keys

# Create your views here.


def getHash(request):
    if request.method == 'POST':
        input_text = request.POST.get('input_text', '')
        uploaded_file = request.FILES.get('file')

        if input_text:
            hash_value_Text = hashGenerator.getHashofString(input_text)
        elif uploaded_file:
            hash_value_File = hashGenerator.getHashofFile(uploaded_file)
        return JsonResponse({'hash_value': {
            'text': hash_value_Text if input_text else None,
            'string': input_text if input_text else None,
            'file': hash_value_File if uploaded_file else None,
            'filename': uploaded_file.name if uploaded_file else None,
            'error': 'No input text or file provided' if not input_text and not uploaded_file else None
        }})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
@csrf_exempt
def keyGenerator(request):
    if request.method == 'POST':
        user = request.user if request.user.is_authenticated else "default_user"
        private_key_path, public_key_path = generate_user_keys(user)
        print(f"Private Key: {private_key_path}")
        print(f"Public Key: {public_key_path}")

        with open(private_key_path, 'r') as f:
            private_key = f.read()

        with open(public_key_path, 'r') as f:
            public_key = f.read()

        return JsonResponse({
            'private_key': private_key,
            'public_key': public_key
        })
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
def get_signature(request):
    return render(request, 'uploadFile.html')