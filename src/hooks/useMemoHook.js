import React, {
  useState,
  useMemo,
  useEffect
} from "react";
import MemoChild from '../components/memoChild'

/**
 * useMemo
 * shouldComponentUpdate类似作用，在渲染过程中避免重复渲染问题
 * 用的`memoization`来提高性能，js的一种缓存技术
 * useMemo是在组件渲染的过程中执行，useEffect是在componentDidMount后执行
 */

const UseMemoHook = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(8);

  useEffect(() => {
    console.log('useEffect')
  })
  useMemo(() => {
    console.log('useMemo')
  }, [])
  // 打印顺序 useMemo > useEffect

  const res = useMemo(() => {
    return { count, num };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <>
      <h1>UseMemoHook</h1>
      <p>
        {count} res-{res.count}-{res.num}
      </p>
      <MemoChild c={res.count} n={res.num} />
      <button onClick={() => setCount(count + 1)}>change-count</button>
      <button onClick={() => setNum(num + 1)}>change-count</button>
    </>
  );
};

export default UseMemoHook;
