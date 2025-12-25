from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from places import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'places', views.PlaceViewSet, basename='places')

urlpatterns = [
    path('admin/', admin.site.urls), # default admin route
    path('api/', include(router.urls)), # default base /api router
    path('api/get_place/', views.get_place, name='get_place'),  # post route to get place details from a given list of ids
    path('api/get_places_mini/', views.get_places_mini)  # endpoint to fetch only name, des, lat, long, catagory, image of all places for planner page
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
