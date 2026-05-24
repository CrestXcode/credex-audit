import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { tools, totalMonthlySavings, totalAnnualSavings, useCase, teamSize } = await req.json()

    const toolsList = tools.map((t: { tool: string; plan: string; seats: number }) =>
      `${t.tool} (${t.plan}, ${t.seats} seat(s))`
    ).join(', ')

    const prompt = `You are an AI spend analyst. Write a concise 80-100 word personalized audit summary for a team.

Context:
- Tools being used: ${toolsList}
- Team size: ${teamSize}
- Primary use case: ${useCase}
- Potential monthly savings identified: $${totalMonthlySavings}
- Potential annual savings: $${totalAnnualSavings}

Write a direct, specific, encouraging summary. Mention their actual tools and savings. End with one actionable next step. Do not use bullet points. Write in second person ("your team", "you're").`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }],
    })

    const summary = message.content[0].type === 'text' ? message.content[0].text : ''

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Anthropic API error:', error)
    // Graceful fallback
    return NextResponse.json({
      summary: 'Your AI stack has been analysed. Based on your current tools and usage patterns, there are opportunities to optimise your spend. Review the recommendations below and consider switching plans or tools where suggested to capture your potential savings.'
    })
  }
}
