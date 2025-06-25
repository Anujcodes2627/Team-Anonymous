import StatCards from "../components/StatCards";
import SavingsGoal from "../components/SavingsGoal";
import WeeklyComparison from "../components/WeeklyComparison";
import Achievements from "../components/Achievements";
import Footer from "../components/Footer";
import { useState } from "react";

function Dashboard() {

  return (
    <div className="bg-[#0C1220] min-h-screen">
      <div className="p-4 flex flex-col gap-10 mx-4">
        <p className="mt-17 text-gray-500">Track your environmental journey and celebrate you achievements</p>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
          🌟 Your commitment to the environment is inspiring!
        </div>
        <StatCards />
        <SavingsGoal />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WeeklyComparison />
          {/* Add <SavingsTrend /> here similarly */}
        </div>
        <Achievements />
      </div>

      <Footer />
    </div>
  );
}
export default Dashboard;
