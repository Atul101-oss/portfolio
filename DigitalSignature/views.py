from django.shortcuts import render
from django.http import JsonResponse
import hashlib
import json
from django.views.decorators.csrf import csrf_exempt
from django.template.response import TemplateResponse
from .utils import hashGenerator
from .utils.keyGenerator import generate_user_keys
from .utils import pdfSigner
from .models import UserKey

@csrf_exempt
def getHash(request):
    if request.method == 'POST':
        input_text = request.POST.get('input_text', '')
        uploaded_file = request.FILES.get('file')

        hash_value_Text = None
        hash_value_File = None

        if input_text:
            hash_value_Text = hashGenerator.getHashofString(input_text)
        if uploaded_file:
            hash_value_File = hashGenerator.getHashofFile(uploaded_file)

        return JsonResponse({'hash_value': {
            'text': hash_value_Text,
            'string': input_text if input_text else None,
            'file': hash_value_File,
            'filename': uploaded_file.name if uploaded_file else None,
            'error': 'No input text or file provided' if not input_text and not uploaded_file else None
        }})
    else:
        return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def keyGenerator(request):
    if request.method == 'POST':
        if not request.user.is_authenticated:
            return JsonResponse({
                'error': 'Login required to generate RSA keypairs.',
                'login_required': True
            }, status=401)

        key_name = request.POST.get('key_name', 'RSA-2048 Keypair')
        user = request.user
        private_key_path, public_key_path = generate_user_keys(user)

        with open(private_key_path, 'r') as f:
            private_key = f.read()

        with open(public_key_path, 'r') as f:
            public_key = f.read()

        key_obj = UserKey.objects.create(
            user=user,
            key_name=key_name,
            private_key=private_key,
            public_key=public_key
        )

        return JsonResponse({
            'id': key_obj.id,
            'key_name': key_name,
            'private_key': private_key,
            'public_key': public_key,
            'is_saved': True,
            'username': user.username
        })
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def get_user_keys(request):
    if request.user.is_authenticated:
        keys_qs = UserKey.objects.filter(user=request.user).order_by('-created_at')
        keys_data = [{
            'id': k.id,
            'key_name': k.key_name,
            'private_key': k.private_key,
            'public_key': k.public_key,
            'created_at': k.created_at.strftime('%Y-%m-%d %H:%M:%S')
        } for k in keys_qs]
        return JsonResponse({
            'authenticated': True,
            'username': request.user.username,
            'keys': keys_data
        })
    else:
        return JsonResponse({
            'authenticated': False,
            'username': None,
            'keys': []
        })

@csrf_exempt
def delete_key(request, key_id):
    if request.method == 'POST' and request.user.is_authenticated:
        deleted_count, _ = UserKey.objects.filter(id=key_id, user=request.user).delete()
        if deleted_count > 0:
            return JsonResponse({'success': True, 'message': 'Key deleted successfully'})
        return JsonResponse({'success': False, 'error': 'Key not found'}, status=404)
    return JsonResponse({'success': False, 'error': 'Authentication required'}, status=403)

@csrf_exempt
def sign_document_view(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required to sign documents.', 'login_required': True}, status=401)

    uploaded_file = request.FILES.get('file')
    if not uploaded_file:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    key_id = request.POST.get('key_id')
    private_key_pem = request.POST.get('private_key', '')

    if key_id:
        try:
            key_obj = UserKey.objects.get(id=key_id, user=request.user)
            private_key_pem = key_obj.private_key
            public_key_pem = key_obj.public_key
            key_name = key_obj.key_name
        except UserKey.DoesNotExist:
            return JsonResponse({'error': 'Selected keypair not found'}, status=404)
    elif private_key_pem:
        key_name = 'Custom Key'
        public_key_pem = ''
    else:
        # Get latest key for user or error
        latest_key = UserKey.objects.filter(user=request.user).order_by('-created_at').first()
        if not latest_key:
            return JsonResponse({'error': 'No saved keypairs found. Please generate an RSA keypair first.'}, status=400)
        private_key_pem = latest_key.private_key
        public_key_pem = latest_key.public_key
        key_name = latest_key.key_name

    try:
        file_bytes = uploaded_file.read()
        signature_b64, sha256_hash = pdfSigner.sign_document(file_bytes, private_key_pem)
        
        return JsonResponse({
            'filename': uploaded_file.name,
            'filesize': len(file_bytes),
            'signature': signature_b64,
            'sha256': sha256_hash,
            'key_name': key_name,
            'public_key': public_key_pem
        })
    except Exception as e:
        return JsonResponse({'error': f'Failed to sign document: {str(e)}'}, status=500)

@csrf_exempt
def verify_document_view(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method'}, status=405)

    uploaded_file = request.FILES.get('file')
    if not uploaded_file:
        return JsonResponse({'error': 'No document file uploaded'}, status=400)

    signature_b64 = request.POST.get('signature', '')
    sig_file = request.FILES.get('sig_file')
    if sig_file and not signature_b64:
        signature_b64 = sig_file.read().decode('utf-8', errors='ignore')

    public_key_pem = request.POST.get('public_key', '')

    if not signature_b64:
        return JsonResponse({'error': 'Signature input or signature file is required.'}, status=400)
    if not public_key_pem:
        return JsonResponse({'error': 'Public key is required for verification.'}, status=400)

    try:
        file_bytes = uploaded_file.read()
        is_valid, sha256_hash, message = pdfSigner.verify_document_signature(
            file_bytes, signature_b64, public_key_pem
        )

        return JsonResponse({
            'filename': uploaded_file.name,
            'verified': is_valid,
            'sha256': sha256_hash,
            'message': message
        })
    except Exception as e:
        return JsonResponse({'error': f'Verification failed: {str(e)}'}, status=500)

def get_signature(request):
    return TemplateResponse(request, "react-pages/sites/digital-signature/index.html")