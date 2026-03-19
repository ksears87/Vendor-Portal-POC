export const C = {
  blue: '#0078D4',
  blueDark: '#005A9E',
  blueHover: '#106EBE',
  blueLight: '#EFF6FC',
  blueLighter: '#DEECF9',
  bg: '#F3F2F1',
  surface: '#FFFFFF',
  surfaceAlt: '#FAF9F8',
  text: '#201F1E',
  textSec: '#605E5C',
  textMuted: '#A19F9D',
  border: '#EDEBE9',
  borderHov: '#C8C6C4',
  success: '#107C10',
  successBg: '#DFF6DD',
  warn: '#C86F00',
  warnBg: '#FFF4CE',
  err: '#A4262C',
  errBg: '#FDE7E9',
  info: '#0078D4',
  infoBg: '#EFF6FC',
};

export const STATUS = {
  Pending: { fg: C.warn, bg: C.warnBg, dot: C.warn, label: 'Pending Review' },
  'On Hold': { fg: '#7A4F00', bg: '#FFF4CE', dot: C.warn, label: 'On Hold' },
  Approved: { fg: C.success, bg: C.successBg, dot: C.success, label: 'Approved' },
  Rejected: { fg: C.err, bg: C.errBg, dot: C.err, label: 'Rejected' },
  Received: { fg: C.blue, bg: C.blueLight, dot: C.blue, label: 'Received' },
};

export const RESORTS = [
  'RST-001 – Grand Mountain',
  'RST-002 – Lakeside Lodge',
  'RST-003 – Beach Paradise',
  'RST-004 – Forest Retreat',
  'RST-005 – Desert Oasis',
];

export const VENDOR_GROUPS = ['SUPPLIER', 'SERVICE', 'EMPLOYEE', 'CONTRACTOR', 'INTERCOMPANY'];
export const PAY_TERMS = ['Net 30', 'Net 45', 'Net 60', 'Net 15', 'Due on Receipt', '2/10 Net 30'];
export const CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'MXN', 'JPY'];
export const PAY_METHODS = ['Check', 'ACH', 'Wire Transfer', 'Credit Card', 'Virtual Card'];
export const COUNTRIES = [
  'United States', 'Canada', 'Mexico', 'United Kingdom', 'Germany',
  'France', 'Japan', 'China', 'Australia', 'Other',
];
export const REG_TYPES = ['EIN', 'SSN', 'ITIN', 'Foreign TIN', 'VAT Number', 'Other'];
export const ENTITY_TYPES = [
  'Individual / Sole Proprietor', 'C Corporation', 'S Corporation',
  'Partnership', 'Trust / Estate', 'LLC', 'Other',
];
export const BOX_1099 = [
  'Box 1 – Rents', 'Box 2 – Royalties', 'Box 6 – Medical',
  'Box 7 – NEC', 'Box 10 – Crop Insurance', 'N/A',
];

// Shared input base style
export const iSt = {
  width: '100%',
  padding: '7px 10px',
  fontSize: 13,
  border: `1px solid ${C.border}`,
  borderRadius: 2,
  outline: 'none',
  backgroundColor: C.surface,
  color: C.text,
  boxSizing: 'border-box',
  fontFamily: "'Segoe UI',system-ui,sans-serif",
};
