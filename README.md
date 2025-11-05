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

//..........................................//
🧩 NextSphere Concierge AI – YAML Engine v1 (Deployed ✅)

Data: 2025-11-04
Ambito: NextSphere Beyond / Concierge AI / Admin

Stato tecnico:

Backend Fastify su Render (https://api.svapartments.it)

Frontend/widget React su Vercel (https://widget.svapartments.it)

Sistema multistruttura attivo → /chat/:structureId

YAML loader e engine completati:

parsing e validazione dei file YAML

intent matching (exact, keyword, regex, fuzzy)

template rendering con variabili ({{wifi.ssid}}, ecc.)

fallback contestuale multilingua

Test PowerShell e via widget entrambi superati (Wi-Fi, check-in, fallback)

Deploy stabile con pipeline GitHub → Render/Vercel

Config: threshold 0.65, output reply: out.text

Debug e code leftovers rimossi