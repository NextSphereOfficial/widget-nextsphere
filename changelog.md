# Changelog

## 2025-10-26
- Aggiunto plugin `system` con endpoint: `GET /health` e `GET /version`.
- CORS guidato da env (`ALLOWED_ORIGINS`), rate limit con flag (`ENABLE_RATE_LIMIT`).
- Security headers con `helmet` (flag `ENABLE_SECURITY_HEADERS`).
- CSP in modalità report-only + endpoint `POST /csp-report` (flag `ENABLE_CSP_REPORT_ONLY`).
- Integrazione Sentry opt-in (`SENTRY_DSN`, `SENTRY_TRACES_SAMPLE_RATE`).
- Aggiornato `.env.example` (posizionato in `apps/`).
