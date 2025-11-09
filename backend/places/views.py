from rest_framework import viewsets
from .models import Place
from .serializers import PlaceSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer

@api_view(['GET'])
def get_all_places(request):
    """
    Returns a list of all places with their name, category, latitude, longitude, etc.
    """
    places = Place.objects.all()
    serializer = PlaceSerializer(places, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def get_place(request):
    """
    Takes a list of place IDs and returns latitude and longitude
    for all matching places in the database.
    """
    places_list = request.data.get('places', [])

    if not places_list or not isinstance(places_list, list):
        return Response({"error": "Please provide a list of place IDs."}, status=400)

    places = Place.objects.filter(id__in=places_list)
    found_places = []
    not_found = []

    for place_id in places_list:
        try:
            place = places.get(id=place_id)
            found_places.append({
                "id": place.id,
                "name": place.name,
                "lat": place.latitude,
                "lng": place.longitude,
            })
        except Place.DoesNotExist:
            not_found.append(place_id)

    return Response({
        "places": found_places,
        "not_found": not_found,
    })

@api_view(['POST'])
def plan_places(request):
    """
    Takes a list of place names and returns latitude and longitude
    for all matching places in the database.
    """
    places_list = request.data.get('places', [])

    if not places_list or not isinstance(places_list, list):
        return Response({"error": "Please provide a list of places."}, status=400)

    found_places = []
    not_found = []

    for name in places_list:
        try:
            place = Place.objects.get(name__icontains=name)
            found_places.append({
                "name": place.name,
                "latitude": place.latitude,
                "longitude": place.longitude,
                "category": place.category,
            })
        except Place.DoesNotExist:
            not_found.append(name)

    return Response({
        "found": found_places,
        "not_found": not_found,
        "total_requested": len(places_list),
        "total_found": len(found_places),
    })
