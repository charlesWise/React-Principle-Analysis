import React, { useState, useEffect } from "react";

/**
 * useEffect
 * 1、componentDidMount\componentDidUpdate\componentWillUnmount
 * 2、副作用（DOM操作、数据请求、组件更新）
 * 3、useEffect为什么可以在组件函数内部执行？可以获取props和state，采用闭包形式
 * 4、无阻塞更新
 */

const UseEffectHook = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    return () => {
      console.log('componentWillUnmount')
    }
  }, []);

  return (
    <>
      <h1>UseEffectHook</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>change-count</button>
    </>
  );
};

export default UseEffectHook;
