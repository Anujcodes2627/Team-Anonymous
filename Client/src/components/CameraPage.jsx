import React, { useEffect, useRef, useState } from "react";
import PollutionARCamera from "./PollutionARCamera.jsx";
import { useNavigate } from "react-router-dom";

const CameraPage = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const streamRef = useRef(null);
  const videoRef = useRef(null);         // ref to access video tag
  const [snapshot, setSnapshot] = useState(null);
  const navigate = useNavigate();

  // Fetch location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Location error:", err);
      }
    );
  }, []);

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  // Handle back to home
  const handleBack = () => {
    stopCamera();
    navigate("/");
  };

  // 📸 Handle Snapshot Capture
  const handleSnapshot = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    setSnapshot(dataURL);
  };

  return (
    <div>
      {/* Buttons */}
      <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
        <button
          onClick={handleBack}
          style={{
            padding: "10px 16px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ⬅️ Back to Home
        </button>

        <button
          onClick={handleSnapshot}
          style={{
            padding: "10px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          📸 Capture Snapshot
        </button>
      </div>

      {/* Render camera if location available */}
      {location.lat && location.lon ? (
        <PollutionARCamera
          latitude={location.lat}
          longitude={location.lon}
          streamRef={streamRef}
          videoRef={videoRef}  // Pass video ref for snapshot
        />
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>Getting location & camera access...</p>
      )}

      {/* Show Snapshot */}
      {snapshot && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <h3>📷 Your Snapshot:</h3>
          <img
            src={snapshot}
            alt="Snapshot"
            style={{ maxWidth: "100%", borderRadius: "10px", marginTop: "10px" }}
          />
          <br />
          <a
            href={snapshot}
            download="snapshot.png"
            style={{
              marginTop: "10px",
              display: "inline-block",
              textDecoration: "none",
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "6px",
            }}
          >
            ⬇️ Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default CameraPage;