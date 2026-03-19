import { C } from '../constants';
import { Card } from './shared';
import ReqTable from './ReqTable';

export default function Dashboard({ role, reqs, onNav, onView }) {
  const mine = role === 'requester' ? reqs.filter(r => r.requester === 'Sarah Johnson') : reqs;
  const received = mine.filter(r => r.status === 'Received').length;
  const pending = mine.filter(r => r.status === 'Pending').length;
  const approved = mine.filter(r => r.status === 'Approved').length;
  const rejected = mine.filter(r => r.status === 'Rejected').length;
  const flagged = reqs.filter(r => r.dupIds?.length > 0).length;

  const stats = role === 'ap'
    ? [
        { l: 'Newly Received', v: received, fg: C.blue, bg: C.blueLight, icon: '📥' },
        { l: 'Pending Review', v: pending, fg: C.warn, bg: C.warnBg, icon: '⏳' },
        { l: 'Approved (Total)', v: approved, fg: C.success, bg: C.successBg, icon: '✅' },
        { l: 'Flagged Duplicates', v: flagged, fg: C.err, bg: C.errBg, icon: '⚠️' },
      ]
    : [
        { l: 'Submitted', v: received, fg: C.blue, bg: C.blueLight, icon: '📬' },
        { l: 'In Review', v: pending, fg: C.warn, bg: C.warnBg, icon: '⏳' },
        { l: 'Approved', v: approved, fg: C.success, bg: C.successBg, icon: '✅' },
        { l: 'Rejected', v: rejected, fg: C.err, bg: C.errBg, icon: '❌' },
      ];

  const tableReqs = role === 'ap'
    ? reqs.filter(r => ['Pending', 'Received'].includes(r.status)).slice(0, 6)
    : mine.slice(0, 5);

  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.text }}>
          {role === 'ap' ? 'AP Processor Dashboard' : 'Vendor Request Dashboard'}
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSec }}>
          {role === 'ap' ? 'Review and manage incoming vendor requests' : 'Track your submitted vendor requests'}
        </p>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
        backgroundColor: C.successBg, borderRadius: 3, border: `1px solid ${C.success}30`, marginBottom: 18,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: C.success, flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: C.success }}>D365 F&O Connected</span>
        <span style={{ fontSize: 12, color: C.textSec }}>Vendor master sync active · Last sync: 2 min ago</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: C.textMuted, fontStyle: 'italic' }}>
          🔌 /VendVendorEntity · OData v4
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 18 }}>
        {stats.map(s => (
          <div key={s.l} style={{
            backgroundColor: s.bg, border: `1px solid ${s.fg}25`, borderRadius: 3, padding: '14px 16px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: s.fg, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 12, color: s.fg, fontWeight: 700, marginTop: 5 }}>{s.l}</div>
              </div>
              <span style={{ fontSize: 20, opacity: 0.8 }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.text }}>
            {role === 'ap' ? 'Requests Awaiting Action' : 'My Recent Requests'}
          </h2>
          <button
            onClick={() => onNav(role === 'ap' ? 'queue' : 'requests')}
            style={{ fontSize: 12, color: C.blue, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
          >
            View all →
          </button>
        </div>
        <ReqTable reqs={tableReqs} role={role} onView={onView} />
      </Card>

      {role === 'requester' && (
        <div style={{
          padding: '14px 16px', backgroundColor: C.blueLight, borderRadius: 3,
          border: `1px solid ${C.blue}25`, display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', backgroundColor: C.blue,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 20, flexShrink: 0,
          }}>+</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Need to add a new vendor?</div>
            <div style={{ fontSize: 12, color: C.textSec }}>
              Submit a request and AP will review it against the D365 vendor master.
            </div>
          </div>
          <button
            onClick={() => onNav('new')}
            style={{
              padding: '7px 18px', backgroundColor: C.blue, color: 'white', border: 'none',
              borderRadius: 2, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              whiteSpace: 'nowrap', fontFamily: "'Segoe UI',system-ui,sans-serif",
            }}
          >
            New Request
          </button>
        </div>
      )}
    </div>
  );
}
