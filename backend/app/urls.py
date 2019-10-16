
from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^upload/$', ImageUploadView.as_view(), name=r"upload"), # upload images
    url(r'^list/$', ImageListView.as_view(), name=r"images"), # listing images
    url(r'^verify/$', VerifyImageView.as_view(), name=r"verify"), # verifying an image
    url(r'^reject/$', RejectImageView.as_view(), name=r"reject"), # rejecting an image
]
