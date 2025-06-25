// src/components/NavigationCard.jsx
import { Link } from "react-router-dom";

export default function NavigationCard() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex w-fit items-center gap-4 rounded-full bg-slate-200/20 px-4 py-2 backdrop-blur-md shadow-md">
      {/* Map Button */}
      <Link
        to="/map"
        className="flex items-center gap-2 rounded-full px-4 py-2 text-white hover:bg-slate-300/20 transition"
      >
        <span role="img" aria-label="map">📍</span>
        <span className="text-sm">Map</span>
      </Link>

      {/* Climate Change Button */}
      <Link
        to="/climate"
        className="flex items-center gap-2 rounded-full px-4 py-2 text-white hover:bg-slate-300/20 transition"
      >
        <span role="img" aria-label="climate">🔥</span>
        <span className="text-sm">Climate Change</span>
      </Link>

      {/* Near Me Button */}
      <Link
        to="/nearby"
        className="flex items-center gap-2 rounded-full px-4 py-2 text-white hover:bg-slate-300/20 transition"
      >
        <img src="/logo.png" alt="AQI" className="h-5 w-5" />
        <span className="text-sm">Near me?</span>
      </Link>
    </div>
  );
}

