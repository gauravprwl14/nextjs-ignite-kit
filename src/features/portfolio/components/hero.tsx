"use client";

import { motion } from "framer-motion";
import { type HeroSchema } from "../types";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type HeroProps = z.infer<typeof HeroSchema>;

export function HeroSection({ headline, subheadline, ctaText, ctaLink }: HeroProps) {
    return (
        <section className="relative overflow-hidden py-24 lg:py-32 xl:py-40">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

            <Container className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm hover:bg-primary/20 transition-colors">
                        Available for hire
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-6 max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-7xl font-heading"
                >
                    {headline}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 max-w-2xl text-lg text-muted-foreground"
                >
                    {subheadline}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex gap-4"
                >
                    <Button asChild size="lg" className="rounded-full text-base">
                        <Link href={ctaLink}>
                            {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full text-base" asChild>
                        <Link href="/blog">Read Blog</Link>
                    </Button>
                </motion.div>
            </Container>
        </section>
    );
}
