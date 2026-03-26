'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Copy, Share2, RefreshCw } from 'lucide-react'

interface PostCardProps {
  platform: string
  content: string
  onContentChange: (newContent: string) => void
  onCopy: () => void
  onShare: () => void
  onRegenerate: () => void
  isDone: boolean
  trendingNews?: string | null
  onToggleDone: () => void
}

export const PostCard: React.FC<PostCardProps> = ({
  platform,
  content,
  onContentChange,
  onCopy,
  onShare,
  onRegenerate,
  isDone,
  trendingNews,
  onToggleDone,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 rounded-xl border transition-all duration-300 ${
        isDone ? 'bg-white/10 border-green-500/50' : 'bg-white/5 border-white/10'
      } backdrop-blur-xl group hover:border-white/20`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xl capitalize font-bold text-white/90">{platform}</span>
          {isDone && <span className="text-green-500 text-xs font-bold uppercase tracking-wider">✓ Done</span>}
          {trendingNews && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest leading-none truncate max-w-[120px]">
                {trendingNews}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onRegenerate} className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <input
            type="checkbox"
            checked={isDone}
            onChange={onToggleDone}
            className="w-5 h-5 rounded border-white/20 bg-transparent text-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="w-full h-32 bg-black/20 border border-white/5 rounded-lg p-3 text-white/80 text-sm resize-none focus:outline-none focus:border-purple-500/50 transition-colors"
      />

      <div className="flex gap-2 mt-4">
        <button
          onClick={onCopy}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-sm font-medium transition-all"
        >
          <Copy className="w-4 h-4" /> Copy
        </button>
        <button
          onClick={onShare}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]"
        >
          <Share2 className="w-4 h-4" /> Post
        </button>
      </div>
    </motion.div>
  )
}
