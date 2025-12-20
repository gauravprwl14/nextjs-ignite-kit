// Forced update to resolve stale import cache
"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Cpu, Globe, Layers, Zap, Users, Search, Target } from "lucide-react";
import Link from "next/link";
import portfolioData from "../../content/portfolio.json";
import { ValueProposition } from "@/components/home/ValueProposition";
import { TechStack } from "@/components/home/TechStack";
import { ArchitectureSpotlight } from "@/components/home/ArchitectureSpotlight";
import { ExpertiseMatrix } from "@/components/home/ExpertiseMatrix";
import { StrategicDashboard } from "@/components/home/StrategicDashboard";
import { LandingStats } from "@/components/home/LandingStats";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

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
  const { hero, services, projects } = portfolioData;

  return (
    <main className="min-h-screen pt-20 p-6 md:p-12 lg:p-24 overflow-hidden relative">
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
        <section className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 items-center min-h-[50vh] py-8">
          <div>
            <motion.div variants={item}>
              <span className="inline-block py-1 px-3 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-wider mb-6">
                AVAILABLE FOR NEW ENGAGEMENTS
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-6xl md:text-8xl lg:text-[100px] font-heading font-bold tracking-tight leading-none mb-6 bg-linear-to-r from-foreground via-foreground/90 to-foreground/40 bg-clip-text text-transparent uppercase"
            >
              {hero.headline.split(' ').slice(0, 2).join(' ')} <br />
              <span className="text-primary/90">{hero.headline.split(' ').slice(2).join(' ')}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-muted-foreground max-w-xl font-light leading-relaxed mb-10"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link href={hero.ctaLink} className="h-14 px-10 flex items-center rounded-full bg-white text-black font-bold hover:bg-white/90 transition-all active:scale-95">
                {hero.ctaText}
              </Link>
              <Link href={hero.reelLink} className="group h-14 px-10 flex items-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all active:scale-95">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Zap className="w-4 h-4 text-primary fill-primary" />
                </div>
                <span className="font-bold">{hero.reelText}</span>
              </Link>
            </motion.div>
          </div>

          <motion.div variants={item} className="hidden lg:block relative">
             <StrategicDashboard />
          </motion.div>
        </section>

        <LandingStats stats={hero.stats} />

        <ErrorBoundary>
          <ArchitectureSpotlight />
        </ErrorBoundary>

        <ValueProposition />
        
        <ExpertiseMatrix />

        <TechStack />

        {/* Services / Engagement Models */}
        <section>
          <motion.div variants={item} className="mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Engagement Models</h2>
            <p className="text-muted-foreground max-w-2xl">
              Flexible partnership models designed to deliver high-impact technical leadership where you need it most.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              let Icon = Search;
              if (service.icon === 'Users') Icon = Users;
              else if (service.icon === 'Layers') Icon = Layers;
              
              return (
                <motion.div
                  key={service.id}
                  variants={item}
                  className="glass-panel p-8 rounded-2xl group hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-3">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Core Competencies / Bento Grid */}
        <section>
          <motion.div variants={item} className="mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Core Competencies</h2>
            <p className="text-muted-foreground max-w-2xl">
              Deep expertise across the modern technical landscape, from distributed systems to engineering culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
             {/* Strategy Card */}
            <motion.div
              variants={item}
              className="md:col-span-2 md:row-span-2 glass-panel p-8 rounded-2xl relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target className="w-48 h-48" />
              </div>
              <div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-4">Cloud Native Strategy</h3>
                <p className="text-muted-foreground text-lg relative z-10 mb-6">
                  Guiding enterprises through the complexities of cloud adoption. I maintain a vendor-neutral approach while leveraging best-in-class solutions for your specific needs.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground/80">
                  <li className="flex items-center gap-2">✔ Multi-Cloud Architecture</li>
                  <li className="flex items-center gap-2">✔ Kubernetes & Containerization</li>
                  <li className="flex items-center gap-2">✔ Cost Optimization (FinOps)</li>
                </ul>
              </div>
            </motion.div>

            {/* Architecture Card */}
            <motion.div
              variants={item}
              className="md:col-span-1 md:row-span-1 glass-panel p-6 rounded-2xl group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading mb-2">Distributed Systems</h3>
              <p className="text-xs text-muted-foreground">
                Designing event-driven architectures that scale to millions of concurrent users.
              </p>
            </motion.div>

            {/* AI Card */}
            <motion.div
              variants={item}
              className="md:col-span-1 md:row-span-1 glass-panel p-6 rounded-2xl group"
            >
               <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading mb-2">AI Integration</h3>
              <p className="text-xs text-muted-foreground">
                Pragmatic implementation of RAG and LLM workflows in enterprise environments.
              </p>
            </motion.div>

            {/* Leadership Card */}
             <motion.div
              variants={item}
              className="md:col-span-2 md:row-span-1 glass-panel p-8 rounded-2xl flex items-center justify-between group"
            >
              <div>
                <h3 className="text-xl font-bold font-heading mb-2">Engineering Culture</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Building high-velocity teams through psychological safety, clear career ladders, and autonomous delivery structures.
                </p>
              </div>
              <div className="hidden md:flex w-16 h-16 rounded-full bg-white/5 items-center justify-center">
                 <Users className="w-8 h-8 text-white/40" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Selected Work Preview */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <motion.div variants={item}>
              <h2 className="text-3xl font-bold font-heading mb-4">Selected Work</h2>
              <p className="text-muted-foreground max-w-xl">
                Case studies of recent architectural transformations and platform launches.
              </p>
            </motion.div>
            <motion.div variants={item}>
               <Link href="/portfolio" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                View All Case Studies <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                className="glass-panel p-8 rounded-2xl group cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="text-xs font-bold tracking-widest text-primary/80 mb-4 uppercase">
                  {project.techStack[0]}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(1).map((tech) => (
                    <span key={tech} className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </main>
  );
}
