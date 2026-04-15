"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/features/portfolio/capabilities";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Box, Database, ExternalLink, GitBranch, Network, Server } from "lucide-react";

export function ArchitectureSpotlight() {
  const spotlightProjects = useMemo(() => 
    projects.filter(p => p.architectureDiagram).slice(0, 3)
  , []);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = spotlightProjects[activeIndex];

  if (!activeProject || !activeProject.architectureDiagram) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left: Project Selector & Info */}
          <div className="w-full md:w-1/3 space-y-8">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-4">Architecture Spotlight</h2>
              <p className="text-muted-foreground">
                Deep dives into real system designs implemented for enterprise clients.
              </p>
            </div>

            <div className="space-y-4">
              {spotlightProjects.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeIndex === idx 
                      ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(239,68,68,0.1)]" 
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold tracking-widest uppercase ${activeIndex === idx ? "text-primary" : "text-muted-foreground"}`}>
                      0{idx + 1}
                    </span>
                    <h3 className="font-bold text-sm">{project.name}</h3>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Key Challenge</h4>
              <p className="text-sm text-muted-foreground italic line-clamp-2">
                &quot;{activeProject.problem}&quot;
              </p>
            </div>
          </div>

          {/* Right: Visual Diagram */}
          <div className="w-full md:w-2/3 glass-panel p-8 rounded-3xl min-h-[450px] relative flex flex-col items-center justify-center">
             {/* Dynamic SVG Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/10" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full flex flex-col"
              >
                <div className="text-center mb-8">
                    <h3 className="text-xl font-bold font-heading text-primary">{activeProject.architectureDiagram.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">{activeProject.architectureDiagram.description}</p>
                </div>

                <div className="relative flex-grow flex items-center justify-center p-4">
                    {/* SVG Connections (Lines) */}
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                        {activeProject.architectureDiagram.flows.map((flow) => {
                            const sourceNode = activeProject.architectureDiagram?.nodes.find(n => n.id === flow.source);
                            const targetNode = activeProject.architectureDiagram?.nodes.find(n => n.id === flow.target);
                            if (!sourceNode || !targetNode) return null;
                            
                            return (
                                <motion.path
                                    key={flow.id}
                                    d={`M ${sourceNode.x} ${sourceNode.y} L ${targetNode.x} ${targetNode.y}`}
                                    stroke="url(#gradient-line)"
                                    strokeWidth="0.5"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.4 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            );
                        })}
                        <defs>
                            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                                <stop offset="50%" stopColor="var(--primary)" />
                                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Nodes (Icons) */}
                    {activeProject.architectureDiagram.nodes.map((node) => {
                         let Icon = GitBranch;
                         if (node.type === 'database') Icon = Database;
                         else if (node.type === 'gateway') Icon = Network;
                         else if (node.type === 'service') Icon = Server;
                         else if (node.type === 'legacy') Icon = Box;

                        return (
                            <motion.div
                                key={node.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (node.id.length * 0.01) }}
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group/node"
                            >
                                <div className="p-3 rounded-lg bg-background border border-white/10 group-hover/node:border-primary/50 group-hover/node:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all z-20">
                                    <Icon className="w-5 h-5 text-primary/80 group-hover/node:text-primary" />
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-tighter whitespace-nowrap bg-background/80 px-1.5 py-0.5 rounded border border-white/5">
                                        {node.label}
                                    </span>
                                    {node.subLabel && (
                                        <span className="text-[8px] text-muted-foreground italic whitespace-nowrap">
                                            {node.subLabel}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    {activeProject.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/50">
                            {tech}
                        </span>
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <Link 
                href={`/portfolio?id=${activeProject.id}`}
                className="absolute bottom-6 right-8 text-xs font-bold text-primary flex items-center gap-2 hover:underline"
            >
                View Full Case Study <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
