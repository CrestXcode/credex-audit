import { runAudit } from '@/lib/auditEngine'
import { AuditFormData } from '@/types/audit'

// Test 1: Cursor Business with small team should recommend downgrade
test('Cursor Business with 2 seats recommends downgrade to Pro', () => {
  const form: AuditFormData = {
    tools: [{ tool: 'cursor', plan: 'Business', monthlySpend: 80, seats: 2 }],
    teamSize: 2,
    useCase: 'coding',
  }
  const result = runAudit(form)
  expect(result.recommendations[0].monthlySavings).toBeGreaterThan(0)
  expect(result.recommendations[0].recommendedAction).toContain('Pro')
})

// Test 2: Claude Max with large team should recommend Team plan
test('Claude Max with 3 seats recommends Team plan', () => {
  const form: AuditFormData = {
    tools: [{ tool: 'claude', plan: 'Max', monthlySpend: 300, seats: 3 }],
    teamSize: 3,
    useCase: 'mixed',
  }
  const result = runAudit(form)
  expect(result.recommendations[0].monthlySavings).toBeGreaterThan(0)
  expect(result.recommendations[0].recommendedAction).toContain('Team')
})

// Test 3: ChatGPT Pro for non-research should recommend downgrade
test('ChatGPT Pro for coding use case recommends downgrade to Team', () => {
  const form: AuditFormData = {
    tools: [{ tool: 'chatgpt', plan: 'Pro', monthlySpend: 200, seats: 1 }],
    teamSize: 1,
    useCase: 'coding',
  }
  const result = runAudit(form)
  expect(result.recommendations[0].monthlySavings).toBeGreaterThan(0)
  expect(result.recommendations[0].recommendedAction).toContain('Team')
})

// Test 4: Total savings is sum of all tool savings
test('Total monthly savings equals sum of individual tool savings', () => {
  const form: AuditFormData = {
    tools: [
      { tool: 'cursor', plan: 'Business', monthlySpend: 80, seats: 2 },
      { tool: 'claude', plan: 'Max', monthlySpend: 300, seats: 3 },
    ],
    teamSize: 3,
    useCase: 'coding',
  }
  const result = runAudit(form)
  const expected = result.recommendations.reduce(
    (sum, r) => sum + Math.max(r.monthlySavings, 0), 0
  )
  expect(result.totalMonthlySavings).toBe(expected)
})

// Test 5: Annual savings is 12x monthly savings
test('Annual savings is exactly 12x monthly savings', () => {
  const form: AuditFormData = {
    tools: [{ tool: 'cursor', plan: 'Business', monthlySpend: 80, seats: 2 }],
    teamSize: 2,
    useCase: 'coding',
  }
  const result = runAudit(form)
  expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12)
})

// Test 6: Windsurf Max with multiple seats recommends Teams
test('Windsurf Max with 2 seats recommends Teams plan', () => {
  const form: AuditFormData = {
    tools: [{ tool: 'windsurf', plan: 'Max', monthlySpend: 400, seats: 2 }],
    teamSize: 2,
    useCase: 'coding',
  }
  const result = runAudit(form)
  expect(result.recommendations[0].monthlySavings).toBeGreaterThan(0)
  expect(result.recommendations[0].recommendedAction).toContain('Teams')
})

// Test 7: Already optimal plan returns zero savings
test('GitHub Copilot Free returns zero savings', () => {
  const form: AuditFormData = {
    tools: [{ tool: 'github-copilot', plan: 'Free', monthlySpend: 0, seats: 1 }],
    teamSize: 1,
    useCase: 'coding',
  }
  const result = runAudit(form)
  expect(result.totalMonthlySavings).toBe(0)
})
