'use client';

import { isServer } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useMemoizedFn } from './useMemoizedFn';

type SetState<S> = S | ((prevState?: S) => S);

// Default expiration time: 7 days in milliseconds
const DEFAULT_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;

interface StorageData<T> {
  value: T;
  timestamp: number;
}

interface Options<T> {
  defaultValue?: T | (() => T);
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: unknown) => void;
  bustStorageOnInit?: boolean | ((layout: T) => boolean);
  expirationTime?: number;
}

export function useLocalStorageState<T>(
  key: string,
  options?: Options<T>
): [T, (value?: SetState<T>) => void] {
  const {
    defaultValue,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    onError,
    bustStorageOnInit = false,
    expirationTime = DEFAULT_EXPIRATION_TIME,
  } = options || {};

  // Get initial value from localStorage or use default
  const getInitialValue = useMemoizedFn((): T | undefined => {
    const gonnaBustTheStorage = () => {
      if (!isServer) window.localStorage.removeItem(key);
      return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
    };

    // If bustStorageOnInit is true, ignore localStorage and use default value
    if (bustStorageOnInit === true) {
      return gonnaBustTheStorage();
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return gonnaBustTheStorage();
      }

      // Parse the stored data which includes value and timestamp
      const storageData: StorageData<T> = JSON.parse(item);

      // Check if the stored data has the expected structure
      if (
        typeof storageData !== 'object' ||
        storageData === null ||
        !('value' in storageData) ||
        !('timestamp' in storageData)
      ) {
        // If the data doesn't have the expected structure (legacy data), treat as expired
        return gonnaBustTheStorage();
      }

      // Check if the data has expired
      const currentTime = Date.now();
      const timeDifference = currentTime - storageData.timestamp;

      if (timeDifference > expirationTime) {
        // Data has expired, remove it and return default value
        return gonnaBustTheStorage();
      }

      // Data is still valid, deserialize and return the value
      const deserializedValue = deserializer(JSON.stringify(storageData.value));

      if (typeof bustStorageOnInit === 'function' && bustStorageOnInit(deserializedValue)) {
        return gonnaBustTheStorage();
      }

      return deserializedValue;
    } catch (error) {
      onError?.(error);
      return gonnaBustTheStorage();
    }
  });

  const [state, setState] = useState<T>(getInitialValue as T);

  // Initialize state from localStorage on mount
  // useMount(() => {
  //   setState(getInitialValue());
  // });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      if (state === undefined && !isServer) {
        window.localStorage.removeItem(key);
      } else {
        // Create storage data with current timestamp
        const storageData: StorageData<T> = {
          value: JSON.parse(serializer(state)),
          timestamp: Date.now(),
        };
        window.localStorage.setItem(key, JSON.stringify(storageData));
      }
    } catch (error) {
      onError?.(error);
    }
  }, [key, state, serializer, onError]);

  // Setter function that handles both direct values and function updates
  const setStoredState = useMemoizedFn((value?: SetState<T>) => {
    try {
      if (typeof value === 'function') {
        setState((prevState) => {
          const newState = (value as (prevState?: T) => T)(prevState);
          return newState;
        });
      } else {
        setState(value as T);
      }
    } catch (error) {
      onError?.(error);
    }
  });

  return [state, setStoredState];
}
