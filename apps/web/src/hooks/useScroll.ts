import { useEffect, useState } from 'react';

type OnBottomCB = () => Promise<unknown>;
export default function useScroll(
  onBottom: OnBottomCB,
  enabled = true
) {
  const [waiting, setWaiting] = useState<boolean>(false);

  useEffect(() => {
    if (waiting || !enabled) {
      return;
    }

    const scrollListener = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setWaiting(true);
        onBottom().finally(() => setWaiting(false));
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window?.removeEventListener('scroll', scrollListener);
    };
  }, [waiting, enabled, onBottom]);
}
