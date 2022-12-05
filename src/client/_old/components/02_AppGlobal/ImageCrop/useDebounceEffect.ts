import { DependencyList, useEffect } from "react";

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      deps && fn.apply(undefined, deps as []); // eslint-disable-line
    }, waitTime);

    // const t = setTimeout(() => ({ ...{ undefined, deps } }), waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
