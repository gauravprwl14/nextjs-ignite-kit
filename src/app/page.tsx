"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Code, Cpu, Globe, Layers, Zap } from "lucide-react";
import Link from "next/link";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
};

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-12 lg:p-24 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto space-y-16"
      >
        {/* Hero Section */}
        <section className="relative z-10 flex flex-col justify-center min-h-[60vh]">
          <motion.div variants={item}>
            <span className="inline-block py-1 px-3 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-wider mb-6">
              AVAILABLE FOR NEW ENGAGEMENTS
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-6xl md:text-8xl font-heading font-bold tracking-tight leading-none mb-6 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/40 bg-clip-text text-transparent"
          >
            Principal <br />
            <span className="text-primary/90">Technical Consultant</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed mb-10"
          >
            Architecting digital excellence for enterprise clients.
            I bridge the gap between complex business requirements and
            cutting-edge technical solutions.
          </motion.p>

          <motion.div variants={item} className="flex gap-4">
            <Link href="/blog" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary px-8 font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background">
              <span className="mr-2">Explore Thoughts</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="h-12 px-8 rounded-md border border-input bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-colors">
              Contact Me
            </button>
          </motion.div>
        </section>

        {/* Bento Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {/* Large Card: Core Philosophy */}
          <motion.div
            variants={item}
            className="md:col-span-2 glass-panel p-8 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Layers className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-4">Strategic Architecture</h3>
            <p className="text-muted-foreground text-lg max-w-lg relative z-10">
              I specialize in designing scalable, maintainable systems that drive business growth.
              From microservices migration to cloud-native adoption, I provide the roadmap and the code.
            </p>
          </motion.div>

          {/* Tall Card: Tech Stack */}
          <motion.div
            variants={item}
            className="md:row-span-2 glass-panel p-8 rounded-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Technical Leadership</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Leading teams to deliver high-quality software with velocity.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  System Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Team Mentorship
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Code Reviews
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Agile Processes
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Medium Card: Recent Work */}
          <motion.div
            variants={item}
            className="glass-panel p-8 rounded-2xl group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">Global Deployments</h3>
            <p className="text-sm text-muted-foreground">
              Orchestrated multi-region deployments for Fortune 500 clients, ensuring 99.99% availability.
            </p>
          </motion.div>

          {/* Medium Card: Innovation */}
          <motion.div
            variants={item}
            className="glass-panel p-8 rounded-2xl group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">Innovation & AI</h3>
            <p className="text-sm text-muted-foreground">
              Integrating GenAI workflows to optimize internal developer platforms.
            </p>
          </motion.div>

          {/* Wide Card: Latest Article */}
          <motion.div
            variants={item}
            className="md:col-span-2 glass-panel p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase mb-2">
                <Code className="w-3 h-3" />
                Latest Insight
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2">The Future of Serverless</h3>
              <p className="text-muted-foreground mb-4">
                Exploring the trade-offs between cold starts and cost optimization in modern cloud architectures.
              </p>
              <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                Read Article &rarr;
              </Link>
            </div>
            <div className="w-full md:w-1/3 h-32 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5" />
          </motion.div>

        </section>
      </motion.div>
    </main>
  );
}
