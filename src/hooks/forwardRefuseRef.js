import React, { forwardRef, useRef} from 'react';

const Forward = forwardRef((props, ref) => {
  return (
    <>
      <h3 ref={ref}>123</h3>
      <h3>456</h3>
    </>
  )
})

export default () => {
  const el = useRef(null)

  return (
    <>
      <Forward ref={el} />
      <button onClick={() => {
        console.log(el.current)
      }}>获取子组件</button>
    </>
  )
}