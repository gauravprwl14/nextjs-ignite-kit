"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({
  onSearch,
  placeholder = "Search...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search
  const debouncedSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        onSearch(value);
      }, 300);
    },
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  };

  // Keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 px-4 py-2 rounded-lg",
        "bg-white/5 border transition-all duration-200",
        isFocused
          ? "border-primary/50 ring-2 ring-primary/20"
          : "border-white/10 hover:border-white/20"
      )}
    >
      <Search className="w-4 h-4 text-white/40 shrink-0" />

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none min-w-[120px]"
        aria-label="Search blog posts"
      />

      {/* Keyboard shortcut hint */}
      {!query && !isFocused && (
        <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 text-xs text-white/30 bg-white/5 rounded border border-white/10">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      )}

      {/* Clear button */}
      {query && (
        <button
          onClick={handleClear}
          className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-3 h-3 text-white/50" />
        </button>
      )}
    </div>
  );
}

