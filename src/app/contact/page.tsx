"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageSquare, Send, Github, Linkedin, Twitter } from "lucide-react"; // Note: Lucide icons might not have Twitter/Linkedin in some versions, sticking to standard icons or checking imports
import Link from "next/link";
import portfolioData from "../../../content/portfolio.json";
import { useState } from "react";

export default function ContactPage() {
  const { contact, socials } = portfolioData;
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate submission
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen pt-20 p-6 md:p-12 lg:p-24 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[50%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen -translate-x-1/2" />
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* Contact Info */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <MessageSquare className="w-4 h-4" />
              <span>Contact</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading">
              Let&apos;s Start a <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">Conversation</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Whether you need strategic guidance, a technical audit, or leadership for a critical initiative, I&apos;m here to help.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl glass-panel">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <a href={`mailto:${contact.email}`} className="text-lg font-medium hover:text-primary transition-colors">
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {socials.map((social) => {
                 // Simple icon mapping since import might be tricky for brand icons in standard lucide
                 // We will just render the text for now or verify icons if available. 
                 // Actually, Lucide has Github, Linkedin, Twitter usually.
                 return (
                  <a 
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl glass-panel hover:bg-white/5 transition-colors group"
                  >
                    <span className="font-medium group-hover:text-primary transition-colors">{social.platform}</span>
                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                 );
              })}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel p-8 rounded-3xl"
        >
          {formState === 'success' ? (
            <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Message Sent!</h3>
              <p className="text-muted-foreground">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
              <button 
                onClick={() => setFormState('idle')}
                className="mt-6 text-primary hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium ml-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-white/20"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium ml-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-white/20"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="topic" className="text-sm font-medium ml-1">Interested In</label>
                <select 
                  id="topic" 
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all [&>option]:bg-black"
                >
                  <option value="fractional-cto">Fractional CTO Services</option>
                  <option value="architecture">Architecture Review</option>
                  <option value="due-diligence">Technical Due Diligence</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium ml-1">Message</label>
                <textarea 
                  id="message" 
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-white/20 resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === 'submitting' ? (
                  "Sending..."
                ) : (
                  <>Send Message <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </main>
  );
}
