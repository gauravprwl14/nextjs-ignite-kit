"use client";

/**
 * Hero Brutalist Monolith
 *
 * @description Bold typography, stark contrasts, and editorial magazine feel.
 * Minimal, impactful, with emphasis on massive typography and clean lines.
 *
 * Aesthetic: Modernist architecture, editorial design, museum installations
 */

import { motion, Variants } from "framer-motion";
import { ArrowDownRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/components/providers/I18nProvider";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { y: 80, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 30, stiffness: 100 },
  },
};

const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroBrutalistMonolith() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[100vh] flex items-end pb-20 overflow-hidden">
      {/* Minimal Background */}
      <div className="absolute inset-0 -z-10 bg-background">
        {/* Subtle Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Diagonal Line */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.line
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
            stroke="currentColor"
            strokeWidth="1"
            className="text-border/30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          {/* Top Meta */}
          <motion.div
            variants={item}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
              <span>EST. 2015</span>
              <Minus className="w-4 h-4" />
              <span>TECHNICAL LEADERSHIP</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t("hero.badge") || "AVAILABLE"}
            </div>
          </motion.div>

          {/* Horizontal Rule */}
          <motion.div
            variants={lineReveal}
            className="h-px bg-border origin-left"
          />

          {/* Massive Typography */}
          <div className="py-8">
            <motion.h1
              variants={item}
              className="text-[clamp(3rem,12vw,14rem)] font-heading font-black leading-[0.85] tracking-[-0.04em] uppercase"
            >
              <span className="block text-foreground">Architect</span>
            </motion.h1>
            <motion.h1
              variants={item}
              className="text-[clamp(3rem,12vw,14rem)] font-heading font-black leading-[0.85] tracking-[-0.04em] uppercase -mt-2"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground/20 to-foreground/60">
                of Scale
              </span>
            </motion.h1>
          </div>

          {/* Horizontal Rule */}
          <motion.div
            variants={lineReveal}
            className="h-px bg-border origin-right"
          />

          {/* Bottom Grid */}
          <motion.div
            variants={item}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8"
          >
            {/* Description */}
            <div className="md:col-span-2">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                {t("hero.subtitle") ||
                  "Ten years translating impossible requirements into production-ready systems. I don't just build software—I engineer outcomes that compound."}
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col justify-end items-start md:items-end gap-6">
              <Link
                href="/contact"
                className="group flex items-center gap-4 text-2xl font-heading font-bold hover:text-primary transition-colors"
              >
                <span>{t("common.startProject") || "Let's build"}</span>
                <motion.div
                  whileHover={{ rotate: 45 }}
                  className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center"
                >
                  <ArrowDownRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Metrics Row */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-border"
          >
            {[
              { value: "10+", label: "Years" },
              { value: "50+", label: "Projects" },
              { value: "∞", label: "Curiosity" },
              { value: "01", label: "Focus" },
            ].map((stat, i) => (
              <div key={i} className="group cursor-default">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-heading font-black text-foreground group-hover:text-primary transition-colors">
                    {stat.value}
                  </span>
                </div>
                <div className="mt-2 text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Index Markers */}
          <motion.div
            variants={item}
            className="flex items-center justify-between pt-8 text-xs font-mono text-muted-foreground"
          >
            <div className="flex items-center gap-4">
              <span>01</span>
              <span className="w-16 h-px bg-border" />
              <span>PRINCIPAL CONSULTANT</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span>SCROLL TO EXPLORE</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Plus className="w-4 h-4 rotate-45" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



