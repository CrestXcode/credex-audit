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

## Day 3 — 2026-05-22
**Hours worked:** 3
**What I did:** Fixed critical bug — plan names in plans.ts didn't match audit engine causing all rules to silently fail. Added universal overpaying detection rule and free-plan billing check to engine. All 7 tests still passing. Built and connected results page — form now navigates to results on submit. Fixed audit engine to use actual spend vs expected spend comparison.
**What I learned:** Data consistency between files matters — a mismatch in plan name strings caused silent failures that were hard to spot. Always test with real inputs, not just unit tests.
**Blockers / what I'm stuck on:** Audit engine rules only cover explicit plan mismatches — edge cases like API overspend still need work.
**Plan for tomorrow:** Add Supabase lead capture, email confirmation via Resend, and shareable URL with OG tags.

## Day 4 — 2026-05-23
**Hours worked:** 3
**What I did:** Set up Supabase database with leads table and RLS policies. Built LeadCapture component with honeypot spam protection. Connected results page to lead capture flow — email shown after audit results, never before. Fixed supabase dependency missing from package.json. Added Supabase env variables to Vercel. Tested end-to-end — leads appearing in Supabase dashboard.
**What I learned:** npm install doesn't always save to package.json automatically — always verify with cat package.json. Vercel can have multiple projects connected to same repo which caused env variable confusion.
**Blockers / what I'm stuck on:** Two Vercel projects connected to same repo caused deployment confusion — resolved by adding env vars to correct project.
**Plan for tomorrow:** Exam eve — light work. Maybe shareable URL or small UI improvements. Full sprint on 26th post exam.
