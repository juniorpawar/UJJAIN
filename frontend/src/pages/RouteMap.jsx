import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Fix for default markers in react-leaflet
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function RouteMap() {
  const { state } = useLocation();
  const chosen = state?.chosen || [];
  console.log(`Chosen places IDs: ${chosen}`);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(`${process.env.VITE_BACKEND_BASE_URL}/api/places/`);
        const allPlaces = await response.json();
        const selectedPlaces = allPlaces.filter((place) =>
          chosen.includes(place.id)
        );
        setPlaces(selectedPlaces);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    if (chosen.length > 0) {
      fetchPlaces();
    } else {
      setLoading(false);
    }
  }, [chosen]);

  useEffect(() => {
    if (map && places.length > 1) {
      // Remove existing routing control
      if (routingControl) {
        map.removeControl(routingControl);
      }

      // Create waypoints for routing
      const waypoints = places.map((place) =>
        L.latLng(place.latitude, place.longitude)
      );

      // Create new routing control
      const control = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: false,
        createMarker: () => null, // Don't create default markers, we have our own
        lineOptions: {
          styles: [{ color: "blue", weight: 6, opacity: 0.8 }],
        },
        show: false, // Hide the routing instructions panel
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: false,
      }).addTo(map);

      setRoutingControl(control);

      return () => {
        if (control) {
          map.removeControl(control);
        }
      };
    }
  }, [map, places, routingControl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading map...
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">No places selected</h2>
        <p className="text-gray-600">Go back and choose places first.</p>
        <button
          type="button"
          onClick={() => window.history.back()} // 👈 goes back to previous page
          className="inline-flex items-center rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
        >
          ← Back to plan
        </button>
      </div>
    );
  }

  // Calculate bounds to fit all markers
  const bounds = places.map((place) => [place.latitude, place.longitude]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Route Map</h2>
        <button
          type="button"
          onClick={() => window.history.back()} // 👈 goes back to previous page
          className="inline-flex items-center rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
        >
          ← Back to plan
        </button>
      </div>

      <div className="h-96 rounded-2xl overflow-hidden border">
        <MapContainer
          bounds={bounds}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {places.map((place, index) => (
            <Marker key={place.id} position={[place.latitude, place.longitude]}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold">{place.name}</h3>
                  {place.image && (
                    <img
                      src={`http://localhost:8000${place.image}`}
                      alt={place.name}
                      className="w-24 h-16 object-cover rounded mt-2 mx-auto"
                    />
                  )}
                  <p className="text-sm text-gray-600 mt-1">{place.category}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="text-sm text-gray-600">
        Showing route for: {places.map((p) => p.name).join(" → ")}
      </div>
    </div>
  );
}
