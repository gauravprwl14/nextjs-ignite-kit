import { z } from "zod";

export const BlogPostSchema = z.object({
    slug: z.string(),
    title: z.string(),
    date: z.string(), // ISO String YYYY-MM-DD
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
    category: z.string().default("General"),
    content: z.string().optional(), // Raw content or compiled specific
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
