import { useEffect, useState } from "react";
import { useSsr } from "usehooks-ts";

export const useKey = (key: string, cb?: () => void): boolean => {
  const { isBrowser } = useSsr();
  const [isKeyDown, setisKeyDown] = useState(false);

  useEffect(() => {
    const keyDown = (e: KeyboardEvent): void => {
      if (e.key === key) {
        setisKeyDown(true);
        if (cb) {
          cb();
        }
      }
    };
    const keyUp = (e: KeyboardEvent): void => {
      if (e.key === key) {
        setisKeyDown(false);
      }
    };

    if (isBrowser) {
      window.addEventListener("keydown", keyDown);
      window.addEventListener("keyup", keyUp);
    }

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, [isBrowser, key, cb]);

  return isKeyDown;
};
