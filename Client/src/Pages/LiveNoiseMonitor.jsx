    // LiveNoiseMonitor.jsx
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:8080"); // Flask server

export default function LiveNoiseMonitor() {
  const [result, setResult] = useState("Waiting for detection...");
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    // Listen to incoming results
    socket.on("detection_result", (data) => {
      setResult(data.result);
    });

    return () => {
      socket.off("detection_result");
    };
  }, []);

  const startDetection = async () => {
    await axios.get("http://localhost:8080/start-detection");
    setIsDetecting(true);
  };

  const stopDetection = async () => {
    await axios.get("http://localhost:8080/stop-detection");
    setIsDetecting(false);
    setResult("Detection stopped.");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">🎤 Noise Level Detector</h1>

      <div className="text-xl mb-4 bg-white p-4 rounded shadow-md">
        📈 {result}
      </div>

      <div className="flex gap-4">
        <button
          onClick={startDetection}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          disabled={isDetecting}
        >
          ▶️ Start Detection
        </button>
        <button
          onClick={stopDetection}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          disabled={!isDetecting}
        >
          ⏹ Stop Detection
        </button>
      </div>
    </div>
  );
}
