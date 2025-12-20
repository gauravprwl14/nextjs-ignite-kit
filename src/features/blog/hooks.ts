import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Custom hook for debounced values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for keyboard shortcuts
 */
export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: { ctrl?: boolean; meta?: boolean } = {}
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrlMatch = options.ctrl ? e.ctrlKey : true;
      const metaMatch = options.meta ? e.metaKey : true;
      const keyMatch = e.key.toLowerCase() === key.toLowerCase();

      if (keyMatch && (ctrlMatch || metaMatch)) {
        e.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, options.ctrl, options.meta]);
}

/**
 * Custom hook for scroll spy
 */
export function useScrollSpy(
  headingIds: string[],
  options: { offset?: number } = {}
) {
  const [activeId, setActiveId] = useState<string>("");
  const { offset = 100 } = options;

  const handleScroll = useCallback(() => {
    if (headingIds.length === 0) return;

    const headingElements = headingIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const scrollPosition = window.scrollY + offset;

    let currentActiveId = "";

    for (let i = headingElements.length - 1; i >= 0; i--) {
      const element = headingElements[i];
      if (element.offsetTop <= scrollPosition) {
        currentActiveId = element.id;
        break;
      }
    }

    // If no heading found yet, set first one as active
    if (!currentActiveId && headingElements.length > 0) {
      currentActiveId = headingElements[0].id;
    }

    setActiveId(currentActiveId);
  }, [headingIds, offset]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return activeId;
}

/**
 * Custom hook for debounced search
 */
export function useDebouncedSearch(
  onSearch: (query: string) => void,
  delay = 300
) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        onSearch(value);
      }, delay);
    },
    [onSearch, delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return debouncedSearch;
}
