"use client";

import { motion } from "framer-motion";
import { Project } from "../types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";

interface ProjectListProps {
    projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
    return (
        <Section id="projects" className="bg-secondary/20">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
                        Selected Work
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        A collection of projects exploring performance and design.
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm border-muted/50 transition-colors hover:border-primary/50 group">
                                <CardHeader>
                                    <CardTitle className="group-hover:text-primary transition-colors">
                                        {project.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-muted-foreground text-sm mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="bg-secondary/50">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-6">
                                    <Button variant="ghost" size="sm" className="w-full gap-2" asChild>
                                        <Link href={project.link} target="_blank">
                                            View Project <ExternalLink className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section >
    );
}
