import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";

export default function PlacesPlanner() {
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [planLoading, setPlanLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const res = await fetch("http://localhost:8000/api/places/");
        if (!res.ok) throw new Error(`Failed to fetch places: ${res.status}`);
        const data = await res.json();
        setPlaces(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaces();
  }, []);

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const selectedList = useMemo(() => Array.from(selected), [selected]);
  const canPlan = selected.size > 0 && !planLoading;

  async function handlePlan() {
    setError("");
    setPlanLoading(true);
    try {
      console.log(selectedList)
      const res = await fetch("http://localhost:8000/api/get_place/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ places: selectedList }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      // alert("Plan created successfully!");
      // console.log(data);
      navigate("/plan", { state: { data, chosen: selectedList } });
    } catch (e) {
      setError(e.message);
    } finally {
      setPlanLoading(false);
    }
   }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Choose Places</h1>
          <p className="text-gray-600">
            Select one or more cards and click Plan.
          </p>
        </div>
        <button
          onClick={handlePlan}
          disabled={!canPlan}
          className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold shadow-sm border transition disabled:opacity-50 bg-black text-white hover:-translate-y-0.5 hover:shadow-md"
        >
          {planLoading ? "Planning..." : "Plan"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading places...</div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="text-sm text-gray-600">
          Selected: {selectedList.join(", ")}
        </div>
      )}
    </div>
  );
}
