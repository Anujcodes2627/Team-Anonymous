import React from "react";
import Navbar from "../components/Navbar";
import AqiCard from "../components/AqiCard";
import AqiIndexCard from "../components/AqiIndexCard";
import AQIMap from "../components/AQIMap";
import WasteClassifierCard from "../components/WasteClassifierCard";
import SoundDetectionCard from "../components/SoundDetectionCard";
export default function Home(props) {
  return (
    <>
      <div className=" p-4  bg-slate-900">
        <div className="relative w-full mb-10  overflow-hidden">
          <div className="absolute inset-0 z-0">
            <AQIMap />
          </div>
          <div className="relative z-10 mt-[200px] px-8">
            <AqiCard />
          </div>
        </div>

        <AqiIndexCard />
        <div className="flex justify-between w-full">
          <WasteClassifierCard />
          <SoundDetectionCard />
        </div>
      </div>
    </>
  );
}
