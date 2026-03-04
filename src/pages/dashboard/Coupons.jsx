import { useState } from 'react';
import { Plus, Copy, Trash2 } from 'lucide-react';
import './Dashboard.css';

const initialCoupons = [
    { code: 'FESTIVAL20', discount: '20% OFF', type: 'Percentage', uses: '45/100', expiry: '31 Mar 2025', active: true },
    { code: 'NEWCUST50', discount: '₹50 OFF', type: 'Flat', uses: '12/50', expiry: '15 Apr 2025', active: true },
    { code: 'HOLI30', discount: '30% OFF', type: 'Percentage', uses: '100/100', expiry: '25 Mar 2025', active: false },
];

export default function Coupons() {
    const [coupons, setCoupons] = useState(initialCoupons);
    const [showCreate, setShowCreate] = useState(false);

    return (
        <div>
            <div className="db-page-header">
                <div><h1>Coupons & Offers</h1><p>Create discount codes, seasonal offers, and festival campaigns.</p></div>
                <button className="btn btn-primary btn-sm" onClick={() => setShowCreate(true)}><Plus size={14} /> Create Coupon</button>
            </div>

            <div className="db-stat-grid" style={{ marginBottom: '24px' }}>
                {[{ label: 'Active Coupons', value: coupons.filter(c => c.active).length },
                { label: 'Total Redeemed', value: 157 },
                { label: 'Revenue via Coupons', value: '₹22,400' },
                { label: 'Avg. Discount', value: '18%' }].map((s, i) => (
                    <div key={i} className="db-stat-card card">
                        <div className="db-stat-value" style={{ fontSize: '26px' }}>{s.value}</div>
                        <div className="db-stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                {coupons.map((c, i) => (
                    <div key={i} className="coupon-card" style={{ opacity: c.active ? 1 : 0.55 }}>
                        <div style={{ flex: 1 }}>
                            <div className="coupon-code">{c.code}</div>
                            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontWeight: 700, fontSize: 16 }}>{c.discount}</span>
                                <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{c.type} • Used: {c.uses} • Expires: {c.expiry}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span className={`badge ${c.active ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '11px', textAlign: 'center' }}>{c.active ? 'Active' : 'Expired'}</span>
                            <button className="btn btn-outline btn-sm" style={{ padding: '5px 8px' }} onClick={() => navigator.clipboard.writeText(c.code)}><Copy size={12} /></button>
                            <button className="btn btn-sm" style={{ padding: '5px 8px', background: 'rgba(239,68,68,0.1)', color: 'var(--red)' }} onClick={() => setCoupons(coupons.filter((_, j) => j !== i))}><Trash2 size={12} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Festival Banners */}
            <div className="card">
                <h3 style={{ marginBottom: '16px' }}>🎉 Festival Sale Banners</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                    {['🪔 Diwali Sale', '🎆 New Year Offer', '💛 Holi Deals', '🎉 Onam Sale', '🎄 Christmas Sale', '🌙 Eid Special'].map((b, i) => (
                        <button key={i} className="btn btn-outline" style={{ flexDirection: 'column', height: '80px', gap: '6px', fontSize: '13px' }}>
                            <span style={{ fontSize: 24 }}>{b.split(' ')[0]}</span>
                            {b.split(' ').slice(1).join(' ')}
                        </button>
                    ))}
                </div>
            </div>

            {showCreate && (
                <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                    <div className="modal-box card" onClick={e => e.stopPropagation()}>
                        <h3 style={{ marginBottom: '20px' }}>Create New Coupon</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div className="form-group"><label>Coupon Code</label><input placeholder="e.g. SAVE20" style={{ textTransform: 'uppercase' }} /></div>
                            <div className="form-grid-2">
                                <div className="form-group"><label>Discount Type</label><select><option>Percentage</option><option>Flat Amount</option></select></div>
                                <div className="form-group"><label>Discount Value</label><input type="number" placeholder="20" /></div>
                            </div>
                            <div className="form-grid-2">
                                <div className="form-group"><label>Usage Limit</label><input type="number" placeholder="100" /></div>
                                <div className="form-group"><label>Expiry Date</label><input type="date" /></div>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                <button className="btn btn-outline" onClick={() => setShowCreate(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={() => { setShowCreate(false); }}>Create Coupon</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
