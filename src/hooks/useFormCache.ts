import { useEffect, useState, useCallback } from "react";

interface FormCacheOptions<T> {
  key: string;
  initialData: T;
  ttl?: number; // Time to live in milliseconds (default: 24 hours)
}

interface CachedData<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export function useFormCache<T>({
  key,
  initialData,
  ttl = 24 * 60 * 60 * 1000, // 24 hours default
}: FormCacheOptions<T>) {
  const [data, setData] = useState<T>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cached data on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const parsedCache: CachedData<T> = JSON.parse(cached);

        // Check if cache is expired
        if (parsedCache.expiresAt > Date.now()) {
          setData(parsedCache.data);
        } else {
          // Cache expired, remove it
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error(`Error loading cache for ${key}:`, error);
      localStorage.removeItem(key);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  // Save data to cache whenever it changes
  const saveToCache = useCallback(
    (newData: T) => {
      try {
        const cacheData: CachedData<T> = {
          data: newData,
          timestamp: Date.now(),
          expiresAt: Date.now() + ttl,
        };
        localStorage.setItem(key, JSON.stringify(cacheData));
        setData(newData);
      } catch (error) {
        console.error(`Error saving cache for ${key}:`, error);
      }
    },
    [key, ttl]
  );

  // Update specific field
  const updateField = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      const newData = { ...data, [field]: value };
      saveToCache(newData);
    },
    [data, saveToCache]
  );

  // Update multiple fields
  const updateFields = useCallback(
    (updates: Partial<T>) => {
      const newData = { ...data, ...updates };
      saveToCache(newData);
    },
    [data, saveToCache]
  );

  // Clear cache
  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setData(initialData);
    } catch (error) {
      console.error(`Error clearing cache for ${key}:`, error);
    }
  }, [key, initialData]);

  // Check if cache exists and is valid
  const hasCachedData = useCallback((): boolean => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) {
        return false;
      }

      const parsedCache: CachedData<T> = JSON.parse(cached);
      return parsedCache.expiresAt > Date.now();
    } catch {
      return false;
    }
  }, [key]);

  return {
    data,
    isLoaded,
    saveToCache,
    updateField,
    updateFields,
    clearCache,
    hasCachedData,
  };
}
