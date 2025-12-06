import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';
import Card from './Card';

const SentimentCard = () => {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-charcoal mb-4">Sentiment</h2>
      <div className="flex justify-around">
        <div className="flex flex-col items-center">
          <Smile className="w-10 h-10 text-green-500 mb-2" />
          <span className="font-semibold">Positive</span>
          <span className="text-gray-500">75%</span>
        </div>
        <div className="flex flex-col items-center">
          <Meh className="w-10 h-10 text-yellow-500 mb-2" />
          <span className="font-semibold">Neutral</span>
          <span className="text-gray-500">15%</span>
        </div>
        <div className="flex flex-col items-center">
          <Frown className="w-10 h-10 text-red-500 mb-2" />
          <span className="font-semibold">Negative</span>
          <span className="text-gray-500">10%</span>
        </div>
      </div>
    </Card>
  );
};

export default SentimentCard;
