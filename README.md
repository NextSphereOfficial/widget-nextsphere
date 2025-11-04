# NextSphere – Admin

Backend e widget di supporto per il progetto **NextSphere Concierge AI**, integrato con l’infrastruttura **svapartments.it**.

## 📦 Architettura
Monorepo gestito con **pnpm**, composto da:
- **apps/api** → backend Fastify (Render) → [`https://api.svapartments.it`](https://api.svapartments.it)
- **apps/widget** → widget React/Vite (Vercel) → [`https://widget.svapartments.it`](https://widget.svapartments.it)
- **apps/admin** → (in sviluppo) interfaccia per gestori e multi-tenant

---

## 🚀 Endpoints principali
| Metodo | Path | Descrizione |
|--------|------|-------------|
| `GET` | `/health` | Stato API, uptime e timestamp (supporta anche `HEAD` per UptimeRobot). |
| `GET` | `/version` | Informazioni su release, commit e boot time. |
| `POST` | `/chat` | Endpoint GPT (backend) collegato al widget. |
| `GET` | `/metrics` | (facoltativo) metriche interne per monitoring. |

Esempio:
```bash
curl https://api.svapartments.it/health
# {"status":"ok","uptimeSec":...,"timestamp":"..."}

✅ Fix Issues – Routing / CORS / Fallback (chiusura)

Data: 2025-11-04
Progetto: NextSphere Concierge AI
Responsabile: Sam

Modifiche principali:

🧱 Rimossa cartella duplicata /api → mantenuto solo /apps/api

🔐 Aggiornati plugin cors.ts e security.ts con allowlist e CSP corretti

🌐 CORS validati in locale e in produzione (preflight 204 + POST 200)

🧭 chatClient.ts riscritto con:

fallback sicuro svapartments su link corto

risoluzione robusta di VITE_API_URL

rimozione completa del contesto NS001

⚙️ vercel.json aggiornato con CSP report-only

🧪 Verifica completata:

https://widget.svapartments.it/?structure=svapartments&room=101 → ✅ /chat/svapartments

https://widget.svapartments.it/ → ✅ /chat/svapartments

🧾 Sistema ora coerente, stabile e allineato tra Render e Vercel