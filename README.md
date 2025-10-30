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
