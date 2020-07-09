import React, { useState } from 'react';


/**
 * 封装自定义hook
 * 和普通的函数本质上没有区别，都是做一些函数的封装，方便使用。
 * 1、必须以use开头；2、自定义的hook可以使用原有的hook来封装。
 */

const useCus = (val, num) => {
  const [count, setCount] = useState(val)
  const add = () => {
    setCount(count + num)
  }
  return { count, add }
}

export default () => {
  const { count, add } = useCus(10, 2)
  return (
    <>
      <p>{ count }</p>
      <button onClick={() => add()}>add</button>
    </>
  )
}