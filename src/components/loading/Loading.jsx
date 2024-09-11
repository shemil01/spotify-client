import React from 'react';

const DotLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black bg-opacity-50">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-white rounded-full animate-bounce-1"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce-2"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce-3"></div>
      </div>
    </div>
  );
};

export default DotLoader;
