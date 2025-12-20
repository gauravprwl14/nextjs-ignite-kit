"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { Breadcrumbs, TableOfContents } from "@/features/blog/components";
import { MDXContent } from "./MDXContent";
import type { BlogPost } from "@/features/blog/types";

interface BlogDetailClientProps {
  post: BlogPost;
  categoryName: string;
}

export function BlogDetailClient({ post, categoryName }: BlogDetailClientProps) {
  return (
    <article className="max-w-6xl mx-auto">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: categoryName },
        ]}
        className="mb-8"
      />

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
          {post.title}
        </h1>

        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">{post.excerpt}</p>

        {/* Author & Meta */}
        <div className="flex items-center gap-4 pb-8 border-b border-border">
          {/* Author Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-muted-foreground" />
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{post.author.name}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with ToC Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Article Content */}
        <div className="prose dark:prose-invert prose-lg max-w-none">
          <MDXContent content={post.content || ""} />
        </div>

        {/* Table of Contents Sidebar */}
        {post.headings && post.headings.length > 0 && (
          <aside className="hidden lg:block">
            <TableOfContents headings={post.headings} />
          </aside>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-border">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to all posts
        </Link>
      </footer>
    </article>
  );
}
