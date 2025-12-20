"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Database, Terminal, BarChart3 } from "lucide-react";

export function StrategicDashboard() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const nodes = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Number((Math.sin(i * 0.5) * 40 + 50).toFixed(2)),
    y: Number((Math.cos(i * 0.3) * 40 + 50).toFixed(2)),
    size: 1 + (i % 3),
  })), []);

  const heatmapPoints = useMemo(() => Array.from({ length: 48 }).map((_, i) => ({
    id: i,
    duration: 2 + (i % 3),
    delay: i * 0.05
  })), []);

  return (
    <div className="relative w-full aspect-square max-w-[550px] mx-auto group">
      {/* HUD Scanner Effect */}
      <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary ring-4 ring-primary/20 rounded-full" />
      </div>

      {/* Main Command Console */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        className="relative z-10 w-full h-full glass-panel rounded-[2rem] border border-white/10 p-6 shadow-2xl backdrop-blur-3xl overflow-hidden bg-black/40"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2 text-primary">
            <Terminal className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold tracking-tighter">SECURE.SESSION[PRIN_CONSULT]//882.01</span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-amber-500/50" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Real-time Heatmap Area */}
          <div className="col-span-1 h-32 bg-white/5 border border-white/5 rounded-xl p-3 relative overflow-hidden">
             <div className="text-[8px] font-bold text-muted-foreground uppercase mb-2">Network Load Mapping</div>
             <div className="grid grid-cols-8 grid-rows-6 gap-1 h-20">
                {heatmapPoints.map((point) => (
                    <motion.div 
                        key={point.id} 
                        className="rounded-[1px]"
                        animate={{ 
                            backgroundColor: [
                                "rgba(212, 175, 55, 0.1)", 
                                "rgba(212, 175, 55, 0.4)", 
                                "rgba(212, 175, 55, 0.1)"
                            ] 
                        }}
                        transition={{ duration: point.duration, repeat: Infinity, delay: point.delay }}
                    />
                ))}
             </div>
          </div>

          {/* Quick Metrics */}
          <div className="col-span-1 flex flex-col gap-2">
             <div className="flex-1 bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 flex flex-col justify-center">
                <div className="text-[8px] font-bold text-emerald-400/60 uppercase">System Integrity</div>
                <div className="text-xl font-bold font-mono tracking-tighter text-emerald-400">99.998%</div>
             </div>
             <div className="flex-1 bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 flex flex-col justify-center">
                <div className="text-[8px] font-bold text-blue-400/60 uppercase">Asset Liquidity</div>
                <div className="text-xl font-bold font-mono tracking-tighter text-blue-400">OPTIMAL</div>
             </div>
          </div>
        </div>

        {/* Dynamic Topology Graph */}
        <div className="relative h-48 w-full bg-black/20 rounded-xl border border-white/5 p-4 mb-6">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full opacity-40">
              {nodes.map((node) => (
                  <circle key={node.id} cx={node.x} cy={node.y} r={node.size} fill="currentColor" className="text-primary" />
              ))}
              <path d="M 20 20 L 50 50 L 80 20" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-primary/20" />
           </svg>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2 opacity-50" />
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Execution Layer Active</div>
              </div>
           </div>
        </div>

        {/* Global Stats Footer */}
        <div className="flex items-center justify-between gap-4">
           <div className="flex items-center gap-3">
              <Database className="w-4 h-4 text-primary" />
              <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                <AnimatePresence>
                  {isMounted && (
                    <motion.div 
                      key="data-bar"
                      initial={{ width: "10%" }}
                      animate={{ width: ["10%", "90%", "40%"] }} 
                      transition={{ duration: 5, repeat: Infinity }} 
                      className="h-full bg-primary" 
                    />
                  )}
                </AnimatePresence>
              </div>
           </div>
           <div className="flex-1 text-right">
              <span className="text-[9px] font-mono text-muted-foreground uppercase">Data Throughput: 4.8 TB/S</span>
           </div>
        </div>
      </motion.div>

      {/* Satellite Floating Panel */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -right-8 z-20 w-36 glass-panel rounded-2xl border border-primary/20 p-4 shadow-2xl origin-left"
      >
        <div className="flex items-center gap-2 mb-2">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400/20" />
            <span className="text-[9px] font-bold text-white uppercase">Scaling Vector</span>
        </div>
        <div className="text-2xl font-bold font-mono text-white leading-none">×4.2</div>
        <div className="text-[8px] text-muted-foreground uppercase mt-1">Infrastructure Multiplier</div>
      </motion.div>

      <motion.div
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 -left-12 z-20 px-4 py-2 glass-panel rounded-full border border-white/10 flex items-center gap-3 shadow-xl backdrop-blur-3xl"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Live Strategic Sync</span>
      </motion.div>
    </div>
  );
}
