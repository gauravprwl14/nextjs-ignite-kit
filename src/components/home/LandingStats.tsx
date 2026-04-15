"use client";

import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
  description: string;
}

interface LandingStatsProps {
  readonly stats: readonly Stat[];
}

export function LandingStats({ stats }: LandingStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: stats.indexOf(stat) * 0.1 }}
          className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-primary/40 transition-all"
        >
            {/* Background number glow */}
            <div className="absolute -right-4 -bottom-4 text-9xl font-bold opacity-5 text-white/10 group-hover:opacity-10 transition-opacity">
                {stat.value.replaceAll(/\D/g, '')}
            </div>

            <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-bold font-heading mb-4 text-foreground tracking-tighter">
                    {stat.value}
                </div>
                <div className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                    {stat.label}
                </div>
                <p className="text-sm text-muted-foreground">
                    {stat.description}
                </p>
            </div>
        </motion.div>
      ))}
    </div>
  );
}
