import React from "react";
import { useNavigate } from "react-router-dom";

export default function SoundDetectionCard() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#232a34] text-[wheat] rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 max-w-md mx-auto my-6">
      <h2 className="text-2xl font-bold mb-2">Sound Detector</h2>
      <p className="mb-4">
        Analyze real-time noise levels and detect sound pollution instantly.
      </p>
      <button
        onClick={() => navigate("/sound")}
        className="bg-[wheat] text-[#232a34] font-semibold py-2 px-4 rounded hover:bg-yellow-300"
      >
        Start Detection
      </button>
    </div>
  );
}
