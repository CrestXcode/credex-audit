'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuditFormData, ToolEntry, ToolName, UseCase } from '@/types/audit'
import { TOOL_PLANS, TOOL_LABELS } from '@/data/plans'

const STORAGE_KEY = 'credex-audit-form'

const DEFAULT_FORM: AuditFormData = {
  tools: [],
  teamSize: 1,
  useCase: 'mixed',
}

export default function AuditForm() {
  const router = useRouter()
  const [form, setForm] = useState<AuditFormData>(DEFAULT_FORM)
  const [selectedTool, setSelectedTool] = useState<ToolName>('cursor')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setForm(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
  }, [form])

  const addTool = () => {
    if (form.tools.find(t => t.tool === selectedTool)) return
    const newEntry: ToolEntry = {
      tool: selectedTool,
      plan: TOOL_PLANS[selectedTool][0],
      monthlySpend: 0,
      seats: 1,
    }
    setForm(prev => ({ ...prev, tools: [...prev.tools, newEntry] }))
  }

  const updateTool = (index: number, field: keyof ToolEntry, value: string | number) => {
    setForm(prev => {
      const tools = [...prev.tools]
      tools[index] = { ...tools[index], [field]: value }
      return { ...prev, tools }
    })
  }

  const removeTool = (index: number) => {
    setForm(prev => ({ ...prev, tools: prev.tools.filter((_, i) => i !== index) }))
  }

  const handleSubmit = () => {
    router.push('/results')
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-2">AI Spend Audit</h1>
      <p className="text-gray-400 mb-8">Find out where you're overspending on AI tools.</p>

      {/* Add Tool */}
      <div className="flex gap-3 mb-6">
        <select
          value={selectedTool}
          onChange={e => setSelectedTool(e.target.value as ToolName)}
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
        >
          {Object.entries(TOOL_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <button
          onClick={addTool}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          + Add Tool
        </button>
      </div>

      {/* Tool List */}
      {form.tools.length === 0 && (
        <p className="text-gray-500 text-center py-8">Add your first AI tool above ↑</p>
      )}

      {form.tools.map((entry, index) => (
        <div key={entry.tool} className="bg-gray-800 rounded-xl p-4 mb-4 border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold">{TOOL_LABELS[entry.tool]}</h3>
            <button onClick={() => removeTool(index)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Plan</label>
              <select
                value={entry.plan}
                onChange={e => updateTool(index, 'plan', e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm border border-gray-600"
              >
                {TOOL_PLANS[entry.tool].map(plan => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Monthly Spend ($)</label>
              <input
                type="number"
                value={entry.monthlySpend || ''}
                onChange={e => updateTool(index, 'monthlySpend', parseFloat(e.target.value) || 0)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm border border-gray-600"
                min={0}
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Seats</label>
              <input
                type="number"
                value={entry.seats || ''}
                onChange={e => updateTool(index, 'seats', parseInt(e.target.value) || 1)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm border border-gray-600"
                min={1}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Team Info */}
      {form.tools.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-3">About Your Team</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Team Size</label>
              <input
                type="number"
                value={form.teamSize}
                onChange={e => setForm(prev => ({ ...prev, teamSize: parseInt(e.target.value) || 1 }))}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm border border-gray-600"
                min={1}
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Primary Use Case</label>
              <select
                value={form.useCase}
                onChange={e => setForm(prev => ({ ...prev, useCase: e.target.value as UseCase }))}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm border border-gray-600"
              >
                <option value="coding">Coding</option>
                <option value="writing">Writing</option>
                <option value="data">Data</option>
                <option value="research">Research</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      {form.tools.length > 0 && (
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg"
        >
          Run My Audit →
        </button>
      )}
    </div>
  )
}
