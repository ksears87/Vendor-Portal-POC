import { C } from '../../constants';

export default function Card({ children, style = {}, accent }) {
  return (
    <div style={{
      backgroundColor: accent ? '#F8FBFF' : C.surface,
      borderRadius: 3,
      padding: '16px 18px',
      border: `1px solid ${accent ? C.blue + '40' : C.border}`,
      ...style,
    }}>
      {children}
    </div>
  );
}
