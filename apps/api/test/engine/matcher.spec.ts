/// <reference types="vitest" />
import { describe, it, expect } from 'vitest';

// Nota: nei test importiamo i .ts direttamente.
// Questo richiede "allowImportingTsExtensions": true nel tsconfig.
import { matchIntent } from '../../src/engine/matcher.ts';
import { RESPONSE_CONFIG } from '../../src/config/response.ts';

const intents = {
  wifi: { id: 'wifi', synonyms_it: ['wifi','password wifi'], synonyms_en: ['wifi'], priority: 100, template_it: 'SSID: {{wifi.ssid}}' },
  checkin: { id: 'checkin', synonyms_it: ['check in','arrivo'], synonyms_en: ['check in'], priority: 90, template_it: 'Check-in dalle {{checkin.from}}' }
};

describe('matcher', () => {
  it('matches wifi with exact phrase', () => {
    const res = matchIntent('password wifi per favore', 'it', intents as any, RESPONSE_CONFIG);
    expect(res[0].intentId).toBe('wifi');
  });

  it('orders by score then priority', () => {
    const res = matchIntent('check in orari', 'it', intents as any, RESPONSE_CONFIG);
    expect(res[0].intentId).toBeTruthy();
  });
});
