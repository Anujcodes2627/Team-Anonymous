import React, { useState, useEffect } from "react";
import { MapPin, Heart, Share2, ArrowUpRight, Cloud } from "lucide-react";
import axios from "axios";
import CityRankCard from "./CityRankCard";

function AqiCard() {
  const [aqiValue, setAqiValue] = useState(76);
  const [aqiLevel, setAqiLevel] = useState("Moderate");
  const [pm10, setPm10] = useState(51);
  const [pm25, setPm25] = useState(23);
  const [temperature, setTemperature] = useState(26);
  const [weatherStatus, setWeatherStatus] = useState("Mist");
  const [humidity, setHumidity] = useState(89);
  const [windSpeed, setWindSpeed] = useState(25);
  const [uvIndex, setUvIndex] = useState(2);
  const [location, setLocation] = useState("Locating...");
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("Bhopal");

  const API_KEY = "9c65c3bf74d84876ace145329252506";

  const aqiColors = {
    Good: "bg-green-600/70 text-green-200",
    Moderate: "bg-yellow-600/70 text-yellow-200",
    Poor: "bg-orange-600/70 text-orange-200",
    Unhealthy: "bg-red-600/70 text-red-200",
    Severe: "bg-pink-600/70 text-pink-200",
    Hazardous: "bg-purple-700/70 text-purple-200",
  };

  const getAqiLevel = (value) => {
    if (value <= 50) return "Good";
    if (value <= 100) return "Moderate";
    if (value <= 150) return "Poor";
    if (value <= 200) return "Unhealthy";
    if (value <= 300) return "Severe";
    return "Hazardous";
  };

  const getAqiDotPosition = (value) => {
    const clamped = Math.min(Math.max(value, 0), 500);
    return (clamped / 500) * 100;
  };

  const fetchData = async (query) => {
    try {
      const res = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: API_KEY,
            q: query,
            aqi: "yes",
          },
        }
      );

      const data = res.data;
      const aqi = data.current.air_quality;

      setAqiValue(aqi.pm2_5 || 0);
      setPm25(aqi.pm2_5 || 0);
      setPm10(aqi.pm10 || 0);
      setAqiLevel(getAqiLevel(aqi.pm2_5 || 0));
      setTemperature(data.current.temp_c);
      setWeatherStatus(data.current.condition.text);
      setHumidity(data.current.humidity);
      setWindSpeed(data.current.wind_kph);
      setUvIndex(data.current.uv);
      setLocation(`${data.location.name}, ${data.location.region}`);
      setCity(`${data.location.name}`);
    } catch (err) {
      console.error("Failed to fetch AQI:", err);
      setLocation("Error fetching data");
    }
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchData(`${latitude},${longitude}`);
        },
        (err) => {
          console.error("Location permission denied.", err);
          setLocation("Permission denied");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation("Geolocation not supported");
    }
  };

  useEffect(() => {
    handleLocateMe();
  }, []);

  return (
    <>
      <div className="rounded-2xl  overflow-hidden bg-gradient-to-b from-slate-800 to-yellow-400 text-white shadow-lg relative p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">
              Real-time Air Quality Index (AQI)
            </h2>
            <p className="text-blue-300 underline text-sm">{location}</p>
            <p className="text-sm text-slate-200 mt-1">
              Live AQI data fetched using WeatherAPI
            </p>
            <div className="mt-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city..."
                className="px-2 py-1 rounded text-black text-sm"
              />
              <button
                onClick={() => fetchData(searchQuery)}
                className="ml-2 px-3 py-1 text-sm rounded bg-blue-500 hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleLocateMe}
              className="border border-blue-400 rounded px-3 py-1 text-sm flex items-center gap-1"
            >
              <MapPin className="w-4 h-4" />
              Locate me
            </button>
            <button>
              <Heart className="w-5 h-5 text-slate-300" />
            </button>
            <button>
              <Share2 className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 items-center">
          <div className="text-center">
            <div className="text-5xl font-bold text-yellow-300">{aqiValue}</div>
            <div
              className={`mt-1 ${aqiColors[aqiLevel]} px-2 py-1 rounded text-sm inline-block`}
            >
              {aqiLevel}
            </div>
          </div>

          <div className="relative flex flex-col items-center w-full">
            <p className="text-sm text-slate-200">
              PM10: <span className="font-semibold">{pm10} µg/m³</span>
            </p>
            <p className="text-sm text-slate-200">
              PM2.5: <span className="font-semibold">{pm25} µg/m³</span>
            </p>

            <div className="mt-2 flex gap-1 text-[10px] w-full justify-between text-white">
              <span className="text-green-300">Good</span>
              <span className="text-yellow-300">Moderate</span>
              <span className="text-orange-300">Poor</span>
              <span className="text-red-400">Unhealthy</span>
              <span className="text-pink-300">Severe</span>
              <span className="text-red-600">Hazardous</span>
            </div>

            <div className="relative w-full h-1.5 bg-gradient-to-r from-green-400 via-yellow-300 via-orange-400 via-red-400 to-red-700 rounded-full mt-1">
              <div
                className="absolute -top-1 w-3 h-3 bg-white border border-black rounded-full transition-all duration-300"
                style={{
                  left: `${getAqiDotPosition(aqiValue)}%`,
                  transform: "translateX(-50%)",
                  boxShadow: "inset 0 0 2px 2px #fcd34d",
                }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col items-end justify-center">
            <img src="/images/boy.svg" alt="boy" className="w-20 h-28" />
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl mt-2 text-sm">
              <div className="flex items-center gap-2 text-white">
                <Cloud className="w-5 h-5" />
                <span className="text-xl font-bold">{temperature}°C</span>
                <span className="text-sm">{weatherStatus}</span>
                <ArrowUpRight className="w-4 h-4 ml-auto" />
              </div>
              <div className="grid grid-cols-3 text-xs gap-y-1 mt-2 text-slate-100">
                <div>💧 {humidity}%</div>
                <div>🍃 {windSpeed} km/h</div>
                <div>☀️ UV: {uvIndex}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CityRankCard  currentCity={city} />
    </>
  );
}

export default AqiCard;
