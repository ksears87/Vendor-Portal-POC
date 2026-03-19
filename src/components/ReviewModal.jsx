import { useState } from 'react';
import { C, iSt } from '../constants';
import { D365_VENDORS } from '../mockData';
import { detectDupes } from '../utils';
import { Badge, GroupTag, Lbl, ApiNote } from './shared';

export default function ReviewModal({ req, role, onClose, onUpdate, onEditResubmit, onDelete }) {
  const [decision, setDecision] = useState('');
  const [notes, setNotes] = useState(req.apNotes || '');
  const [done, setDone] = useState(false);

  // Merge stored dupIds with fresh detection so AP always sees complete results
  // even if requester bypassed warnings at submission time
  const storedDupes = req.dupIds?.map(id => D365_VENDORS.find(v => v.id === id)).filter(Boolean) || [];
  const freshDupes = detectDupes(req.vendorName);
  const allDupeIds = new Set([...storedDupes.map(d => d.id), ...freshDupes.map(d => d.id)]);
  const dupes = [...allDupeIds].map(id => D365_VENDORS.find(v => v.id === id)).filter(Boolean);

  const markPending = () => { onUpdate({ ...req, status: 'Pending' }); onClose(); };

  const submit = () => {
    if (!decision) return;
    setDone(true);
    setTimeout(() => { onUpdate({ ...req, status: decision, apNotes: notes }); onClose(); }, 1400);
  };

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, minHeight: 600,
      backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'flex-start',
      justifyContent: 'center', zIndex: 500, paddingTop: 40, paddingBottom: 40, boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%', maxWidth: 620, backgroundColor: C.surface,
        borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,.25)', overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '13px 18px', borderBottom: `1px solid ${C.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          backgroundColor: C.surface,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.text }}>
                {role === 'ap' ? 'Review Vendor Request' : 'Request Details'}
              </h2>
              <Badge status={req.status} />
            </div>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: C.textSec }}>
              {req.id} · {req.vendorName} · Submitted by {req.requester}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: 18, cursor: 'pointer',
            color: C.textMuted, lineHeight: 1, padding: 4,
          }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: 18, maxHeight: '60vh', overflowY: 'auto' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '28px 20px' }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>
                {decision === 'Approved' ? '✅' : decision === 'Rejected' ? '❌' : '⏸️'}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Request {decision}!</div>
              <div style={{ fontSize: 12, color: C.textSec, marginTop: 6 }}>
                {decision === 'Approved' ? 'Creating vendor record in D365 F&O…' : 'Notifying requester…'}
              </div>
              <ApiNote>
                {decision === 'Approved' ? 'POST /VendVendorEntity · Assigning VEN-XXXXX' : 'PATCH /VendorRequestEntity · Status = Rejected'}
              </ApiNote>
            </div>
          ) : role === 'ap' ? (
            <>
              {/* Info chips */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                {[['Vendor', req.vendorName], ['Group', req.vendorGroup], ['Class', req.classification || '—'], ['Submitted', req.submitted]].map(([l, v]) => (
                  <div key={l} style={{
                    padding: '6px 10px', backgroundColor: C.surfaceAlt, borderRadius: 2, flex: 1, minWidth: 100,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Duplicates */}
              {dupes.length > 0 && (
                <div style={{
                  padding: '10px 12px', backgroundColor: C.warnBg,
                  border: `1.5px solid ${C.warn}50`, borderRadius: 3, marginBottom: 14,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.warn, marginBottom: 8 }}>
                    ⚠️ {dupes.length} Potential Duplicate{dupes.length > 1 ? 's' : ''} in D365
                  </div>
                  {dupes.map(d => (
                    <div key={d.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '5px 8px', backgroundColor: C.surface, borderRadius: 2,
                      marginBottom: 4, fontSize: 12, border: `1px solid ${C.border}`,
                    }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: C.blue, fontFamily: 'monospace' }}>{d.id}</span>
                        <span style={{ fontWeight: 600 }}>{d.name}</span>
                        <GroupTag g={d.group} />
                      </div>
                      <span style={{ fontWeight: 600, color: d.status === 'On Hold' ? C.warn : C.success }}>
                        {d.status === 'On Hold' ? '⚠️ ' : '● '}{d.status}
                      </span>
                    </div>
                  ))}
                  <ApiNote>Verified via GET /VendVendorEntity</ApiNote>
                </div>
              )}

              {/* Previous notes */}
              {req.apNotes && (
                <div style={{
                  padding: '8px 12px', backgroundColor: C.infoBg,
                  border: `1px solid ${C.blue}20`, borderRadius: 3, marginBottom: 14, fontSize: 12,
                }}>
                  <span style={{ fontWeight: 700, color: C.blue }}>Previous notes: </span>{req.apNotes}
                </div>
              )}

              {/* Triage banner — shown only for Received requests */}
              {req.status === 'Received' && (
                <div style={{
                  padding: '10px 14px', backgroundColor: C.blueLight,
                  border: `1.5px solid ${C.blue}30`, borderRadius: 3, marginBottom: 14,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.blue, marginBottom: 2 }}>
                      📥 Not yet picked up
                    </div>
                    <div style={{ fontSize: 12, color: C.textSec }}>
                      Mark as Pending Review to begin your assessment, or decide below to resolve immediately.
                    </div>
                  </div>
                  <button onClick={markPending} style={{
                    padding: '6px 14px', backgroundColor: C.blue, color: 'white',
                    border: 'none', borderRadius: 2, cursor: 'pointer', whiteSpace: 'nowrap',
                    fontSize: 12, fontWeight: 700, fontFamily: "'Segoe UI',system-ui,sans-serif", flexShrink: 0,
                  }}>Mark as Pending Review</button>
                </div>
              )}

              {/* Decision */}
              <div style={{ marginBottom: 14 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: C.textSec,
                  textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8,
                }}>Decision</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { v: 'Approved', l: 'Approve', icon: '✅', fg: C.success, bg: C.successBg },
                    { v: 'Rejected', l: 'Reject', icon: '❌', fg: C.err, bg: C.errBg },
                  ].map(({ v, l, icon, fg, bg }) => (
                    <button key={v} onClick={() => setDecision(v)} style={{
                      flex: 1, padding: '10px 6px', borderRadius: 2, cursor: 'pointer',
                      fontSize: 13, fontWeight: 700, fontFamily: "'Segoe UI',system-ui,sans-serif",
                      border: `2px solid ${decision === v ? fg : C.border}`,
                      backgroundColor: decision === v ? bg : 'transparent',
                      color: decision === v ? fg : C.textSec,
                    }}>
                      <span style={{ fontSize: 15, display: 'block', marginBottom: 2 }}>{icon}</span>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: 14 }}>
                <Lbl req={decision === 'Rejected'}>Notes to Requester</Lbl>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={4}
                  placeholder={decision === 'Rejected' ? 'Explain why and what the requester should do next…' : 'Optional notes for the requester…'}
                  style={{ ...iSt, resize: 'vertical' }}
                />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button onClick={onClose} style={{
                  padding: '7px 16px', border: `1px solid ${C.border}`,
                  backgroundColor: 'transparent', borderRadius: 2, cursor: 'pointer',
                  fontSize: 13, color: C.textSec, fontFamily: "'Segoe UI',system-ui,sans-serif",
                }}>Cancel</button>
                <button
                  onClick={submit}
                  disabled={!decision || (decision === 'Rejected' && !notes.trim())}
                  style={{
                    padding: '7px 20px', borderRadius: 2, border: 'none',
                    cursor: !decision ? 'not-allowed' : 'pointer',
                    fontSize: 13, fontWeight: 700, fontFamily: "'Segoe UI',system-ui,sans-serif",
                    backgroundColor: !decision ? C.border : decision === 'Approved' ? C.success : decision === 'Rejected' ? C.err : C.warn,
                    color: !decision ? C.textMuted : 'white',
                  }}
                >Submit Decision</button>
              </div>
            </>
          ) : (
            /* Requester read-only view */
            <>
              {/* Info chips */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                {[['Vendor', req.vendorName], ['Group', req.vendorGroup], ['Class', req.classification || '—'], ['Submitted', req.submitted]].map(([l, v]) => (
                  <div key={l} style={{
                    padding: '6px 10px', backgroundColor: C.surfaceAlt, borderRadius: 2, flex: 1, minWidth: 100,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* AP Feedback — read-only */}
              {req.apNotes && (
                <div style={{
                  padding: '10px 14px',
                  backgroundColor: req.status === 'Rejected' ? C.errBg : C.infoBg,
                  border: `1.5px solid ${req.status === 'Rejected' ? C.err + '40' : C.blue + '30'}`,
                  borderRadius: 3,
                  marginBottom: 16,
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700,
                    color: req.status === 'Rejected' ? C.err : C.blue,
                    textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4,
                  }}>
                    AP Feedback
                  </div>
                  <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{req.apNotes}</div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
                {req.status === 'Rejected' && (
                  <>
                    <button
                      onClick={() => onDelete(req.id)}
                      style={{
                        padding: '7px 16px', border: `1px solid ${C.err}`,
                        backgroundColor: 'transparent', borderRadius: 2, cursor: 'pointer',
                        fontSize: 13, color: C.err, fontWeight: 700,
                        fontFamily: "'Segoe UI',system-ui,sans-serif",
                      }}
                    >Delete Request</button>
                    <button
                      onClick={() => onEditResubmit(req)}
                      style={{
                        padding: '7px 20px', backgroundColor: C.blue, color: 'white',
                        border: 'none', borderRadius: 2, cursor: 'pointer',
                        fontSize: 13, fontWeight: 700,
                        fontFamily: "'Segoe UI',system-ui,sans-serif",
                      }}
                    >Edit &amp; Resubmit</button>
                  </>
                )}
                <button onClick={onClose} style={{
                  padding: '7px 16px', border: `1px solid ${C.border}`,
                  backgroundColor: 'transparent', borderRadius: 2, cursor: 'pointer',
                  fontSize: 13, color: C.textSec, fontFamily: "'Segoe UI',system-ui,sans-serif",
                }}>Close</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
