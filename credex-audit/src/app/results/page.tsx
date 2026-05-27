'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuditFormData, AuditResult } from '@/types/audit'
import { runAudit } from '@/lib/auditEngine'
import { TOOL_LABELS } from '@/data/plans'
import LeadCapture from '@/components/LeadCapture'

const STORAGE_KEY = 'credex-audit-form'

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<AuditResult | null>(null)
  const [emailCaptured, setEmailCaptured] = useState(false)
  const [summary, setSummary] = useState('')
  const [summaryLoading, setSummaryLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) { router.push('/'); return }
    const form: AuditFormData = JSON.parse(saved)
    setResult(runAudit(form))
  }, [router])

  if (!result) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-white text-xl">Calculating your audit...</p>
    </div>
  )

  const isHighSavings = result.totalMonthlySavings > 500
  const isOptimal = result.totalMonthlySavings === 0

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-center">
          {isOptimal ? (
            <>
              <div className="text-lg font-semibold text-blue-100 mb-3 uppercase tracking-wide">Optimal</div>
              <h1 className="text-2xl font-bold text-white mb-2">You're spending well!</h1>
              <p className="text-blue-200">Your current AI stack looks optimised. No major savings found.</p>
            </>
          ) : (
            <>
              <p className="text-blue-200 mb-2">Potential Monthly Savings</p>
              <h1 className="text-6xl font-bold text-white mb-2">
                ${result.totalMonthlySavings.toFixed(0)}
              </h1>
              <p className="text-blue-200 text-lg">
                ${result.totalAnnualSavings.toFixed(0)}/year — just by optimising your AI stack
              </p>
            </>
          )}
        </div>
            {/* AI Summary */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-3">AI Analysis</h2>
          {summaryLoading ? (
          <div className="animate-pulse space-y-2">
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6"></div>
    </div>
  ) : (
    <p className="text-gray-300 leading-relaxed">{summary}</p>
  )}
</div>
        {/* Per Tool Recommendations */}
        <h2 className="text-white font-semibold text-xl mb-4">Per Tool Breakdown</h2>
        <div className="space-y-4 mb-8">
          {result.recommendations.map((rec, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-semibold">{TOOL_LABELS[rec.tool]}</h3>
                {rec.monthlySavings > 0 ? (
                  <span className="bg-green-500/20 text-green-400 text-sm px-3 py-1 rounded-full font-medium">
                    Save ${rec.monthlySavings.toFixed(0)}/mo
                  </span>
                ) : (
                  <span className="bg-gray-700 text-gray-400 text-sm px-3 py-1 rounded-full">
                    Optimal
                  </span>
                )}
              </div>
              <p className="text-blue-400 font-medium text-sm mb-1">
                → {rec.recommendedAction}
              </p>
              <p className="text-gray-400 text-sm">{rec.reason}</p>
            </div>
          ))}
        </div>

        {/* Lead Capture — shown before Credex CTA */}
        {!emailCaptured ? (
          <LeadCapture result={result} onSuccess={() => setEmailCaptured(true)} />
        ) : (
          <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-8 text-center">
            <p className="text-green-400 font-medium">Report saved! We'll be in touch.</p>
          </div>
        )}

        {/* Credex CTA for high savings */}
        {isHighSavings && (
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6 mb-8 text-center">
            <h3 className="text-yellow-400 font-bold text-xl mb-2">
              💰 You could save ${result.totalMonthlySavings.toFixed(0)}/mo
            </h3>
            <p className="text-gray-300 mb-4">
              Credex sources discounted AI credits from companies that overforecast.
              Book a free consultation to capture even more savings.
            </p>
            <a
              href="https://credex.rocks"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl inline-block"
            >
              Book Free Credex Consultation →
            </a>
          </div>
        )}

        {/* Optimal CTA */}
        {isOptimal && emailCaptured && (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-8 text-center">
            <p className="text-gray-300">
              We'll notify you when new optimisations apply to your stack. 
            </p>
          </div>
        )}

        {/* Back button */}
        <button
          onClick={() => router.push('/')}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Edit my tools
        </button>

      </div>
    </main>
  )
}
