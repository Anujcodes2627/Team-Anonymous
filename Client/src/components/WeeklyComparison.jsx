import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Mo', saved: 400, emitted: 300 },
  { name: 'Tue', saved: 300, emitted: 200 },
  { name: 'We', saved: 450, emitted: 350 },
  { name: 'Thu', saved: 350, emitted: 250 },
  { name: 'Fri', saved: 350, emitted: 450 },
  { name: 'Sat', saved: 500, emitted: 465 },
  { name: 'Sun', saved: 300, emitted: 200 },
  // ...
];

const WeeklyComparison = () => (
  <div className="bg-white p-4 shadow rounded-xl">
    <h3 className="font-semibold mb-2">Weekly Impact Comparison</h3>
    <BarChart width={300} height={200} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="saved" fill="#10b981" />
      <Bar dataKey="emitted" fill="#f97316" />
    </BarChart>
  </div>
);
export default WeeklyComparison;
