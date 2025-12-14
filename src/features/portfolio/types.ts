import { z } from "zod";

export const SocialLinkSchema = z.object({
    platform: z.string(),
    url: z.string().url(),
    icon: z.string().optional(), // Lucide icon name
});

export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    link: z.string().url(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
});

export const HeroSchema = z.object({
    headline: z.string(),
    subheadline: z.string(),
    ctaText: z.string(),
    ctaLink: z.string(),
});

export const AboutSchema = z.object({
    title: z.string(),
    bio: z.string(),
    skills: z.array(z.string()),
});

export const PortfolioDataSchema = z.object({
    hero: HeroSchema,
    about: AboutSchema,
    projects: z.array(ProjectSchema),
    socials: z.array(SocialLinkSchema),
    contact: z.object({
        email: z.string().email(),
    }),
});

export type PortfolioData = z.infer<typeof PortfolioDataSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
