# main/admin.py

from django.contrib import admin
from .models import Place, PlaceDetail, Gallery

class GalleryInline(admin.TabularInline):
    model = Gallery
    extra = 1

class PlaceDetailInline(admin.StackedInline):
    model = PlaceDetail
    extra = 1

@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'open_time', 'close_time')
    inlines = [PlaceDetailInline, GalleryInline]

admin.site.register(Gallery)