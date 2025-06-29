import React, { useEffect, useRef, useState } from "react";

const PollutionARCamera = ({ latitude, longitude, streamRef, videoRef }) => {
  // const videoRef = useRef(null);
  
  const canvasRef = useRef(null);
  const [aqiData, setAqiData] = useState(null);

  // 1. Start Webcam
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream; // So we can stop it later
        }
      })
      .catch((err) => console.error("Camera error:", err));
  }, []);

  // 2. Fetch AQI
  useEffect(() => {
    const fetchAQI = async () => {
      const API_KEY = "425f2cd72b1f23f9c3cb960256f08909"; // ← Replace with your key
      const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setAqiData(data.list[0]);
      } catch (err) {
        console.error("AQI fetch failed:", err);
      }
    };

    if (latitude && longitude) fetchAQI();
  }, [latitude, longitude]);

  // 3. Overlay smog based on AQI
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const drawSmog = () => {
      if (!ctx || !canvas || !aqiData) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const aqi = aqiData.main.aqi;

      if (aqi >= 3) {
        ctx.fillStyle = "rgba(100,100,100,0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      requestAnimationFrame(drawSmog);
    };

    drawSmog();
  }, [aqiData]);

  const getStatus = (aqi) => {
    switch (aqi) {
      case 1: return "Good 😊";
      case 2: return "Fair 🙂";
      case 3: return "Moderate 😐";
      case 4: return "Poor 😷";
      case 5: return "Very Poor ☠️";
      default: return "Unknown";
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", zIndex: 0 }}
      />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight * 0.8}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1, pointerEvents: "none" }}
      />
      {aqiData && (
        <div style={{
          position: "absolute", top: 20, left: 20, background: "#000000aa",
          color: "white", padding: "12px", borderRadius: "10px", zIndex: 2
        }}>
          <h3>AQI: {aqiData.main.aqi} ({getStatus(aqiData.main.aqi)})</h3>
          <p>PM2.5: {aqiData.components.pm2_5} µg/m³</p>
          <p>PM10: {aqiData.components.pm10} µg/m³</p>
        </div>
      )}
    </div>
  );
};

export default PollutionARCamera;
