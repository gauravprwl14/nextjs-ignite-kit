import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BlogPostMeta } from "../types";

interface FeaturedPostCardProps {
  post: BlogPostMeta;
  size?: "large" | "small";
}

export function FeaturedPostCard({
  post,
  size = "large",
}: FeaturedPostCardProps) {
  const isLarge = size === "large";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative block rounded-2xl overflow-hidden",
        "bg-white/5 border border-white/10 transition-all duration-300",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
        isLarge ? "aspect-4/3" : "aspect-video"
      )}
    >
      {/* Cover Image with Overlay */}
      <div className="absolute inset-0">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/20 to-accent/20" />
        )}

        {/* Gradient Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent",
            "transition-opacity duration-300",
            "group-hover:from-black/95"
          )}
        />

        {/* "Read post" Badge */}
        <div
          className={cn(
            "absolute top-4 right-4 px-3 py-1.5 rounded-full",
            "bg-white text-black text-xs font-medium",
            "opacity-0 translate-x-4 transition-all duration-300",
            "group-hover:opacity-100 group-hover:translate-x-0"
          )}
        >
          Read post
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-white/60 mb-2">
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

        {/* Title */}
        <h3
          className={cn(
            "font-semibold text-white transition-colors duration-200",
            "group-hover:text-primary",
            isLarge ? "text-xl md:text-2xl" : "text-base md:text-lg",
            "line-clamp-2"
          )}
        >
          {post.title}
        </h3>
      </div>
    </Link>
  );
}
