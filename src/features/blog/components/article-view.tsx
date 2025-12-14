import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ArticleViewProps {
    slug: string;
    title: string;
    date: string;
    category: string;
    tags: string[];
    content: string; // Raw MDX string
}

const components = {
    h1: (props: React.ComponentPropsWithoutRef<"h1">) => <h1 className="mt-8 mb-4 text-4xl font-bold font-heading" {...props} />,
    h2: (props: React.ComponentPropsWithoutRef<"h2">) => <h2 className="mt-8 mb-4 text-2xl font-semibold font-heading" {...props} />,
    p: (props: React.ComponentPropsWithoutRef<"p">) => <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground text-lg" {...props} />,
    blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground" {...props} />,
    ul: (props: React.ComponentPropsWithoutRef<"ul">) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
    code: (props: React.ComponentPropsWithoutRef<"code">) => <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props} />,
    pre: (props: React.ComponentPropsWithoutRef<"pre">) => <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4" {...props} />,
};

export function ArticleView({ title, date, category, tags, content }: ArticleViewProps) {
    return (
        <article className="py-24">
            <Container className="max-w-3xl">
                <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all" asChild>
                    <Link href="/blog">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                    </Link>
                </Button>

                <div className="mb-8 space-y-4">
                    <div className="flex gap-2 items-center text-muted-foreground text-sm">
                        <Badge>{category}</Badge>
                        <span>•</span>
                        <time>{date}</time>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading lg:leading-[1.1]">{title}</h1>
                    <div className="flex gap-2">
                        {tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                    </div>
                </div>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <MDXRemote source={content} components={components} />
                </div>
            </Container>
        </article>
    );
}
