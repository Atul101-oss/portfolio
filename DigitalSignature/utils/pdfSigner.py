import os
import tempfile
import subprocess
import base64
import hashlib

def sign_document(file_bytes, private_key_pem):
    """
    Signs file_bytes using private_key_pem (SHA-256 with RSA).
    Returns (signature_b64, sha256_hex_digest).
    """
    sha256_hash = hashlib.sha256(file_bytes).hexdigest()
    
    with tempfile.TemporaryDirectory() as tmpdir:
        doc_path = os.path.join(tmpdir, 'document.tmp')
        key_path = os.path.join(tmpdir, 'private.key')

        with open(doc_path, 'wb') as f:
            f.write(file_bytes)
            
        with open(key_path, 'w') as f:
            f.write(private_key_pem.strip())

        proc = subprocess.run(
            ['openssl', 'dgst', '-sha256', '-sign', key_path, doc_path],
            capture_output=True
        )
        if proc.returncode != 0:
            raise ValueError(f"OpenSSL signing failure: {proc.stderr.decode('utf-8')}")

        signature_b64 = base64.b64encode(proc.stdout).decode('utf-8')
        return signature_b64, sha256_hash


def verify_document_signature(file_bytes, signature_b64, public_key_pem):
    """
    Verifies signature_b64 for file_bytes against public_key_pem (SHA-256 with RSA).
    Returns (is_valid: bool, sha256_hex_digest: str, message: str).
    """
    sha256_hash = hashlib.sha256(file_bytes).hexdigest()

    try:
        sig_bytes = base64.b64decode(signature_b64.strip())
    except Exception as e:
        return False, sha256_hash, f"Invalid Base64 signature string: {str(e)}"

    with tempfile.TemporaryDirectory() as tmpdir:
        doc_path = os.path.join(tmpdir, 'document.tmp')
        key_path = os.path.join(tmpdir, 'public.key')
        sig_path = os.path.join(tmpdir, 'signature.bin')

        with open(doc_path, 'wb') as f:
            f.write(file_bytes)

        with open(key_path, 'w') as f:
            f.write(public_key_pem.strip())

        with open(sig_path, 'wb') as f:
            f.write(sig_bytes)

        proc = subprocess.run(
            ['openssl', 'dgst', '-sha256', '-verify', key_path, '-signature', sig_path, doc_path],
            capture_output=True,
            text=True
        )

        if proc.returncode == 0 and "Verified OK" in proc.stdout:
            return True, sha256_hash, "Signature is VALID. The document is authentic and has not been tampered with."
        else:
            return False, sha256_hash, "Signature is INVALID. The document has been modified or the public key does not match."
