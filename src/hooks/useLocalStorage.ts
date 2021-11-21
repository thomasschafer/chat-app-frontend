import { useState } from "react";

// Taken from https://usehooks.com/useLocalStorage/

export const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      console.log("item", item);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      console.log("initialValue", initialValue);
      return initialValue;
    }
  });

  const setValue = (value: string | Function) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
};
