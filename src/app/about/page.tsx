"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import Link from "next/link";
import portfolioData from "../../../content/portfolio.json";

export default function AboutPage() {
  const { about } = portfolioData;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <main className="min-h-screen pt-20 p-6 md:p-12 lg:p-24 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header Section */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Terminal className="w-4 h-4" />
            <span>About Me</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-heading bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70">
            {about.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
            {about.bio}
          </p>
        </motion.div>

        {/* Philosophy Section - Static for now but fits the persona */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={stagger}
          className="grid md:grid-cols-2 gap-8"
        >
          <motion.div variants={fadeIn} className="glass-panel p-8 rounded-2xl space-y-4">
            <h3 className="text-2xl font-bold font-heading">Engineering Philosophy</h3>
            <p className="text-muted-foreground">
              I believe in pragmatic engineering that prioritizes business value over hype. My approach balances immediate delivery with long-term architectural sustainability, ensuring systems can evolve as the organization scales.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="glass-panel p-8 rounded-2xl space-y-4">
            <h3 className="text-2xl font-bold font-heading">Leadership Style</h3>
            <p className="text-muted-foreground">
              Great technology teams are built on trust, psychological safety, and autonomy. I foster environments where engineers are empowered to take ownership, experiment safely, and continuously grow their technical capabilities.
            </p>
          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold font-heading">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {about.skills.map((skill) => (
              <motion.div 
                key={skill}
                variants={fadeIn}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 rounded-2xl bg-linear-to-r from-primary/20 to-accent/20 border border-white/10 backdrop-blur-md"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Ready to scale your engineering?</h3>
            <p className="text-white/70">Let&apos;s discuss how I can help your team achieve technical excellence.</p>
          </div>
          <Link 
            href="/contact"
            className="px-8 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-white/90 transition-transform active:scale-95 flex items-center gap-2"
          >
            Let&apos;s Talk <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
