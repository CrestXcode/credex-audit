export const TOOL_PLANS: Record<string, string[]> = {
  cursor: ['Hobby', 'Pro', 'Business', 'Enterprise'],
  'github-copilot': ['Individual', 'Business', 'Enterprise'],
  claude: ['Free', 'Pro', 'Max', 'Team', 'Enterprise', 'API'],
  chatgpt: ['Plus', 'Team', 'Enterprise', 'API'],
  'anthropic-api': ['API'],
  'openai-api': ['API'],
  gemini: ['Free', 'Pro', 'Ultra', 'API'],
  windsurf: ['Free', 'Pro', 'Teams', 'Enterprise'],
}

export const TOOL_LABELS: Record<string, string> = {
  cursor: 'Cursor',
  'github-copilot': 'GitHub Copilot',
  claude: 'Claude',
  chatgpt: 'ChatGPT',
  'anthropic-api': 'Anthropic API',
  'openai-api': 'OpenAI API',
  gemini: 'Gemini',
  windsurf: 'Windsurf',
}
