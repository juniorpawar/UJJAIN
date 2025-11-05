from rest_framework import serializers
from .models import Place, PlaceDetail, Gallery

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ['id', 'media_type', 'file', 'caption']

class PlaceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceDetail
        fields = ['history', 'user_guides', 'did_you_know']

class PlaceSerializer(serializers.ModelSerializer):
    details = PlaceDetailSerializer(read_only=True)
    gallery = GallerySerializer(many=True, read_only=True)

    class Meta:
        model = Place
        fields = [
            'id', 'name', 'description', 'image', 'category',
            'latitude', 'longitude', 'open_time', 'close_time',
            'details', 'gallery'
        ]
