# Reflection

## 1. The Hardest Bug

The hardest bug this week was the Vercel 404 error that persisted for almost two full days. Every time I deployed, the entire app showed `404: NOT_FOUND` — not just the dynamic route, but even the homepage. I ran multiple bash commands, checked build logs, verified environment variables, deleted and recreated the Vercel project twice, and every time the build logs showed the routes compiling correctly including `/audit/[id]`. Everything at the backend was correct so it felt strange.

My hypotheses in order:
- Missing environment variables → added all three, still 404
- Wrong project connected to repo → created fresh project, still 404
- Dynamic route `[id]` folder name issue → verified git ls-files showed it correctly
- Next.js 15 params async issue → fixed params to be awaited, still 404
- Corrupted anchor tags breaking the build → fixed in VS Code, still 404

What actually fixed it was embarrassingly simple. When creating a new Vercel project, there's a Root Directory selector that shows two options — the repo root and the `credex-audit` subfolder. I had been selecting the repo root every time instead of the subfolder with the Next.js icon next to it. The subfolder was never being deployed. Once I selected the correct `credex-audit` directory with the Next.js indicator, everything worked immediately including the shareable URLs.

The lesson: when debugging, check the most obvious configuration settings first before diving into code. I spent hours on code fixes when the issue was a single click in a UI dropdown.

---

## 2. A Decision I Reversed Mid-Week

I planned to polish the UI starting from Day 2 — better animations, improved colour palette, more visual hierarchy. But I stopped myself mid-week and reversed that plan entirely.

The reasoning: if the audit logic isn't working correctly, a beautiful UI just wraps a broken product. I had already caught a critical bug where plan names in `plans.ts` didn't match the audit engine — every tool was showing "optimal" regardless of input. That bug would have been invisible behind a polished UI and I might have submitted a great-looking tool that gave wrong answers.

So I made the call: logic first, UI last. Get the audit engine defensible and accurate, get the data flow working end-to-end, get Supabase and the API connected — then polish if time remains.

This turned out to be the right call. The audit logic is now genuinely defensible with number-backed reasoning for every recommendation. I still plan to do UI polish today before submission.

---

## 3. What I Would Build in Week 2

If I had another week I wouldn't just add features — I'd do more research first. I'd talk to 10 more founders and engineering managers to understand what they actually want from a tool like this, not what I assume they want.

Based on what I'd learn, I'd likely build:

- **Benchmark mode** — "your AI spend per developer is $X, companies your size average $Y." This came up indirectly in user interviews — people want context, not just absolute numbers.
- **Team sharing** — let a developer share the audit with their CTO in one click, with a "request a review" CTA
- **Savings tracker** — if a user comes back after switching plans, show them how much they've actually saved since their first audit
- **More tools** — KiloAI came up in user interviews as a top tool I hadn't heard of. The long tail of AI tools matters to real users.
- **API overspend detection** — teams using Anthropic or OpenAI APIs directly have no visibility into their per-feature costs. A token usage analyser would be high value.

---

## 4. How I Used AI Tools

I used Claude (via claude.ai) throughout the week as my primary coding assistant. I used it for writing component code, setting up the project structure, debugging error messages, and writing the audit engine rules.

What I brought to every interaction: the actual pricing data (I verified every number on official vendor pages myself), the user interview insights, the product decisions, and the architectural direction. Claude doesn't know what Credex wants or what my users said — I provided that context in every prompt.

What I didn't trust Claude with: the user interviews (those required real human conversations), pricing data accuracy (I verified every number independently), and final judgment calls on what features to prioritise.

On working together: there was never a moment where Claude gave me completely wrong code, but there were several times it slipped on details — plan name strings that didn't match between files, anchor tags that got stripped by heredoc commands, and once it suggested a Next.js params pattern that was outdated for version 15. I caught these because I was reading the code and testing it, not just copy-pasting blindly. We worked as a team — Claude wrote fast, I verified and corrected.

---

## 5. Self-Rating

**Discipline: 8/10**
Committed every single day including exam day. Managed a DMDW university exam on Day 6 and still shipped code every day of the 7-day window. Could have been higher but exam prep took legitimate time away from the project.

**Code quality: 7/10**
TypeScript used throughout, sensible abstractions, audit engine is cleanly separated from UI. Lost points because the codebase has some rough edges from late-night debugging sessions and the heredoc anchor tag issue created messy commit history.

**Design sense: 6/10**
Dark theme is clean and consistent. Results page looks like a real product. But I didn't get to the UI polish I planned — typography hierarchy could be stronger and the form could be more guided. Functional but not beautiful.

**Problem-solving: 7/10**
Solved every blocker except spent too long on the Vercel 404 before realising it was a configuration issue. Better systematic debugging from the start would have saved 3-4 hours.

**Entrepreneurial thinking: 7/10**
Conducted real user interviews that genuinely changed my design decisions. Wrote GTM and economics with specific numbers and real reasoning. The insight that solo builders aren't the target user — teams with multi-seat plans are — came directly from user conversations and sharpened the whole product positioning.
