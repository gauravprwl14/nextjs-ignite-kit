"use client";

/**
 * Hero Chronicle Scroll
 *
 * @description Timeline/journey-based hero showing a decade of expertise as a visual narrative.
 * Scroll-triggered animations revealing milestones and achievements.
 *
 * Aesthetic: Documentary, archival, historical record
 */

import { motion, Variants } from "framer-motion";
import { ArrowRight, Calendar, Flag, Star, Bookmark } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/components/providers/I18nProvider";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", damping: 20 } },
};

const timelineItem: Variants = {
  hidden: { x: -20, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { type: "spring", damping: 25 } },
};

const milestones = [
  { year: "2015", title: "First Enterprise System", type: "start" },
  { year: "2017", title: "Led Distributed Team", type: "milestone" },
  { year: "2019", title: "Principal Architect Role", type: "milestone" },
  { year: "2021", title: "50+ Systems Delivered", type: "achievement" },
  { year: "2024", title: "Cloud Native Expert", type: "current" },
];

export function HeroChronicleScroll() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Parchment Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/10" />
        {/* Aged Paper Texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-30 hidden lg:block" />
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
            <motion.div variants={item} className="mb-8">
              <div className="inline-flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="tracking-[0.1em] uppercase">
                  {t("hero.badge") || "A Decade in Review • 2015—Present"}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] mb-8"
            >
              <span className="block text-foreground">Every system</span>
              <span className="block text-foreground">tells a story.</span>
              <span className="block text-primary mt-2">This is mine.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed italic"
            >
              {t("hero.subtitle") ||
                "From my first production deployment to architecting systems serving millions—each chapter shaped by challenges conquered and lessons learned."}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group h-14 px-8 inline-flex items-center gap-3 rounded-xl bg-foreground text-background font-bold hover:bg-primary transition-colors"
              >
                <Bookmark className="w-4 h-4" />
                {t("common.startProject") || "Write the Next Chapter"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="h-14 px-8 inline-flex items-center gap-3 rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm font-semibold hover:border-primary/50 transition-all"
              >
                <Flag className="w-4 h-4" />
                {t("common.viewWork") || "Read Case Studies"}
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={item}
              className="mt-16 flex items-center gap-8 pt-8 border-t border-border/30"
            >
              <div>
                <div className="text-4xl font-heading font-bold text-foreground">
                  10
                </div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-4xl font-heading font-bold text-foreground">
                  50+
                </div>
                <div className="text-sm text-muted-foreground">Systems</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-4xl font-heading font-bold text-foreground">
                  ∞
                </div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
            </motion.div>
          </div>

          {/* Right: Timeline */}
          <motion.div variants={item} className="hidden lg:block">
            <div className="relative pl-8">
              {/* Timeline Line */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-px bg-border"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ transformOrigin: "top" }}
              />

              {/* Milestones */}
              <div className="space-y-10">
                {milestones.map((milestone, i) => (
                  <motion.div
                    key={i}
                    variants={timelineItem}
                    className="relative"
                  >
                    {/* Node */}
                    <motion.div
                      className={`absolute -left-8 w-4 h-4 rounded-full border-2 ${
                        milestone.type === "current"
                          ? "bg-primary border-primary"
                          : milestone.type === "achievement"
                          ? "bg-accent border-accent"
                          : "bg-background border-border"
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.2 }}
                      style={{ top: "4px", transform: "translateX(-50%)" }}
                    >
                      {milestone.type === "current" && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary"
                          animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>

                    {/* Content */}
                    <div className="glass-panel rounded-xl p-5 border border-border/30 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono font-bold text-primary">
                          {milestone.year}
                        </span>
                        {milestone.type === "achievement" && (
                          <Star className="w-3 h-3 text-accent fill-accent" />
                        )}
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        {milestone.title}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Future Indicator */}
                <motion.div
                  variants={timelineItem}
                  className="relative pl-0 opacity-50"
                >
                  <div
                    className="absolute -left-8 w-4 h-4 rounded-full border-2 border-dashed border-border"
                    style={{ top: "4px", transform: "translateX(-50%)" }}
                  />
                  <div className="text-sm text-muted-foreground italic">
                    Your project could be next...
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



