# NextSphere YAML Styleguide

> Versione: 1.0.0 · Ultimo aggiornamento: 2025‑11‑09 · Valido per **intents** e **structures**

Questo documento definisce regole **obbligatorie** di formattazione e convenzioni per tutti i file YAML del progetto (backend API, intents, structures). È progettato per lavorare in tandem con gli script `fmt:yaml`, `lint:yaml` e `check:content`.

---

## 1) Formattazione di base

* **Indentazione:** 2 spazi per livello. **Vietate** le tabulazioni.
* **Lunghezza riga:** ≤ 100 caratteri dove possibile.
* **Spaziature:**

  * Una riga vuota tra blocchi logici (es. tra `meta` e `intents`).
  * Nessuna riga vuota iniziale/finale.
* **Commenti:** usa `#` e frasi brevi; preferisci commenti **sopra** il blocco che descrivono.
* **Encoding:** UTF‑8 senza BOM.

## 2) Convenzioni sui nomi (chiavi e file)

* **Chiavi YAML:** `snake_case` minuscolo (`id`, `output_default`, `room_number`).
* **Intent IDs e Structure IDs:** `kebab-case` (`late-checkout`, `svapartments`).
* **File names:**

  * Intent: `apps/api/src/intents/<intent-id>.yaml` → es. `wifi.yaml`.
  * Structure: `apps/api/src/routes/structures/<structure-id>.yaml` → es. `svapartments.yaml`.

## 3) Ordine dei blocchi

L’ordine **obbligatorio** delle chiavi di primo livello è:

1. `id` *(solo per i file intent singoli, opzionale per structure)*
2. `meta`
3. `synonyms`
4. `keywords`
5. `patterns`
6. `negative`
7. `output`

Nei file **structure** l’albero radice è:

```yaml
meta:
  id: <structure-id>
  name: <PublicName>
  version: <semver>
  language: <it|en>
intents:
  <intent-id>:
    ... (stessa struttura degli intent)
```

## 4) Liste e stringhe

* **Liste:** sempre multilinea, trattini `- ` allineati. Evita liste inline.
* **Stringhe:**

  * Testo semplice: non quotare.
  * Testo con `:` o `#` o leading/trailing spazi: usa `"` doppi.
  * Multilinea: usa pipe `|` (mantiene a capo) o `>` (folded, unisce con spazi). Preferisci `|` per testi utente.
* **Booleane/Null:** usa `true`/`false`, `null` in minuscolo.
* **Numeri:** mai con zeri iniziali.

## 5) Output e varianti

Struttura consigliata per `output`:

```yaml
output:
  default: "…"
  short: "…"   # per widget/risposte concise
  long: |       # per risposte dettagliate
    …
  ui:
    buttons:
      - id: <action-id>
        label: "…"
```

Regole:

* `default` deve essere sempre definito.
* `short` e `long` sono opzionali ma consigliati.
* `ui.buttons` è opzionale; quando presente ogni bottone ha `id` e `label`.

## 6) Pattern e lessico

* `synonyms`: parole/frasi *equivalenti* all’intent.
* `keywords`: parole pivot che aiutano il match.
* `patterns`: regex o micro‑pattern **semplici** (evitare regex complesse).
* `negative`: parole/frasi che **escludono** l’intent.

Le liste vanno dalla più comune alla più specifica. Evita duplicati. Mantieni i testi in **minuscolo**.

## 7) Versionamento contenuti

* A ogni modifica sostanziale nel file **structure**, incrementa `meta.version` secondo **SemVer**:

  * Patch `x.y.Z` per fix testuali (typo, punteggiatura).
  * Minor `x.Y.z` per nuove risposte/varianti/intent non breaking.
  * Major `X.y.z` per ristrutturazioni breaking.
* Aggiorna `CHANGELOG.md` se la modifica impatta la demo o i clienti.

## 8) Feature vietate o sconsigliate

* **Ancori/Aliases YAML** (`&`, `*`): **vietate** per chiarezza.
* **Tag YAML personalizzati**: vietati.
* **Unicode invisibile**: evita caratteri non stampabili.

## 9) Esempi

### 9.1 Intent file (singolo intent)

```yaml
id: wifi
synonyms:
  - wifi
  - wi-fi
  - rete
keywords:
  - password
  - internet
patterns:
  - "wifi|wi-fi|rete\s(wifi|wi-fi)"
negative: []
output:
  default: "La rete è \"SVA_Guest\". La password è in camera sulla card informativa."
  short: "Rete SVA_Guest; password sulla card in camera."
  long: |
    La rete Wi‑Fi dell’appartamento è **SVA_Guest**.
    Trovi la password aggiornata sulla card informativa posizionata vicino alla TV.
  ui:
    buttons:
      - id: copy-wifi
        label: "Copia credenziali"
```

### 9.2 Structure file (estratto)

```yaml
meta:
  id: svapartments
  name: SVApartments
  version: 1.0.0
  language: it

intents:
  wifi:
    synonyms: [wifi, wi-fi, rete]
    keywords: [password, internet]
    patterns:
      - "wifi|wi-fi|rete\s(wifi|wi-fi)"
    negative: []
    output:
      default: "La rete è \"SVA_Guest\". La password è sulla card in camera."
      short: "Rete SVA_Guest; password in camera."

  checkin:
    synonyms: [check-in, arrivo]
    keywords: [orario, ingresso]
    patterns: []
    negative: []
    output:
      default: "Check‑in dalle 15:00. Scrivici se arrivi prima."

  supermarket:
    synonyms: [supermercato, spesa]
    keywords: [aperto, vicino]
    patterns: []
    negative: []
    output:
      default: "Il supermercato più vicino è a 300 m, aperto 8‑20 (lun‑sab)."
```

## 10) Validazione & qualità

Per ogni PR:

1. **Format:** `pnpm fmt:yaml`
2. **Lint/schema:** `pnpm lint:yaml`
3. **Contenuti:** `pnpm check:content`

Tutti e tre devono passare **senza warning**.

## 11) Pitfall comuni (e come evitarli)

* **Tab vs spazi:** attiva in editor “convert tabs to spaces”.
* **Quote mancanti:** se una stringa contiene `:` o `#`, usa `"…"`.
* **Liste inline:** evita `synonyms: [a, b]` quando l’elenco supera 3 voci.
* **Duplicati:** esegui periodicamente `report:intents` e rimuovi doppioni.
* **Ordine chiavi:** mantieni l’ordine definito al §3; evita rimescolamenti automatici.

---

### Allegati

* Vedi `docs/content-quality.md` per checklist qualitativa.
* Script utili: `apps/api/scripts/validate-yaml.ts`, `apps/api/scripts/report-intents.ts`.

*Fine documento*
