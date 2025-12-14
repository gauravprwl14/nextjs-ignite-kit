"use client";

import { AboutSchema } from "../types";
import { z } from "zod";
import { Container, Section } from "@/components/ui/container";
import { motion } from "framer-motion";

type AboutProps = z.infer<typeof AboutSchema>;

export function AboutSection({ title, bio, skills }: AboutProps) {
    return (
        <Section className="bg-secondary/10">
            <Container className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold font-heading mb-6">{title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {bio}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-card p-8 rounded-2xl border"
                >
                    <h3 className="font-semibold mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}
