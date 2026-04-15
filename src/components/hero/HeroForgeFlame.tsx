"use client";

/**
 * Hero Forge & Flame
 *
 * @description Craftsman/artisan theme with precision engineering and warm metallic tones.
 * Features forge imagery, sparks, and the aesthetic of master craftsmanship.
 *
 * Aesthetic: Blacksmith forge, industrial design, artisan workshops
 */

import { motion, Variants } from "framer-motion";
import { ArrowRight, Hammer, Flame, Anvil, Wrench, Sparkles } from "lucide-react";
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
  show: { y: 0, opacity: 1, transition: { type: "spring", damping: 20 } },
};

export function HeroForgeFlame() {
  const { t } = useTranslation();

  const sparks = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: `spark-${i}`,
        x: 50 + ((i * 7 - 10) % 30), // Deterministic spread
        delay: (i * 0.1) % 2,
        duration: 1 + (i % 3),
        size: 2 + (i % 4),
      })),
    []
  );

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Forge Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        {/* Warm Glow from Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-t from-orange-500/10 via-red-500/5 to-transparent rounded-full blur-[100px]" />
        {/* Ember Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {sparks.map((spark) => (
            <motion.div
              key={spark.id}
              className="absolute rounded-full"
              style={{
                left: `${spark.x}%`,
                bottom: "10%",
                width: spark.size,
                height: spark.size,
                background: `radial-gradient(circle, rgb(251, 146, 60) 0%, rgb(234, 88, 12) 100%)`,
              }}
              animate={{
                y: [0, -300, -600],
                x: [((parseInt(spark.id.split('-')[1]) * 7 - 5) % 20), ((parseInt(spark.id.split('-')[1]) * 13 - 10) % 40)],
                opacity: [0, 1, 0],
                scale: [1, 0.5, 0],
              }}
              transition={{
                duration: spark.duration,
                repeat: Infinity,
                delay: spark.delay,
                ease: "easeOut",
              }}
            />
          ))}
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
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-500/80">
                  {t("hero.badge") || "FORGED IN COMPLEXITY • TEMPERED BY TIME"}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] mb-8"
            >
              <span className="block text-foreground">Master-crafted</span>
              <span className="block text-foreground">systems.</span>
              <span className="block bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent mt-2">
                Built to endure.
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              {t("hero.subtitle") ||
                "A decade at the forge, hammering raw requirements into refined architecture. Every system I create carries the marks of deliberate craftsmanship—built not just to work, but to last."}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group h-14 px-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold hover:from-orange-500 hover:to-amber-500 transition-all shadow-lg shadow-orange-500/20"
              >
                <Hammer className="w-4 h-4" />
                {t("common.startProject") || "Commission a Build"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="h-14 px-8 inline-flex items-center gap-3 rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm font-semibold hover:border-orange-500/50 hover:bg-orange-500/5 transition-all"
              >
                <Wrench className="w-4 h-4" />
                {t("common.viewWork") || "View Portfolio"}
              </Link>
            </motion.div>

            {/* Craftsmanship Stats */}
            <motion.div
              variants={item}
              className="mt-16 grid grid-cols-3 gap-8 pt-8 border-t border-border/30"
            >
              {[
                { value: "10+", label: "Years at the Forge" },
                { value: "50+", label: "Systems Forged" },
                { value: "0", label: "Compromises" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold font-heading bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Forge Visualization */}
          <motion.div
            variants={item}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-[450px] h-[450px]">
              {/* Anvil Base */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-t from-foreground/10 to-transparent rounded-t-xl" />

              {/* Central Forge Element */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Outer Ring */}
                <div className="w-48 h-48 rounded-full border-4 border-orange-500/20 flex items-center justify-center">
                  {/* Middle Ring */}
                  <motion.div
                    className="w-36 h-36 rounded-full border-2 border-orange-500/40 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Inner Glow */}
                    <motion.div
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500/50 via-amber-500/30 to-red-500/50 flex items-center justify-center shadow-2xl"
                      animate={{
                        boxShadow: [
                          "0 0 40px rgba(251, 146, 60, 0.3)",
                          "0 0 80px rgba(251, 146, 60, 0.5)",
                          "0 0 40px rgba(251, 146, 60, 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Flame className="w-10 h-10 text-orange-200" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Rotating Sparks */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-amber-400"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${angle}deg) translateY(-100px)`,
                    }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>

              {/* Floating Info Cards */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-8 right-8 glass-panel rounded-xl px-4 py-3 border border-orange-500/20"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-orange-500">
                  <Sparkles className="w-3 h-3" />
                  <span>FORGING</span>
                </div>
                <div className="text-lg font-bold text-foreground mt-1">
                  Excellence
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 left-4 glass-panel rounded-xl px-4 py-3 border border-border/30"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Hammer className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    HEAT LEVEL
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="w-4 h-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: i <= 4 ? 1 : 0.3 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

