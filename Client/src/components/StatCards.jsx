const stats = [
    { title: "Total CO₂ Saved", value: "0.0g", note: "+0.01% vs last week" },
    { title: "Current Streak", value: "0 days", note: "Keep it going!" },
    { title: "Actions Logged", value: "0", note: "Environmental actions" },
    { title: "Net Impact", value: "+0.0g", note: "Positive impact" }
  ];
  
  const StatCards = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow">
          <h4 className="text-sm font-medium">{stat.title}</h4>
          <p className="text-xl font-bold">{stat.value}</p>
          <p className="text-xs text-gray-500">{stat.note}</p>
        </div>
      ))}
    </div>
  );
  export default StatCards;
  