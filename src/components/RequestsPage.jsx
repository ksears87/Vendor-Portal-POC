import { useState } from 'react';
import { C, STATUS, VENDOR_GROUPS, AP_PROCESSORS, iSt } from '../constants';
import { Card } from './shared';
import ReqTable from './ReqTable';

export default function RequestsPage({ reqs, role, onView, onUpdateProcessor, title }) {
  const [search, setSearch] = useState('');
  const [statusF, setStatusF] = useState('');
  const [groupF, setGroupF] = useState('');
  const [processorF, setProcessorF] = useState('');

  const filtered = reqs.filter(r => {
    const m = !search
      || r.vendorName.toLowerCase().includes(search.toLowerCase())
      || r.id.toLowerCase().includes(search.toLowerCase());
    const p = !processorF
      || (processorF === '__unassigned__' ? !r.apProcessor : r.apProcessor === processorF);
    return m && (!statusF || r.status === statusF) && (!groupF || r.vendorGroup === groupF) && p;
  });

  const hasFilters = search || statusF || groupF || processorF;

  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.text }}>{title}</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSec }}>
          {filtered.length} request{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      <Card style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 180px', position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
              color: C.textMuted, fontSize: 13, pointerEvents: 'none',
            }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search vendor name or ID…"
              style={{ ...iSt, paddingLeft: 26 }}
            />
          </div>
          <select
            value={statusF}
            onChange={e => setStatusF(e.target.value)}
            style={{ ...iSt, width: 'auto', minWidth: 130, appearance: 'none', color: statusF ? C.text : C.textMuted }}
          >
            <option value="">All Statuses</option>
            {Object.keys(STATUS).map(s => <option key={s}>{s}</option>)}
          </select>
          <select
            value={groupF}
            onChange={e => setGroupF(e.target.value)}
            style={{ ...iSt, width: 'auto', minWidth: 130, appearance: 'none', color: groupF ? C.text : C.textMuted }}
          >
            <option value="">All Groups</option>
            {VENDOR_GROUPS.map(g => <option key={g}>{g}</option>)}
          </select>
          {role === 'ap' && (
            <select
              value={processorF}
              onChange={e => setProcessorF(e.target.value)}
              style={{ ...iSt, width: 'auto', minWidth: 150, appearance: 'none', color: processorF ? C.text : C.textMuted }}
            >
              <option value="">All Processors</option>
              <option value="__unassigned__">Unassigned</option>
              {AP_PROCESSORS.map(p => <option key={p}>{p}</option>)}
            </select>
          )}
          {hasFilters && (
            <button
              onClick={() => { setSearch(''); setStatusF(''); setGroupF(''); setProcessorF(''); }}
              style={{
                padding: '7px 12px', fontSize: 12, color: C.textSec,
                border: `1px solid ${C.border}`, backgroundColor: 'transparent',
                borderRadius: 2, cursor: 'pointer', fontFamily: "'Segoe UI',system-ui,sans-serif",
              }}
            >
              Clear
            </button>
          )}
        </div>
      </Card>

      <Card>
        <ReqTable reqs={filtered} role={role} onView={onView} onUpdateProcessor={onUpdateProcessor} />
      </Card>
    </div>
  );
}
