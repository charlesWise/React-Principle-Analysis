import React, { useRef } from 'react';

const UseRefHook = () => {
  const inputRef = useRef(null)
  const valRef = useRef({v: 'save-value'}) // 保存变量状态

  return (
    <>
      <h1>UseRefHook</h1>
      <input type="text" ref={inputRef} />
      <button onClick={() => {
        console.log(inputRef)
        console.log(valRef.current)
      }}>获取ref</button>
    </>
  )
}

export default UseRefHook;