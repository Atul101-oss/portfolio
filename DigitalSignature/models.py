from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class UserKey(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='digital_keys')
    key_name = models.CharField(max_length=100, default='RSA-2048 Keypair')
    private_key = models.TextField()
    public_key = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.user.username} - {self.key_name}"