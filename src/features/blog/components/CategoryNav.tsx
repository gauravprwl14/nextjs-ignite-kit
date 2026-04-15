"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "../types";

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryNav({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, [checkScrollPosition]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    // Check position after scroll animation
    setTimeout(checkScrollPosition, 300);
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className={cn(
          "shrink-0 p-2 rounded-full glass-panel transition-opacity duration-200 cursor-pointer",
          "hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary",
          showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-label="Scroll categories left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Scrollable Category Pills */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollPosition}
        className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
        role="tablist"
        aria-label="Blog categories"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            role="tab"
            aria-selected={activeCategory === category.id}
            className={cn(
              "shrink-0 px-4 py-2 rounded-full text-sm font-medium cursor-pointer",
              "transition-all duration-200 whitespace-nowrap",
              activeCategory === category.id
                ? "bg-foreground text-background"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className={cn(
          "shrink-0 p-2 rounded-full glass-panel transition-opacity duration-200 cursor-pointer",
          "hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary",
          showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-label="Scroll categories right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
