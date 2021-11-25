import { useCallback, useEffect, useRef, useState } from "react";


function useOneAndDoubleClick(onClick: () => void, onDoubleClick: () => void, delay: number = 250): () => void {
  const [click, setClick] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // simple click
      if (click === 1) onClick();
      setClick(0);
    }, delay);

    // the duration between this click and the previous one
    // is less than the value of delay = double-click
    if (click === 2) onDoubleClick();

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click]);

  return () => setClick((prev) => prev + 1);
}

