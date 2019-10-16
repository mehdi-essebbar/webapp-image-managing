from django.db import models

# Create your models here.
class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    upload_timestamp =  models.DateTimeField(auto_now_add=True)
    verified_flag = models.BooleanField(default=False)
    rejected_flag = models.BooleanField(default=False)

    def __str__(self):
        return str(self.image)
