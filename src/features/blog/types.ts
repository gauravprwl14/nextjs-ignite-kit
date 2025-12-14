import { z } from "zod";

// Author schema
export const AuthorSchema = z.object({
  name: z.string(),
  avatar: z.string().optional(),
});

// Category schema
export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

// Blog post schema (for JSON metadata)
export const BlogPostMetaSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: z.string(),
  date: z.string(), // ISO String YYYY-MM-DD
  author: AuthorSchema,
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  readingTime: z.string().optional(),
});

// Full blog post with content (after MDX processing)
export const BlogPostSchema = BlogPostMetaSchema.extend({
  content: z.string().optional(),
  headings: z.array(z.object({
    id: z.string(),
    text: z.string(),
    level: z.number(),
  })).optional(),
});

// Blog data (the entire JSON file)
export const BlogDataSchema = z.object({
  categories: z.array(CategorySchema),
  posts: z.array(BlogPostMetaSchema),
});

// TypeScript types
export type Author = z.infer<typeof AuthorSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type BlogPostMeta = z.infer<typeof BlogPostMetaSchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>;
export type BlogData = z.infer<typeof BlogDataSchema>;

// Heading type for ToC
export interface Heading {
  id: string;
  text: string;
  level: number;
}

