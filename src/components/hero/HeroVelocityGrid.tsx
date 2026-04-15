"use client";

/**
 * Hero Velocity Grid
 *
 * @description Speed lines, motion blur effects, suggesting rapid delivery and momentum.
 * Dynamic perspective grid with acceleration visual effects.
 *
 * Aesthetic: Racing, high-speed transit, F1 engineering
 */

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Gauge, Timer, TrendingUp, Rocket } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/components/providers/I18nProvider";
import { useRef } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { x: -50, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 25, stiffness: 100 },
  },
};

const speedLine: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HeroVelocityGrid() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const gridPerspective = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Velocity Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />

        {/* Perspective Grid */}
        <motion.div
          className="absolute inset-0"
          style={{
            perspective: "1000px",
            perspectiveOrigin: "50% 100%",
          }}
        >
          <motion.div
            className="absolute inset-0 origin-bottom"
            style={{
              transform: "rotateX(60deg)",
              backgroundImage: `
                linear-gradient(90deg, var(--primary) 1px, transparent 1px),
                linear-gradient(var(--primary) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              opacity: 0.06,
              rotateX: gridPerspective,
            }}
          />
        </motion.div>

        {/* Speed Lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
              style={{
                top: `${15 + i * 10}%`,
                left: "-100%",
                width: "300%",
              }}
              animate={{
                x: ["0%", "100%"],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Radial Focus */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
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
            <motion.div variants={item} className="mb-6">
              <div className="inline-flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Gauge className="w-5 h-5 text-primary" />
                </motion.div>
                <span className="text-sm font-bold tracking-[0.15em] uppercase text-primary">
                  {t("hero.badge") || "Maximum Velocity Achieved"}
                </span>
              </div>
            </motion.div>

            {/* Speed Lines Decoration */}
            <div className="space-y-1 mb-4">
              {[0.6, 0.8, 1].map((width, i) => (
                <motion.div
                  key={i}
                  variants={speedLine}
                  className="h-[2px] bg-gradient-to-r from-primary to-transparent origin-left"
                  style={{ width: `${width * 100}%` }}
                />
              ))}
            </div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-black leading-[1] tracking-tight mb-8"
            >
              <span className="block text-foreground">Move fast.</span>
              <span className="block text-foreground">Ship faster.</span>
              <span className="block text-primary italic">Deliver fastest.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              {t("hero.subtitle") ||
                "A decade of accelerating teams from concept to deployment. I optimize the entire pipeline—people, process, and platform—for maximum throughput."}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group h-14 px-8 inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
              >
                <Rocket className="w-4 h-4" />
                {t("common.startProject") || "Accelerate Now"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="h-14 px-8 inline-flex items-center gap-3 rounded-full border-2 border-border bg-background/50 backdrop-blur-sm font-semibold hover:border-primary/50 transition-all"
              >
                <Timer className="w-4 h-4" />
                {t("common.viewWork") || "Track Record"}
              </Link>
            </motion.div>
          </div>

          {/* Right: Velocity Dashboard */}
          <motion.div variants={item} className="hidden lg:block">
            <div className="relative">
              {/* Main Dashboard */}
              <div className="glass-panel rounded-3xl p-8 border border-border/50 bg-card/60 backdrop-blur-xl">
                {/* Speedometer */}
                <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-8">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Outer Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-border/30"
                    />
                    {/* Progress Arc */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="text-primary"
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: 283 * 0.15 }}
                      transition={{ duration: 2, delay: 0.5 }}
                      style={{
                        transformOrigin: "center",
                        transform: "rotate(-90deg)",
                      }}
                    />
                    {/* Center Value */}
                    <text
                      x="50"
                      y="45"
                      textAnchor="middle"
                      className="fill-foreground text-2xl font-bold"
                      style={{ fontSize: "18px", fontFamily: "var(--font-heading)" }}
                    >
                      10+
                    </text>
                    <text
                      x="50"
                      y="60"
                      textAnchor="middle"
                      className="fill-muted-foreground"
                      style={{ fontSize: "6px", textTransform: "uppercase" }}
                    >
                      Years Experience
                    </text>
                  </svg>

                  {/* Tick Marks */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-3 bg-border/50 rounded-full"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${angle}deg) translateY(-130px) translateX(-50%)`,
                        transformOrigin: "center center",
                      }}
                    />
                  ))}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: TrendingUp, value: "10x", label: "Team Velocity" },
                    { icon: Timer, value: "50%", label: "Faster Delivery" },
                    { icon: Gauge, value: "99.9%", label: "Uptime" },
                  ].map((metric, i) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={i}
                        className="text-center p-3 rounded-xl bg-background/50 border border-border/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Icon className="w-4 h-4 mx-auto mb-2 text-primary" />
                        <div className="text-xl font-bold text-foreground">
                          {metric.value}
                        </div>
                        <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
                          {metric.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Floating Indicator */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/30"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



