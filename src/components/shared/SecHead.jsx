import { C } from '../../constants';

export default function SecHead({ icon, title, sub, apOnly }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      paddingBottom: 10, marginBottom: 14,
      borderBottom: `2px solid ${apOnly ? C.blue + '30' : C.border}`,
    }}>
      <span style={{ fontSize: 15, marginTop: 1 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{title}</span>
          {apOnly && (
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 3,
              backgroundColor: C.blueLight, color: C.blue, letterSpacing: '0.5px', textTransform: 'uppercase',
            }}>AP ONLY</span>
          )}
        </div>
        {sub && <p style={{ margin: '1px 0 0', fontSize: 12, color: C.textSec }}>{sub}</p>}
      </div>
    </div>
  );
}
