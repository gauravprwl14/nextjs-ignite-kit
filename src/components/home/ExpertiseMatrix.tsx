"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/features/portfolio/capabilities";
import { useMemo } from "react";
import { CheckCircle2, ShieldCheck, Zap, BarChart3, Globe } from "lucide-react";

export function ExpertiseMatrix() {
  const groupedCapabilities = useMemo(() => {
    const groups: { [key: string]: typeof capabilities } = {};
    capabilities.forEach((cap) => {
      if (!groups[cap.l1]) groups[cap.l1] = [];
      groups[cap.l1].push(cap);
    });
    return groups;
  }, []);

  const domains = Object.keys(groupedCapabilities);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Domain Depth</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive mapping of specialized expertise across the financial technology stack.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {domains.map((domain, index) => (
            <motion.div
              key={domain}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                {domain === 'Digital Banking' && <Globe className="w-32 h-32" />}
                {domain === 'Payments' && <Zap className="w-32 h-32" />}
                {domain === 'Lending' && <ShieldCheck className="w-32 h-32" />}
                {!['Digital Banking', 'Payments', 'Lending'].includes(domain) && <BarChart3 className="w-32 h-32" />}
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                    <span className="text-primary">/</span> {domain}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedCapabilities[domain].map((cap) => (
                    <div 
                        key={cap.id} 
                        className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all hover:bg-white/10"
                    >
                      <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        {cap.l2}
                      </h4>
                      <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                        {cap.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Strategy Bar */}
        <div className="mt-16 p-8 glass-panel rounded-2xl border-primary/20 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
                <h3 className="text-xl font-bold font-heading mb-2">Technical Due Diligence & Strategy</h3>
                <p className="text-sm text-muted-foreground">
                    Beyond code, I provide vendor-neutral technical auditing, cost optimization (FinOps), and roadmap acceleration for high-growth startups and established enterprises.
                </p>
            </div>
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-primary">15+</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">Years Exp</span>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-primary">50+</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">Platforms</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
