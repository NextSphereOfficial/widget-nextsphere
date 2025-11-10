# NextSphere – Content Quality Checklist (YAML)

## Stile & Tono
- Chiaro, cortese, utile; evita gergo tecnico non necessario.
- Evita frasi troppo lunghe; una idea per frase.
- Usa emoji con parsimonia (max 1 per messaggio “short”; 0–2 per “long”).

## Formattazione
- **short**: risposta rapida (1–2 frasi), subito utile.
- **long**: dettagli completi, eventuali elenchi puntati.
- **default**: fallback generico (se non definito “short/long”).

## Dati & Link
- Numeri di telefono in formato internazionale (+39 …).
- Orari nel formato 24h (HH:MM).
- Indirizzi coerenti con la struttura.
- Link http(s) funzionanti; evita URL lunghi (usa ancore testuali).

## Localizzazione
- `lang` in `meta` coerente (es. `it`).
- Evita ibridi IT/EN nello stesso testo; differenzia nei file se necessario.

## UX (Buttons)
- `ui.buttons`: max 3–4, descrittivi (“Apri mappa”, “Chiama host”).
- Niente duplicati o bottoni vuoti.

## Qualità contenuto
- Evita placeholder (“TBD”, “…”, “xxx”).
- Evita ripetizioni inutili fra `short` e `long`.
- Aggiorna `emergencies` con numeri corretti (112, host).
