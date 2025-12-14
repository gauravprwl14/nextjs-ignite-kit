import "server-only";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { BlogPost, BlogPostSchema } from "./types";

const POSTS_PATH = path.join(process.cwd(), "content", "posts");

export async function getAllPosts(): Promise<BlogPost[]> {
    try {
        // Ensure directory exists
        try {
            await fs.access(POSTS_PATH);
        } catch {
            await fs.mkdir(POSTS_PATH, { recursive: true });
            return [];
        }

        const files = await fs.readdir(POSTS_PATH);
        const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

        const posts = await Promise.all(
            mdxFiles.map(async (file) => {
                const filePath = path.join(POSTS_PATH, file);
                const fileContent = await fs.readFile(filePath, "utf-8");
                const { data, content } = matter(fileContent);

                const slug = file.replace(/\.mdx$/, "");

                const validation = BlogPostSchema.safeParse({
                    slug,
                    ...data,
                    content,
                });

                if (!validation.success) {
                    console.warn(`Invalid post ${file}:`, validation.error);
                    return null;
                }

                return validation.data;
            })
        );

        return posts
            .filter((post): post is BlogPost => post !== null)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        // We don't parse content here as MDXRemote will handle it in the component
        // but we return the raw string to be passed to it.

        const validation = BlogPostSchema.safeParse({
            slug,
            ...data,
            content,
        });

        if (!validation.success) return null;
        return validation.data;
    } catch {
        return null;
    }
}
