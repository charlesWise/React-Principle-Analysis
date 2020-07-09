import React, { useState, useCallback } from 'react';

/**
 * 避免组件重复渲染，提高性能（useMemo）
 * 可以控制组件什么时候更新
 * 同样起到缓存技术，但是缓存的是一个函数
 * useCallback返回的是个函数可以直接执行
 */

const UseCallbackHook = () => {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)

  const cb = useCallback(() => {
    return count
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num])

  return (
    <>
      <h1>UseCallbackHook</h1>
      <p>count: {count}</p>
      <p>num: {num}</p>
      <p>Callback: {cb()}</p>
      <button onClick={() => setCount(count + 1)}>change-count</button>
      <button onClick={() => setNum(num + 1)}>change-num</button>
    </>
  )
}

export default UseCallbackHook;