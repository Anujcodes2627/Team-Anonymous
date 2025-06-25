import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AqiCard from "./components/AqiCard";
import Navbar from "./components/Navbar";
import NavigationCard from "./components/NavigationCard";
import AQIMap from "./components/AQIMAp";
import AqiIndexCard from "./components/AqiIndexCard";
import CityRankCard from "./components/CityRankCard";

function App() {

  return (
    <div className=" p-4  bg-slate-900">
      <Navbar />
      <div className="relative w-full mb-10  overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AQIMap />
        </div>
        <div className="relative z-10 mt-[200px] px-8">
          <AqiCard />
        </div>
      </div>
         <NavigationCard />/

      <AqiIndexCard/>
      <CityRankCard currentCity="Indore"/>

    </div>
  );
}

export default App;
