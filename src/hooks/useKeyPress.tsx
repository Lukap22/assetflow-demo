import { useEffect, useState } from "react";
type ModifierKeys = "Alt" | "AltGraph" | "CapsLock" | "Control" | "Fn" | "FnLock" | "Hyper" | "Meta" | "NumLock" | "ScrollLock" | "Shift" | "Super" | "Symbol" | "SymbolLock";
type WhitespaceKeys = "Enter" | "Tab" | " ";
type NavigationKeys = "ArrowDown" | "ArrowLeft" | "ArrowRight" | "ArrowUp" | "End" | "Home" | "PageDown" | "PageUp";
type FunctionKeys = "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12" | "F13" | "F14" | "F15" | "F16" | "F17" | "F18" | "F19" | "F20" | "Soft1" | "Soft2" | "Soft3" | "Soft4";
type NumericKeypadKeys = "Decimal" | "Key11" | "Key12" | "Multiply" | "Add" | "Clear" | "Divide" | "Subtract" | "Separator" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type Key = string | ModifierKeys | WhitespaceKeys | NavigationKeys | FunctionKeys | NumericKeypadKeys;



/**
 * This hook allows you to detect when a key is pressed.
 * @param targetKey key to detect
 * @returns true if the targetKey is pressed, false otherwise
 * @example
 * const ctrlPress = useKeyPress("Control");
 */
export function useKeyPress(targetKey: Key) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }: { key: Key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }: { key: Key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}