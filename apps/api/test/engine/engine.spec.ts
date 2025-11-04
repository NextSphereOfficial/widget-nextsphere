import { describe, it, expect } from 'vitest';
import { run } from '../../src/engine/index.js';
import { RESPONSE_CONFIG } from '../../src/config/response.js';

const intentsCore: any = {
  wifi: { id: 'wifi', priority: 100, synonyms_it: ['wifi','password'], template_it: 'SSID: {{wifi.ssid}}\nPassword: {{wifi.password}}' },
  checkin: { id: 'checkin', priority: 90, synonyms_it: ['check in','arrivo'], template_it: 'Check-in dalle {{checkin.from}} alle {{checkin.to}}' }
};

const structureYaml: any = {
  meta: { defaultLang: 'it' },
  wifi: { ssid: 'CasaSV', password: 'Stay@SV2025' },
  checkin: { from: '15:00', to: '22:00', late_policy_it: 'Late su richiesta.' },
  rules: { smoking: false, pets: false, quiet_hours: '22:00–08:00', extra_it: 'Niente feste.' }
};

describe('engine.run', () => {
  it('answers wifi', async () => {
    const out = await run({
      message: 'Qual è la password del wifi?',
      structureId: 'svapartments',
      structureYaml,
      intentsCore,
      room: '101',
      lang: 'it',
      config: RESPONSE_CONFIG
    } as any);
    expect(out.intent).toBe('wifi');
    expect(out.text).toContain('SSID');
    expect(out.confidence).toBeGreaterThan(0);
  });

  it('falls back on low confidence', async () => {
    const out = await run({
      message: 'vorrei informazioni difficili e non correlate',
      structureId: 'svapartments',
      structureYaml,
      intentsCore,
      room: null,
      lang: 'it',
      config: { ...RESPONSE_CONFIG, threshold: 0.99 }
    } as any);
    expect(out.intent).toBeNull();
    expect(out.text).toBeTruthy();
  });
});
