import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { MapPinned, CircleChevronLeft } from "lucide-react";

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

export default function PlanResults() {
  const { state } = useLocation();
  const data = state?.data;
  const chosenId = state?.chosenId || [];
  const [PlaceData, setPlaceData] = useState([]);

  // console.log("CHOSEN ID LIST : ",chosenId)

  // enrich the data of places for plan details
  function enrichPlacesData(places) {
    if (!Array.isArray(places)) return [];

    // Random best time options
    const bestTimes = [
      "Early Morning",
      "Morning",
      "Afternoon",
      "Evening",
      "Night",
      "Sunrise",
      "Sunset",
    ];

    // Start planning at 10:00 AM by default
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);

    const addHours = (date, h) => new Date(date.getTime() + h * 60 * 60 * 1000);

    return places.map(place => {
      // 1–2 hour random duration
      const duration = Math.floor(Math.random() * 2) + 1;

      // Start time string
      const start = new Date(currentTime);

      // End time string
      const end = addHours(start, duration);

      // Update currentTime for next place
      currentTime = end;

      return {
        ...place,
        durationTime: `${duration} hr${duration > 1 ? "s" : ""}`,
        startTime: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        endTime: end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        bestTime: bestTimes[Math.floor(Math.random() * bestTimes.length)],
      };
    });
  }


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${backendBaseURL}/api/get_place/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            places: chosenId,   // << send list of place IDs
          }),
        });

        const responseData = await res.json();

        const enriched = enrichPlacesData(responseData.places); 
        // console.log("API Response:", responseData);

        setPlaceData(enriched);   // fill state with enriched data
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    }

    fetchData()
  }, []);

  useEffect(() => {
    console.log("state updated:", PlaceData);
  }, [PlaceData]);

  // const placeData = [
  //   {
  //     id: 1,
  //     name: "Mahakaal Mandir",
  //     durationTime: "1 hr",
  //     startTime: "10:00 AM",
  //     endTime: "11:00 AM",
  //     bestTime: "4:00 AM",
  //     tips: "Attend the Bhasma Aarti; pre-booking required.",
  //   },
  //   {
  //     id: 2,
  //     name: "Harsiddhi Temple",
  //     durationTime: "1 hr",
  //     startTime: "11:15 AM",
  //     endTime: "12:15 PM",
  //     bestTime: "6:00 AM",
  //     tips: "Visit during morning aarti; carry offerings.",
  //   },
  //   {
  //     id: 3,
  //     name: "Ram Ghat",
  //     durationTime: "1 hr",
  //     startTime: "12:30 PM",
  //     endTime: "1:30 PM",
  //     bestTime: "Sunset",
  //     tips: "Great spot for photography and evening aarti.",
  //   },
  //   {
  //     id: 4,
  //     name: "Kal Bhairav Temple",
  //     durationTime: "1 hr",
  //     startTime: "2:00 PM",
  //     endTime: "3:00 PM",
  //     bestTime: "Morning",
  //     tips: "Offer liquor as a ritual; maintain decorum.",
  //   },
  //   {
  //     id: 5,
  //     name: "Sandipani Ashram",
  //     durationTime: "1 hr",
  //     startTime: "3:30 PM",
  //     endTime: "4:30 PM",
  //     bestTime: "Afternoon",
  //     tips: "Peaceful atmosphere; explore the gurukul and pond.",
  //   },
  // ];

  if (!data) {
    return (
      <div className="px-4 py-6 space-y-4">
        <h2 className="text-xl font-bold">No plan yet</h2>
        <p className="text-gray-600">Go back and choose places first.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold shadow hover:bg-orange-600 transition-all"
        >
          ← Back to planner
        </Link>
      </div>
    );
  }

  return (
    <div className="px-3 py-6 w-screen mx-auto space-y-6 bg-[#ffd043]">

      <div className="fixed z-0 top-0 left-0">
        <img src="/images/home-bg.png" alt="bg" className="object-cover h-screen w-screen opacity-10" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl text-center font-bold sm:text-2xl text-gray-900">
            Plan Overview
          </h2>
          <p className="p-4 rounded-lg text-center">
            paln your day at <br />
            <span className="font-semibold">
              {PlaceData.map(item => {
                return (
                  item.name + ", "
                )
              })}
            </span> in ujjain
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {PlaceData?.map((pd, idx, arr) => {
            const next = arr[idx + 1];

            return (
              <div
                key={pd.id}
                className="bg-gradient-to-br from-orange-100/80 via-orange-50 to-white 
                   border border-orange-200 rounded-xl shadow-sm p-4 space-y-3"
              >
                {/* Step Header */}
                <div className="flex justify-between items-center">
                  <div className="text-sm font-semibold text-orange-800 h-8 w-8 bg-orange-300 
                          rounded-full flex items-center justify-center">
                    {idx + 1}
                  </div>

                  <div className="text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
                    {next ? (
                      <>Next: <span className="font-semibold">{next.name}</span></>
                    ) : (
                      <span className="italic text-gray-500">Last Stop</span>
                    )}
                  </div>
                </div>

                {/* Place Name */}
                <div className="text-lg sm:text-xl font-extrabold text-orange-800">
                  {pd.name}
                </div>

                {/* Duration */}
                <div className="text-sm text-orange-700 font-medium">
                  Duration: {pd.durationTime}
                </div>

                {/* Timing */}
                <div className="text-sm text-gray-700 space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Arrival:</span>
                    <span className="font-semibold text-orange-700">{pd.startTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Departure:</span>
                    <span className="font-semibold text-orange-700">{pd.endTime}</span>
                  </div>
                </div>

                {/* Best Time & Tips */}
                <div className="text-xs text-gray-600 space-y-1">
                  <div>🕒 <span className="font-semibold text-orange-700">Best Time:</span> {pd.bestTime}</div>
                  <div>💡 <span className="font-semibold text-orange-700">Tips:</span> {pd.tips}</div>
                </div>

                {/* View More Button */}
                <Link
                  to={`/place-details/${pd.id}`}
                  className="block text-center bg-gradient-to-r from-orange-500 to-orange-600 
                     text-white text-sm font-semibold px-4 py-2 rounded-lg shadow 
                     hover:from-orange-600 hover:to-orange-700 transition-all"
                >
                  View More
                </Link>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="fixed bottom-0 left-0 w-full py-2 px-4 sm:w-2xl flex gap-2 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-orange-400 text-white text-sm font-semibold shadow-md hover:bg-orange-600 hover:-translate-y-0.5 transition-all w-20"
          >
            <CircleChevronLeft size={18} />
          </button>

          <Link
            to="/map-demo"
            state={{ data }}
            className="flex items-center justify-center gap-1 py-3 rounded-full bg-orange-500 text-white text-sm font-semibold shadow-md hover:bg-orange-600 hover:-translate-y-0.5 transition-all w-60"
          >
            View Route on Map <MapPinned size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
