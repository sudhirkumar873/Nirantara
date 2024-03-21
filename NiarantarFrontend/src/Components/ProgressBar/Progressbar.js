import React, { useEffect, useState } from 'react';
// Make sure to import your CSS file

const CircularProgressBar = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (counter === 100) {
        clearInterval(intervalId);
      } else {
        setCounter(prevCounter => prevCounter + 1);
      }
    }, 80);

    return () => {
      clearInterval(intervalId);
    };
  }, [counter]);

  return (
    <div className="circular">
      <div className="inner"></div>
      <div className="outer"></div>
      <div className="numb">{counter}%</div>
      <div className="circle">
        <div className="dot">
          <span></span>
        </div>
        <div className="bar left">
          <div className="progress"></div>
        </div>
        <div className="bar right">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
