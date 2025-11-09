from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from places import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'places', views.PlaceViewSet, basename='places')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    path('api/get_place/', views.get_place, name='get_place'),
    path('api/plan/', views.plan_places, name='plan_places'),

    path('api/all_places/', views.get_all_places, name='get_all_places'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
