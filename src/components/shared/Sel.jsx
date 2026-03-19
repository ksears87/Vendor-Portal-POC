import { C, iSt } from '../../constants';

export default function Sel({ value, onChange, options, placeholder, disabled }) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{
        ...iSt,
        appearance: 'none',
        cursor: disabled ? 'default' : 'pointer',
        backgroundColor: disabled ? C.surfaceAlt : C.surface,
        color: value ? C.text : C.textMuted,
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
