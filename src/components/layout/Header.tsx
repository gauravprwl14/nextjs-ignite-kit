"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ThemeSwitcher } from "./ThemeSwitcher";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Scrolled state for style changes
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Mobile Hamburger Variants
  const hamburgerLine = "h-[2px] w-6 bg-foreground rounded transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"; // 24x18px approximation within container
  
  return (
    <>
      <motion.header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          // Glassmorphism
          "bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-white/10 dark:border-white/5",
          isScrolled ? "py-2" : "py-4"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div 
                animate={{ scale: isScrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-all"
              >
                <span className="text-white font-bold text-sm">GP</span>
              </motion.div>
              <motion.span 
                animate={{ scale: isScrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-semibold text-foreground hidden sm:block origin-left"
              >
                Gaurav P.
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "font-medium text-muted-foreground hover:text-foreground transition-colors relative group",
                    isScrolled ? "text-[13px]" : "text-sm" // Reduce size by ~1px visual equivalent
                  )}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeSwitcher />
              <Link
                href="/contact"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  "bg-foreground text-background hover:opacity-90 active:scale-95",
                  isScrolled && "py-1.5"
                )}
              >
                Let&apos;s Talk
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-4">
              <ThemeSwitcher />
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-white/10 cursor-pointer z-50 w-[44px] h-[44px] flex flex-col justify-center items-center gap-[6px]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {/* Top Line */}
                <span className={cn(hamburgerLine, mobileMenuOpen && "rotate-45 translate-y-[8px]")} />
                {/* Middle Line */}
                <span className={cn(hamburgerLine, mobileMenuOpen && "opacity-0")} />
                {/* Bottom Line */}
                <span className={cn(hamburgerLine, mobileMenuOpen && "-rotate-45 -translate-y-[8px]")} />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setMobileMenuOpen(false)}
               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-background/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-6 mt-16">
                 {navigation.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-2xl font-heading font-bold text-foreground hover:text-primary transition-colors block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4"
                >
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Let&apos;s Talk
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
