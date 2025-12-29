"use client";

/**
 * Hero Signal Tower
 *
 * @description Broadcast/transmission aesthetic with expertise radiating outward.
 * Features concentric waves, signal pulses, and communication tower imagery.
 *
 * Aesthetic: Radio towers, telecommunications, broadcasting networks
 */

import { motion, Variants } from "framer-motion";
import { ArrowRight, Radio, Podcast, Wifi, Send, Signal } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/components/providers/I18nProvider";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", damping: 20 } },
};

export function HeroSignalTower() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Broadcast Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        {/* Wave Pattern */}
        <div className="absolute inset-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-border/10 rounded-full"
              style={{
                width: `${i * 200}px`,
                height: `${i * 200}px`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
        {/* Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Status Indicator */}
          <motion.div variants={item} className="mb-10">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Radio className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm font-bold text-primary tracking-wide">
                {t("hero.badge") || "BROADCASTING EXPERTISE WORLDWIDE"}
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl lg:text-8xl font-heading font-bold leading-[1] mb-8"
          >
            <span className="block text-foreground">Amplifying</span>
            <span className="block text-foreground">your technical</span>
            <span className="block text-primary">signal.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t("hero.subtitle") ||
              "For a decade, I've been the frequency that helps enterprises tune into scalability. From noise to clarity—I transform complex systems into harmonious architectures."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Link
              href="/contact"
              className="group h-14 px-10 inline-flex items-center gap-3 rounded-full bg-foreground text-background font-bold hover:bg-primary transition-colors shadow-xl shadow-foreground/10"
            >
              <Send className="w-4 h-4" />
              {t("common.startProject") || "Tune In"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/portfolio"
              className="h-14 px-10 inline-flex items-center gap-3 rounded-full glass-panel font-semibold hover:bg-foreground/5 transition-all"
            >
              <Podcast className="w-4 h-4" />
              {t("common.viewWork") || "Past Transmissions"}
            </Link>
          </motion.div>

          {/* Signal Strength Indicators */}
          <motion.div
            variants={item}
            className="flex justify-center items-end gap-2 mb-16"
          >
            {[40, 60, 80, 100, 80, 60, 40].map((height, i) => (
              <motion.div
                key={i}
                className="w-3 bg-gradient-to-t from-primary to-primary/50 rounded-full"
                initial={{ height: 0 }}
                animate={{ height: `${height}px` }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2,
                }}
              />
            ))}
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border/20"
          >
            {[
              { icon: Signal, value: "10+", label: "Years Broadcasting" },
              { icon: Wifi, value: "50+", label: "Signals Sent" },
              { icon: Radio, value: "100%", label: "Clarity" },
              { icon: Podcast, value: "24/7", label: "Availability" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-6 h-6 mx-auto mb-3 text-muted-foreground" />
                  <div className="text-3xl font-bold font-heading text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Signal Waves */}
      <motion.div
        className="absolute bottom-20 left-10 hidden lg:block"
        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="glass-panel rounded-xl px-4 py-3 border border-border/30">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-500"
            />
            <span className="text-xs font-mono text-muted-foreground">
              SIGNAL STRONG
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-32 right-20 hidden lg:block"
        animate={{ y: [0, 8, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="glass-panel rounded-xl px-4 py-3 border border-primary/20">
          <div className="text-xs font-mono text-muted-foreground">
            FREQUENCY
          </div>
          <div className="text-lg font-bold text-primary">10.24 GHz</div>
        </div>
      </motion.div>
    </section>
  );
}



