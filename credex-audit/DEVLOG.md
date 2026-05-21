# DEVLOG

## Day 1 — 2026-05-20
**Hours worked:** 2
**What I did:** Initialized Next.js project with TypeScript and Tailwind, pushed to GitHub, deployed to Vercel. Fixed multiple blockers — wrong directory, GitHub PAT auth, Vercel root directory config. Added placeholder landing page. Created TypeScript types and tool plans data structure. Built AuditForm component with localStorage persistence — live on Vercel.
**What I learned:** GitHub no longer accepts passwords for CLI — need Personal Access Token. Vercel needs Root Directory set correctly when project is in a subfolder. Deployment-specific URLs differ from the permanent project URL.
**Blockers / what I'm stuck on:** Several setup issues took longer than expected but all resolved.
**Plan for tomorrow:** Build pricing data, audit engine logic, and tests.

## Day 2 — 2026-05-21
**Hours worked:** 2
**What I did:** Added verified pricing data for all 8 tools in PRICING_DATA.md with official source URLs. Built the core audit engine in TypeScript with per-tool recommendation logic covering Cursor, GitHub Copilot, Claude, ChatGPT, Gemini and Windsurf. Wrote 7 tests for the audit engine — all passing. Added GitHub Actions CI workflow.
**What I learned:** Pricing varies significantly by region (INR vs USD) — standardized to USD for global consistency. Audit logic needs to be defensible — every recommendation needs a number-backed reason, not just a gut feeling.
**Blockers / what I'm stuck on:** Jest needed ts-node to parse TypeScript config — fixed by installing ts-node separately.
**Plan for tomorrow:** Build the audit results page UI. Connect the form to the engine and show recommendations on screen.
