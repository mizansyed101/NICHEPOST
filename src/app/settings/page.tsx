'use client'

import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Trash2, 
  Target, 
  User, 
  Mail, 
  Bell, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Menu,
  Settings,
  Loader
} from 'lucide-react'
import { Sidebar } from '@/components/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { supabase } from '@/lib/supabase'

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [niches, setNiches] = useState<string[]>(['AI SaaS & Solopreneurship'])
  const [newNiche, setNewNiche] = useState('')
  const [tone, setTone] = useState('Professional')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [brandUrl, setBrandUrl] = useState('')
  const [reminders, setReminders] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Sync profile data from session
  useEffect(() => {
    if (status === 'unauthenticated') {
      setIsLoading(false)
    } else if (status === 'authenticated' && session?.user) {
      setName(session.user.name || '')
      setEmail(session.user.email || '')
      loadSettings(session.user.email || '')
    }
  }, [session, status])

  const loadSettings = async (userEmail: string) => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('email', userEmail)
        .single()
      
      if (data) {
        setNiches(data.niches || [])
        setTone(data.tone || 'Professional')
        setBrandUrl(data.brand_url || '')
        setReminders(data.reminders_enabled)
      }
    } catch (err) {
      console.error('Settings load failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddNiche = () => {
    const trimmed = newNiche.trim()
    if (!trimmed) return
    if (niches.length >= 10) {
      setError('Maximum 10 niches allowed.')
      return
    }
    if (niches.some(n => n.toLowerCase() === trimmed.toLowerCase())) {
      setError('This niche is already in your list.')
      return
    }
    setNiches(prev => [...prev, trimmed])
    setNewNiche('')
    setError('')
  }

  const handleRemoveNiche = (index: number) => {
    setNiches(niches.filter((_, i) => i !== index))
    setError('')
  }

  const handleSave = async () => {
    if (!session?.user?.email) return
    setIsSaved(true)
    
    const { error } = await supabase
      .from('user_settings')
      .upsert({ 
        email: session.user.email,
        name,
        niches, 
        tone, 
        brand_url: brandUrl, 
        reminders_enabled: reminders,
        updated_at: new Date().toISOString()
      })

    if (error) {
       console.error('Save failed:', error)
       setError('Failed to sync with database.')
    }

    setTimeout(() => {
      setIsSaved(false)
      setError('')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white lg:pl-64">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          <span className="font-bold font-outfit">Settings</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader className="w-12 h-12 text-purple-500 animate-spin mb-4" />
          <p className="text-white/40 font-medium">Syncing your preferences...</p>
        </div>
      ) : (
        <main className="p-10 max-w-4xl">
        <header className="mb-10">
          <h1 className="text-4xl font-bold font-outfit mb-2">Settings</h1>
          <p className="text-white/60">Manage your topics, delivery, and account details.</p>
        </header>

        <div className="grid gap-8">
          {/* Multi-Niche Manager */}
          <section className="p-8 rounded-3xl bg-[#0e0e13]/50 border border-white/5 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-bold font-outfit text-white">Content Niches</h2>
                </div>
                <span className="text-xs font-bold text-white/30 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  {niches.length} / 10 Topics
                </span>
              </div>
              
              <div className="space-y-6">
                {/* Input Area */}
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      value={newNiche}
                      onChange={(e) => setNewNiche(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddNiche()}
                      placeholder="e.g. Sustainable Fashion, Web3 Security"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                  <button 
                    onClick={handleAddNiche}
                    className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-all active:scale-95"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-400/5 p-3 rounded-lg border border-red-400/10"
                  >
                    <AlertCircle className="w-4 h-4" /> {error}
                  </motion.div>
                )}

                {/* Niches List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <AnimatePresence mode="popLayout">
                    {niches.map((n, i) => (
                      <motion.div
                        key={n}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group/item hover:border-purple-500/30 transition-all"
                      >
                        <span className="text-sm text-white/80 font-medium truncate pr-4">{n}</span>
                        <button 
                          onClick={() => handleRemoveNiche(i)}
                          className="p-2 opacity-0 group-hover/item:opacity-100 text-white/20 hover:text-red-400 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          {/* Aesthetic & Tone */}
          <section className="p-8 rounded-3xl bg-[#0e0e13]/50 border border-white/5 backdrop-blur-xl group">
             <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold font-outfit text-white">Tone & Voice</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Professional', 'Humorous', 'Bold', 'Provocative', 'Educational'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                      tone === t 
                        ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' 
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
          </section>

          {/* Profile & Notifications (Lower emphasis) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="p-8 rounded-3xl bg-[#0e0e13]/50 border border-white/5 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold font-outfit text-white">Profile</h2>
              </div>
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Display Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm"
                />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm"
                />
                <input 
                  type="url" 
                  value={brandUrl}
                  onChange={(e) => setBrandUrl(e.target.value)}
                  placeholder="Brand Website / Product URL"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500/50 outline-none"
                />
              </div>
            </section>

            <section className="p-8 rounded-3xl bg-[#0e0e13]/50 border border-white/5 backdrop-blur-xl flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-amber-500" />
                  <h2 className="text-lg font-bold font-outfit text-white">Reminders</h2>
                </div>
                <button 
                  onClick={() => setReminders(!reminders)}
                  className={`w-12 h-6 rounded-full transition-all relative ${reminders ? 'bg-amber-500' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${reminders ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
              <p className="text-xs text-white/30 leading-relaxed mt-4">
                Email notifications will be sent to <span className="text-white/60">{email}</span> at every generation slot.
              </p>
            </section>
          </div>

          {/* Global Action */}
          <div className="flex justify-end pt-4">
            <button 
              onClick={handleSave}
              disabled={isSaved}
              className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-bold transition-all ${
                isSaved 
                ? 'bg-green-500/20 text-green-400 border border-green-500/20' 
                : 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] active:scale-95'
              }`}
            >
              {isSaved ? (
                <><CheckCircle2 className="w-6 h-6" /> Preferences Updated</>
              ) : (
                <><Save className="w-6 h-6" /> Save All Settings</>
              )}
            </button>
          </div>
        </div>
        </main>
      )}
    </div>
  )
}
