# AI Spend Audit

A free web app that audits your team's AI tool spending and surfaces where you're overpaying — built as a lead-generation asset for [Credex](https://credex.rocks).

**Who it's for:** Startup founders and engineering managers paying for AI tools like Cursor, Claude, ChatGPT, and GitHub Copilot who want to know if they're on the right plans.

**Live URL:** https://credix-audit.vercel.app

---

## Screenshots

> Add 3 screenshots here before submission

---

## Quick Start

```bash
git clone https://github.com/CrestXCode/credex-audit.git
cd credex-audit/credex-audit
npm install
cp .env.local.example .env.local
# Fill in your env variables
npm run dev
```

## Environment Variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_key_here

---

## Decisions

1. **Hardcoded rules over AI for audit logic** — The assignment explicitly said "knowing when not to use AI is part of the test." Audit math needs to be deterministic and defensible to a finance person. AI-generated savings numbers would be unpredictable and hard to verify. Hardcoded rules with cited pricing data is the right call.

2. **Next.js over plain React** — Next.js gives us API routes (for Anthropic summary and Supabase saves), server-side rendering for the shared audit pages, and built-in OG tag support. All of these are MVP requirements. Plain React would have required a separate backend.

3. **Supabase over Firebase** — Supabase is Postgres under the hood, has a generous free tier, and the team already has experience with it (Study Buddy AI). Row Level Security policies let us expose the anon key safely in the frontend.

4. **Email gate after results, never before** — Showing value first before asking for email is the right product decision. Users who see their savings number are far more likely to convert. Gating before results would kill conversion.

5. **Fallback for Anthropic API** — API calls can fail. Rather than showing an error state, we fall back to a templated summary. The product still works end-to-end even if the AI summary fails.

---

## Deployment

Deployed on Vercel. Auto-deploys on every push to main.
