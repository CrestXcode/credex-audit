'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { AuditResult } from '@/types/audit'

interface Props {
  result: AuditResult
  onSuccess: () => void
}

export default function LeadCapture({ result, onSuccess }: Props) {
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!email) { setError('Email is required'); return }
    if (!email.includes('@')) { setError('Please enter a valid email'); return }
    
    setLoading(true)
    setError('')

    try {
      const { error: dbError } = await supabase.from('leads').insert({
        email,
        company_name: companyName || null,
        role: role || null,
        team_size: result.formData.teamSize,
        total_monthly_savings: result.totalMonthlySavings,
        total_annual_savings: result.totalAnnualSavings,
        tools_audited: result.formData.tools,
      })

      if (dbError) throw dbError
      onSuccess()
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-8">
      <h3 className="text-white font-bold text-lg mb-1">Get your full report</h3>
      <p className="text-gray-400 text-sm mb-4">
        Enter your email to save this audit. We'll notify you when new optimisations apply to your stack.
      </p>

      {/* Honeypot — hidden from real users */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="space-y-3">
        <input
          type="email"
          placeholder="your@email.com *"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Company name (optional)"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Your role (optional)"
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 placeholder-gray-500"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl"
        >
          {loading ? 'Saving...' : 'Get My Report →'}
        </button>
      </div>
      <p className="text-gray-600 text-xs mt-3 text-center">
        No spam. Unsubscribe anytime. We don't sell your data.
      </p>
    </div>
  )
}
