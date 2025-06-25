import React, { useEffect, useState } from "react";
import { MapPin, TrendingUp } from "lucide-react";
import axios from "axios";

export default function CityRankCard({ currentCity = "Indore" }) {
  const [cityRank, setCityRank] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [totalCities, setTotalCities] = useState(0);
  const [level, setLevel] = useState("");

  // AQI level labels
  const getAqiLevel = (value) => {
    if (value <= 30) return "Good";
    if (value <= 60) return "Moderate";
    if (value <= 90) return "Poor";
    if (value <= 120) return "Unhealthy";
    if (value <= 250) return "Severe";
    return "Hazardous";
  };

  const levelColors = {
    Good: "text-green-400",
    Moderate: "text-yellow-300",
    Poor: "text-orange-400",
    Unhealthy: "text-red-400",
    Severe: "text-pink-400",
    Hazardous: "text-purple-500",
  };

  useEffect(() => {
    const fetchAQIData = async () => {
      try {
        const res = await axios.get(
          `https://api.openaq.org/v2/latest?country=IN&parameter=pm25&limit=1000`
        );
        const data = res.data.results;

        const cityAQIs = data
          .filter((entry) => entry.city && entry.measurements[0]?.value)
          .map((entry) => ({
            city: entry.city,
            aqi: entry.measurements[0].value,
          }));

        // Sort cities by AQI descending
        const sorted = cityAQIs.sort((a, b) => b.aqi - a.aqi);

        const rank = sorted.findIndex(
          (entry) =>
            entry.city.toLowerCase() === currentCity.toLowerCase()
        );

        if (rank !== -1) {
          setCityRank(rank + 1);
          setAqi(sorted[rank].aqi);
          setLevel(getAqiLevel(sorted[rank].aqi));
          setTotalCities(sorted.length);
        }
      } catch (error) {
        console.error("Failed to fetch city AQI data:", error);
      }
    };

    fetchAQIData();
  }, [currentCity]);

  if (!cityRank) {
    return (
      <div className="bg-slate-800 text-white p-5 rounded-2xl shadow-md w-full max-w-xl mx-auto">
        <p>Loading city rank...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 text-white p-5 rounded-2xl shadow-md flex justify-between items-center w-full max-w-xl mx-auto">
      {/* City Info */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <MapPin className="w-5 h-5 text-sky-400" />
          <span>{currentCity}</span>
        </div>
        <div className="text-sm text-slate-300">
          Rank #{cityRank} out of {totalCities} cities
        </div>
      </div>

      {/* AQI Display */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-xl font-bold">{aqi.toFixed(1)}</p>
          <p className={`text-sm ${levelColors[level]}`}>{level}</p>
        </div>
        <TrendingUp className="w-6 h-6 text-yellow-300" />
      </div>
    </div>
  );
}
