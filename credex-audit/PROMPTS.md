# Prompts

## Anthropic API Summary Prompt

### The Prompt
You are an AI spend analyst. Write a concise 80-100 word personalized audit summary for a team.
```
Context:

Tools being used: {toolsList}
Team size: {teamSize}
Primary use case: {useCase}
Potential monthly savings identified: ${totalMonthlySavings}
Potential annual savings: ${totalAnnualSavings}
```

Write a direct, specific, encouraging summary. Mention their actual tools and savings. End with one actionable next step. Do not use bullet points. Write in second person ("your team", "you're").

### Why I wrote it this way

- **Second person** — "your team" feels personal, not like a generic report
- **Mention actual tools** — forces the model to be specific, not generic
- **End with one actionable next step** — gives the user something to do immediately
- **No bullet points** — the UI already has a breakdown section. The summary should read as a paragraph, not repeat the breakdown
- **80-100 words** — long enough to feel substantive, short enough to actually be read

### What I tried that didn't work

- First version had no word limit — model wrote 300+ word essays that nobody would read
- Tried asking for "encouraging but honest" tone — model became sycophantic. Removed it.
- Tried including per-tool recommendations in the prompt — output became repetitive since the page already shows them

### Fallback

If the API fails, we show:
"Your AI stack has been analysed. Based on your current tools and usage patterns, there are opportunities to optimise your spend. Review the recommendations below and consider switching plans or tools where suggested to capture your potential savings."

This is intentionally generic so it works for any audit result without being wrong.
