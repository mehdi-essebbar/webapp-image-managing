from django.utils.translation import ugettext_lazy as _
from django.shortcuts import render
from .serializers import ( ImageUploadSerializer, ImageSerializer,
                VerifyImageSerializer, RejectImageSerializer)

from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, ListAPIView

from .models import Image

class MyPaginationClass(PageNumberPagination):
    page_size = 16
    page_size_query_param = 'page_size'
    max_page_size = 1000

class ImageUploadView(GenericAPIView):
    serializer_class=ImageUploadSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(request)
        
        msg = {"detail": _("Image uploaded successfully.")}
        return Response(msg, status=status.HTTP_201_CREATED)

class ImageListView(ListAPIView):
    serializer_class = ImageSerializer
    pagination_class = MyPaginationClass

    def get_queryset(self):
         return Image.objects.all().order_by('upload_timestamp')

class VerifyImageView(GenericAPIView):
    serializer_class = VerifyImageSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(request)
        
        msg = {"detail": _("Image verified successfully.")}
        return Response(msg, status=status.HTTP_201_CREATED)    

class RejectImageView(GenericAPIView):
    serializer_class = RejectImageSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(request)
        
        msg = {"detail": _("Image rejected successfully.")}
        return Response(msg, status=status.HTTP_201_CREATED)  
