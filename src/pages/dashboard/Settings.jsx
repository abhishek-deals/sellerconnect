import { useState } from 'react';
import { Globe, Bell, Shield, CreditCard, Store, Truck, Receipt } from 'lucide-react';
import './Dashboard.css';

export default function Settings() {
    const [lang, setLang] = useState('English');
    const [notifications, setNotifications] = useState({ orders: true, payments: true, lowStock: true, marketing: false });
    const [deliveryType, setDeliveryType] = useState('self');
    const [deliveryRadius, setDeliveryRadius] = useState('5');
    const [pickupEnabled, setPickupEnabled] = useState(true);
    const [minOrder, setMinOrder] = useState('199');
    const [gstin, setGstin] = useState('');

    return (
        <div>
            <div className="db-page-header">
                <div><h1>Settings</h1><p>Manage your shop preferences, language, and account settings.</p></div>
                <button className="btn btn-primary btn-sm">Save All Changes</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Shop Info */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <div className="icon-box icon-box-blue"><Store size={20} /></div>
                        <h3>Shop Information</h3>
                    </div>
                    <div className="form-grid-2">
                        <div className="form-group"><label>Shop Name</label><input defaultValue="Ramesh Kirana Store" /></div>
                        <div className="form-group"><label>Owner Name</label><input defaultValue="Ramesh Kumar" /></div>
                        <div className="form-group"><label>Phone</label><input type="tel" defaultValue="+91 98765 43210" /></div>
                        <div className="form-group"><label>Email</label><input type="email" defaultValue="ramesh@example.com" /></div>
                        <div className="form-group"><label>City</label><input defaultValue="Bhubaneswar" /></div>
                        <div className="form-group"><label>Pincode</label><input defaultValue="751001" /></div>
                    </div>
                    <div className="form-group" style={{ marginTop: '4px' }}><label>Shop Address</label><textarea className="ai-textarea" rows={2} defaultValue="Plot 42, Unit-4, Bhubaneswar, Odisha 751001" /></div>
                    <div className="form-group" style={{ marginTop: '4px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Receipt size={14} /> GSTIN (optional)</label>
                        <input placeholder="e.g. 21AAAAA0000A1Z5" value={gstin} onChange={e => setGstin(e.target.value.toUpperCase())} style={{ letterSpacing: gstin ? 1.5 : 0 }} />
                        <span style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4, display: 'block' }}>Your GST Identification Number for GST invoices</span>
                    </div>
                </div>

                {/* Language */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <div className="icon-box icon-box-purple"><Globe size={20} /></div>
                        <h3>Language / भाषा / ଭାଷା</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {['English', 'हिंदी (Hindi)', 'ଓଡ଼ିଆ (Odia)'].map(l => (
                            <button key={l} className={`radius-btn ${lang === l ? 'active' : ''}`} onClick={() => setLang(l)}>{l}</button>
                        ))}
                    </div>
                </div>

                {/* Notifications */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <div className="icon-box icon-box-green"><Bell size={20} /></div>
                        <h3>Notifications</h3>
                    </div>
                    {[
                        ['orders', 'New Order Alerts'],
                        ['payments', 'Payment Received'],
                        ['lowStock', 'Low Stock Warnings'],
                        ['marketing', 'Marketing Updates'],
                    ].map(([key, label]) => (
                        <div key={key} className="flex-between" style={{ padding: '14px 0', borderBottom: '1px solid var(--gray-100)' }}>
                            <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
                            <button className={`toggle-btn ${notifications[key] ? 'on' : ''}`} onClick={() => setNotifications({ ...notifications, [key]: !notifications[key] })}>
                                <div className="toggle-thumb"></div>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Delivery Settings */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <div className="icon-box icon-box-green"><Truck size={20} /></div>
                        <h3>Delivery Settings</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8, color: 'var(--gray-700)' }}>Delivery Type</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {['self', 'rider', 'pickup'].map(t => (
                                    <button key={t}
                                        onClick={() => setDeliveryType(t)}
                                        className={`radius-btn ${deliveryType === t ? 'active' : ''}`}>
                                        {t === 'self' ? '🏪 Self Delivery' : t === 'rider' ? '🛵 Platform Rider' : '📦 Pickup Only'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8, color: 'var(--gray-700)' }}>Delivery Radius</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {['3', '5', '10'].map(r => (
                                    <button key={r}
                                        onClick={() => setDeliveryRadius(r)}
                                        className={`radius-btn ${deliveryRadius === r ? 'active' : ''}`}>
                                        {r} km
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-between" style={{ padding: '14px 0', borderTop: '1px solid var(--gray-100)', opacity: 0.5 }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>Cash on Delivery (COD)</div>
                                <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 600 }}>❌ Disabled — Platform uses online payments only</div>
                            </div>
                            <span style={{ fontSize: 12, background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '4px 10px', borderRadius: 999, fontWeight: 700 }}>Disabled</span>
                        </div>
                        <div className="flex-between" style={{ padding: '14px 0', borderTop: '1px solid var(--gray-100)' }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>Pickup Available</div>
                                <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>Let customers pick up from your shop</div>
                            </div>
                            <button className={`toggle-btn ${pickupEnabled ? 'on' : ''}`} onClick={() => setPickupEnabled(!pickupEnabled)}><div className="toggle-thumb"></div></button>
                        </div>
                        <div className="form-group">
                            <label>Minimum Order Value (for delivery)</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontWeight: 700, color: 'var(--gray-600)' }}>₹</span>
                                <input type="number" value={minOrder} onChange={e => setMinOrder(e.target.value)} style={{ maxWidth: 140 }} />
                            </div>
                            <span style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4, display: 'block' }}>Orders below this amount cannot choose rider delivery</span>
                        </div>
                    </div>
                </div>

                {/* Plan */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <div className="icon-box icon-box-orange"><CreditCard size={20} /></div>
                        <h3>Current Plan</h3>
                    </div>
                    <div className="flex-between" style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 'var(--radius)', padding: '16px 20px' }}>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: 18 }}>🚀 Growth Plan</div>
                            <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>₹3,499/month • Renews on 1 Apr 2025</div>
                        </div>
                        <button className="btn btn-primary btn-sm">Upgrade to Pro</button>
                    </div>
                </div>

                {/* Security */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <div className="icon-box icon-box-purple"><Shield size={20} /></div>
                        <h3>Security</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button className="btn btn-outline" style={{ width: 'fit-content' }}>Change Password</button>
                        <button className="btn btn-outline" style={{ width: 'fit-content' }}>Enable Two-Factor Authentication</button>
                        <button className="btn btn-sm" style={{ width: 'fit-content', background: 'rgba(239,68,68,0.1)', color: 'var(--red)', border: 'none' }}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
