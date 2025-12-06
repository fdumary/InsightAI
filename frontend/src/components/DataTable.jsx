import React from 'react';
import Card from './Card';

const DataTable = () => {
  const data = [
    { id: 1, category: 'Billing', sentiment: 'Negative', comment: 'Overcharged for service' },
    { id: 2, category: 'Support', sentiment: 'Positive', comment: 'Quick and helpful support' },
    { id: 3, category: 'Sales', sentiment: 'Neutral', comment: 'Website is slow' },
  ];

  return (
    <Card>
      <h2 className="text-lg font-semibold text-charcoal mb-4">Recent Feedback</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">Category</th>
            <th className="py-2">Sentiment</th>
            <th className="py-2">Comment</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b">
              <td className="py-2">{row.category}</td>
              <td className="py-2">{row.sentiment}</td>
              <td className="py-2">{row.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default DataTable;
