"use client";

/**
 * Hero Cinematic Terminal
 *
 * @description A command-driven, terminal-inspired hero section with typewriter effects,
 * glowing command prompts, and a sleek command console visualization.
 * Inspired by Linear's purposeful, developer-focused aesthetic.
 *
 * Features:
 * - Typewriter text animation
 * - Glowing terminal interface
 * - Staggered reveal animations
 * - Glass morphism effects
 * - Theme-aware colors
 */

import { motion, Variants } from "framer-motion";
import { ArrowRight, Command, Sparkles, Cpu, Activity, Shield } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/components/providers/I18nProvider";
import { useState, useEffect, useMemo } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60, damping: 20 },
  },
};

const terminalLines = [
  { prefix: "→", text: "10+ years architecting enterprise systems", delay: 0 },
  { prefix: "→", text: "Led technical transformations for Fortune 500", delay: 0.5 },
  { prefix: "→", text: "Delivered 50+ mission-critical platforms", delay: 1 },
  { prefix: "✓", text: "Ready for new challenges", delay: 1.5, highlight: true },
];

export function HeroCinematicTerminal() {
  const { t } = useTranslation();
  const [typedIndex, setTypedIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedIndex((prev) => (prev < terminalLines.length ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const systemMetrics = useMemo(
    () => [
      { label: "Projects Delivered", value: "50+", icon: Cpu },
      { label: "System Uptime", value: "99.99%", icon: Activity },
      { label: "Security Audits", value: "Zero Breach", icon: Shield },
    ],
    []
  );

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 -z-10">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                             linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center"
      >
        {/* Left: Content */}
        <div className="space-y-8">
          {/* Status Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              {t("hero.badge") || "Available for Strategic Engagements"}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={item}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1]">
              <span className="block text-foreground">I build systems</span>
              <span className="block text-foreground">that scale.</span>
              <span className="block mt-2 text-primary">
                You focus on growth.
              </span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
          >
            {t("hero.subtitle") ||
              "Principal Technical Consultant with a decade of experience transforming complex challenges into elegant, scalable architectures."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/contact"
              className="group relative h-14 px-8 inline-flex items-center gap-3 rounded-full bg-foreground text-background font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-foreground/10"
            >
              <span className="relative z-10">{t("common.startProject") || "Start a Project"}</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/portfolio"
              className="h-14 px-8 inline-flex items-center gap-3 rounded-full border border-border bg-background/50 backdrop-blur-sm font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Command className="w-4 h-4" />
              {t("common.viewWork") || "View Case Studies"}
            </Link>
          </motion.div>
        </div>

        {/* Right: Terminal Console */}
        <motion.div variants={item} className="hidden lg:block">
          <div className="relative">
            {/* Floating Metrics */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-4 z-20 glass-panel rounded-2xl p-4 border border-primary/20"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <Sparkles className="w-3 h-3" />
                <span>EXECUTING</span>
              </div>
            </motion.div>

            {/* Main Terminal */}
            <div className="glass-panel rounded-3xl p-6 border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    principal-consultant.session
                  </span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="font-mono text-sm space-y-3 mb-6">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: i < typedIndex ? 1 : 0,
                      x: i < typedIndex ? 0 : -10,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`flex items-start gap-3 ${
                      line.highlight ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    <span className={line.highlight ? "text-primary" : "text-emerald-500"}>
                      {line.prefix}
                    </span>
                    <span>{line.text}</span>
                  </motion.div>
                ))}
                {typedIndex >= terminalLines.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <span className="text-primary">$</span>
                    <span className="animate-pulse">_</span>
                  </motion.div>
                )}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                {systemMetrics.map((metric, i) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={i}
                      className="bg-background/50 rounded-xl p-4 border border-border/30"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground mb-2" />
                      <div className="text-lg font-bold text-foreground">
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                        {metric.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Connection Lines */}
            <svg
              className="absolute -bottom-4 -left-8 w-32 h-32 text-border/30"
              viewBox="0 0 100 100"
            >
              <path
                d="M 0 50 Q 30 50 50 80 T 100 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}



