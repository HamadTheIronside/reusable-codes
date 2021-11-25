import { useEffect, useState } from "react";

const useCountDown = (seconds: number, onFinished?: () => void) => {
  const [remainingSeconds, setRemainingSeconds] = useState(seconds);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (remainingSeconds > 0) {
        setRemainingSeconds((oldValue) => oldValue - 1);
      } else if (remainingSeconds === 0) {
        onFinished?.();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [remainingSeconds]);

  return [remainingSeconds, setRemainingSeconds] as const;
};
