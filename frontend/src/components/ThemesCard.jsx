import React from 'react';
import { Tag } from 'lucide-react';
import Card from './Card';

const ThemesCard = () => {
  const themes = ["Customer Service", "Product Quality", "Pricing", "Website Experience", "Shipping"];
  return (
    <Card>
      <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
        <Tag className="w-5 h-5 mr-2" />
        Themes
      </h2>
      <div className="flex flex-wrap gap-2">
        {themes.map((theme, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
            {theme}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default ThemesCard;
