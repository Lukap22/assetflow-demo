import { useEffect, useState } from "react";
import { Key } from "./types";
import { useKeys } from "./useKeys";

// returns true if any of the keys are pressed.
export const useAnyKeys = (keys: Array<Key>, cb?: () => void): boolean => {
  const [isKeyDown, setisKeyDown] = useState(false);
  const keyStatuses = useKeys(keys);

  useEffect(() => {
    if (Object.values(keyStatuses).includes(true)) {
      setisKeyDown(true);
      if (cb) {
        cb();
      }
    } else {
      setisKeyDown(false);
    }
  }, [keyStatuses, cb]);

  return isKeyDown;
};

// returns true if all of the keys are pressed.
export const useAllKeys = (keys: Array<Key>, cb?: () => void): boolean => {
  const [isKeyDown, setisKeyDown] = useState(false);
  const keyStatuses = useKeys(keys);
  console.log({ keyStatuses }, "test");
  useEffect(() => {
    if (!Object.values(keyStatuses).includes(false)) {
      setisKeyDown(true);
      if (cb) {
        cb();
      }
    } else {
      setisKeyDown(false);
    }
  }, [keyStatuses, cb]);

  return isKeyDown;
};

// returns true if all of the keys are pressed.
export const useCombiKeys = (keys: Array<Key>, cb?: () => void): boolean => {
  const [isKeyDown, setisKeyDown] = useState(false);
  const keyStatuses = useKeys(keys);
  console.log({ keyStatuses }, "test");
  useEffect(() => {
    if (!Object.values(keyStatuses).includes(false)) {
      setisKeyDown(true);
      if (cb) {
        cb();
      }
    } else {
      setisKeyDown(false);
    }
  }, [keyStatuses, cb]);

  return isKeyDown;
};
