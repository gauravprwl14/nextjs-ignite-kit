import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header, Footer } from "@/components/layout";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Portfolio",
  description: "A showcase of my work and thoughts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          manrope.variable,
          syne.variable,
          "antialiased bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground"
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
