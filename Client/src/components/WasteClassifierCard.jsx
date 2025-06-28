import React from "react";
import { useNavigate } from "react-router-dom";

export default function WasteClassifierCard() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#232a34] text-[wheat] rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 max-w-md mx-auto my-6">
      <h2 className="text-2xl font-bold mb-2">Waste Classifier</h2>
      <p className="mb-4">
        Upload a photo of waste and let our AI tell you how to recycle it.
      </p>
      <button
        onClick={() => navigate("/waste")}
        className="bg-[wheat] text-[#232a34] font-semibold py-2 px-4 rounded hover:bg-yellow-300"
      >
        Try Classifier
      </button>
    </div>
  );
}
