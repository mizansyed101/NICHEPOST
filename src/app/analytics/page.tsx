'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Zap, 
  Target, 
  TrendingUp,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { Sidebar } from '@/components/Sidebar'

export default function AnalyticsPage() {
  const stats = [
    { label: 'Total Posts', value: '124', icon: Zap, color: 'text-purple-400' },
    { label: 'Completion Rate', value: '94.2%', icon: Target, color: 'text-cyan-400' },
    { label: 'Platform Reach', value: '8.4k', icon: TrendingUp, color: 'text-green-400' },
  ]

  const chartData = [40, 70, 45, 90, 65, 80, 55]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pl-64">
      <Sidebar />

      <main className="p-10">
        <header className="flex flex-wrap items-center gap-4 mb-10">
          <Link href="/dashboard" className="p-2 rounded-xl hover:bg-white/5 transition-all text-white/60 hover:text-white">
             <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold font-outfit">Performance Intelligence</h1>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative group hover:border-white/20 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-white/40 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
              <h2 className="text-4xl font-black font-outfit">{stat.value}</h2>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <section className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl mb-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-bold font-outfit">Posting Activity</h3>
                <p className="text-white/40 text-sm">Posts generated per day over the last week.</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">This Week</span>
              </div>
            </div>

            <div className="flex items-end justify-between h-64 gap-4">
              {chartData.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
                    className="w-full rounded-t-xl bg-gradient-to-t from-purple-600/20 to-purple-500 relative overflow-hidden group-hover/bar:to-cyan-400 transition-all shadow-[0_0_20px_rgba(139,92,246,0.2)] group-hover/bar:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                  </motion.div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Network Distribution */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className="text-xl font-bold font-outfit mb-6">Network Share</h3>
              <div className="space-y-4">
                 {[
                   { name: 'Twitter', share: 45, color: 'bg-blue-400' },
                   { name: 'LinkedIn', share: 30, color: 'bg-cyan-500' },
                   { name: 'Reddit', share: 15, color: 'bg-orange-500' },
                   { name: 'Other', share: 10, color: 'bg-purple-500' },
                 ].map((net, i) => (
                   <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-white/60">
                         <span>{net.name}</span>
                         <span>{net.share}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <motion.div
                           initial={{ width: 0 }}
                           animate={{ width: `${net.share}%` }}
                           transition={{ delay: 1 + (i * 0.1) }}
                           className={`h-full ${net.color}`}
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/10 to-cyan-600/10 border border-white/10 backdrop-blur-xl flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                 <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold font-outfit mb-2">Neural Optimization</h3>
              <p className="text-white/40 text-sm max-w-xs">Your AI is learning. Post consistently for 3 more days to unlock advanced niche targeting filters.</p>
           </div>
        </section>
      </main>
    </div>
  )
}
