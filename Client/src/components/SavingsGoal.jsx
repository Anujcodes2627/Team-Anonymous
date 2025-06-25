const SavingsGoal = () => (
    <div className="p-4 bg-white shadow rounded-xl">
      <h3 className="text-md font-semibold mb-2">Weekly CO₂ Savings Goal</h3>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div className="w-[0%] bg-green-500 h-full"></div>
      </div>
      <p className="text-xs text-right mt-1 text-green-600">5000g remaining</p>
    </div>
  );
  export default SavingsGoal;
  