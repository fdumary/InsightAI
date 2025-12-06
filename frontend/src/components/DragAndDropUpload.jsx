import React from 'react';

const DragAndDropUpload = () => {
  return (
    <div className="border-dashed border-2 border-gray-300 p-6 rounded-xl text-center">
      <div className="text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 01.88-2.56l1.42-1.42a4 4 0 015.66 0l1.42 1.42a4 4 0 010 5.66l-1.42 1.42A4 4 0 013 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 10l5 5m0 0l5-5m-5 5V3"
          />
        </svg>
        <p>Drop CSV or Click to Upload</p>
      </div>
    </div>
  );
};

export default DragAndDropUpload;
