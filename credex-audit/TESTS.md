# Tests

## Running Tests

```bash
cd credex-audit
npm test
```

## Test File

`src/__tests__/auditEngine.test.ts`

## Test Coverage

| Test | What it covers |
|------|---------------|
| Cursor Business with 2 seats recommends downgrade to Pro | Small team overpaying for Business plan |
| Claude Max with 3 seats recommends Team plan | Team plan more cost effective at scale |
| ChatGPT Pro for coding use case recommends downgrade to Team | Pro plan overkill for non-research |
| Total monthly savings equals sum of individual tool savings | Aggregation logic correctness |
| Annual savings is exactly 12x monthly savings | Annual calculation correctness |
| Windsurf Max with 2 seats recommends Teams plan | Multi-seat Max plan detection |
| GitHub Copilot Free returns zero savings | Already optimal returns no savings |

## CI

Tests run automatically on every push to main via `.github/workflows/ci.yml`

Latest status: ![CI](https://github.com/CrestXCode/credex-audit/actions/workflows/ci.yml/badge.svg)
