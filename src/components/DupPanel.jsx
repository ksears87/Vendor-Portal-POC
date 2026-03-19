import { C } from '../constants';
import { GroupTag, ApiNote } from './shared';

export default function DupPanel({ dupes }) {
  if (!dupes.length) return null;
  return (
    <div style={{
      padding: '12px 14px', backgroundColor: C.warnBg,
      border: `1.5px solid ${C.warn}60`, borderRadius: 3, marginTop: 4,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 14 }}>⚠️</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.warn }}>
          {dupes.length} Potential Duplicate{dupes.length > 1 ? 's' : ''} Found in D365
        </span>
      </div>
      <p style={{ fontSize: 12, color: C.text, margin: '0 0 10px' }}>
        The following vendors already exist with similar names. Verify before submitting.
      </p>
      {dupes.map(d => {
        const pct = Math.round(d.score * 100);
        return (
          <div key={d.id} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '6px 10px', backgroundColor: C.surface, borderRadius: 2,
            marginBottom: 4, fontSize: 12, border: `1px solid ${C.border}`,
          }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: C.blue, fontFamily: 'monospace' }}>{d.id}</span>
              <span style={{ fontWeight: 600, color: C.text }}>{d.name}</span>
              <GroupTag g={d.group} />
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ color: C.textSec }}>{d.city}</span>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: d.status === 'On Hold' ? C.warn : C.success,
              }}>
                {d.status === 'On Hold' ? '⚠️ On Hold' : '● Active'}
              </span>
              <span style={{
                padding: '2px 7px', borderRadius: 10, fontSize: 11, fontWeight: 700,
                backgroundColor: pct > 70 ? C.errBg : C.warnBg,
                color: pct > 70 ? C.err : C.warn,
              }}>
                {pct}% match
              </span>
            </div>
          </div>
        );
      })}
      <ApiNote>{"GET /VendVendorEntity?$filter=contains(Name,'…')"}</ApiNote>
    </div>
  );
}
