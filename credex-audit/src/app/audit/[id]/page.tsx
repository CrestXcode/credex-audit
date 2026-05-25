import { createClient } from '@supabase/supabase-js'
import { TOOL_LABELS } from '@/data/plans'
import { notFound } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const { data } = await supabase
    .from('audits')
    .select('total_monthly_savings, total_annual_savings')
    .eq('id', id)
    .single()

  if (!data) return { title: 'AI Spend Audit' }

  return {
    title: `Save $${data.total_monthly_savings}/mo on AI tools`,
    description: `This team could save $${data.total_annual_savings}/year by optimising their AI stack.`,
    openGraph: {
      title: `Save $${data.total_monthly_savings}/mo on AI tools`,
      description: `This team could save $${data.total_annual_savings}/year by optimising their AI stack.`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Save $${data.total_monthly_savings}/mo on AI tools`,
      description: `This team could save $${data.total_annual_savings}/year. Get your free AI spend audit.`,
    },
  }
}

export default async function SharedAuditPage({ params }: Props) {
  const { id } = await params
  const { data, error } = await supabase
    .from('audits')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  const recommendations = data.recommendations as Array<{
    tool: string
    recommendedAction: string
    monthlySavings: number
    reason: string
  }>

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-6">
          <span className="bg-blue-500/20 text-blue-400 text-sm px-4 py-2 rounded-full">
            Shared Audit Report
          </span>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-center">
          <p className="text-blue-200 mb-2">Potential Monthly Savings</p>
          <h1 className="text-6xl font-bold text-white mb-2">
            ${data.total_monthly_savings}
          </h1>
          <p className="text-blue-200 text-lg">
            ${data.total_annual_savings}/year just by optimising their AI stack
          </p>
        </div>

        <h2 className="text-white font-semibold text-xl mb-4">Per Tool Breakdown</h2>
        <div className="space-y-4 mb-8">
          {recommendations.map((rec, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-semibold">
                  {TOOL_LABELS[rec.tool] || rec.tool}
                </h3>
                {rec.monthlySavings > 0 ? (
                  <span className="bg-green-500/20 text-green-400 text-sm px-3 py-1 rounded-full">
                    Save ${rec.monthlySavings}/mo
                  </span>
                ) : (
                  <span className="bg-gray-700 text-gray-400 text-sm px-3 py-1 rounded-full">
                    Optimal
                  </span>
                )}
              </div>
              <p className="text-blue-400 font-medium text-sm mb-1">
                {rec.recommendedAction}
              </p>
              <p className="text-gray-400 text-sm">{rec.reason}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center">
          <h3 className="text-white font-bold text-lg mb-2">
            What does your AI stack cost?
          </h3>
          <p className="text-gray-400 mb-4">
            Get your own free audit in 2 minutes.
          </p>
          
            href="https://credix-audit.vercel.app"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl inline-block"
          >
            Get My Free Audit
          </a>
        </div>

      </div>
    </main>
  )
}
