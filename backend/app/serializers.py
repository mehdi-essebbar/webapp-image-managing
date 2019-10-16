from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from project import settings
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import serializers

from .models import Image

def validate_image_extension(image):
    # validate image extension
    image_name = str(image)

    return image_name.lower().endswith(('.png', '.jpg', '.jpeg'))

class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()

    def validate(self, data):

        if not validate_image_extension(data['image']):
            raise serializers.ValidationError(_("jpg and png are the only accepted image extensions."))
        
        return data
    
    def save(self, request):
        new_image = Image(image=self.validated_data.get('image', ''),)
        new_image.save()
        return new_image

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = ('id', 'image', 'upload_timestamp', 'verified_flag', 'rejected_flag')

class VerifyImageSerializer(serializers.Serializer):
    id = serializers.CharField()

    def validate_id(self, id):
        try:
            int(id)
        except ValueError:
            raise serializers.ValidationError(_("The image id must be an integer."))

        try:
            self.image = Image.objects.get(id=int(id))
        except ObjectDoesNotExist:
            raise serializers.ValidationError(_("The image id provided does not exist in the Database."))

        return id
    
    def save(self, request):
        self.image.verified_flag = True
        self.image.save()


class RejectImageSerializer(serializers.Serializer):
    id = serializers.CharField()

    def validate_id(self, id):
        try:
            int(id)
        except ValueError:
            raise serializers.ValidationError(_("The image id must be an integer."))

        try:
            self.image = Image.objects.get(id=int(id))
        except ObjectDoesNotExist:
            raise serializers.ValidationError(_("The image id provided does not exist in the Database."))

        return id
    
    def save(self, request):
        self.image.rejected_flag = True
        self.image.save()
