export type UseCase = 'coding' | 'writing' | 'data' | 'research' | 'mixed'

export type ToolName =
  | 'cursor'
  | 'github-copilot'
  | 'claude'
  | 'chatgpt'
  | 'anthropic-api'
  | 'openai-api'
  | 'gemini'
  | 'windsurf'

export interface ToolEntry {
  tool: ToolName
  plan: string
  monthlySpend: number
  seats: number
}

export interface AuditFormData {
  tools: ToolEntry[]
  teamSize: number
  useCase: UseCase
  email?: string
  companyName?: string
  role?: string
}

export interface ToolRecommendation {
  tool: ToolName
  currentSpend: number
  recommendedAction: string
  alternativeTool?: string
  alternativePlan?: string
  monthlySavings: number
  reason: string
}

export interface AuditResult {
  id: string
  formData: AuditFormData
  recommendations: ToolRecommendation[]
  totalMonthlySavings: number
  totalAnnualSavings: number
  summary?: string
  createdAt: string
}
