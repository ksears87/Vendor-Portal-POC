import { C } from '../../constants';

export default function ApiNote({ children }) {
  return (
    <div style={{
      fontSize: 11, color: C.textMuted, fontStyle: 'italic', marginTop: 6,
      padding: '4px 8px', backgroundColor: C.bg, borderRadius: 2,
      borderLeft: `2px solid ${C.border}`,
    }}>
      🔌 {children}
    </div>
  );
}
