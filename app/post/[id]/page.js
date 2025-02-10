"use stict";
"use client";
import React, { useEffect, useState } from "react";

function postPage({ params }) {
  const { id: postId } = React.use(params);
  const [ count, setCount ] = useState(0);
  
  useEffect(() => {
    document.title = `Вы нажали ${count} раз`;
  })

  return (
    <div>
      ID: {postId}
      <p>Вы кликнули {count} раз</p>
      <button onClick={() => setCount(count + 1)}>Нажми на меня</button>
    </div>
  );
}

export default postPage;
