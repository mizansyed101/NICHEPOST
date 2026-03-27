'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from '@/components/Sidebar'
import { Plus, RefreshCw, Layers, Zap, Info, CreditCard, X, Menu, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { PostCard } from '@/components/PostCard'
import { PostToAllButton } from '@/components/PostToAllButton'
import { StreakBadge } from '@/components/StreakBadge'
import { getShareLink } from '@/lib/shareLinks'
import { ManualPostModal } from '@/components/ManualPostModal'
import { Pricing } from '@/components/Pricing'

const platforms = [
  { id: 'twitter', name: 'Twitter/X' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'reddit', name: 'Reddit' },
  { id: 'telegram', name: 'Telegram' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'whatsapp', name: 'WhatsApp' },
  { id: 'threads', name: 'Threads' },
]

export default function DashboardPage() {
  const [posts, setPosts] = useState<Record<string, { content: string; isDone: boolean }>>({
    twitter: { content: "🚀 Just launched NichePost AI! Automating my niche presence has never been easier. No more API key headaches. #SaaS #Growth #AI", isDone: false },
    linkedin: { content: "I'm excited to share a new tool I've been working on: NichePost AI.\n\nBuilt for creators who want to stay consistent across platforms without spending hours on scheduling and API approvals.\n\nWhat are you working on today?", isDone: false },
    reddit: { content: "How do you guys handle multi-platform social media posting? I've been building a tool that uses share URLs instead of APIs to keep things simple. Would love to hear your thoughts.", isDone: false },
    telegram: { content: "New update in the niche chamber! ⚡️ Check out the latest posts ready for deployment. Stay consistent, stay ahead. 🔥", isDone: false },
    facebook: { content: "Big day for the project! Consistency is key to growth, and we're making it simpler than ever. Join us on the journey! 🚀", isDone: false },
    whatsapp: { content: "Hey! Check out my latest niche update. Freshly generated and ready to share. 🎯", isDone: false },
    threads: { content: "Threads is the new frontier for niche growth! 🧵 Just automated my setup with NichePost AI. Who's following for more build updates? 🚀 #BuildInPublic", isDone: false },
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [isManualModalOpen, setIsManualModalOpen] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [activeNiche, setActiveNiche] = useState('AI SaaS')
  const [newsSummary, setNewsSummary] = useState<string | null>(null)
  const [credits, setCredits] = useState(5)
  const [showPricing, setShowPricing] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleContentChange = (platform: string, newContent: string) => {
    setPosts({ ...posts, [platform]: { ...posts[platform], content: newContent } })
  }

  const getPostType = (content: string) => {
    const match = content.match(/^\[(.*?)\]/)
    return match ? match[1].toUpperCase() : 'NEWS'
  }

  const cleanContent = (content: string) => {
    return content.replace(/^\[.*?\]\s*/, '')
  }

  const toggleDone = (platform: string) => {
    setPosts({ ...posts, [platform]: { ...posts[platform], isDone: !posts[platform].isDone } })
  }

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lastNiche: activeNiche })
      })
      const data = await response.json()
      if (data.success) {
        setActiveNiche(data.niche)
        setNewsSummary(data.newsSummary)
        if (data.creditsRemaining !== undefined) setCredits(data.creditsRemaining)
        const newPosts = { ...posts }
        data.posts.forEach((p: any) => {
          if (newPosts[p.platform]) {
            newPosts[p.platform].content = p.content
            newPosts[p.platform].isDone = false
          }
        })
        setPosts(newPosts)
      }
    } catch (err) {
      console.error('Regeneration failed:', err)
    } finally {
      setIsRegenerating(false)
    }
  }

  const handlePostToAll = () => {
    Object.entries(posts).forEach(([platform, data]) => {
      const url = getShareLink(platform, data.content)
      if (url) window.open(url, '_blank')
    })
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleSubscribe = async (plan: string) => {
    if (plan === 'FREE') {
      alert('You are already on the Free plan!')
      return
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          plan, 
          userId: 'user_123', // In a real app, get from session
          email: 'alex@example.com' 
        })
      })
      const data = await response.json()
      
      if (data.success && data.payment_session_id) {
        // @ts-ignore
        const cashfree = new window.Cashfree({
          mode: "sandbox" // or "production"
        });
        
        cashfree.checkout({
          paymentSessionId: data.payment_session_id,
          redirectTarget: "_self"
        });
      }
    } catch (err) {
      console.error('Checkout failed:', err)
      alert('Failed to initiate checkout. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white lg:pl-64">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#0a0a0f]/80 backdrop-blur-xl z-30">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-white/5 rounded-lg text-white/60">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
             <Sparkles className="w-4 h-4 text-white" />
           </div>
           <span className="font-bold font-outfit">NichePost</span>
        </div>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <main className="p-6 md:p-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="flex items-center gap-6">
            <StreakBadge count={4} />
            <div className="flex items-center gap-3 pl-6 border-l border-white/5">
              <div className="text-right">
                <p className="text-sm font-bold leading-tight">Alex Rivera</p>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Pro Plan</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-[1px]">
                <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
                   <Layers className="w-6 h-6 text-white/60" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Hero */}
        <section className="relative p-10 rounded-3xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
          
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-outfit mb-2">Today's Content Batch</h1>
              <p className="text-white/60 max-w-md">Generated for "AI SaaS" niche in a "Professional" tone. All platforms optimized.</p>
            </div>
            <div className="flex flex-wrap gap-4 mt-6 md:mt-0">
              <button 
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 text-white/80"
              >
                <RefreshCw className={`w-5 h-5 ${isRegenerating ? 'animate-spin text-purple-400' : ''}`} /> 
                {isRegenerating ? 'Regenerating...' : 'Regenerate Batch'}
              </button>
              <button 
                onClick={() => setIsManualModalOpen(true)}
                className="flex items-center gap-2 py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all active:scale-95"
              >
                <Plus className="w-5 h-5 text-cyan-400" /> Create Manual Post
              </button>

              <button 
                onClick={() => setShowPricing(true)}
                className="flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30 text-amber-400 font-bold transition-all active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
              >
                <CreditCard className="w-5 h-5" /> Buy Credits ({credits})
              </button>
              <PostToAllButton onClick={handlePostToAll} />
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <PostCard
              key={platform.id}
              platform={platform.name}
              content={cleanContent(posts[platform.id].content)}
              isDone={posts[platform.id].isDone}
              trendingNews={newsSummary || getPostType(posts[platform.id].content)}
              onContentChange={(val) => handleContentChange(platform.id, val)}
              onToggleDone={() => toggleDone(platform.id)}
              onCopy={() => handleCopy(posts[platform.id].content)}
              onShare={() => window.open(getShareLink(platform.id, posts[platform.id].content), '_blank')}
              onRegenerate={handleRegenerate}
            />
          ))}
        </div>
      </main>

      {/* Pricing Modal */}
      <AnimatePresence>
        {showPricing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-6xl"
            >
              <button 
                onClick={() => setShowPricing(false)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <Pricing onSelect={handleSubscribe} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ManualPostModal 
        isOpen={isManualModalOpen} 
        onClose={() => setIsManualModalOpen(false)} 
      />
    </div>
  )
}
