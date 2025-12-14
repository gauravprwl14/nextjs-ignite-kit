import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BlogPostMeta } from "../types";

interface PostCardProps {
  post: BlogPostMeta;
  layout?: "horizontal" | "vertical";
  searchQuery?: string;
}

// Highlight matching text in a string
function highlightText(text: string, query: string) {
  if (!query || query.trim() === "") {
    return text;
  }

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="search-highlight">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export function PostCard({ post, layout = "horizontal", searchQuery }: PostCardProps) {
  const isHorizontal = layout === "horizontal";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block transition-all duration-300 cursor-pointer",
        isHorizontal ? "flex gap-4 items-start" : "block"
      )}
    >
      {/* Thumbnail */}
      <div
        className={cn(
          "relative rounded-xl overflow-hidden shrink-0",
          "bg-white/5 border border-white/10 transition-all duration-300",
          "group-hover:border-primary/30",
          isHorizontal
            ? "w-32 h-24 md:w-40 md:h-28"
            : "w-full aspect-video mb-4"
        )}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/10 to-accent/10" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-white/50 mb-1.5">
          <span>{post.author.name}</span>
          <span>•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>

        {/* Title with optional highlighting */}
        <h3
          className={cn(
            "font-medium text-white transition-colors duration-200",
            "group-hover:text-primary",
            "line-clamp-2",
            isHorizontal ? "text-sm md:text-base" : "text-base md:text-lg"
          )}
        >
          {searchQuery ? highlightText(post.title, searchQuery) : post.title}
        </h3>

        {/* Reading time */}
        {post.readingTime && !isHorizontal && (
          <p className="mt-2 text-xs text-white/40">{post.readingTime} read</p>
        )}
      </div>
    </Link>
  );
}

