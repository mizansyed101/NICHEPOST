'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

interface PostToAllButtonProps {
  onClick: () => void
  disabled?: boolean
}

export const PostToAllButton: React.FC<PostToAllButtonProps> = ({ onClick, disabled }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className="relative group overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      <span>Post to All Platforms</span>
    </motion.button>
  )
}
