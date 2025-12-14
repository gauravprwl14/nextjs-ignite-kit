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
              className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-primary"
              {...props}
            >
              {children}
            </code>
          ) : (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              className="rounded-xl !bg-white/5 !p-4 border border-white/10"
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
          <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 bg-white/5 rounded-r-lg">
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
          <th className="border border-white/10 bg-white/5 px-4 py-2 text-left font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-white/10 px-4 py-2">{children}</td>
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
          <p className="text-white/80 leading-relaxed">{children}</p>
        ),

        // Strong/Bold
        strong: ({ children }) => (
          <strong className="font-semibold text-white">{children}</strong>
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
