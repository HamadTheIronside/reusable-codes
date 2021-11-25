import { useCallback, RefObject, useRef, useState } from "react";

const useStateRef = (trigger: any = 0): readonly [RefObject<any>, (newNode: HTMLElement) => void] => {
  const [, setNode] = useState<HTMLElement>(null);
  const ref = useRef<HTMLElement>();

  const setRef = useCallback(
    (newNode: HTMLElement) => {
      setNode(newNode);
      ref.current = newNode;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trigger],
  );

  return [ref, setRef] as const;
};
