"use client";
import React, { useState } from 'react';

export default AdvertisementForm;

/*"use client";
import React, { useEffect, useState, use, useContext } from "react";

function init(initialCount) {
  return {count: initialCount = 0};
}

//const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  
  const [state, dispatch] = React.useReducer(reducer, initialCount, init);
  //{ console.log(state.count)}//инициализация произошла 0
  return (
    <>
    <button 
      onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

export default Counter;


//Примеры одного и того же Хуков
/*function postPage({ params }) {
  "use stict";
  const { id: postId } = React.use(params);
  const [count, setCount] = useState(0);
  let [a] = "5";

  useEffect(() => {
    document.title = `Вы нажали ${count} раз`;
    //console.log("Выполнение ХУКА: " + [count]);
  }, [count]   );

  return (
    <div>
      ID: {postId}
      <p>Вы кликнули {count} раз</p>
      <button onClick={() => setCount(count + 1)}>Нажми на меня</button>
      Тоже самое что и выше<button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>    
      </div>
  );
}
 
export default postPage;

export default function PostPage() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Нажми на меня</button>
      <p>Вы кликнули {count} раз</p>
    </div>
  );
}*/

/*export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}*/
