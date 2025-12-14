"use client";

import { Container } from "@/components/ui/container";
import { Github, Linkedin, Twitter, Mail, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { type SocialLink } from "../types";

// Mapping string names to Lucide components
const IconMap: Record<string, LucideIcon> = {
    Github,
    Twitter,
    Linkedin,
    Mail
};

interface FooterProps {
    socials: SocialLink[];
}

export function Footer({ socials }: FooterProps) {
    return (
        <footer className="border-t bg-card text-card-foreground py-12 mt-24">
            <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Premium Portfolio. All rights reserved.
                </p>

                <div className="flex gap-6">
                    {socials.map((social) => {
                        const Icon = social.icon && IconMap[social.icon] ? IconMap[social.icon] : null;
                        return (
                            <Link
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label={social.platform}
                            >
                                {Icon ? <Icon className="h-5 w-5" /> : social.platform}
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </footer>
    );
}
