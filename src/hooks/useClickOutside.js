import {useEffect, useRef} from "react";

export default function useClickOutside(callback, listenCapturing = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback?.();
      }
    }

    document.addEventListener("click", handleClickOutside, listenCapturing);
    return () => document.removeEventListener("click", handleClickOutside, listenCapturing);
  }, [callback, listenCapturing]);
  return ref;
}