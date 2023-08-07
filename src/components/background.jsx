import React from 'react';

const Background = () => {
  return (
    <div className="background h-full grid grid-cols-20 grid-rows-20 gap-2 p-4 bg-purple-200">
      {Array.from({ length: 20 * 20 }).map((_, index) => (
        <span key={index} ></span>
      ))}
    </div>
  );
};

export default Background;
