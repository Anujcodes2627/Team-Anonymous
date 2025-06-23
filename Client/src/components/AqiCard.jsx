import React from "react";
import { MapPin, Heart, Share2, ArrowUpRight, Cloud } from "lucide-react";

function AqiCard() {
    return (
      <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800 to-yellow-400 text-white shadow-lg relative p-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">Real-time Air Quality Index (AQI)</h2>
            <p className="text-blue-300 underline text-sm">
              Kushwaha Nagar, Indore, Madhya Pradesh, India
            </p>
            <p className="text-sm text-slate-200 mt-1">
              Last Updated: 23 Jun 2025, 05:09pm · Nearest Monitor: 0.89 km
            </p>
          </div>
          <div className="flex gap-2">
            <button className="border border-blue-400 rounded px-3 py-1 text-sm flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Locate me
            </button>
            <button><Heart className="w-5 h-5 text-slate-300" /></button>
            <button><Share2 className="w-5 h-5 text-slate-300" /></button>
          </div>
        </div>
  
        {/* AQI Section */}
        <div className="mt-6 grid grid-cols-3 items-center">
          {/* AQI Value */}
          <div className="text-center">
            <div className="text-5xl font-bold text-yellow-300">76</div>
            <div className="mt-1 bg-yellow-600/70 px-2 py-1 rounded text-sm inline-block">
              Moderate
            </div>
          </div>
  
          {/* Middle background */}
          <div className="relative flex flex-col items-center">
            <p className="text-sm text-slate-200">
              PM10: <span className="font-semibold">51 µg/m³</span>
            </p>
            <p className="text-sm text-slate-200">
              PM2.5: <span className="font-semibold">23 µg/m³</span>
            </p>
            {/* Legend */}
            <div className="mt-2 flex gap-1 text-[10px] w-full justify-between text-white">
              <span className="text-green-300">Good</span>
              <span className="text-yellow-300">Moderate</span>
              <span className="text-orange-300">Poor</span>
              <span className="text-red-400">Unhealthy</span>
              <span className="text-pink-300">Severe</span>
              <span className="text-red-600">Hazardous</span>
            </div>
            <div className="h-1.5 w-full bg-gradient-to-r from-green-400 via-yellow-300 via-orange-400 via-red-400 to-red-700 rounded-full mt-1" />
          </div>
  
          {/* Character & Weather */}
          <div className="flex flex-col items-end justify-center">
            <img
              src="/images/boy.svg"
              alt="boy"
              className="w-20 h-28"
            />
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl mt-2 text-sm">
              <div className="flex items-center gap-2 text-white">
                <Cloud className="w-5 h-5" />
                <span className="text-xl font-bold">26°C</span>
                <span className="text-sm">Mist</span>
                <ArrowUpRight className="w-4 h-4 ml-auto" />
              </div>
              <div className="grid grid-cols-3 text-xs gap-y-1 mt-2 text-slate-100">
                <div>💧 89%</div>
                <div>🍃 25 km/h</div>
                <div>☀️ UV: 2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AqiCard;
