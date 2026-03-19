import { useState } from 'react';
import { C } from './constants';
import { SEED } from './mockData';
import Dashboard from './components/Dashboard';
import NewRequestForm from './components/NewRequestForm';
import RequestsPage from './components/RequestsPage';
import VendorSearch from './components/VendorSearch';
import ReviewModal from './components/ReviewModal';

export default function App() {
  const [role, setRole] = useState('requester');
  const [page, setPage] = useState('dashboard');
  const [reqs, setReqs] = useState(SEED);
  const [selected, setSelected] = useState(null);

  const pendingCount = reqs.filter(r => r.status === 'Pending').length;

  const navAP = [
    { id: 'dashboard', icon: '⬛', label: 'Dashboard' },
    { id: 'queue', icon: '📥', label: 'Approval Queue', badge: pendingCount },
    { id: 'requests', icon: '📋', label: 'All Requests' },
    { id: 'search', icon: '🔍', label: 'Vendor Search' },
    { id: 'new', icon: '➕', label: 'New Request' },
  ];
  const navReq = [
    { id: 'dashboard', icon: '⬛', label: 'Dashboard' },
    { id: 'new', icon: '➕', label: 'New Request' },
    { id: 'requests', icon: '📋', label: 'My Requests' },
    { id: 'search', icon: '🔍', label: 'Vendor Search' },
  ];
  const nav = role === 'ap' ? navAP : navReq;

  const handleNav = p => { setPage(p); setSelected(null); };

  const handleSubmit = form => {
    const newReq = {
      id: `REQ-2025-${String(reqs.length + 42).padStart(4, '0')}`,
      vendorName: form.vendorGroup === 'EMPLOYEE'
        ? `${form.lastName}, ${form.firstName}`.trim()
        : form.vendorName || '(unnamed)',
      vendorGroup: form.vendorGroup || 'SUPPLIER',
      requester: role === 'ap' ? 'AP Processor' : 'Sarah Johnson',
      resort: form.resort,
      submitted: new Date().toISOString().slice(0, 10),
      status: 'Received',
      classification: form.classification || '—',
      dupIds: [],
      apNotes: '',
    };
    setReqs(p => [newReq, ...p]);
    setTimeout(() => handleNav('requests'), 1600);
  };

  const myReqs = role === 'requester' ? reqs.filter(r => r.requester === 'Sarah Johnson') : reqs;
  const queueReqs = reqs.filter(r => ['Pending', 'On Hold'].includes(r.status));

  return (
    <div style={{
      fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif",
      minHeight: '100vh', backgroundColor: C.bg, color: C.text, position: 'relative',
    }}>
      {/* Top bar */}
      <div style={{
        height: 46, backgroundColor: C.blue, display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 12, position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 4px rgba(0,0,0,.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'white' }}>
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
            <rect x={1} y={1} width={8} height={8} fill="white" opacity={0.9} rx={1} />
            <rect x={11} y={1} width={8} height={8} fill="white" opacity={0.6} rx={1} />
            <rect x={1} y={11} width={8} height={8} fill="white" opacity={0.6} rx={1} />
            <rect x={11} y={11} width={8} height={8} fill="white" opacity={0.9} rx={1} />
          </svg>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Vendor Portal</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ fontSize: 12, opacity: 0.75 }}>D365 Finance &amp; Operations</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Persona toggle */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 3, padding: 3,
            backgroundColor: 'rgba(0,0,0,.2)', borderRadius: 20,
          }}>
            <span style={{
              fontSize: 10, color: 'rgba(255,255,255,.6)', fontWeight: 700,
              padding: '0 6px', letterSpacing: '0.5px',
            }}>PERSONA</span>
            {[{ v: 'requester', l: 'Requester' }, { v: 'ap', l: 'AP Processor' }].map(({ v, l }) => (
              <button key={v} onClick={() => { setRole(v); handleNav('dashboard'); }} style={{
                padding: '4px 11px', borderRadius: 16, fontSize: 11, fontWeight: 700,
                cursor: 'pointer', border: 'none',
                backgroundColor: role === v ? 'white' : 'transparent',
                color: role === v ? C.blue : 'rgba(255,255,255,.7)',
                fontFamily: "'Segoe UI',system-ui,sans-serif",
              }}>{l}</button>
            ))}
          </div>
          {/* User info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'white', fontSize: 12 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11,
            }}>
              {role === 'ap' ? 'AP' : 'SJ'}
            </div>
            <div>
              <div style={{ fontSize: 12, lineHeight: 1.3 }}>{role === 'ap' ? 'AP Processor' : 'Sarah Johnson'}</div>
              <div style={{ fontSize: 10, opacity: 0.65 }}>{(role === 'ap' ? 'AP Dept' : 'Purchasing')} · SSO</div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)' }}>
        {/* Sidebar */}
        <div style={{
          width: 210, backgroundColor: C.surface, borderRight: `1px solid ${C.border}`,
          display: 'flex', flexDirection: 'column', flexShrink: 0,
        }}>
          <div style={{ flex: 1, paddingTop: 6 }}>
            {nav.map(item => (
              <button key={item.id} onClick={() => handleNav(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: 9, width: '100%',
                padding: '8px 14px 8px 12px', border: 'none', cursor: 'pointer',
                textAlign: 'left', fontFamily: "'Segoe UI',system-ui,sans-serif",
                backgroundColor: page === item.id ? C.blueLight : 'transparent',
                color: page === item.id ? C.blue : C.text,
                borderLeft: `3px solid ${page === item.id ? C.blue : 'transparent'}`,
                fontSize: 13, fontWeight: page === item.id ? 700 : 400,
              }}>
                <span style={{ fontSize: 13, opacity: 0.7 }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge > 0 && (
                  <span style={{
                    backgroundColor: C.err, color: 'white', borderRadius: 10,
                    padding: '1px 6px', fontSize: 11, fontWeight: 700,
                  }}>{item.badge}</span>
                )}
              </button>
            ))}
          </div>
          <div style={{ padding: '10px 14px', borderTop: `1px solid ${C.border}` }}>
            <div style={{
              fontSize: 10, color: C.textMuted, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4,
            }}>D365 Connection</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: C.success, fontWeight: 600 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.success }} />
              Live · Finance &amp; Operations
            </div>
            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 1 }}>corp-d365.crm.dynamics.com</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: 22, overflowY: 'auto', minWidth: 0, position: 'relative' }}>
          {page === 'dashboard' && <Dashboard role={role} reqs={reqs} onNav={handleNav} onView={setSelected} />}
          {page === 'new' && <NewRequestForm role={role} onSubmit={handleSubmit} onCancel={() => handleNav('dashboard')} />}
          {page === 'requests' && <RequestsPage reqs={myReqs} role={role} onView={setSelected} title={role === 'ap' ? 'All Requests' : 'My Requests'} />}
          {page === 'queue' && <RequestsPage reqs={queueReqs} role={role} onView={setSelected} title="Approval Queue" />}
          {page === 'search' && <VendorSearch />}

          {selected && (
            <ReviewModal
              req={selected}
              onClose={() => setSelected(null)}
              onUpdate={r => { setReqs(p => p.map(x => x.id === r.id ? r : x)); setSelected(null); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
