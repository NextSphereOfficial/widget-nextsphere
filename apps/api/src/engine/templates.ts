import type { StructureYaml, Lang } from './types.js';

function getPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
}

export function renderTemplate(tpl: string, data: StructureYaml, lang: Lang): string {
  if (!tpl) return '';

  tpl = tpl.replace(/\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, path: string, inner: string) => {
    const val = getPath(data, path.trim());
    const ok = !!val;
    return ok ? inner : '';
  });

  tpl = tpl.replace(/\{\{\s*([^}\s]+)\s*\}\}/g, (_, path: string) => {
    const val = getPath(data, path.trim());
    return (val === undefined || val === null || val === '') ? '' : String(val);
  });

  return tpl.replace(/[ \t]+\n/g, '\n').trim();
}

export function getIntentTemplate(structure: StructureYaml, intentId: string, lang: Lang): string | null {
  const sIntent = structure.intents?.[intentId];
  const key = lang === 'it' ? 'template_it' : 'template_en';
  if (sIntent && sIntent[key as 'template_it' | 'template_en']) {
    return String(sIntent[key as 'template_it' | 'template_en']);
  }
  return null;
}
