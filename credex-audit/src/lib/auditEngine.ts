import { AuditFormData, AuditResult, ToolRecommendation, ToolName } from '@/types/audit'

// ── Pricing table (USD/user/month) ──────────────────────────────────────────
const PRICING: Record<string, Record<string, number>> = {
  cursor: { Hobby: 0, Pro: 20, Business: 40 },
  'github-copilot': { Free: 0, Pro: 10, 'Pro+': 39 },
  claude: { Free: 0, Pro: 17, Max: 100, Team: 20 },
  chatgpt: { Free: 0, Plus: 20, Team: 25, Pro: 200 },
  'anthropic-api': { API: 0 },
  'openai-api': { API: 0 },
  gemini: { Free: 0, Pro: 19.99 },
  windsurf: { Free: 0, Pro: 20, Max: 200, Teams: 40 },
}

// ── Audit rules ──────────────────────────────────────────────────────────────
function auditTool(
  tool: ToolName,
  plan: string,
  monthlySpend: number,
  seats: number,
  teamSize: number,
  useCase: string
): ToolRecommendation {
  const pricePerSeat = PRICING[tool]?.[plan] ?? monthlySpend / Math.max(seats, 1)
  const totalSpend = pricePerSeat * seats

  // Default: already optimal
  let recommendation: ToolRecommendation = {
    tool,
    currentSpend: monthlySpend || totalSpend,
    recommendedAction: 'No change needed',
    monthlySavings: 0,
    reason: 'You are on the right plan for your usage.',
  }

  // ── Cursor rules ────────────────────────────────────────────────────────
  if (tool === 'cursor') {
    if (plan === 'Business' && seats <= 3) {
      const savings = (PRICING.cursor.Business - PRICING.cursor.Pro) * seats
      recommendation = {
        tool, currentSpend: monthlySpend || totalSpend,
        recommendedAction: 'Downgrade to Cursor Pro',
        monthlySavings: savings,
        reason: `Business plan is designed for larger teams. With ${seats} seat(s), Pro at $20/user saves $${savings}/mo with no meaningful feature loss for small teams.`,
      }
    }
    if (plan === 'Pro' && useCase === 'writing') {
      recommendation = {
        tool, currentSpend: monthlySpend || totalSpend,
        recommendedAction: 'Switch to Claude Pro or ChatGPT Plus',
        alternativeTool: 'claude',
        alternativePlan: 'Pro',
        monthlySavings: (20 - 17) * seats,
        reason: `Cursor is optimised for coding. For writing use cases, Claude Pro at $17/user offers better value with superior long-form writing capability.`,
      }
    }
  }

  // ── GitHub Copilot rules ────────────────────────────────────────────────
  if (tool === 'github-copilot') {
    if (plan === 'Pro+' && useCase !== 'coding') {
      const savings = (PRICING['github-copilot']['Pro+'] - PRICING['github-copilot'].Pro) * seats
      recommendation = {
        tool, currentSpend: monthlySpend || totalSpend,
        recommendedAction: 'Downgrade to GitHub Copilot Pro',
        monthlySavings: savings,
        reason: `Pro+ at $39/user is justified only for heavy coding workflows needing GPT-4o and Claude Sonnet access. For non-coding use cases, Pro at $10/user covers all core features.`,
      }
    }
    if (plan === 'Pro+' && seats >= 5) {
      recommendation = {
        tool, currentSpend: monthlySpend || totalSpend,
        recommendedAction: 'Evaluate Cursor Business instead',
        alternativeTool: 'cursor',
        alternativePlan: 'Business',
        monthlySavings: (PRICING['github-copilot']['Pro+'] - PRICING.cursor.Business) * seats,
        reason: `At ${seats} seats, Cursor Business at $40/user offers deeper IDE integration and better autocomplete than Copilot Pro+ at $39/user, with similar cost but higher productivity ROI for coding teams.`,
      }
    }
  }

  // ── Claude rules ────────────────────────────────────────────────────────
  if (tool === 'claude') {
    if (plan === 'Max' && seats >= 3) {
      const savings = (PRICING.claude.Max - PRICING.claude.Team) * seats
      recommendation = {
        tool, currentSpend: monthlySpend || totalSpend,
        recommendedAction: 'Switch to Claude Team plan',
        monthlySavings: savings,
        reason: `Claude Max at $100/user is for power users needing 5x usage limits. For teams of ${seats}+, Team at $20/user provides higher limits than Pro with centralised billing, saving $${savings}/mo.`,
      }
    }
    if (plan === 'Pro' && seats >= 5) {
      const savings = (PRICING.claude.Pro - PRICING.claude.Team) * seats
      recommendation = {
        tool, currentSpend: monthlySpend || totalSpend,
        recommendedAction: 'Switch to Claude Team plan',
        monthlySavings: Math.max(savings, 0),
        reason: `With ${seats} seats, Claude Team at $20/user gives you higher usage limits, admin controls, and priority access — better value than individual Pro plans at scale.`,
      }
    }
  }

  // ── ChatGPT rules ───────────────────────────────────────────────────────
  if (tool === 'chatgpt') {
    if (plan === 'Pro' && useCase !== 'research') {
      const savings = (PRICING.chatgpt.Pro - PRICING.chatgpt.Team) * seats
      recommendation = {
        tool, currentSpend: monthlySpend || totalSpend,
        recommendedAction: 'Downgrade to ChatGPT Team',
        monthlySavings: savings,
        reason: `ChatGPT Pro at $200/user includes unlimited o1 access, mainly valuable for deep research workflows. For ${useCase} use cases, Team at $25/user covers GPT-4o with no meaningful loss.`,
      }
    }
    if (plan === 'Plus' && seats >= 3) {
      const savings = (PRICING.chatgpt.Team - PRICING.chatgpt.Plus) * seats
      recommendation = {
        tool, currentSpend: monthlySpend || totalSpend,
        recommendedAction: 'Upgrade to ChatGPT Team',
        monthlySavings: -savings, // costs more but worth it
        reason: `With ${seats} seats on Plus, Team plan adds admin controls, no data training, and higher limits. The $5/user premium is worth it for business use.`,
      }
    }
  }

  // ── Gemini rules ────────────────────────────────────────────────────────
  if (tool === 'gemini') {
    if (plan === 'Pro' && (useCase === 'coding')) {
      recommendation = {
        tool, currentSpend: monthlySpend || totalSpend,
        recommendedAction: 'Switch to Cursor Pro for coding',
        alternativeTool: 'cursor',
        alternativePlan: 'Pro',
        monthlySavings: (PRICING.gemini.Pro - PRICING.cursor.Pro) * seats,
        reason: `Gemini Pro at $19.99/user is a general AI assistant. For coding specifically, Cursor Pro at $20/user provides IDE-native autocomplete, chat, and agent mode — far superior for engineering workflows.`,
      }
    }
  }

  // ── Windsurf rules ──────────────────────────────────────────────────────
  if (tool === 'windsurf') {
    if (plan === 'Max' && seats >= 2) {
      const savings = (PRICING.windsurf.Max - PRICING.windsurf.Teams) * seats
      recommendation = {
        tool, currentSpend: monthlySpend || totalSpend,
        recommendedAction: 'Switch to Windsurf Teams',
        monthlySavings: savings,
        reason: `Windsurf Max at $200/user is for individual power users. Teams plan at $40/user includes collaboration features and is far more cost-effective at ${seats}+ seats.`,
      }
    }
  }

  return recommendation
}

// ── Main engine function ─────────────────────────────────────────────────────
export function runAudit(form: AuditFormData): AuditResult {
  const recommendations = form.tools.map(entry =>
    auditTool(
      entry.tool,
      entry.plan,
      entry.monthlySpend,
      entry.seats,
      form.teamSize,
      form.useCase
    )
  )

  const totalMonthlySavings = recommendations.reduce(
    (sum, r) => sum + Math.max(r.monthlySavings, 0), 0
  )

  return {
    id: crypto.randomUUID(),
    formData: form,
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    createdAt: new Date().toISOString(),
  }
}
