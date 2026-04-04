from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class UserKey(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    private_key = models.FilePathField(path="/DigitalSignature/keys/")
    public_key = models.FilePathField(path="/DigitalSignature/keys/")

    def __str__(self):
        return self.user.username