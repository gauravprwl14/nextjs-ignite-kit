import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items.length) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2", className)}>
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <span key={item.label} className="flex items-center gap-2">
            {isFirst && (
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            )}

            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={cn(
                  "text-sm",
                  isLast ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <span className="text-muted-foreground/50">/</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
