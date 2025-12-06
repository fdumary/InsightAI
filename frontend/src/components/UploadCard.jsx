import React from 'react';
import { UploadCloud } from 'lucide-react';
import Card from './Card';

const UploadCard = () => {
  return (
    <Card className="flex flex-col items-center justify-center text-center">
      <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
      <h2 className="text-lg font-semibold text-charcoal mb-2">Upload your file</h2>
      <p className="text-gray-500 text-sm mb-4">Drag and drop a file here or click to browse.</p>
      <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
        Browse Files
      </button>
    </Card>
  );
};

export default UploadCard;
