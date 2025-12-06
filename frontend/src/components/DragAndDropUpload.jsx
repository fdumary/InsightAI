import React from 'react';
import { Upload } from 'lucide-react';

const DragAndDropUpload = () => {
  return (
    <div className="border-dashed border-2 border-gray-300 p-6 rounded-xl text-center">
      <div className="flex flex-col items-center text-gray-500">
        <Upload className="w-10 h-10 mb-4" />
        <p>Drop CSV or Click to Upload</p>
      </div>
    </div>
  );
};

export default DragAndDropUpload;
