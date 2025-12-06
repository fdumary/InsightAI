import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Card from './Card';

const data = [
  { name: 'Positive', value: 75 },
  { name: 'Neutral', value: 15 },
  { name: 'Negative', value: 10 },
];

const COLORS = ['#14B8A6', '#FBBF24', '#EF4444'];

const SentimentCard = () => {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-charcoal mb-4">Sentiment</h2>
      <div className="w-full h-64">
        <PieChart width={400} height={250}>
          <Pie
            data={data}
            cx={120}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </Card>
  );
};

export default SentimentCard;
