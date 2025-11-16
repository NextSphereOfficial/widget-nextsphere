// apps/widget/src/lib/api.ts

const API_BASE = import.meta.env.VITE_API_BASE ?? 'https://api.nextsphere.it';

export async function chat(payload: { message: string }) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} ${text}`);
  }

  return res.json();
}
