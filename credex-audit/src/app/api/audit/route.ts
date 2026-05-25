import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { data, error } = await supabase
      .from('audits')
      .insert({
        tools: body.tools,
        team_size: body.teamSize,
        use_case: body.useCase,
        total_monthly_savings: body.totalMonthlySavings,
        total_annual_savings: body.totalAnnualSavings,
        recommendations: body.recommendations,
      })
      .select('id')
      .single()

    if (error) throw error
    return NextResponse.json({ id: data.id })
  } catch (error) {
    console.error('Audit save error:', error)
    return NextResponse.json({ error: 'Failed to save audit' }, { status: 500 })
  }
}
