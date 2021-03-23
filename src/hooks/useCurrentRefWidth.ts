// inspired by:
// https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
import { useState, useEffect } from 'react';

const getWidth = (ref: any): number =>
  !ref || !ref.current ? 0 : ref.current.offsetWidth;

export default function useCurrentWidth(ref?: any) {
  // save current window width in the state object
  let [width, setWidth] = useState(getWidth(ref));

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
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

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, [ref.current]);

  return width;
}
