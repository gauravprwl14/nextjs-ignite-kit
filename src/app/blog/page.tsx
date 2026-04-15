import { Suspense } from "react";
import { Metadata } from "next";
import { BlogClient } from "./BlogClient";
import { getAllPosts, getFeaturedPosts, getCategories } from "@/features/blog/data";

export const metadata: Metadata = {
  title: "Blog | Technical Insights & Leadership",
  description:
    "The latest updates on technology, architecture, and engineering leadership from a Principal Technical Consultant.",
  openGraph: {
    title: "Blog | Technical Insights & Leadership",
    description:
      "The latest updates on technology, architecture, and engineering leadership.",
    type: "website",
  },
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

async function BlogContent({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const categories = getCategories();

  return (
    <BlogClient
      allPosts={allPosts}
      featuredPosts={featuredPosts}
      categories={categories}
      initialCategory={params.category || "all"}
      initialSearch={params.search || ""}
    />
  );
}

export default async function BlogPage(props: BlogPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="space-y-8 animate-pulse">
              <div className="h-48 bg-white/5 rounded-xl" />
              <div className="h-12 bg-white/5 rounded-lg w-1/2" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-80 bg-white/5 rounded-xl" />
                <div className="space-y-4">
                  <div className="h-24 bg-white/5 rounded-xl" />
                  <div className="h-24 bg-white/5 rounded-xl" />
                  <div className="h-24 bg-white/5 rounded-xl" />
                </div>
              </div>
            </div>
          }
        >
          <BlogContent {...props} />
        </Suspense>
      </div>
    </main>
  );
}
