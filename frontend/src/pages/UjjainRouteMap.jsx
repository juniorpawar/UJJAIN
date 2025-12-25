import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapPin, ArrowLeftCircle, MapPinned } from "lucide-react";

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

// fix default marker icons
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import marker1x from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import BackButton from "../components/BackButton";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker1x,
  shadowUrl: markerShadow,
});

// डेमो fallback (अगर state से कुछ न आए)
const FALLBACK = [
  { name: "Shree Mahakaleshwar Temple", desc: "Famous Jyotirlinga temple.", coords: [23.1825, 75.7681] },
  { name: "Harsiddhi Temple", desc: "Historic goddess temple near Mahakal.", coords: [23.1820, 75.7715] },
  { name: "Ram Ghat (Shipra River)", desc: "Main ghat during Kumbh.", coords: [23.1836, 75.7765] },
  { name: "Sandipani Ashram", desc: "Guru Sandipani’s ashram.", coords: [23.1694, 75.7887] },
  { name: "Kal Bhairav Temple", desc: "Guardian deity of Ujjain.", coords: [23.2163, 75.7285] },
];

function RouteLine({ waypoints }) {
  const map = useMap();

  useEffect(() => {
    if (!map || waypoints.length < 2) return;

    const control = L.Routing.control({
      // ✅ हर आइटम [lat, lng] है, उसे L.latLng में बदलिए
      waypoints: waypoints.map(([lat, lng]) => L.latLng(lat, lng)),
      router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      lineOptions: { styles: [{ weight: 5, opacity: 0.85 }] },
      createMarker: () => null, // डिफॉल्ट रूट मार्कर्स छुपाएँ
    }).addTo(map);

    return () => map.removeControl(control);
  }, [map, waypoints]);

  return null;
}


export default function UjjainRouteMap() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 1) इनकमिंग डेटा लें (state?.data?.places), वरना fallback
  const incoming = state?.data?.places && state.data.places.length ? state.data.places : FALLBACK;
  console.log("Incoming places data:", incoming);

  // open google maps
  const openMultiRoute = () => {
    if (incoming.length < 2) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        const origin = `${userLat},${userLng}`;

        const waypoints = incoming.slice(0, -1).map(p => `${p.latitude},${p.longitude}`).join("|");

        const destination = incoming[incoming.length - 1];
        const destString = `${destination.latitude},${destination.longitude}`;

        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destString}&waypoints=${waypoints}`;

        window.open(url, "_blank");
      },
      (err) => {
        console.error(err);
        alert("Please enable location (GPS) to start the route.");
      },
      { enableHighAccuracy: true }
    );
  };


  // 2) ✅ Normalize: हर place को {name, desc, lat, lng} में बदलें
  const places = useMemo(() => {
    return incoming.map((p, i) => {
      const hasArray = Array.isArray(p.coords);
      const lat = hasArray ? p.coords[0] : p.latitude;
      const lng = hasArray ? p.coords[1] : p.longitude;
      return {
        id: p.id ?? i,
        name: p.name ?? `Place ${i + 1}`,
        desc: p.description ?? "",
        lat: Number(lat),
        lng: Number(lng),
        category: p.category,
        image: backendBaseURL + p.image
      };
    });
  }, [incoming]);



  if (!places.length) {
    return (
      <div className="p-4">
        <p>No places selected.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-md"
        >
          ← Back
        </button>
      </div>
    );
  }

  // 3) ✅ positions = [[lat, lng], ...]
  const positions = useMemo(() => places.map(p => [p.lat, p.lng]), [places]);

  return (
    <div className="relative flex flex-col items-center justify-center w-screen min-h-screen bg-[#FFB444]">

      {/* 🔶 Background Image (10% opacity) */}
      <img
        src="/images/home-bg.png"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
      />

      {/* 🔶 Header Section */}
      <header className="relative z-10 w-full px-6 py-4 flex justify-between items-center">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Your Trip Route
          </h1>
          <p className="text-white/80 text-sm">See the best path between your selected places</p>
          {/* 🔶 Google Maps Button */}
          <div className="mt-4">
            <button
              onClick={openMultiRoute}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white text-base font-semibold rounded-full shadow-lg hover:bg-orange-700 hover:scale-[1.02] transition-all"
            >
              <MapPinned size={20} />
              Open in Google Maps
            </button>
          </div>
        </div>



        {/* 🔙 Back Button on Top Right */}
        <div>
          <BackButton className="bg-white/80 hover:bg-white text-orange-600 shadow-lg" />
        </div>
      </header>

      {/* 🔶 Map Container */}
      <div className="relative z-10 h-[80vh] w-[90vw] mt-3 rounded-2xl border-4 border-orange-300 shadow-xl backdrop-blur-md">
        <MapContainer
          center={positions[0]}
          zoom={13}
          style={{ height: "100%", width: "100%", borderRadius: "16px" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 📍 Markers */}
          {places.map((p) => {
            const customIcon = L.icon({
              iconUrl: p.image,
              iconSize: [50, 50],
              iconAnchor: [25, 50],
              popupAnchor: [0, -40],
              className: "rounded-full shadow-md shadow-black",
            });

            return (
              <Marker key={p.id} position={[p.lat, p.lng]} icon={customIcon}>
                <Popup>
                  <div className="font-semibold text-base">{p.name}</div>
                  <div className="text-sm text-gray-600">{p.category}</div>
                </Popup>
              </Marker>
            );
          })}

          {/* 🛣 Route Line */}
          <RouteLine waypoints={positions} />
        </MapContainer>

      </div>
    </div>
  );
}
