import React, { useState, createContext, useContext } from 'react';

const MyContext = createContext()

const Child2 = () => {
  const count = useContext(MyContext)
  return (
    <h3>我是子子组件{count}</h3>
  )
}

const Child = () => {
  const count = useContext(MyContext)
  return (
    <>
      <h3>我是子组件{count}</h3>
      <Child2 />
    </>
  )
}

const UseContextHook = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>UseContextHook</h1>
      <button onClick={() => {
        setCount(count + 1)
      }}>change-count</button>
      <MyContext.Provider value={count}>
        <Child />
      </MyContext.Provider>
    </>
  )
}

export default UseContextHook;