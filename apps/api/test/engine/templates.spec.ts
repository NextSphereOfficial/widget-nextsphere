import { describe, it, expect } from 'vitest';
import { renderTemplate } from '../../src/engine/templates.js';

describe('templates', () => {
  it('renders simple placeholders', () => {
    const tpl = 'SSID: {{wifi.ssid}}';
    const yaml: any = { wifi: { ssid: 'CasaSV' } };
    const out = renderTemplate(tpl, yaml, 'it');
    expect(out).toContain('CasaSV');
  });

  it('handles #if boolean blocks', () => {
    const tpl = 'Fumo: {{#if rules.smoking}}consentito{{/if}}';
    const yaml: any = { rules: { smoking: true } };
    const out = renderTemplate(tpl, yaml, 'it');
    expect(out).toContain('consentito');
  });
});
