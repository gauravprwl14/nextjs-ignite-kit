"use client";

/**
 * Hero Ethereal Mesh
 *
 * @description 3D wireframe mesh with an otherworldly, floating aesthetic.
 * Features geometric shapes, depth effects, and ethereal atmosphere.
 *
 * Aesthetic: Sci-fi interfaces, holographic displays, digital realm
 */

import { motion, Variants } from "framer-motion";
import { ArrowRight, Hexagon, Triangle, Circle, Diamond } from "lucide-react";
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
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 20 },
  },
};

export function HeroEtherealMesh() {
  const { t } = useTranslation();

  const meshPoints = useMemo(
    () =>
      Array.from({ length: 25 }).map((_, i) => ({
        x: (i % 5) * 80 + 40,
        y: Math.floor(i / 5) * 80 + 40,
        delay: i * 0.05,
      })),
    []
  );

  const connections = useMemo(
    () => [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [5, 6], [6, 7], [7, 8], [8, 9],
      [10, 11], [11, 12], [12, 13], [13, 14],
      [15, 16], [16, 17], [17, 18], [18, 19],
      [20, 21], [21, 22], [22, 23], [23, 24],
      [0, 5], [5, 10], [10, 15], [15, 20],
      [1, 6], [6, 11], [11, 16], [16, 21],
      [2, 7], [7, 12], [12, 17], [17, 22],
      [3, 8], [8, 13], [13, 18], [18, 23],
      [4, 9], [9, 14], [14, 19], [19, 24],
    ],
    []
  );

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Ethereal Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        {/* Depth Fog */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-accent/5" />
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => {
            // Deterministic positions
            const left = ((i * 17 + 11) % 100);
            const top = ((i * 23 + 7) % 100);
            const duration = 4 + (i % 4);
            const delay = (i % 5) * 0.4;
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-foreground/10"
                style={{ left: `${left}%`, top: `${top}%` }}
                animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration, repeat: Infinity, delay }}
              />
            );
          })}
        </div>
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
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Hexagon className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="text-sm font-medium text-muted-foreground">
                  {t("hero.badge") || "Bridging Digital Dimensions"}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] mb-8"
            >
              <span className="block text-foreground">Where vision</span>
              <span className="block text-foreground">meets</span>
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                architecture.
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              {t("hero.subtitle") ||
                "Ten years of materializing abstract concepts into tangible, scalable realities. I see the patterns others miss and build the bridges between possibility and production."}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group h-14 px-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-foreground to-foreground/90 text-background font-bold hover:shadow-lg hover:shadow-foreground/10 transition-all"
              >
                {t("common.startProject") || "Materialize Your Vision"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="h-14 px-8 inline-flex items-center gap-3 rounded-full glass-panel font-semibold hover:bg-foreground/5 transition-all"
              >
                <Diamond className="w-4 h-4" />
                {t("common.viewWork") || "Explore Creations"}
              </Link>
            </motion.div>

            {/* Geometric Stats */}
            <motion.div
              variants={item}
              className="mt-16 flex items-center gap-8"
            >
              {[
                { icon: Triangle, value: "10+", label: "Years" },
                { icon: Circle, value: "50+", label: "Systems" },
                { icon: Hexagon, value: "99%", label: "Success" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <Icon className="w-8 h-8 text-border" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Ethereal Mesh Visualization */}
          <motion.div
            variants={item}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-[420px] h-[420px]">
              {/* 3D Transform Container */}
              <motion.div
                className="absolute inset-0"
                style={{ perspective: "800px" }}
                animate={{ rotateY: [0, 10, 0], rotateX: [0, 5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Mesh Grid */}
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  style={{ transform: "rotateX(15deg) rotateY(-15deg)" }}
                >
                  {/* Connection Lines */}
                  {connections.map(([a, b], i) => (
                    <motion.line
                      key={i}
                      x1={meshPoints[a].x}
                      y1={meshPoints[a].y}
                      x2={meshPoints[b].x}
                      y2={meshPoints[b].y}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-border/40"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.02 }}
                    />
                  ))}

                  {/* Mesh Points */}
                  {meshPoints.map((point, i) => (
                    <motion.circle
                      key={i}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="currentColor"
                      className="text-foreground/30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: point.delay }}
                    />
                  ))}

                  {/* Highlighted Center */}
                  <motion.circle
                    cx={200}
                    cy={200}
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.circle
                    cx={200}
                    cy={200}
                    r="8"
                    fill="currentColor"
                    className="text-primary"
                  />
                </svg>
              </motion.div>

              {/* Floating Labels */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-4 right-4 glass-panel rounded-xl px-4 py-3 border border-border/30"
              >
                <div className="text-xs font-mono text-muted-foreground">
                  MESH_COMPLEXITY
                </div>
                <div className="text-lg font-bold text-foreground">HIGH</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-8 left-4 glass-panel rounded-xl px-4 py-3 border border-primary/20"
              >
                <div className="text-xs font-mono text-muted-foreground">
                  NODES_ACTIVE
                </div>
                <div className="text-lg font-bold text-primary">25</div>
              </motion.div>

              {/* Depth Glow */}
              <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl -z-10" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

