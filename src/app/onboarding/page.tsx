'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Send, Sparkles, Clock, Mail, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    niche: '',
    subNiche: '',
    keywords: '',
    tone: 'Professional',
    postsPerDay: 1,
    timeSlots: ['09:00', '18:00'],
    timezone: 'UTC',
    email: '',
    remindersEnabled: true,
  })
  const router = useRouter()

  const nextStep = () => setStep((s) => Math.min(s + 1, 3))
  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const handleFinish = () => {
    // In a real app, save to Supabase here
    console.log('Finished onboarding:', formData)
    router.push('/dashboard')
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-white/60 mb-2 uppercase tracking-wider">Your Niche</label>
                <input
                  type="text"
                  placeholder="e.g. AI SaaS, Fitness, Coffee"
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-white/60 mb-2 uppercase tracking-wider">Sub-Niche (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Productivity AI"
                    value={formData.subNiche}
                    onChange={(e) => setFormData({ ...formData, subNiche: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/60 mb-2 uppercase tracking-wider">Tone</label>
                  <select
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none"
                  >
                    {['Casual', 'Professional', 'Humorous', 'Inspirational'].map((t) => (
                      <option key={t} value={t} className="bg-[#0a0a0f]">{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-white/60 mb-2 uppercase tracking-wider">Keywords</label>
                <textarea
                  placeholder="e.g. automation, future, efficiency"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  className="w-full h-24 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                />
              </div>
            </div>
            <button
              onClick={nextStep}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold transition-all shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              Next: Schedule <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white/60 mb-4 uppercase tracking-wider">Posts Per Day</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.postsPerDay}
                  onChange={(e) => setFormData({ ...formData, postsPerDay: parseInt(e.target.value) })}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between mt-2 text-xs font-bold text-white/40">
                  <span>1 Post</span>
                  <span className="text-purple-400 text-sm font-black">{formData.postsPerDay}</span>
                  <span>10 Posts</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-white/60 mb-2 uppercase tracking-wider">Target Timezone</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none"
                >
                  {['UTC', 'EST', 'PST', 'GMT', 'IST'].map((tz) => (
                    <option key={tz} value={tz} className="bg-[#0a0a0f]">{tz}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white/60 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={nextStep}
                className="flex-[2] py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold transition-all shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2"
              >
                Next: Final Settings <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold font-outfit">Almost there!</h3>
              <p className="text-white/40 text-sm">Enter your email to receive reminders when your posts are generated and ready to go.</p>
              
              <div className="text-left space-y-4">
                <div>
                  <label className="block text-sm font-bold text-white/60 mb-2 uppercase tracking-wider">Reminder Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium">Enable reminders</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.remindersEnabled}
                    onChange={(e) => setFormData({ ...formData, remindersEnabled: e.target.checked })}
                    className="w-5 h-5 rounded border-white/20 bg-transparent text-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white/60 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleFinish}
                className="flex-[2] py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold transition-all shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2"
              >
                Launch Dashboard <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[#0a0a0f] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 rounded-2xl mb-4">
            {step === 1 && <Sparkles className="w-6 h-6 text-purple-400" />}
            {step === 2 && <Clock className="w-6 h-6 text-cyan-400" />}
            {step === 3 && <CheckCircle2 className="w-6 h-6 text-green-400" />}
          </div>
          <h2 className="text-3xl font-bold font-outfit mb-2">Build Your Presence</h2>
          <p className="text-white/40 text-sm">Step {step} of 3</p>
          
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/5 rounded-full mt-6 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
              initial={{ width: '33%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <motion.div
          className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 to-cyan-500/50 opacity-20" />
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
