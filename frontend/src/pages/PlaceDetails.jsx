import React, { useEffect, useState, useTransition } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

const PlaceDetails = () => {
  const [placeData, setPlaceData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${backendBaseURL}/api/places/${id}`);
      const data = await res.json();

      console.log("Fetched:", data);
      setPlaceData(data);
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("Updated State:", placeData);
  }, [placeData]);

  const tabs = [
    { key: "basic", label: "Basic Details" },
    { key: "history", label: "History" },
    { key: "did_you_know", label: "Did You Know" },
    { key: "tips", label: "Tips" },
    { key: "gallery", label: "Gallery" },
  ];

  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="w-screen min-h-screen mx-auto">
      
      {/* Main Image */}
      <div className="fixed top-0 left-0 w-screen h-100 overflow-hidden shadow-md z-0 inset-0 ">
        <BackButton className="absolute z-50 inset-0"/>
        <img
          src={placeData.image}
          alt={placeData.name}
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="relative mt-50 bg-linear-to-b from-orange-400 to-blue-400 rounded-t-3xl p-4 h-screen">

        {/* bg image */}
        <div className="absolute z-1 inset-0 h-full w-full">
          <img src="/images/home-bg.png" alt="sd" className="object-cover h-full opacity-10"/>
        </div>

        <div className="relative z-10 h-full">
          {/* Title */}
          <h1 className="text-3xl font-bold">{placeData.name}</h1>
          <p className="text-gray-600 mt-1 capitalize">{placeData.category}</p>

          {/* Tabs */}
          <div className="flex gap-3 mt-6 border-b pb-2 overflow-x-scroll whitespace-nowrap no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-xs transition  
        ${activeTab === tab.key
                    ? "bg-orange-500 text-white font-semibold"
                    : "bg-orange-200 text-gray-900"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "basic" && (
              <div className="space-y-3">
                <p className="text-gray-700">{placeData.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Latitude</p>
                    <p className="font-semibold">{placeData.latitude}</p>
                  </div>

                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Longitude</p>
                    <p className="font-semibold">{placeData.longitude}</p>
                  </div>

                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Opens at</p>
                    <p className="font-semibold">{placeData.open_time}</p>
                  </div>

                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Closes at</p>
                    <p className="font-semibold">{placeData.close_time}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <p className="text-gray-700 leading-relaxed">
                {placeData.details?.history}
              </p>
            )}

            {activeTab === "did_you_know" && (
              <p className="text-gray-700 leading-relaxed">
                {placeData.details?.did_you_know}
              </p>
            )}

            {activeTab === "tips" && (
              <p className="text-gray-700 leading-relaxed">
                {placeData.details?.user_guides}
              </p>
            )}

            {activeTab === "gallery" && (
              <div className="grid grid-cols-2 gap-4">
                {placeData.gallery?.map((img) => (
                  <div
                    key={img.id}
                    className="rounded-xl overflow-hidden shadow-sm"
                  >
                    <img
                      src={img.file}
                      alt={img.caption}
                      className="w-full h-40 object-cover"
                    />
                    <p className="text-sm text-center mt-1">{img.caption}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
};

export default PlaceDetails;
