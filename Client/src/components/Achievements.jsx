const badges = [
    { title: "First Steps", desc: "Logged your first environmental action", date: "2024-01-15" },
    { title: "Week Warrior", desc: "Maintained a 7-day streak", date: "2024-01-22" },
  ];
  
  const Achievements = () => (
    <div className="bg-white p-4 shadow rounded-xl">
      <h3 className="font-semibold mb-4">Your Achievements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {badges.map((b, i) => (
          <div key={i} className="border p-3 rounded-lg bg-yellow-50">
            <h4 className="font-semibold">{b.title}</h4>
            <p className="text-sm">{b.desc}</p>
            <p className="text-xs text-gray-500">Earned {b.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
  export default Achievements;
  