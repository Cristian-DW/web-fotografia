import React from 'react';

const Background = () => {
  return (
    <ul className="background h-full">
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} ></li>
      ))}
    </ul>
  );
};

export default Background;
