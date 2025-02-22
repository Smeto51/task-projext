'use client'
import React, { useRef, useState } from 'react';

function App() {
    console.log('re-render App')
  const [timer, setTimer] = useState(0);
  const [ref, setRef] = useState(0);
  const intervalRef = useRef();

  const startTimer = () => {
    //intervalRef.current = setInterval(() => {
        setRef(setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000));
  };

  const stopTimer = () => {
    //clearInterval(intervalRef.current);
    clearInterval(ref)
  };

  return (
    <div>
      <p>Timer: {timer}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

export default App;