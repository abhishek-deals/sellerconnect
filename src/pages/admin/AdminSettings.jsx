import { useState } from 'react';
import { Save } from 'lucide-react';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        commission: '5',
        minOrder: '199',
        selfDelivery: { '0-2': '10', '2-5': '20', '5-10': '30' },
        riderDelivery: { '0-2': '25', '2-5': '40', '5-10': '60' },
        riderPayout: { '0-2': '20', '2-5': '30', '5-10': '45' },
        serviceFee: '5',
        setupFee: { Starter: '999', Growth: '1999', Pro: '2999' },
        subscriptionFee: { Starter: '499', Growth: '999', Pro: '1999' },
        pickupEnabled: true,
        riderEnabled: true,
    });
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const S = ({ label, value, onChange, prefix = '₹', suffix = '' }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <label style={{ fontSize: 13, color: 'var(--gray-700)', fontWeight: 500 }}>{label}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {prefix && <span style={{ fontSize: 14, color: 'var(--gray-500)' }}>{prefix}</span>}
                <input
                    type="number"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    style={{ width: 90, padding: '5px 10px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, fontWeight: 600, textAlign: 'right' }}
                />
                {suffix && <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>{suffix}</span>}
            </div>
        </div>
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>Platform Settings</h2>
                    <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Configure commission, delivery rules, and subscription plans</p>
                </div>
                <button onClick={handleSave} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Save size={16} /> {saved ? '✓ Saved!' : 'Save Settings'}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Commission & Fees */}
                <div className="admin-table-card">
                    <div className="admin-table-header"><h3>Commission & Service Fees</h3></div>
                    <div style={{ padding: '16px 20px' }}>
                        <S label="Platform Commission %" prefix="%" suffix="per order"
                            value={settings.commission}
                            onChange={v => setSettings(p => ({ ...p, commission: v }))} />
                        <S label="Platform Service Fee per Order"
                            value={settings.serviceFee}
                            onChange={v => setSettings(p => ({ ...p, serviceFee: v }))} />
                        <S label="Minimum Order Value (Rider Delivery)"
                            value={settings.minOrder}
                            onChange={v => setSettings(p => ({ ...p, minOrder: v }))} />
                    </div>
                </div>

                {/* Subscription Plans */}
                <div className="admin-table-card">
                    <div className="admin-table-header"><h3>Subscription Pricing</h3></div>
                    <div style={{ padding: '16px 20px' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-400)', marginBottom: 12, textTransform: 'uppercase' }}>Monthly Subscription</div>
                        <S label="Starter Plan" value={settings.subscriptionFee.Starter}
                            onChange={v => setSettings(p => ({ ...p, subscriptionFee: { ...p.subscriptionFee, Starter: v } }))} />
                        <S label="Growth Plan" value={settings.subscriptionFee.Growth}
                            onChange={v => setSettings(p => ({ ...p, subscriptionFee: { ...p.subscriptionFee, Growth: v } }))} />
                        <S label="Pro Plan" value={settings.subscriptionFee.Pro}
                            onChange={v => setSettings(p => ({ ...p, subscriptionFee: { ...p.subscriptionFee, Pro: v } }))} />
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-400)', margin: '16px 0 12px', textTransform: 'uppercase' }}>One-time Setup Fee</div>
                        <S label="Starter Setup" value={settings.setupFee.Starter}
                            onChange={v => setSettings(p => ({ ...p, setupFee: { ...p.setupFee, Starter: v } }))} />
                        <S label="Growth Setup" value={settings.setupFee.Growth}
                            onChange={v => setSettings(p => ({ ...p, setupFee: { ...p.setupFee, Growth: v } }))} />
                        <S label="Pro Setup" value={settings.setupFee.Pro}
                            onChange={v => setSettings(p => ({ ...p, setupFee: { ...p.setupFee, Pro: v } }))} />
                    </div>
                </div>

                {/* Self Delivery Rates */}
                <div className="admin-table-card">
                    <div className="admin-table-header"><h3>Self Delivery Charge Rules</h3></div>
                    <div style={{ padding: '16px 20px' }}>
                        <S label="0–2 km" value={settings.selfDelivery['0-2']}
                            onChange={v => setSettings(p => ({ ...p, selfDelivery: { ...p.selfDelivery, '0-2': v } }))} />
                        <S label="2–5 km" value={settings.selfDelivery['2-5']}
                            onChange={v => setSettings(p => ({ ...p, selfDelivery: { ...p.selfDelivery, '2-5': v } }))} />
                        <S label="5–10 km" value={settings.selfDelivery['5-10']}
                            onChange={v => setSettings(p => ({ ...p, selfDelivery: { ...p.selfDelivery, '5-10': v } }))} />
                    </div>
                </div>

                {/* Rider Delivery Rates */}
                <div className="admin-table-card">
                    <div className="admin-table-header"><h3>Platform Rider Delivery Rates</h3></div>
                    <div style={{ padding: '16px 20px' }}>
                        <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 12 }}>Customer charges (Rider earns ≈75%)</div>
                        <S label="0–2 km — Customer charge" value={settings.riderDelivery['0-2']}
                            onChange={v => setSettings(p => ({ ...p, riderDelivery: { ...p.riderDelivery, '0-2': v } }))} />
                        <S label="2–5 km — Customer charge" value={settings.riderDelivery['2-5']}
                            onChange={v => setSettings(p => ({ ...p, riderDelivery: { ...p.riderDelivery, '2-5': v } }))} />
                        <S label="5–10 km — Customer charge" value={settings.riderDelivery['5-10']}
                            onChange={v => setSettings(p => ({ ...p, riderDelivery: { ...p.riderDelivery, '5-10': v } }))} />
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-400)', margin: '16px 0 12px', textTransform: 'uppercase' }}>Rider Payout</div>
                        <S label="0–2 km — Rider earns" value={settings.riderPayout['0-2']}
                            onChange={v => setSettings(p => ({ ...p, riderPayout: { ...p.riderPayout, '0-2': v } }))} />
                        <S label="2–5 km — Rider earns" value={settings.riderPayout['2-5']}
                            onChange={v => setSettings(p => ({ ...p, riderPayout: { ...p.riderPayout, '2-5': v } }))} />
                        <S label="5–10 km — Rider earns" value={settings.riderPayout['5-10']}
                            onChange={v => setSettings(p => ({ ...p, riderPayout: { ...p.riderPayout, '5-10': v } }))} />
                    </div>
                </div>
            </div>

            {/* Feature Toggles */}
            <div className="admin-table-card" style={{ marginTop: 20 }}>
                <div className="admin-table-header"><h3>Feature Toggles</h3></div>
                <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    {/* COD — permanently disabled */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(239,68,68,0.05)', borderRadius: 10, border: '1px solid rgba(239,68,68,0.15)', opacity: 0.7 }}>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700 }}>Cash on Delivery (COD)</div>
                            <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 600, marginTop: 2 }}>🚫 Permanently Disabled</div>
                        </div>
                        <span style={{ fontSize: 11, background: 'rgba(239,68,68,0.15)', color: '#ef4444', padding: '3px 10px', borderRadius: 999, fontWeight: 800 }}>OFF</span>
                    </div>
                    {[
                        { key: 'pickupEnabled', label: 'Pickup Mode' },
                        { key: 'riderEnabled', label: 'Platform Rider Delivery' },
                    ].map(f => (
                        <div key={f.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-base)', borderRadius: 10 }}>
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{f.label}</span>
                            <button onClick={() => setSettings(p => ({ ...p, [f.key]: !p[f.key] }))}
                                style={{ width: 44, height: 24, borderRadius: 999, border: 'none', background: settings[f.key] ? '#6366f1' : '#d1d5db', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                                <span style={{ position: 'absolute', top: 2, left: settings[f.key] ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
