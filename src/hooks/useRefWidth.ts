// inspired by:
// https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
import { useState, useEffect } from 'react';

const getWidth = (ref: any): number =>
  !ref || !ref.current ? 0 : ref.current.offsetWidth;

export default function useRefWidth(ref?: any) {
  const [width, setWidth] = useState(getWidth(ref));

  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId: any = null;

    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);

      // change width from the state object after 300 milliseconds
      timeoutId = setTimeout(() => setWidth(getWidth(ref)), 300);
    };

    // set resize listener
    window.addEventListener('resize', resizeListener);

    // set width initially
    setWidth(getWidth(ref));

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [ref.current]);

  return width;
};
