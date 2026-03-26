'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Send, User, Lock, ArrowRight, Github } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login for email
    router.push('/dashboard')
  }

  const handleGithubLogin = () => {
    signIn('github', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/10 blur-[150px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Send className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-outfit tracking-tight">NichePost <span className="text-purple-400">AI</span></h1>
          </Link>
          <h2 className="text-xl font-medium text-white/60">Welcome back to the neural engine.</h2>
        </div>

        <form onSubmit={handleLogin} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 shadow-2xl">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/40 mb-2 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  placeholder="alex@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2 px-1">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Password</label>
                <a href="#" className="text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold transition-all shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2 group"
          >
            Access Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]"><span className="bg-[#121218] px-4 text-white/20">or continue with</span></div>
          </div>

          <button
            type="button"
            onClick={handleGithubLogin}
            className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3"
          >
            <Github className="w-5 h-5" />
            GitHub
          </button>

          <p className="text-center text-xs text-white/40">
            No account yet? <Link href="/onboarding" className="text-purple-400 font-bold hover:underline">Start your 7-day free trial</Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}
