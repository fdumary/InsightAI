import React from 'react';
import { PieChart } from 'lucide-react';
import Card from './Card';

const CategoryDistributionCard = () => {
  const categories = [
    { name: "Billing", percentage: 45, color: "bg-blue-500" },
    { name: "Support", percentage: 25, color: "bg-green-500" },
    { name: "Sales", percentage: 15, color: "bg-yellow-500" },
    { name: "Other", percentage: 15, color: "bg-gray-300" },
  ];

  return (
    <Card>
      <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
        <PieChart className="w-5 h-5 mr-2" />
        Category Distribution
      </h2>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center">
            <div className="w-2/5 text-gray-600">{category.name}</div>
            <div className="w-3/5 bg-gray-200 rounded-full h-4">
              <div
                className={`${category.color} h-4 rounded-full`}
                style={{ width: `${category.percentage}%` }}
              ></div>
            </div>
            <div className="w-1/5 text-right text-gray-600">{category.percentage}%</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CategoryDistributionCard;
