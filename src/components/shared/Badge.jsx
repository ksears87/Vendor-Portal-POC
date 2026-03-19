import { C, STATUS } from '../../constants';

export default function Badge({ status }) {
  const s = STATUS[status] || { fg: C.textSec, bg: C.bg, dot: C.textSec, label: status };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 9px', borderRadius: 12, fontSize: 11, fontWeight: 700,
      color: s.fg, backgroundColor: s.bg, whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: s.dot, flexShrink: 0 }} />
      {s.label}
    </span>
  );
}
