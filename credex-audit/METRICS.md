# Metrics

## North Star Metric

**Audits completed per week**

Why: An audit completion means a user saw real value — they inputted their stack and got a result. It's the moment value is delivered. Everything else (email captures, Credex consultations, credit purchases) flows downstream from this. A user who doesn't complete an audit can't convert to anything.

Not "visits" because visits don't indicate value delivered.
Not "email captures" because that's a downstream metric — optimising for it directly leads to dark patterns like gating before results.
Not "Credex consultations" because that's too far downstream to be actionable daily.

## 3 Input Metrics That Drive the North Star

1. **Form completion rate** (started audit / completed audit)
   - If this drops, the form is too long or confusing
   - Target: above 60%

2. **Landing page to audit start rate** (visited / clicked start)
   - If this drops, the headline or CTA isn't working
   - Target: above 40%

3. **Returning audit rate** (users who run a second audit)
   - Indicates the tool is trusted enough to use again after plan changes
   - Target: above 15% monthly

## What to Instrument First

1. Audit completion event — most important single event
2. Form abandonment by step — which tool/field causes drop-off
3. Email capture conversion rate — what % of completions submit email
4. High savings rate — what % of audits show more than $500/mo savings
5. Share URL clicks — are users actually sharing results

## Pivot Trigger

If after 500 audits:
- Email capture rate is below 20% → the value shown is not compelling enough, rethink results page
- High savings rate is below 15% → audit engine rules are too conservative, recalibrate pricing logic
- Credex consultation booking rate is below 5% of high-savings audits → Credex CTA placement or messaging needs rework
- Average savings shown is below $50/mo → wrong audience, targeting too many free-tier users
