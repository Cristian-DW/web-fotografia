import React from 'react';

const Background = () => {
  return (
    <ul className="background h-full grid grid-cols-20 grid-rows-20 gap-2 p-4 bg-purple-200">
      {Array.from({ length: 20 * 20 }).map((_, index) => (
        <li key={index} ></li>
      ))}
    </ul>
  );
};

export default Background;
