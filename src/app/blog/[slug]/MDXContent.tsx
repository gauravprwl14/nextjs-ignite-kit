"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Headings with IDs for ToC linking
        h1: ({ children }) => {
          const id = generateId(children);
          return (
            <h1 id={id} className="scroll-mt-24">
              {children}
            </h1>
          );
        },
        h2: ({ children }) => {
          const id = generateId(children);
          return (
            <h2 id={id} className="scroll-mt-24">
              {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          const id = generateId(children);
          return (
            <h3 id={id} className="scroll-mt-24">
              {children}
            </h3>
          );
        },

        // Code blocks with syntax highlighting
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const isInline = !match;

          return isInline ? (
            <code
              className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono text-primary"
              {...props}
            >
              {children}
            </code>
          ) : (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              className="rounded-xl !bg-[#282c34] !p-4 border border-zinc-800"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          );
        },

        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-primary hover:underline"
          >
            {children}
          </a>
        ),

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 bg-secondary/30 rounded-r-lg italic text-muted-foreground">
            {children}
          </blockquote>
        ),

        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-border bg-secondary/50 px-4 py-2 text-left font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-4 py-2">{children}</td>
        ),

        // Lists
        ul: ({ children }) => (
          <ul className="list-disc list-outside pl-6 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside pl-6 space-y-2">
            {children}
          </ol>
        ),

        // Paragraphs
        p: ({ children }) => (
          <p className="leading-relaxed mb-4">{children}</p>
        ),

        // Strong/Bold
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// Helper to generate heading IDs
function generateId(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === "string" ? child : ""))
      .join("")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  return "";
}
