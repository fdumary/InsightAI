import React from 'react';

const InsightCard = ({ title, icon, children }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold ml-2">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default InsightCard;
