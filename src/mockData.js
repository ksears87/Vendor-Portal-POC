export const D365_VENDORS = [
  { id: 'VEN-00142', name: 'Acme Corporation', taxId: '12-3456789', group: 'SUPPLIER', status: 'Active', city: 'Chicago, IL' },
  { id: 'VEN-00089', name: 'Acme Corp LLC', taxId: '12-3456789', group: 'SUPPLIER', status: 'Active', city: 'Chicago, IL' },
  { id: 'VEN-00201', name: 'Global Services Inc', taxId: '45-6789012', group: 'SERVICE', status: 'Active', city: 'New York, NY' },
  { id: 'VEN-00178', name: 'Global Service Solutions', taxId: '45-6789012', group: 'SERVICE', status: 'Active', city: 'New York, NY' },
  { id: 'VEN-00055', name: 'Tech Supplies Co', taxId: '78-9012345', group: 'SUPPLIER', status: 'Active', city: 'Austin, TX' },
  { id: 'VEN-00312', name: 'Premier Staffing Group', taxId: '23-4567890', group: 'SERVICE', status: 'Active', city: 'Denver, CO' },
  { id: 'VEN-00445', name: 'Pacific Rim Traders', taxId: '56-7890123', group: 'SUPPLIER', status: 'Active', city: 'Seattle, WA' },
  { id: 'VEN-00502', name: 'Elite Events LLC', taxId: '67-8901234', group: 'SERVICE', status: 'Active', city: 'Las Vegas, NV' },
  { id: 'VEN-00610', name: 'Mountain Tech Group', taxId: '89-0123456', group: 'CONTRACTOR', status: 'Active', city: 'Denver, CO' },
];

export const SEED = [
  { id: 'REQ-2025-0041', vendorName: 'Pacific Rim Trading Co', vendorGroup: 'SUPPLIER', requester: 'Sarah Johnson', resort: 'RST-001 – Grand Mountain', submitted: '2025-03-10', status: 'Pending', classification: 'Goods/Products', dupIds: ['VEN-00445'], apNotes: '' },
  { id: 'REQ-2025-0040', vendorName: 'Elite Event Services', vendorGroup: 'SERVICE', requester: 'Mike Torres', resort: 'RST-002 – Lakeside Lodge', submitted: '2025-03-09', status: 'On Hold', classification: 'Services', dupIds: ['VEN-00502'], apNotes: 'Potential duplicate — verifying with requester.' },
  { id: 'REQ-2025-0039', vendorName: 'Johnson, Robert M', vendorGroup: 'EMPLOYEE', requester: 'Lisa Chen', resort: 'RST-001 – Grand Mountain', submitted: '2025-03-08', status: 'Approved', classification: 'Services', dupIds: [], apNotes: '' },
  { id: 'REQ-2025-0038', vendorName: 'Coastal Supply Group', vendorGroup: 'SUPPLIER', requester: 'Sarah Johnson', resort: 'RST-003 – Beach Paradise', submitted: '2025-03-07', status: 'Rejected', classification: 'Goods/Products', dupIds: [], apNotes: 'Vendor already exists as VEN-00055. Please use existing vendor record.' },
  { id: 'REQ-2025-0037', vendorName: 'Northeast Consulting LLC', vendorGroup: 'SERVICE', requester: 'David Park', resort: 'RST-004 – Forest Retreat', submitted: '2025-03-06', status: 'Approved', classification: 'Services', dupIds: [], apNotes: '' },
  { id: 'REQ-2025-0035', vendorName: 'Mountain Tech Solutions', vendorGroup: 'CONTRACTOR', requester: 'Mike Torres', resort: 'RST-001 – Grand Mountain', submitted: '2025-03-04', status: 'Pending', classification: 'Services', dupIds: ['VEN-00610'], apNotes: '' },
];
