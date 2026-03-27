'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from '@/components/Sidebar'
import { 
  Clock, 
  Globe, 
  Plus, 
  Twitter, 
  Linkedin, 
  MessageSquare, 
  Zap,
  Trash2,
  X,
  Check,
  AtSign,
  Menu,
  Calendar
} from 'lucide-react'

const initialSlots = [
  { id: 1, time: '09:00 AM', platforms: ['twitter', 'linkedin'], active: true },
  { id: 2, time: '02:00 PM', platforms: ['twitter', 'reddit'], active: true },
]

export default function SchedulePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [slots, setSlots] = useState(initialSlots)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newTime, setNewTime] = useState('09:00')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter'])

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const handleAddSlot = () => {
    // Convert 24h to 12h for display
    const [h, m] = newTime.split(':')
    const hours = parseInt(h)
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const h12 = hours % 12 || 12
    const time12 = `${h12}:${m} ${ampm}`

    const newSlot = {
      id: Date.now(),
      time: time12,
      platforms: selectedPlatforms,
      active: true
    }
    setSlots([...slots, newSlot])
    setIsAddModalOpen(false)
    setSelectedPlatforms(['twitter'])
  }

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      setSelectedPlatforms(selectedPlatforms.filter(x => x !== p))
    } else {
      setSelectedPlatforms([...selectedPlatforms, p])
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white lg:pl-64">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-400" />
          <span className="font-bold font-outfit">Schedule</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <main className="p-10 max-w-5xl">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold font-outfit mb-2 text-white">Scheduler</h1>
            <p className="text-white/60">Automate your content generation windows.</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> Add Posting Slot
          </button>
        </header>

        {/* Posting Slots */}
        <section>
          <h2 className="text-xl font-bold font-outfit mb-6 flex items-center gap-2 text-white">
            <Clock className="w-5 h-5 text-purple-400" /> Active Slots
          </h2>
          
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {slots.map((slot) => (
                <motion.div 
                  key={slot.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 rounded-3xl bg-[#0e0e13]/50 border border-white/5 backdrop-blur-xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-8">
                    <div className="text-2xl font-bold font-outfit text-white">{slot.time}</div>
                    <div className="flex gap-2">
                      {slot.platforms.map(p => (
                        <div key={p} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                          {p === 'twitter' && <Twitter className="w-4 h-4" />}
                          {p === 'linkedin' && <Linkedin className="w-4 h-4" />}
                          {p === 'reddit' && <MessageSquare className="w-4 h-4" />}
                          {p === 'threads' && <AtSign className="w-4 h-4" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${slot.active ? 'text-green-400' : 'text-white/20'}`}>
                        {slot.active ? 'Active' : 'Paused'}
                      </span>
                      <button 
                        onClick={() => setSlots(slots.map(s => s.id === slot.id ? {...s, active: !s.active} : s))}
                        className={`w-10 h-5 rounded-full relative transition-all ${slot.active ? 'bg-green-500' : 'bg-white/10'}`}
                      >
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${slot.active ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>
                    <button 
                      onClick={() => setSlots(slots.filter(s => s.id !== slot.id))}
                      className="p-2 text-white/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Automation Note */}
        <div className="mt-12 p-6 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex items-start gap-4">
          <Zap className="w-6 h-6 text-purple-400 shrink-0" />
          <p className="text-sm text-white/60 leading-relaxed font-manrope">
            AI generation starts exactly <span className="text-white font-bold">15 minutes before</span> each slot. A random niche from your list will be picked for each slot to ensure variety.
          </p>
        </div>
      </main>

      {/* Add Slot Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0e0e13] border border-white/10 rounded-3xl p-8 w-full max-w-md relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold font-outfit">New Posting Slot</h2>
                <button onClick={() => setIsAddModalOpen(false)}><X className="w-5 h-5 text-white/40" /></button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-white/30 uppercase tracking-widest mb-3">Time</label>
                  <input 
                    type="time" 
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/30 uppercase tracking-widest mb-3">Target Platforms</label>
                  <div className="flex gap-2">
                    {[
                      { id: 'twitter', icon: Twitter },
                      { id: 'linkedin', icon: Linkedin },
                      { id: 'reddit', icon: MessageSquare },
                      { id: 'threads', icon: AtSign }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => togglePlatform(p.id)}
                        className={`p-4 rounded-xl border transition-all ${
                          selectedPlatforms.includes(p.id) 
                            ? 'bg-purple-500/20 border-purple-500 text-purple-400' 
                            : 'bg-white/5 border-white/5 text-white/20'
                        }`}
                      >
                        <p.icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleAddSlot}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" /> Save Slot
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
