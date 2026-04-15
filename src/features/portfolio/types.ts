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

export const ArchitectureNodeSchema = z.object({
    id: z.string(),
    label: z.string(),
    type: z.string(),
    x: z.number(),
    y: z.number(),
    subLabel: z.string().optional(),
});

export const ArchitectureFlowSchema = z.object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
    label: z.string(),
});

export const ArchitectureDiagramSchema = z.object({
    title: z.string(),
    description: z.string(),
    nodes: z.array(ArchitectureNodeSchema),
    flows: z.array(ArchitectureFlowSchema),
});

export const BusinessImpactSchema = z.object({
    metric: z.string(),
    value: z.string(),
    description: z.string(),
});

export const DetailedProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    client: z.string(),
    realClient: z.string().optional(),
    anonymizedClient: z.string(),
    isNDA: z.boolean(),
    description: z.string(),
    problem: z.string(),
    solution: z.string(),
    duration: z.string(),
    teamSize: z.string(),
    capabilities: z.array(z.string()),
    technologies: z.array(z.string()),
    workTypes: z.array(z.string()),
    status: z.string(),
    businessImpact: z.array(BusinessImpactSchema),
    technicalHighlights: z.array(z.string()).optional(),
    keyFeatures: z.array(z.string()).optional(),
    challenges: z.array(z.string()).optional(),
    architectureType: z.string().optional(),
    architectureDiagram: ArchitectureDiagramSchema.optional(),
});

export type DetailedProject = z.infer<typeof DetailedProjectSchema>;

export const CapabilitySchema = z.object({
    id: z.string(),
    l1: z.string(),
    l2: z.string(),
    l3: z.string(),
    title: z.string(),
    description: z.string(),
    projects: z.array(DetailedProjectSchema),
    marketTrends: z.array(z.string()),
    workTypes: z.array(z.string()),
});

export type Capability = z.infer<typeof CapabilitySchema>;
