import React, { useMemo } from "react";

const MemoChild = ({ c, n }) => {
  const res = useMemo(() => {
    return { c, n }
  }, [c, n]);

  return (
    <>
      <p>
        子组件：count{res.c}-num{res.n}
      </p>
    </>
  );
};

export default MemoChild;