"use client";

/**
 * Hero Liquid Metal
 *
 * @description Fluid morphing shapes with metallic sheens and premium textures.
 * Features flowing gradients, chrome-like reflections, and organic movement.
 *
 * Aesthetic: Luxury automotive, high-end product design
 */

import { motion, Variants } from "framer-motion";
import { ArrowRight, Layers3, Workflow, Gem } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/components/providers/I18nProvider";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
};

const item: Variants = {
  hidden: { y: 50, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", damping: 20 } },
};

export function HeroLiquidMetal() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Metallic Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        {/* Chrome Reflection */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `linear-gradient(135deg, 
              transparent 0%, 
              rgba(255,255,255,0.02) 25%, 
              transparent 50%, 
              rgba(255,255,255,0.01) 75%, 
              transparent 100%)`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Liquid Blob Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-60 -left-40 w-[700px] h-[700px] rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
            filter: "blur(100px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-20 items-center"
        >
          {/* Left: Content */}
          <div className="relative z-10">
            <motion.div variants={item} className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                <Gem className="w-4 h-4 text-primary" />
                {t("hero.badge") || "Principal Technical Consultant"}
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl lg:text-[5.5rem] font-heading font-bold leading-[0.95] mb-8"
            >
              <span className="block bg-gradient-to-r from-foreground via-foreground to-foreground/50 bg-clip-text text-transparent">
                Precision
              </span>
              <span className="block bg-gradient-to-r from-foreground via-foreground to-foreground/50 bg-clip-text text-transparent">
                Engineering.
              </span>
              <span className="block text-primary mt-2">Refined Results.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed font-light"
            >
              {t("hero.subtitle") ||
                "Ten years of forging enterprise systems with the precision of a master craftsman. Every architecture decision shaped for longevity and performance."}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-5">
              <Link
                href="/contact"
                className="group h-16 px-10 inline-flex items-center gap-4 rounded-2xl bg-foreground text-background font-bold text-lg overflow-hidden relative transition-all hover:shadow-2xl hover:shadow-foreground/10"
              >
                <span className="relative z-10">
                  {t("common.startProject") || "Forge Together"}
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </Link>
              <Link
                href="/portfolio"
                className="h-16 px-10 inline-flex items-center gap-3 rounded-2xl border-2 border-border/50 bg-background/30 backdrop-blur-xl font-semibold text-lg hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                <Layers3 className="w-5 h-5" />
                {t("common.viewWork") || "View Creations"}
              </Link>
            </motion.div>
          </div>

          {/* Right: Liquid Metal Visualization */}
          <motion.div variants={item} className="hidden lg:flex justify-center">
            <div className="relative w-[450px] h-[450px]">
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-border/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {/* Middle Ring */}
              <motion.div
                className="absolute inset-8 rounded-full border border-primary/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {/* Ring Nodes */}
                {[0, 90, 180, 270].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-primary rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `rotate(${angle}deg) translateY(-${(450 - 64) / 2}px) translate(-50%, -50%)`,
                    }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
              </motion.div>

              {/* Central Element */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                {/* Morphing Shape */}
                <motion.div
                  className="absolute inset-0 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] bg-gradient-to-br from-foreground/10 via-foreground/5 to-transparent border border-border/30 backdrop-blur-sm"
                  animate={{
                    borderRadius: [
                      "40% 60% 70% 30% / 60% 30% 70% 40%",
                      "60% 40% 30% 70% / 40% 60% 30% 70%",
                      "30% 70% 60% 40% / 70% 40% 60% 30%",
                      "40% 60% 70% 30% / 60% 30% 70% 40%",
                    ],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />

                {/* Inner Glow */}
                <motion.div
                  className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-xl"
                  animate={{ scale: [0.8, 1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Workflow className="w-12 h-12 text-foreground/60" />
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-6 left-16 glass-panel rounded-xl px-5 py-4 border border-border/30"
              >
                <div className="text-2xl font-bold text-foreground">10+</div>
                <div className="text-xs text-muted-foreground">Years Crafting</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 right-12 glass-panel rounded-xl px-5 py-4 border border-primary/20"
              >
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-xs text-muted-foreground">Systems Forged</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



