import { C } from '../../constants';

export default function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 38, height: 20, borderRadius: 10, cursor: 'pointer',
        backgroundColor: checked ? C.blue : C.border, position: 'relative', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 2, left: checked ? 20 : 2,
        width: 16, height: 16, borderRadius: '50%', backgroundColor: 'white',
        transition: 'left .15s', boxShadow: '0 1px 3px rgba(0,0,0,.25)',
      }} />
    </div>
  );
}
