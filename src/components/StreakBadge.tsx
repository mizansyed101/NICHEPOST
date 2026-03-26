'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface StreakBadgeProps {
  count: number
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ count }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
    >
      <motion.span
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-2xl"
      >
        🔥
      </motion.span>
      <div className="flex flex-col">
        <span className="text-white font-bold text-sm leading-tight">{count} Day Streak</span>
        <span className="text-white/40 text-[10px] uppercase tracking-wider font-bold">Keep it up!</span>
      </div>
    </motion.div>
  )
}
