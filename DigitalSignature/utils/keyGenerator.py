from pathlib import Path
current_dir = Path(__file__).resolve().parent.parent
print(current_dir)
import subprocess
import os
from DigitalSignature import models

def generate_user_keys(user=None):
    keys_dir = os.path.join(current_dir, "keys")
    os.makedirs(keys_dir, exist_ok=True)

    if hasattr(user, 'username'):
        username = user.username
    elif isinstance(user, str) and user:
        username = user
    else:
        username = "default_user"

    key_path = os.path.join(keys_dir, username)
    subprocess.run(["openssl", "genpkey", "-algorithm", "RSA", "-out", key_path])
    subprocess.run(["openssl", "pkey", "-pubout", "-in", key_path, "-out", key_path + ".pub"])
    
    if user and hasattr(user, 'username') and hasattr(user, 'pk'):
        models.UserKey.objects.update_or_create(
            user=user,
            defaults={
                'private_key': key_path,
                'public_key': key_path + ".pub"
            }
        )
    return key_path, key_path + ".pub"

if __name__ == "__main__":
    user = "default_user"
    private_key_path, public_key_path = generate_user_keys(user)
    print(f"Private Key: {private_key_path}")
    print(f"Public Key: {public_key_path}")
