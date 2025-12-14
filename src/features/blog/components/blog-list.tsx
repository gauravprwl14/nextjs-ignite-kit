"use client";

import { useState } from "react";
import { BlogPost } from "../types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogListProps {
    initialPosts: BlogPost[];
}

export function BlogList({ initialPosts }: BlogListProps) {
    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract all unique tags
    const allTags = Array.from(new Set(initialPosts.flatMap(post => post.tags)));

    const filteredPosts = initialPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(search.toLowerCase());
        const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

        return matchesSearch && matchesTag;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-card p-6 rounded-xl border">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search articles..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                    <Badge
                        variant={selectedTag === null ? "default" : "outline"}
                        className="cursor-pointer whitespace-nowrap"
                        onClick={() => setSelectedTag(null)}
                    >
                        All
                    </Badge>
                    {allTags.map(tag => (
                        <Badge
                            key={tag}
                            variant={selectedTag === tag ? "default" : "outline"}
                            className="cursor-pointer whitespace-nowrap"
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post) => (
                        <motion.div
                            key={post.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <div className="flex justify-between items-start gap-4 mb-2">
                                        <Badge variant="secondary">{post.category}</Badge>
                                        <span className="text-xs text-muted-foreground">{post.date}</span>
                                    </div>
                                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-muted-foreground text-sm line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="link" className="px-0 group" asChild>
                                        <Link href={`/blog/${post.slug}`}>
                                            Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredPosts.length === 0 && (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        No articles found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}
