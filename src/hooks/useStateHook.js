import React, { useState } from 'react';

const UseStateHook = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1>UseStateHook</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>change-count</button>
    </>
  )
}

export default UseStateHook;