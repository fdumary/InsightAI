import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from './Card';

const data = [
  { name: 'Billing', percentage: 45 },
  { name: 'Support', percentage: 25 },
  { name: 'Sales', percentage: 15 },
  { name: 'Other', percentage: 15 },
];

const CategoryDistributionCard = () => {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-charcoal mb-4">Category Distribution</h2>
      <div className="w-full h-64">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="percentage" fill="#6366F1" />
        </BarChart>
      </div>
    </Card>
  );
};

export default CategoryDistributionCard;
