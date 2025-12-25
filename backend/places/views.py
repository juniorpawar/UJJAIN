from rest_framework import viewsets
from .models import Place
from .serializers import PlaceSerializer,PlaceMiniSerializer
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
    
    print("lsidjf pocahsdpiu")
    places = Place.objects.all()
    serializer = PlaceSerializer(places, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_places_mini (request):
    places = Place.objects.all()          # or filter(...)
    serializer = PlaceMiniSerializer(places, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def get_place(request):
    """
    Takes a list of place IDs and returns basic place info
    PLUS user guide tips from PlaceDetail.
    """
    places_list = request.data.get('places', [])
    print("POST request hit on /api/get_place")

    # Validate input
    if not places_list or not isinstance(places_list, list):
        return Response({"error": "Please provide a list of place IDs."}, status=400)

    # Ensure IDs are numeric
    try:
        place_ids = [int(x) for x in places_list]
    except (TypeError, ValueError):
        return Response({"error": "All place IDs must be numeric."}, status=400)

    # Query all matching places + fetch their PlaceDetail in one go
    queryset = Place.objects.filter(id__in=place_ids).select_related("details")

    places_map = {place.id: place for place in queryset}

    # d
    # ebug print
    # for place in queryset:
    #     print({field.name: getattr(place, field.name) for field in place._meta.fields})

    found_places = []
    not_found = []
    seen = set()

    for pid in place_ids:
        if pid in seen:
            continue
        seen.add(pid)

        place = places_map.get(pid)
        if not place:
            not_found.append(pid)
            continue

        details = place.details if hasattr(place, "details") else None

        found_places.append({
            "id": place.id,
            "name": place.name,
            "category": place.category,
            "latitude": place.latitude,
            "longitude": place.longitude,
            "open_time": place.open_time.strftime("%H:%M:%S"),
            "close_time": place.close_time.strftime("%H:%M:%S"),
            "image": place.image.url if place.image else None,

            # 🟩 ADDED: Tips from PlaceDetail.user_guides
            "tips": details.user_guides if details and details.user_guides else None,

            # (Optional extra info — uncomment if needed)
            # "history": details.history if details else None,
            # "did_you_know": details.did_you_know if details else None,
        })

    return Response({
        "places": found_places,
        "not_found": not_found,
    }, status=200)
