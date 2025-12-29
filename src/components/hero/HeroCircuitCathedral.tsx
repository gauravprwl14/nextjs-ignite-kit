"use client";

/**
 * Hero Circuit Cathedral
 *
 * @description Architectural circuit board visualization representing precision engineering.
 * Features PCB-inspired patterns, trace lines, and technical schematics aesthetic.
 *
 * Aesthetic: Hardware engineering, precision manufacturing, technical blueprints
 */

import { motion, Variants } from "framer-motion";
import { ArrowRight, Cpu, CircuitBoard, Zap, Box } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/components/providers/I18nProvider";
import { useMemo } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { y: 30, opacity: 0, filter: "blur(10px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 25 },
  },
};

export function HeroCircuitCathedral() {
  const { t } = useTranslation();

  const traceLines = useMemo(
    () => [
      { d: "M 0 50 L 100 50 L 100 150 L 200 150", delay: 0 },
      { d: "M 0 100 L 150 100 L 150 200 L 250 200 L 250 100", delay: 0.3 },
      { d: "M 50 0 L 50 120 L 180 120 L 180 250", delay: 0.6 },
      { d: "M 200 0 L 200 80 L 120 80 L 120 180 L 250 180", delay: 0.9 },
    ],
    []
  );

  const nodes = useMemo(
    () => [
      { x: 100, y: 50, size: 8, label: "API" },
      { x: 100, y: 150, size: 6, label: "DB" },
      { x: 200, y: 150, size: 8, label: "CDN" },
      { x: 150, y: 100, size: 10, label: "CORE" },
      { x: 50, y: 120, size: 6, label: "AUTH" },
      { x: 180, y: 120, size: 6, label: "CACHE" },
    ],
    []
  );

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        {/* Blueprint Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(var(--primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--primary) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Radial Mask */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,transparent_0%,var(--background)_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Content */}
          <div className="relative z-10">
            <motion.div variants={item} className="mb-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/5 border border-primary/20">
                <CircuitBoard className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono font-medium text-primary">
                  {t("hero.badge") || "SYSTEM ARCHITECT // REV 10.0"}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] mb-8"
            >
              <span className="block text-foreground">Engineering</span>
              <span className="block text-foreground">the backbone</span>
              <span className="block text-primary">of digital empires.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed font-mono"
            >
              {t("hero.subtitle") ||
                "Decade of experience designing fault-tolerant, high-throughput systems. Every trace, every connection, engineered with intent."}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group h-14 px-8 inline-flex items-center gap-3 rounded-lg bg-foreground text-background font-bold hover:bg-primary transition-colors"
              >
                <Cpu className="w-4 h-4" />
                {t("common.startProject") || "Initialize Project"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="h-14 px-8 inline-flex items-center gap-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all font-mono"
              >
                <Box className="w-4 h-4" />
                {t("common.viewWork") || "View Schematics"}
              </Link>
            </motion.div>

            {/* Spec Sheet */}
            <motion.div
              variants={item}
              className="mt-16 grid grid-cols-3 gap-6 pt-8 border-t border-border/30"
            >
              {[
                { label: "UPTIME", value: "99.99%" },
                { label: "LATENCY", value: "<50ms" },
                { label: "SCALE", value: "10M+" },
              ].map((spec, i) => (
                <div key={i} className="font-mono">
                  <div className="text-xs text-muted-foreground mb-1">
                    {spec.label}
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {spec.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Circuit Visualization */}
          <motion.div
            variants={item}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-[450px] h-[400px]">
              {/* PCB Substrate */}
              <div className="absolute inset-0 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm overflow-hidden">
                {/* Trace Lines SVG */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 250 250">
                  {traceLines.map((trace, i) => (
                    <motion.path
                      key={i}
                      d={trace.d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary/30"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: trace.delay }}
                    />
                  ))}

                  {/* Animated Data Pulses */}
                  {traceLines.map((trace, i) => (
                    <motion.circle
                      key={`pulse-${i}`}
                      r="3"
                      fill="currentColor"
                      className="text-primary"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        offsetDistance: ["0%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        delay: trace.delay + 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      style={{
                        offsetPath: `path("${trace.d}")`,
                      }}
                    />
                  ))}

                  {/* Connection Nodes */}
                  {nodes.map((node, i) => (
                    <g key={i}>
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size}
                        fill="currentColor"
                        className="text-background"
                        stroke="currentColor"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      />
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size / 2}
                        fill="currentColor"
                        className="text-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      />
                    </g>
                  ))}
                </svg>

                {/* Node Labels */}
                {nodes.map((node, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-[8px] font-mono font-bold text-muted-foreground"
                    style={{
                      left: `${(node.x / 250) * 100}%`,
                      top: `${(node.y / 250) * 100 + 6}%`,
                      transform: "translateX(-50%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    {node.label}
                  </motion.div>
                ))}
              </div>

              {/* Floating Status Panel */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 glass-panel rounded-xl px-4 py-3 border border-primary/20"
              >
                <div className="flex items-center gap-2 text-xs font-mono">
                  <Zap className="w-3 h-3 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">ACTIVE</span>
                </div>
                <div className="text-lg font-bold text-foreground mt-1">
                  847 Connections
                </div>
              </motion.div>

              {/* Version Badge */}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 glass-panel rounded-lg px-3 py-2 border border-border/30"
              >
                <div className="text-[10px] font-mono text-muted-foreground">
                  ARCHITECTURE v10.2.1
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



