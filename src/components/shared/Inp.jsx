import { C, iSt } from '../../constants';

export default function Inp({ value, onChange, placeholder, type = 'text', disabled }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        ...iSt,
        backgroundColor: disabled ? C.surfaceAlt : C.surface,
        color: disabled ? C.textMuted : C.text,
      }}
    />
  );
}
