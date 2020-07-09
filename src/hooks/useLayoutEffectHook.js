import React, { useState, useEffect, useLayoutEffect } from "react";

/**
 * useEffect
 * 1、componentDidMount\componentDidUpdate\componentWillUnmount
 * 2、副作用（DOM操作、数据请求、组件更新）
 * 3、useEffect为什么可以在组件函数内部执行？可以获取props和state，采用闭包形式
 * 4、无阻塞更新
 * 
 * useLayoutEffect在浏览器执行绘制之前执行（会阻塞组件挂载，慎用）
 */

const UseLayoutEffectHook = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect')
    return () => {
      console.log('useEffect-return')
    }
  });
  useLayoutEffect(() => {
    console.log('useLayoutEffect')
    return () => {
      console.log('useLayoutEffect-return')
    }
  });
  // useLayoutEffect > useEffect
  // 更新 useLayoutEffect-return > useLayoutEffect > useEffect-return > useEffect

  return (
    <>
      <h1>UseLayoutEffectHook</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>change-count</button>
    </>
  );
};

export default UseLayoutEffectHook;
