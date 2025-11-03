# Changelog
Tutte le modifiche rilevanti a questo progetto saranno documentate in questo file.

Formato ispirato a [Keep a Changelog](https://keepachangelog.com/it-IT/1.0.0/) e versionamento semantico (SemVer).

## [v1.0.0] - 2025-10-30
### Added
- **Release iniziale stabile (MVP)** per NextSphere – Admin:
  - **Backend Fastify (Render)** online: `api.svapartments.it`
  - **Widget React/Vite (Vercel)** online: `widget.svapartments.it`
  - **CORS** ristretto con allowlist (widget prod + preview), **HSTS** (1 anno, includeSubDomains, preload), **Helmet**.
  - **Endpoint di sistema**:  
    - `GET /health` → `{"status":"ok", ...}` (supporta anche `HEAD` per UptimeRobot)  
    - `GET /version` → info versione, commit e uptime  
    - (facoltativo) `GET /metrics` → metriche/telemetria se abilitate
  - **Sentry** integrato su backend e widget (DSN configurati, sourcemap disabilitate in prod).
  - **UptimeRobot**: monitor HTTP/HTTPS + keyword su `/health`.
  - **Rate limit** globale + per-route e **validazione AJV** (JSON only).

### Changed
- **Build widget**: `VITE_COMMIT_SHA` inline da `VERCEL_GIT_COMMIT_SHA` via `vite.define`.
- **Proxy dev**: chiamate locali instradate su `/chat` → `localhost:8081`.
- **API**: guard JSON-only aggiornato per **permettere `GET/HEAD/OPTIONS`** (evita `415` sui monitor).

### Fixed
- **Mismatch route** tra widget e API (`/api/chat` vs `/chat`): normalizzato su **`/chat`** con base URL esplicita (`VITE_API_BASE`).
- **CORS** bloccante su domini non allowlist → aggiornato allowlist (prod + preview).
- **UptimeRobot 415 su HEAD /health** → consentiti `HEAD/OPTIONS`.

### Security
- **CSP** in modalità report-only (se attiva) e **Helmet** con HSTS.
- **Body limit** a 1MB e controllo `Content-Type: application/json` su metodi mutanti.

---

## Timeline Step principali
- **Step 1 – Sicurezza & Hardening**: completato
- **Step 2 – Uptime & Monitoraggio**: completato (UptimeRobot, Sentry)
- **Step 3 – Stabilità & Observability**: completato (endpoint `/version`, handler errori, build stabili)
- **Step 4 – Release & Maintenance**: **v1.0.0** tag pubblicato, verifiche esterne completate

---

## Note
- Tag Git: **`v1.0.0`**
- Ambiente di lavoro: Windows + VSCode (PowerShell)
- Monorepo con pnpm; deploy: **Render** (API) + **Vercel** (Widget)
