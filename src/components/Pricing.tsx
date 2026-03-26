'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, Zap, Shield } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    credits: '5 Credits',
    features: ['1 Niche topic', 'Manual Posting', 'Basic AI Generation', 'Discord Support'],
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Pro',
    price: '₹199',
    period: '/mo',
    credits: '500 Credits',
    features: ['Up to 10 Niches', 'Auto-Scheduler', 'News-Driven AI', 'Threads Integration', 'Brand Promotion'],
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    popular: true,
  },
  {
    name: 'Elite',
    price: '₹499',
    period: '/mo',
    credits: '2000 Credits',
    features: ['Everything in Pro', 'Custom AI Tone', 'Priority Generation', 'Agency Dashboard', 'API Access'],
    icon: Shield,
    color: 'from-amber-500 to-orange-500',
  },
]

export const Pricing: React.FC<{ onSelect: (plan: string) => void }> = ({ onSelect }) => {
  return (
    <div className="py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold font-outfit mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Choose Your Growth Plan
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          Scale your niche presence with automated, high-authority content that converts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative p-8 rounded-3xl bg-white/[0.03] border transition-all duration-300 ${
              plan.popular ? 'border-purple-500/50 scale-105 z-10 shadow-[0_0_40px_rgba(168,85,247,0.2)]' : 'border-white/5 hover:border-white/20'
            } backdrop-blur-xl group`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-500 text-[10px] font-bold uppercase tracking-widest text-white shadow-xl">
                Most Popular
              </div>
            )}

            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} p-3 mb-6 shadow-lg`}>
              <plan.icon className="w-full h-full text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              {plan.period && <span className="text-white/40 text-sm">{plan.period}</span>}
            </div>
            
            <p className="text-purple-400 font-bold text-sm mb-8">{plan.credits}</p>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-white/60">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => onSelect(plan.name.toUpperCase())}
              className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 ${
                plan.popular
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg hover:opacity-90'
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
