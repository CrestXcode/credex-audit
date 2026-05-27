import AuditForm from '@/components/AuditForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-white font-semibold text-sm">AI Spend Audit</span>
        </div>
        <span className="text-gray-500 text-xs">Free — no signup required</span>
      </div>

      {/* Hero */}
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-8 text-center">
        <div className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full mb-6">
          Free AI spend audit
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
          Stop guessing what your<br />AI tools actually cost
        </h1>
        <p className="text-gray-400 text-lg mb-4">
          Add your tools below. Get an instant audit showing exactly where you're overpaying and how to fix it.
        </p>
        <p className="text-gray-600 text-sm">
          No signup. No credit card. Takes 2 minutes.
        </p>
      </div>

      {/* Form */}
      <AuditForm />

      {/* Footer */}
      <div className="text-center py-8 text-gray-700 text-xs">
        Built for startup founders and engineering teams.
        Powered by <a href="https://credex.rocks" className="text-gray-600 hover:text-gray-500">Credex</a>.
      </div>
    </main>
  )
}
