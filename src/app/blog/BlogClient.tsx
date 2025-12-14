"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CategoryNav,
  SearchBar,
  FeaturedPostCard,
  PostCard,
  BlogHero,
} from "@/features/blog/components";
import type { BlogPostMeta, Category } from "@/features/blog/types";

interface BlogClientProps {
  allPosts: BlogPostMeta[];
  featuredPosts: BlogPostMeta[];
  categories: Category[];
  initialCategory: string;
  initialSearch: string;
}

export function BlogClient({
  allPosts,
  featuredPosts,
  categories,
  initialCategory,
  initialSearch,
}: BlogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Filter posts based on category and search
  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "all" || post.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Get posts by category for sections
  const getPostsByCategory = (categoryId: string) => {
    return allPosts.filter((post) => post.category === categoryId).slice(0, 6);
  };

  // Update URL when filters change
  const updateUrl = useCallback(
    (category: string, search: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (category && category !== "all") {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      const queryString = params.toString();
      router.push(queryString ? `/blog?${queryString}` : "/blog", {
        scroll: false,
      });
    },
    [router, searchParams]
  );

  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      setActiveCategory(categoryId);
      updateUrl(categoryId, searchQuery);
    },
    [searchQuery, updateUrl]
  );

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      updateUrl(activeCategory, query);
    },
    [activeCategory, updateUrl]
  );

  // Show filtered results or default sections
  const showFilteredView = searchQuery || activeCategory !== "all";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <BlogHero
        title="Technical Insights & Leadership"
        subtitle="The latest updates on technology, architecture, and engineering leadership."
      />

      {/* Category Nav + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        <SearchBar onSearch={handleSearch} placeholder="Search..." />
      </div>

      {showFilteredView ? (
        /* Filtered Results View */
        <section className="pb-16">
          <p className="text-sm text-white/50 mb-6">
            {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}{" "}
            found
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} layout="vertical" searchQuery={searchQuery} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60">No posts found matching your criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                  updateUrl("all", "");
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      ) : (
        /* Default Sections View */
        <>
          {/* Featured Posts Grid */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Large featured card */}
              {featuredPosts[0] && (
                <div className="lg:row-span-3">
                  <FeaturedPostCard post={featuredPosts[0]} size="large" />
                </div>
              )}

              {/* Stacked smaller cards */}
              <div className="space-y-4">
                {featuredPosts.slice(1, 4).map((post) => (
                  <PostCard key={post.slug} post={post} layout="horizontal" />
                ))}
              </div>
            </div>
          </section>

          {/* Category Sections */}
          {categories
            .filter((cat) => cat.id !== "all")
            .map((category) => {
              const categoryPosts = getPostsByCategory(category.id);
              if (categoryPosts.length === 0) return null;

              return (
                <section key={category.id} className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold text-white">
                      {category.name}
                    </h2>
                    <button
                      onClick={() => handleCategoryChange(category.id)}
                      className="text-sm text-white/60 hover:text-primary transition-colors"
                    >
                      See All Posts →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryPosts.slice(0, 3).map((post) => (
                      <PostCard key={post.slug} post={post} layout="vertical" />
                    ))}
                  </div>
                </section>
              );
            })}
        </>
      )}
    </div>
  );
}
