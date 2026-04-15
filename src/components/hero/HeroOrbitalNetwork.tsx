"use client";

/**
 * Hero Orbital Network
 *
 * @description A dynamic constellation/satellite visualization representing global technical reach.
 * Features orbital paths, connected nodes, and a sense of vast interconnected systems.
 *
 * Aesthetic: Space-age command center, mission control
 */

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Globe2, Satellite, Radio } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/components/providers/I18nProvider";
import { useMemo } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", damping: 25 } },
};

export function HeroOrbitalNetwork() {
  const { t } = useTranslation();

  const orbitNodes = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: `orbit-node-${i}`,
        angle: i * 30 + ((i * 7) % 10), // Deterministic pseudo-random offset
        radius: 120 + (i % 3) * 40,
        size: 4 + (i % 3) * 2,
        duration: 15 + i * 2,
        delay: i * 0.2,
      })),
    []
  );

  const connectionPairs = useMemo(
    () => [
      [0, 3],
      [1, 5],
      [2, 7],
      [4, 9],
      [6, 11],
      [8, 2],
    ],
    []
  );

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Deep Space Background */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/3 via-transparent to-transparent" />
        {/* Stars - Deterministic positions */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, idx) => {
            // Deterministic pseudo-random positions using index
            const left = (idx * 17 + 11) % 100;
            const top = (idx * 23 + 7) % 100;
            const duration = 2 + (idx % 3);
            const delay = (idx % 5) * 0.4;
            return (
              <motion.div
                key={`star-${idx}`}
                className="absolute w-1 h-1 bg-foreground/20 rounded-full"
                style={{ left: `${left}%`, top: `${top}%` }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
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
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Radio className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  {t("hero.badge") || "Systems Online • Ready to Deploy"}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] mb-8"
            >
              <span className="block text-foreground/90">Engineering</span>
              <span className="block text-foreground/90">solutions that</span>
              <span className="block text-primary">orbit the impossible.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              {t("hero.subtitle") ||
                "A decade of navigating complex technical landscapes. From distributed systems to organizational transformations, I guide teams through uncharted territory."}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group h-14 px-8 inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Initiate Contact
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="h-14 px-8 inline-flex items-center gap-3 rounded-full glass-panel font-semibold hover:bg-foreground/5 transition-all"
              >
                <Globe2 className="w-4 h-4" />
                {t("common.viewWork") || "Mission Archives"}
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={item}
              className="mt-16 grid grid-cols-3 gap-8 pt-8 border-t border-border/30"
            >
              {[
                { id: "years", value: "10+", label: "Years in Orbit" },
                { id: "missions", value: "50+", label: "Missions Complete" },
                { id: "success", value: "99.9%", label: "Success Rate" },
              ].map((stat) => (
                <div key={stat.id}>
                  <div className="text-3xl font-bold font-heading text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Orbital Visualization */}
          <motion.div
            variants={item}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-[500px] h-[500px]">
              {/* Orbital Rings */}
              {[120, 180, 240].map((radius) => (
                <motion.div
                  key={`ring-${radius}`}
                  className="absolute rounded-full border border-border/20"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                    left: `calc(50% - ${radius}px)`,
                    top: `calc(50% - ${radius}px)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 60 + radius / 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Central Hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-24 h-24 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center backdrop-blur-xl"
                >
                  <Satellite className="w-10 h-10 text-primary" />
                </motion.div>
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl -z-10" />
              </div>

              {/* Orbital Nodes */}
              {orbitNodes.map((node) => {
                const x = Math.cos((node.angle * Math.PI) / 180) * node.radius;
                const y = Math.sin((node.angle * Math.PI) / 180) * node.radius;
                return (
                  <motion.div
                    key={node.id}
                    className="absolute rounded-full bg-foreground/40"
                    style={{
                      width: node.size,
                      height: node.size,
                      left: `calc(50% + ${x}px - ${node.size / 2}px)`,
                      top: `calc(50% + ${y}px - ${node.size / 2}px)`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: node.delay,
                    }}
                  />
                );
              })}

              {/* Connection Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connectionPairs.map(([a, b], pairIndex) => {
                  const nodeA = orbitNodes[a];
                  const nodeB = orbitNodes[b];
                  const x1 =
                    250 +
                    Math.cos((nodeA.angle * Math.PI) / 180) * nodeA.radius;
                  const y1 =
                    250 +
                    Math.sin((nodeA.angle * Math.PI) / 180) * nodeA.radius;
                  const x2 =
                    250 +
                    Math.cos((nodeB.angle * Math.PI) / 180) * nodeB.radius;
                  const y2 =
                    250 +
                    Math.sin((nodeB.angle * Math.PI) / 180) * nodeB.radius;
                  return (
                    <motion.line
                      key={`connection-${a}-${b}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-primary/20"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: pairIndex * 0.3 }}
                    />
                  );
                })}
              </svg>

              {/* Floating Label */}
              <motion.div
                animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 right-8 glass-panel rounded-xl px-4 py-3 border border-border/30"
              >
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Active Connections
                </div>
                <div className="text-2xl font-bold text-foreground">847</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
