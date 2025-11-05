from django.db import models

# Create your models here.
from django.db import models

class Place(models.Model):
    CATEGORY_CHOICES = [
        ('temple', 'Temple'),
        ('ghat', 'Ghat'),
        ('eatery', 'Eatery'),
        ('heritage', 'Heritage Site'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.FileField(upload_to='media/',blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    latitude = models.FloatField()
    longitude = models.FloatField()
    open_time = models.TimeField()
    close_time = models.TimeField()

    def __str__(self):
        return self.name


class PlaceDetail(models.Model):
    place = models.OneToOneField(Place, on_delete=models.CASCADE, related_name='details')
    history = models.TextField(blank=True, null=True)
    user_guides = models.TextField(blank=True, null=True)
    did_you_know = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Details of {self.place.name}"

class Gallery(models.Model):
    MEDIA_TYPES = [
        ('image', 'Image'),
        ('video', 'Video'),
        ('audio', 'Audio'),
    ]

    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='gallery')
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPES)
    file = models.FileField(upload_to='gallery/')
    caption = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"{self.media_type} for {self.place.name}"
