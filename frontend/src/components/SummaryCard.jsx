import React from 'react';
import { FileText, Copy } from 'lucide-react';
import Card from './Card';

const SummaryCard = () => {
  const summaryText = "The overall sentiment is largely positive, with most feedback praising the customer service and product quality. However, there are notable concerns about pricing and the website's user experience. Addressing these issues could significantly improve customer satisfaction.";

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-charcoal flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Summary
        </h2>
        <button onClick={handleCopy} className="text-gray-500 hover:text-gray-700">
          <Copy className="w-5 h-5" />
        </button>
      </div>
      <p className="text-gray-600 font-serif">
        {summaryText}
      </p>
    </Card>
  );
};

export default SummaryCard;
