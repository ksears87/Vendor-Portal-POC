import { C } from '../../constants';

export default function Lbl({ children, req }) {
  return (
    <label style={{
      display: 'block', fontSize: 11, fontWeight: 700, color: C.textSec,
      textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4,
    }}>
      {children}
      {req && <span style={{ color: C.err, marginLeft: 2 }}>*</span>}
    </label>
  );
}
