import { C } from '../constants';
import { Badge, GroupTag } from './shared';

export default function ReqTable({ reqs, role, onView }) {
  if (!reqs.length) {
    return (
      <div style={{ textAlign: 'center', padding: 32, color: C.textMuted, fontSize: 13 }}>
        No requests found.
      </div>
    );
  }
  const cols = ['Request ID', 'Vendor Name', 'Group', 'Submitted', 'Status', ...(role === 'ap' ? ['Flags'] : []), ''];
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${C.border}` }}>
            {cols.map(col => (
              <th key={col} style={{
                padding: '6px 10px', textAlign: 'left', fontSize: 11, fontWeight: 700,
                color: C.textSec, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap',
              }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reqs.map((r, i) => (
            <tr key={r.id} onClick={() => onView(r)} style={{
              borderBottom: `1px solid ${C.border}`,
              cursor: 'pointer',
              backgroundColor: i % 2 ? C.surfaceAlt : 'transparent',
            }}>
              <td style={{ padding: '8px 10px', color: C.blue, fontWeight: 700, fontFamily: 'monospace', fontSize: 12 }}>{r.id}</td>
              <td style={{ padding: '8px 10px', fontWeight: 600, color: C.text, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.vendorName}</td>
              <td style={{ padding: '8px 10px' }}><GroupTag g={r.vendorGroup} /></td>
              <td style={{ padding: '8px 10px', color: C.textSec }}>{r.submitted}</td>
              <td style={{ padding: '8px 10px' }}><Badge status={r.status} /></td>
              {role === 'ap' && (
                <td style={{ padding: '8px 10px' }}>
                  {r.dupIds?.length > 0 && (
                    <span
                      title={`${r.dupIds.length} potential duplicate(s)`}
                      style={{ fontSize: 12, backgroundColor: C.warnBg, padding: '2px 6px', borderRadius: 3 }}
                    >
                      ⚠️ {r.dupIds.length}
                    </span>
                  )}
                </td>
              )}
              <td style={{ padding: '8px 10px' }}>
                <button
                  onClick={e => { e.stopPropagation(); onView(r); }}
                  style={{
                    fontSize: 11, padding: '3px 10px', backgroundColor: 'transparent',
                    fontFamily: "'Segoe UI',system-ui,sans-serif",
                    border: `1px solid ${C.border}`, borderRadius: 2, cursor: 'pointer',
                    color: C.blue, fontWeight: 700,
                  }}
                >
                  {role === 'ap' && r.status === 'Pending'
                    ? 'Review'
                    : role === 'requester' && r.status === 'Rejected'
                      ? 'Edit'
                      : 'View'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
