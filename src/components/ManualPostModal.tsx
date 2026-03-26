'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MessageSquare, 
  Facebook,
  AtSign
} from 'lucide-react'

interface ManualPostModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ManualPostModal({ isOpen, onClose }: ManualPostModalProps) {
  const [content, setContent] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0e0e13] border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
          
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold font-outfit">Create Manual Post</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-white/40" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-3 px-1">Your Content</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Draft your niche brilliance here..."
                  className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none text-lg leading-relaxed font-manrope"
                />
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-xl font-bold transition-all text-white/80"
                >
                  {isCopied ? <><Check className="w-5 h-5 text-green-400" /> Copied</> : <><Copy className="w-5 h-5" /> Copy Text</>}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all active:scale-95 text-white">
                  <Send className="w-5 h-5" /> Share Links
                </button>
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-center text-xs font-bold text-white/20 uppercase tracking-[0.2em] mb-4">Quick Deploy</p>
                <div className="flex justify-center gap-4">
                  {[Twitter, Linkedin, MessageSquare, Facebook, Instagram, AtSign].map((Icon, i) => (
                    <button key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all text-white/40 hover:text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
