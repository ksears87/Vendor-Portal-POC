import { useState } from 'react';
import { C, iSt } from '../constants';
import { D365_VENDORS } from '../mockData';
import { sim } from '../utils';
import { Card, GroupTag, ApiNote } from './shared';

export default function VendorSearch() {
  const [q, setQ] = useState('');
  const results = q.length > 1
    ? D365_VENDORS
        .map(v => ({ ...v, score: sim(q, v.name) }))
        .filter(v => v.score > 0.15 || v.name.toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => b.score - a.score)
    : [];

  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.text }}>Vendor Search</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSec }}>
          Search existing vendors in D365 F&O before submitting a new request.
        </p>
      </div>

      <Card style={{ marginBottom: 12 }}>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            color: C.textMuted, fontSize: 15, pointerEvents: 'none',
          }}>🔍</span>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search vendor name, ID, or Tax ID…"
            style={{ ...iSt, paddingLeft: 32, fontSize: 14 }}
          />
        </div>
        <ApiNote>{"GET /VendVendorEntity?$filter=contains(Name,'…')"}</ApiNote>
      </Card>

      {q.length > 1 && (
        <Card>
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 32, color: C.textMuted }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>🔎</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>No vendors found</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>This vendor may not yet exist in D365.</div>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                  {['Vendor ID', 'Vendor Name', 'Group', 'Tax ID', 'City', 'Status'].map(col => (
                    <th key={col} style={{
                      padding: '6px 10px', textAlign: 'left', fontSize: 11, fontWeight: 700,
                      color: C.textSec, textTransform: 'uppercase', letterSpacing: '0.5px',
                    }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((v, i) => (
                  <tr key={v.id} style={{ borderBottom: `1px solid ${C.border}`, backgroundColor: i % 2 ? C.surfaceAlt : 'transparent' }}>
                    <td style={{ padding: '8px 10px', color: C.blue, fontWeight: 700, fontFamily: 'monospace', fontSize: 12 }}>{v.id}</td>
                    <td style={{ padding: '8px 10px', fontWeight: 600, color: C.text }}>{v.name}</td>
                    <td style={{ padding: '8px 10px' }}><GroupTag g={v.group} /></td>
                    <td style={{ padding: '8px 10px', color: C.textSec, fontFamily: 'monospace', fontSize: 12 }}>{v.taxId}</td>
                    <td style={{ padding: '8px 10px', color: C.textSec }}>{v.city}</td>
                    <td style={{ padding: '8px 10px' }}>
                      <span style={{
                        fontSize: 12, fontWeight: 700,
                        color: v.status === 'On Hold' ? C.warn : C.success,
                      }}>
                        {v.status === 'On Hold' ? '⚠️ ' : '● '}{v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      )}
    </div>
  );
}
