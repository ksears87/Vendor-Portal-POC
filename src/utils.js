import { D365_VENDORS } from './mockData';

export function sim(a, b) {
  const cl = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const s1 = cl(a), s2 = cl(b);
  if (!s1 || !s2 || s1.length < 3) return 0;
  if (s1 === s2) return 1;
  if (s1.includes(s2) || s2.includes(s1)) return 0.85;
  const w1 = s1.split(/\s+/).filter(w => w.length > 2);
  const w2 = s2.split(/\s+/).filter(w => w.length > 2);
  if (!w1.length || !w2.length) return 0;
  const hits = w1.filter(w => w2.some(x => x.startsWith(w) || w.startsWith(x))).length;
  return hits / Math.max(w1.length, w2.length);
}

export function detectDupes(name) {
  if (!name || name.trim().length < 3) return [];
  return D365_VENDORS
    .map(v => ({ ...v, score: sim(name, v.name) }))
    .filter(v => v.score > 0.28)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}
