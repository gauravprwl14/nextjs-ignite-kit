"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import portfolioData from "../../../content/portfolio.json";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
};

export default function PortfolioPage() {
  const { projects } = portfolioData;

  return (
    <main className="min-h-screen pt-20 p-6 md:p-12 lg:p-24 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto space-y-16"
      >
        {/* Header */}
        <section className="max-w-3xl">
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl font-heading font-bold mb-6"
          >
            Selected Work
          </motion.h1>
          <motion.p variants={item} className="text-xl text-muted-foreground">
            A collection of technical transformations, platform launches, and architectural overhauls delivered for enterprise clients.
          </motion.p>
        </section>

        {/* Project Grid */}
        <section className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={item}
              className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors"
            >
              {/* Image / Visual Placeholder */}
              <div className="aspect-video rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                  {project.title.charAt(0)}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                  Case Study {index + 1}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                      {tech}
                    </span>
                  ))}
                </div>

                <Link 
                  href={project.link}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  View Case Study <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </section>
      </motion.div>
    </main>
  );
}
