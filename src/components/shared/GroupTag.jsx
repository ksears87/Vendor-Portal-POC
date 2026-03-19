import { C } from '../../constants';

export default function GroupTag({ g }) {
  return (
    <span style={{
      fontSize: 11, padding: '2px 7px', borderRadius: 2,
      backgroundColor: C.bg, color: C.textSec, fontWeight: 700, letterSpacing: '0.3px',
    }}>
      {g}
    </span>
  );
}
