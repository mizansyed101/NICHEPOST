'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Send, ShieldCheck, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <Send className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold font-outfit tracking-tight">NichePost <span className="text-purple-400">AI</span></span>
        </div>
        <div className="flex items-center gap-4 sm:gap-8 flex-wrap justify-end">
          <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Login</Link>
          <Link href="/onboarding" className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-32 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Sparkles className="w-3 h-3" />
          Next-Gen Social Automation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-7xl font-bold font-outfit leading-tight mb-8"
        >
          Automate your niche presence <br />
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">without the API headache.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-white/60 mb-12 max-w-2xl"
        >
          Generate platform-perfect posts using Llama 3 AI. No approved developer accounts needed. 
          Just pure niche growth with smart email reminders and one-click posting.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 mt-8"
        >
          <Link href="/onboarding" className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center gap-2">
            Start Growing for Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-lg transition-all flex items-center justify-center">
            Sign In
          </Link>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-32 w-full">
          {[
            { icon: Zap, title: "Llama 3 Powered", desc: "Get high-converting posts tailored to your niche tone in seconds." },
            { icon: ShieldCheck, title: "No API Keys", desc: "Post directly via platform share URLs. No developer accounts required." },
            { icon: Send, title: "Smart Reminders", desc: "Never miss a scheduled post with automated Resend email alerts." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (i * 0.1) }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 text-left hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm">
            © 2024 NichePost AI. Built for the creators.
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 justify-center md:justify-end">
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
