import React from 'react';
import { FileText } from 'lucide-react';
import Card from './Card';

const SummaryCard = () => {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2" />
        Summary
      </h2>
      <p className="text-gray-600">
        The overall sentiment is largely positive, with most feedback praising the customer service and product quality. However, there are notable concerns about pricing and the website's user experience. Addressing these issues could significantly improve customer satisfaction.
      </p>
    </Card>
  );
};

export default SummaryCard;
