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

## Day 5 — 2026-05-24
**Hours worked:** 1.5
**What I did:** Added Anthropic API summary endpoint with graceful fallback. Connected summary to results page with loading skeleton. Fixed build failure caused by missing anchor tag and corrupted arrow character in Credex CTA block. Results page now showing savings hero, AI analysis, per-tool breakdown all working end-to-end.
**What I learned:** Special characters like arrows can corrupt JSX builds — safer to use text or HTML entities. Always check build logs carefully.
**Blockers / what I'm stuck on:** Anthropic API summary showing fallback text — may need API key to fully activate.
**Plan for tomorrow:** Exam day — tiny commit only to keep streak.

## Day 6 — 2026-05-25
**Hours worked:** 3
**What I did:** Gave DMDW exam (went well!). Added shareable audit URL feature — each audit saved to Supabase with unique ID. Built shared audit page at /audit/[id] with OG tags for Twitter/social previews. Added Anthropic API key to Vercel. Fixed Next.js 15 params async compatibility issue. Fought recurring anchor tag corruption bug from heredoc commands.
**What I learned:** Next.js 15 requires params to be awaited in dynamic routes. heredoc cat commands strip angle brackets from JSX — always use VS Code for files with HTML tags.
**Blockers / what I'm stuck on:** Anchor tag kept getting stripped by terminal heredoc — fixed by editing in VS Code directly.
**Plan for tomorrow:** Write all markdown files (README, ARCHITECTURE, GTM, ECONOMICS, REFLECTION, USER_INTERVIEWS, LANDING_COPY, METRICS, PROMPTS, TESTS). Final polish and submit before 5:28pm.

## Day 7 — 2026-05-26
**Hours worked:** 3
**What I did:** Wrote markdown files (README, ARCHITECTURE, GTM, ECONOMICS, USER_INTERVIEWS, LANDING_COPY, PROMPTS, TESTS). Also fixed the root directory issue on Vercel which gave the 404 error for each and every deployment. Also fixed the shareable link error which had the dead link. Tried to polish everything and submit it by today but only some part is left such as REFLECTION file and some minor polishing.
**What I learned:** Awareness is a must as my root directory was wrong and the code was breaking on Vercel. I chose wrong directory so I can stop making silly mistakes. Everything was fine else.
**Blockers / what I'm stuck on:** Code was just breaking on Vercel everytime after each and every deployment and all the links were updated fine after.
**Plan for tomorrow:** Write the left markdown files and final polsihing and submit before 5:28pm.
