'use client'

import React from 'react'
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  User, 
  Calendar,
  LogOut,
  Sparkles,
  X
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { signOut } from 'next-auth/react'

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/schedule', label: 'Schedule', icon: Calendar },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  const SidebarContent = (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-10 px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold font-outfit text-white">NichePost <span className="text-purple-400">AI</span></span>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          const Icon = link.icon
          return (
            <Link 
              key={link.href}
              href={link.href} 
              onClick={() => { if (window.innerWidth < 1024) onClose() }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-purple-500/10 text-purple-400 font-bold border border-purple-500/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" /> {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="pt-6 border-t border-white/5">
        <Link 
          href="/profile" 
          onClick={() => { if (window.innerWidth < 1024) onClose() }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-4 ${
            pathname === '/profile'
              ? 'bg-purple-500/10 text-purple-400 font-bold border border-purple-500/20'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <User className="w-5 h-5" /> Profile
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all font-outfit"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-white/5 bg-[#0e0e13]/80 backdrop-blur-3xl flex-col fixed left-0 top-0 h-full z-40">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-72 bg-[#0a0a0f] border-r border-white/5 z-[60] lg:hidden shadow-2xl"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
