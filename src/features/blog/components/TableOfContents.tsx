"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Heading } from "../types";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Filter to only show h2 and h3
  const filteredHeadings = headings.filter((h) => h.level === 2 || h.level === 3);

  const handleScroll = useCallback(() => {
    if (filteredHeadings.length === 0) return;

    // Find the heading that is currently in view
    const headingElements = filteredHeadings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean) as HTMLElement[];

    const scrollPosition = window.scrollY + 100; // Offset for header

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
  }, [filteredHeadings]);

  useEffect(() => {
    // Initial check
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (filteredHeadings.length === 0) {
    return null;
  }

  return (
    <nav
      className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
      aria-label="Table of contents"
    >
      <h4 className="text-sm font-semibold text-foreground mb-4">On this page</h4>
      <ul className="space-y-2">
        {filteredHeadings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "block text-left text-sm transition-colors duration-200 w-full",
                "hover:text-foreground",
                heading.level === 3 && "pl-4",
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
