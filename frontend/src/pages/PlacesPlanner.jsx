import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import { Calendar, Landmark, Sparkles } from "lucide-react";
import BackButton from "../components/BackButton";

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

export default function PlacesPlanner() {
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [planLoading, setPlanLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //fetch all places from backend
    async function fetchPlaces() {
      try {
        const res = await fetch(`${backendBaseURL}/api/get_places_mini/`);
        if (!res.ok) throw new Error(`Failed to fetch places: ${res.status}`);
        const data = await res.json();

        // append base url to image of data
        data.forEach(item => {
          item.image = backendBaseURL + item.image;
        });

        console.log("Fetched places:", data);
        setPlaces(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaces();
  }, []);

  //toggle place selection
  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      // console.log(selected);
      return next;
    });
  };

  const selectTop3 = () => {
    setSelected((prev) => {
      const isAlreadySelected =
        prev.has(1) && prev.has(6) && prev.has(10) && prev.size === 3;

      return isAlreadySelected
        ? new Set() // unselect all
        : new Set([1, 6, 10]); // select top 3
    });
  };


  const selectedList = useMemo(() => Array.from(selected), [selected]);
  const canPlan = selected.size > 0 && !planLoading;

  //handle plan creation , next page 
  async function handlePlan() {
    setError("");
    setPlanLoading(true);
    try {
      // console.log(selectedList)
      const res = await fetch(`${backendBaseURL}/api/get_place/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ places: selectedList }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      // alert("Plan created successfully!");
      // console.log(data);
      navigate("/plan", { state: { data, chosenId: selectedList } });
    } catch (e) {
      setError(e.message);
    } finally {
      setPlanLoading(false);
    }
  }

  return (
    <div className="bg-[#ffd043]">
      <div className="fixed top-0 left-0 z-0 inset-0 opacity-20">
        <img src="/images/home-bg.png" alt="planner-bg" className="h-screen w-screen object-cover" />
      </div>

      <div className="p-4 flex flex-col items-center justify-center py-8 relative">
        {/* Back Button */}
        <BackButton/>

        {/* Heading Section */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold font-[lato] tracking-tight drop-shadow-sm">
            Plan Your Itinerary
          </h1>
          <p className="text-gray-900 text-sm sm:text-base max-w-md mx-auto">
            Select one or more cards and click the{" "}
            <span className="font-semibold text-orange-500">Plan Itinerary</span> button below.
          </p>
        </div>
      </div>

      {/* <div className="px-4 relative flex gap-4 justify-center">
        <button className="bg-orange-500 py-2 px-3 rounded-full text-white text-xs">Plan a day</button>
        <button className="bg-orange-500 py-2 px-3 rounded-full text-white text-xs">most visited mandirs</button>
        <button className="bg-orange-500 py-2 px-3 rounded-full text-white text-xs">top 5 visited places</button>
      </div> */}

      {/* Quick Filters */}
      <div className="px-4 pb-3 overflow-x-auto no-scrollbar mt-1 relative w-screen">
        <div className="flex gap-3 w-max">

          {/* Plan a Day */}
          <button
            onClick={selectTop3}
            className="flex items-center gap-2 bg-orange-500 whitespace-nowrap py-2 px-4 rounded-full text-white text-xs shadow-sm">
            <Calendar size={14} />
            Plan a Day
          </button>

          {/* Most Visited Mandirs */}
          <button className="flex items-center gap-2 bg-orange-500 whitespace-nowrap py-2 px-4 rounded-full text-white text-xs shadow-sm">
            <Landmark size={14} />
            Most Visited Mandirs
          </button>

          {/* Top 5 Places */}
          <button className="flex items-center gap-2 bg-orange-500 whitespace-nowrap py-2 px-4 rounded-full text-white text-xs shadow-sm">
            <Sparkles size={14} />
            Top 5
          </button>

        </div>
      </div>


      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading places...</div>
      ) : (
        <div className="p-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {places.map((p) => (
            <PlaceCard
              key={p.id}
              place={p}
              selected={selected.has(p.id)}
              onToggle={() => toggle(p.id)}
            />
          ))}
        </div>
      )}

      {selected.size > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg z-50 flex justify-between items-center px-6 py-3">
          <p className="text-sm font-medium text-gray-700">
            Plan itinerary for <span className="font-semibold text-orange-500">{selected.size}</span> place{selected.size > 1 ? "s" : ""}
          </p>

          <button
            onClick={handlePlan}
            disabled={!canPlan || planLoading}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-semibold shadow-md transition-all
        ${planLoading ? "bg-orange-300 cursor-wait" : "bg-orange-500 hover:bg-orange-600"} 
        text-white disabled:opacity-60 hover:-translate-y-0.5`}
          >
            {planLoading ? "Planning..." : "Plan Itinerary"}
          </button>
        </div>
      )}
    </div>
  );
}
