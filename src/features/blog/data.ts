import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogData, BlogDataSchema, BlogPostMeta, Heading } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const BLOG_JSON_PATH = path.join(CONTENT_DIR, "blog.json");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");

/**
 * Load and validate blog data from JSON
 */
export function getBlogData(): BlogData {
  const fileContent = fs.readFileSync(BLOG_JSON_PATH, "utf-8");
  const data = JSON.parse(fileContent);
  return BlogDataSchema.parse(data);
}

/**
 * Get all blog posts metadata
 */
export function getAllPosts(): BlogPostMeta[] {
  const data = getBlogData();
  // Sort by date descending
  return data.posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.featured);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(categoryId: string): BlogPostMeta[] {
  if (categoryId === "all") {
    return getAllPosts();
  }
  return getAllPosts().filter((post) => post.category === categoryId);
}

/**
 * Get all categories
 */
export function getCategories() {
  const data = getBlogData();
  return data.categories;
}

/**
 * Get a single post by slug with MDX content
 */
export function getPostBySlug(slug: string) {
  const data = getBlogData();
  const meta = data.posts.find((post) => post.slug === slug);

  if (!meta) {
    return null;
  }

  // Read MDX file
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(mdxPath)) {
    return { ...meta, content: "", headings: [] };
  }

  const fileContent = fs.readFileSync(mdxPath, "utf-8");
  const { content } = matter(fileContent);

  // Extract headings for ToC
  const headings = extractHeadings(content);

  return {
    ...meta,
    content,
    headings,
  };
}

/**
 * Extract headings from markdown content for ToC
 */
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: Heading[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Search posts by query
 */
export function searchPosts(query: string): BlogPostMeta[] {
  const lowerQuery = query.toLowerCase();
  return getAllPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get category by ID
 */
export function getCategoryById(categoryId: string) {
  const categories = getCategories();
  return categories.find((cat) => cat.id === categoryId);
}
