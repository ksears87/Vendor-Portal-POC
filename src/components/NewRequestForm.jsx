import { useState } from 'react';
import {
  C, iSt,
  RESORTS, VENDOR_GROUPS, PAY_TERMS, CURRENCIES, PAY_METHODS,
  COUNTRIES, REG_TYPES, ENTITY_TYPES, BOX_1099,
} from '../constants';
import { detectDupes } from '../utils';
import { Card, SecHead, Lbl, Inp, Sel, Toggle, ApiNote } from './shared';
import DupPanel from './DupPanel';

const blank = {
  resort: '', vendorGroup: '', vendorName: '', firstName: '', middleName: '', lastName: '',
  oneTimeVendor: false, addrCountry: '', street1: '', street2: '', city: '', state: '', zip: '',
  contactName: '', contactEmail: '', contactPhone: '', regType: '', regNumber: '', w9w8: '',
  classification: '', mfgCountry: '', svcCountry: '', description: '',
  payTerms: '', currency: '', payMethod: '', reqPhone: '', reqComments: '', interestedACH: false,
  report1099: false, w9Received: false, w8Received: false, fatca: '', fedTaxId: '', taxIdType: '',
  box1099: '', foreignEntity: false, nameOn1099: 'Vendor Name', entityType: '',
};

const g2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 };
const g3 = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 };
const s2 = { gridColumn: 'span 2' };
const s3 = { gridColumn: 'span 3' };

export default function NewRequestForm({ role, initialData, onSubmit, onResubmit, onCancel }) {
  const [f, setF] = useState(initialData || blank);
  const [dupes, setDupes] = useState([]);
  const [timer, setTimer] = useState(null);
  const [done, setDone] = useState(false);

  const upd = (k, v) => setF(p => ({ ...p, [k]: v }));
  const isEmp = f.vendorGroup === 'EMPLOYEE';

  const checkD = name => {
    clearTimeout(timer);
    setTimer(setTimeout(() => setDupes(detectDupes(name)), 450));
  };

  const handleSubmit = () => {
    setDone(true);
    setTimeout(() => {
      if (onResubmit) onResubmit(f, dupes);
      else onSubmit(f, dupes);
    }, 1400);
  };

  if (done) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: 280, gap: 14, textAlign: 'center',
      }}>
        <div style={{
          width: 60, height: 60, borderRadius: '50%', backgroundColor: C.successBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
        }}>📬</div>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.text }}>
          {onResubmit ? 'Request Resubmitted' : 'Request Submitted'}
        </h2>
        <p style={{ margin: 0, fontSize: 13, color: C.textSec, maxWidth: 380 }}>
          {onResubmit
            ? 'Your updated request has been sent back to the AP team for review.'
            : 'Your vendor request has been sent to the AP team for review.'}
        </p>
        <ApiNote>
          {onResubmit ? 'PATCH /VendorRequestEntity · Status = Received' : 'POST /VendorRequestEntity · Pending AP approval'}
        </ApiNote>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.text }}>
            {initialData ? 'Edit & Resubmit Request' : 'New Vendor Request'}
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSec }}>
            {initialData
              ? 'Update the details below and resubmit for AP review.'
              : 'Complete all required fields. AP will review against the D365 vendor master.'}
          </p>
        </div>
        <ApiNote>D365 F&O · /VendVendorEntity</ApiNote>
      </div>

      {initialData?.apNotes && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: C.errBg,
          border: `1.5px solid ${C.err}40`,
          borderRadius: 3,
          marginBottom: 18,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.err, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
            AP Feedback (from previous review)
          </div>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{initialData.apNotes}</div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 6 }}>
            This feedback is preserved and will remain visible to AP. Address the issues above before resubmitting.
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Core Information */}
        <Card>
          <SecHead icon="🏢" title="Core Information" sub="General request details" />
          <div style={g2}>
            <div>
              <Lbl req>Resort / Company #</Lbl>
              <Sel value={f.resort} onChange={e => upd('resort', e.target.value)} options={RESORTS} placeholder="Select resort…" />
            </div>
            <div>
              <Lbl req>Vendor Group</Lbl>
              <Sel value={f.vendorGroup} onChange={e => upd('vendorGroup', e.target.value)} options={VENDOR_GROUPS} placeholder="Select group…" />
            </div>
            {isEmp ? (
              <>
                <div>
                  <Lbl req>First Name</Lbl>
                  <Inp value={f.firstName} onChange={e => { upd('firstName', e.target.value); checkD(`${e.target.value} ${f.lastName}`); }} placeholder="First name" />
                </div>
                <div>
                  <Lbl>Middle Name</Lbl>
                  <Inp value={f.middleName} onChange={e => upd('middleName', e.target.value)} placeholder="Optional" />
                </div>
                <div style={s2}>
                  <Lbl req>Last Name</Lbl>
                  <Inp value={f.lastName} onChange={e => { upd('lastName', e.target.value); checkD(`${f.firstName} ${e.target.value}`); }} placeholder="Last name" />
                </div>
              </>
            ) : (
              <div style={s2}>
                <Lbl req>Vendor Name</Lbl>
                <Inp value={f.vendorName} onChange={e => { upd('vendorName', e.target.value); checkD(e.target.value); }} placeholder="Enter legal vendor name…" />
              </div>
            )}
            <div style={s2}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 12px', backgroundColor: C.surfaceAlt, borderRadius: 2, border: `1px solid ${C.border}`,
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>One-Time Vendor</div>
                  <div style={{ fontSize: 11, color: C.textSec }}>Enable for single-transaction vendors only</div>
                </div>
                <Toggle checked={f.oneTimeVendor} onChange={v => upd('oneTimeVendor', v)} />
              </div>
            </div>
          </div>
        </Card>

        <DupPanel dupes={dupes} />

        {/* Address */}
        <Card>
          <SecHead icon="📍" title="Address" sub="Primary vendor mailing address" />
          <div style={g2}>
            <div style={s2}>
              <Lbl req>Country</Lbl>
              <Sel value={f.addrCountry} onChange={e => upd('addrCountry', e.target.value)} options={COUNTRIES} placeholder="Select country…" />
            </div>
            <div style={s2}>
              <Lbl req>Street Address 1</Lbl>
              <Inp value={f.street1} onChange={e => upd('street1', e.target.value)} placeholder="Street address" />
            </div>
            <div style={s2}>
              <Lbl>Street Address 2</Lbl>
              <Inp value={f.street2} onChange={e => upd('street2', e.target.value)} placeholder="Suite, unit (optional)" />
            </div>
            <div>
              <Lbl req>City</Lbl>
              <Inp value={f.city} onChange={e => upd('city', e.target.value)} placeholder="City" />
            </div>
            <div>
              <Lbl>State / Province</Lbl>
              <Inp value={f.state} onChange={e => upd('state', e.target.value)} placeholder="State" />
            </div>
            <div>
              <Lbl req>ZIP / Postal Code</Lbl>
              <Inp value={f.zip} onChange={e => upd('zip', e.target.value)} placeholder="ZIP" />
            </div>
          </div>
          <ApiNote>Maps to LogisticsPostalAddress in D365</ApiNote>
        </Card>

        {/* Contact */}
        <Card>
          <SecHead icon="👤" title="Vendor Accounting Contact" />
          <div style={g3}>
            <div>
              <Lbl req>Contact Name</Lbl>
              <Inp value={f.contactName} onChange={e => upd('contactName', e.target.value)} placeholder="Full name" />
            </div>
            <div>
              <Lbl req>Contact Email</Lbl>
              <Inp value={f.contactEmail} onChange={e => upd('contactEmail', e.target.value)} type="email" placeholder="accounts@vendor.com" />
            </div>
            <div>
              <Lbl req>Contact Phone</Lbl>
              <Inp value={f.contactPhone} onChange={e => upd('contactPhone', e.target.value)} placeholder="(555) 000-0000" />
            </div>
          </div>
        </Card>

        {/* Registration */}
        <Card>
          <SecHead icon="📋" title="Registration & Tax Documentation" />
          <div style={g3}>
            <div>
              <Lbl>Registration Type</Lbl>
              <Sel value={f.regType} onChange={e => upd('regType', e.target.value)} options={REG_TYPES} placeholder="Select…" />
            </div>
            <div>
              <Lbl>Registration Number</Lbl>
              <Inp value={f.regNumber} onChange={e => upd('regNumber', e.target.value)} placeholder="XX-XXXXXXX" />
            </div>
            <div>
              <Lbl>W-9 / W-8 Status</Lbl>
              <Sel
                value={f.w9w8}
                onChange={e => upd('w9w8', e.target.value)}
                options={['W-9 (US Entity)', 'W-8BEN (Foreign Individual)', 'W-8BEN-E (Foreign Entity)', 'Pending', 'Not Required']}
                placeholder="Select…"
              />
            </div>
            <div style={s3}>
              <Lbl>Upload W-9 / W-8 Documents</Lbl>
              <div style={{
                padding: 14, border: `1.5px dashed ${C.borderHov}`, borderRadius: 3,
                backgroundColor: C.surfaceAlt, textAlign: 'center', cursor: 'pointer',
              }}>
                <div style={{ fontSize: 13, color: C.textSec }}>
                  <span style={{ fontSize: 18, display: 'block', marginBottom: 4 }}>📎</span>
                  Drag &amp; drop files here, or <span style={{ color: C.blue, fontWeight: 700 }}>browse</span>
                </div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>PDF, JPG, PNG · Max 25 MB</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Classification */}
        <Card>
          <SecHead icon="🏷️" title="Vendor Classification" />
          <Lbl req>Classification</Lbl>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {['Goods/Products', 'Services', 'Other'].map(cl => (
              <button key={cl} onClick={() => upd('classification', cl)} style={{
                flex: 1, padding: '9px 6px', borderRadius: 2, cursor: 'pointer', fontSize: 13, fontWeight: 700,
                border: `2px solid ${f.classification === cl ? C.blue : C.border}`,
                backgroundColor: f.classification === cl ? C.blueLight : 'transparent',
                color: f.classification === cl ? C.blue : C.textSec,
                fontFamily: "'Segoe UI',system-ui,sans-serif",
              }}>
                {cl === 'Goods/Products' ? '📦 Goods / Products' : cl === 'Services' ? '🛠️ Services' : '📝 Other'}
              </button>
            ))}
          </div>
          {f.classification && (
            <div style={g2}>
              {f.classification === 'Goods/Products' && (
                <div>
                  <Lbl req>Country of Manufacture</Lbl>
                  <Sel value={f.mfgCountry} onChange={e => upd('mfgCountry', e.target.value)} options={COUNTRIES} placeholder="Select…" />
                </div>
              )}
              {f.classification === 'Services' && (
                <div>
                  <Lbl req>Country of Service</Lbl>
                  <Sel value={f.svcCountry} onChange={e => upd('svcCountry', e.target.value)} options={COUNTRIES} placeholder="Select…" />
                </div>
              )}
              <div style={f.classification === 'Other' ? s2 : {}}>
                <Lbl req>{f.classification === 'Other' ? 'Detailed Description' : 'Goods / Services Description'}</Lbl>
                <textarea
                  value={f.description}
                  onChange={e => upd('description', e.target.value)}
                  rows={3}
                  placeholder={`Describe the ${f.classification === 'Goods/Products' ? 'goods' : 'services'}…`}
                  style={{ ...iSt, resize: 'vertical' }}
                />
              </div>
            </div>
          )}
        </Card>

        {/* Payment */}
        <Card>
          <SecHead icon="💳" title="Payment & Currency" />
          <div style={g3}>
            <div>
              <Lbl req>Terms of Payment</Lbl>
              <Sel value={f.payTerms} onChange={e => upd('payTerms', e.target.value)} options={PAY_TERMS} placeholder="Select…" />
            </div>
            <div>
              <Lbl req>Billing Currency</Lbl>
              <Sel value={f.currency} onChange={e => upd('currency', e.target.value)} options={CURRENCIES} placeholder="Select…" />
            </div>
            <div>
              <Lbl req={role === 'ap'}>
                Preferred Payment Method
                {role !== 'ap' && <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 400, marginLeft: 4, textTransform: 'none' }}>(set by AP)</span>}
              </Lbl>
              <Sel value={f.payMethod} onChange={e => upd('payMethod', e.target.value)} options={PAY_METHODS} placeholder="Select…" disabled={role !== 'ap'} />
            </div>
          </div>
        </Card>

        {/* Requester */}
        <Card>
          <SecHead icon="🙋" title="Requester Information" />
          <div style={g2}>
            <div>
              <Lbl>Requester Phone</Lbl>
              <Inp value={f.reqPhone} onChange={e => upd('reqPhone', e.target.value)} placeholder="(555) 000-0000" />
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '9px 12px', backgroundColor: C.surfaceAlt, borderRadius: 2,
              border: `1px solid ${C.border}`, marginTop: 17,
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Interested in ACH / Credit Card</div>
                <div style={{ fontSize: 11, color: C.textSec }}>AP will follow up if selected</div>
              </div>
              <Toggle checked={f.interestedACH} onChange={v => upd('interestedACH', v)} />
            </div>
            <div style={s2}>
              <Lbl>Requester Comments</Lbl>
              <textarea
                value={f.reqComments}
                onChange={e => upd('reqComments', e.target.value)}
                rows={3}
                placeholder="Add any context or notes for the AP team…"
                style={{ ...iSt, resize: 'vertical' }}
              />
            </div>
          </div>
        </Card>

        {/* AP Only */}
        {role === 'ap' && (
          <Card accent>
            <SecHead icon="🔒" title="AP Approval Section" sub="D365 tax configuration — not visible to requesters" apOnly />
            <div style={g3}>
              {[['report1099', 'Report 1099'], ['w9Received', 'W-9 Received'], ['w8Received', 'W-8 Received']].map(([k, l]) => (
                <div key={k} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 12px', backgroundColor: C.blueLight, borderRadius: 2, border: `1px solid ${C.blue}20`,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{l}</span>
                  <Toggle checked={f[k]} onChange={v => upd(k, v)} />
                </div>
              ))}
              <div>
                <Lbl>FATCA Filing</Lbl>
                <Sel value={f.fatca} onChange={e => upd('fatca', e.target.value)} options={['Exempt', 'Not Exempt', 'N/A']} placeholder="Select…" />
              </div>
              <div>
                <Lbl req>Federal Tax ID</Lbl>
                <Inp value={f.fedTaxId} onChange={e => upd('fedTaxId', e.target.value)} placeholder="XX-XXXXXXX" />
              </div>
              <div>
                <Lbl>Tax ID Type</Lbl>
                <Sel value={f.taxIdType} onChange={e => upd('taxIdType', e.target.value)} options={['EIN', 'SSN', 'ITIN', 'Foreign TIN']} placeholder="Select…" />
              </div>
              <div>
                <Lbl>1099 Box</Lbl>
                <Sel value={f.box1099} onChange={e => upd('box1099', e.target.value)} options={BOX_1099} placeholder="Select…" />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 12px', backgroundColor: C.blueLight, borderRadius: 2, border: `1px solid ${C.blue}20`,
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Foreign Entity Indicator</span>
                <Toggle checked={f.foreignEntity} onChange={v => upd('foreignEntity', v)} />
              </div>
              <div>
                <Lbl>Entity Type</Lbl>
                <Sel value={f.entityType} onChange={e => upd('entityType', e.target.value)} options={ENTITY_TYPES} placeholder="Select…" />
              </div>
              <div style={s3}>
                <Lbl>Name to Use on 1099</Lbl>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Vendor Name', 'DBA'].map(opt => (
                    <button key={opt} onClick={() => upd('nameOn1099', opt)} style={{
                      flex: 1, padding: 8, borderRadius: 2, cursor: 'pointer', fontSize: 13, fontWeight: 700,
                      border: `2px solid ${f.nameOn1099 === opt ? C.blue : C.border}`,
                      backgroundColor: f.nameOn1099 === opt ? C.blueLight : 'transparent',
                      color: f.nameOn1099 === opt ? C.blue : C.textSec,
                      fontFamily: "'Segoe UI',system-ui,sans-serif",
                    }}>{opt}</button>
                  ))}
                </div>
              </div>
              <div style={s3}>
                <ApiNote>On approval → POST /VendVendorEntity · Vendor created in D365 F&O</ApiNote>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingBottom: 20 }}>
          <button onClick={onCancel} style={{
            padding: '7px 18px', border: `1px solid ${C.border}`, backgroundColor: 'transparent',
            borderRadius: 2, cursor: 'pointer', fontSize: 13, color: C.textSec,
            fontFamily: "'Segoe UI',system-ui,sans-serif",
          }}>Cancel</button>
          <button style={{
            padding: '7px 18px', border: `1px solid ${C.border}`, backgroundColor: 'transparent',
            borderRadius: 2, cursor: 'pointer', fontSize: 13, color: C.text,
            fontFamily: "'Segoe UI',system-ui,sans-serif",
          }}>Save as Draft</button>
          <button onClick={handleSubmit} style={{
            padding: '7px 22px', backgroundColor: C.blue, color: 'white', border: 'none',
            borderRadius: 2, cursor: 'pointer', fontSize: 13, fontWeight: 700,
            fontFamily: "'Segoe UI',system-ui,sans-serif",
          }}>
            {onResubmit ? 'Resubmit for Approval' : role === 'ap' ? 'Approve & Submit to D365' : 'Submit for AP Review'}
          </button>
        </div>
      </div>
    </div>
  );
}
