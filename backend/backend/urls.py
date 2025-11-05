# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from places import views  # ← आपकी app का नाम “places” है

from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'places', views.PlaceViewSet, basename='places')

urlpatterns = [
    path('admin/', admin.site.urls),        # Django admin panel
    path('api/', include(router.urls)),     # ✅ API route starts with /api/
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
