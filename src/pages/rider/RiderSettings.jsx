import { useState } from 'react';
import { User, Truck, CreditCard, Bell, Shield, Save } from 'lucide-react';
import '../admin/Admin.css';

export default function RiderSettings() {
    const [saved, setSaved] = useState(false);
    const [profile, setProfile] = useState({
        fullName: 'Ankit Verma',
        phone: '+91 98007 12345',
        email: 'ankit@example.com',
        city: 'Bhubaneswar',
        aadhaar: 'XXXX XXXX 6789',
        license: 'OD-1420110099999',
    });
    const [vehicle, setVehicle] = useState({
        type: '🛵 Scooter',
        number: 'OD 05 AX 7890',
    });
    const [bank, setBank] = useState({
        accountNumber: '•••• •••• 4521',
        ifsc: 'HDFC0004567',
        bankName: 'HDFC Bank',
        upiId: 'ankit@hdfc',
    });
    const [notifications, setNotifications] = useState({
        newOrder: true,
        earnings: true,
        bonuses: true,
        appUpdates: false,
    });

    const upd = (setter, key, val) => setter(prev => ({ ...prev, [key]: val }));
    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

    const Field = ({ label, value, onChange, type = 'text' }) => (
        <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
            <input type={type} value={value} onChange={e => onChange(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14, outline: 'none', background: '#fff', boxSizing: 'border-box' }}
            />
        </div>
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>My Settings</h2>
                    <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Manage your profile, vehicle, and bank details</p>
                </div>
                <button onClick={handleSave} className="btn-accept" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, fontSize: 14 }}>
                    <Save size={15} /> {saved ? '✓ Saved!' : 'Save Changes'}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* Personal Info */}
                <div className="admin-table-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="admin-table-header">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><User size={16} color="#6366f1" /> Personal Info</h3>
                    </div>
                    <div style={{ padding: 20 }}>
                        <Field label="Full Name" value={profile.fullName} onChange={v => upd(setProfile, 'fullName', v)} />
                        <Field label="Phone" value={profile.phone} onChange={v => upd(setProfile, 'phone', v)} type="tel" />
                        <Field label="Email" value={profile.email} onChange={v => upd(setProfile, 'email', v)} type="email" />
                        <div style={{ marginBottom: 14 }}>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', marginBottom: 6 }}>City</label>
                            <select value={profile.city} onChange={e => upd(setProfile, 'city', e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 10, fontSize: 14 }}>
                                {['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur'].map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div style={{ padding: '10px 14px', background: 'rgba(99,102,241,0.06)', borderRadius: 10, fontSize: 13, color: 'var(--gray-600)' }}>
                            🔒 Aadhaar & License can only be changed by contacting support.
                        </div>
                    </div>
                </div>

                {/* Vehicle Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="admin-table-card" style={{ padding: 0 }}>
                        <div className="admin-table-header">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Truck size={16} color="#10b981" /> Vehicle Details</h3>
                        </div>
                        <div style={{ padding: 20 }}>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', marginBottom: 6 }}>Vehicle Type</label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {['🚲 Bicycle', '🛵 Scooter', '🏍 Bike'].map(v => (
                                        <button key={v} onClick={() => upd(setVehicle, 'type', v)}
                                            style={{ flex: 1, padding: '8px', border: `2px solid ${vehicle.type === v ? '#10b981' : 'var(--border)'}`, borderRadius: 8, background: vehicle.type === v ? 'rgba(16,185,129,0.08)' : '#fff', color: vehicle.type === v ? '#10b981' : 'var(--gray-700)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Field label="Vehicle Registration Number" value={vehicle.number} onChange={v => upd(setVehicle, 'number', v)} />
                        </div>
                    </div>

                    {/* Bank Info */}
                    <div className="admin-table-card" style={{ padding: 0 }}>
                        <div className="admin-table-header">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CreditCard size={16} color="#f59e0b" /> Bank & UPI</h3>
                        </div>
                        <div style={{ padding: 20 }}>
                            <div style={{ padding: '10px 14px', background: 'rgba(16,185,129,0.06)', borderRadius: 10, fontSize: 13, color: '#047857', fontWeight: 600, marginBottom: 14 }}>
                                💰 Weekly auto-settlement. Minimum withdrawal: ₹500
                            </div>
                            <Field label="Bank Account Number" value={bank.accountNumber} onChange={v => upd(setBank, 'accountNumber', v)} />
                            <Field label="IFSC Code" value={bank.ifsc} onChange={v => upd(setBank, 'ifsc', v)} />
                            <Field label="Bank Name" value={bank.bankName} onChange={v => upd(setBank, 'bankName', v)} />
                            <Field label="UPI ID" value={bank.upiId} onChange={v => upd(setBank, 'upiId', v)} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="admin-table-card" style={{ marginTop: 20 }}>
                <div className="admin-table-header">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Bell size={16} color="#6366f1" /> Notifications</h3>
                </div>
                <div style={{ padding: '8px 20px' }}>
                    {[
                        ['newOrder', 'New Order Alerts', 'Get notified when a new order is nearby'],
                        ['earnings', 'Payment Received', 'When your wallet is credited after delivery'],
                        ['bonuses', 'Bonus Unlocked', 'Daily / weekly bonus alerts'],
                        ['appUpdates', 'App Updates & Announcements', 'Platform news and updates'],
                    ].map(([key, label, desc]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
                                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{desc}</div>
                            </div>
                            <button onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                                style={{ width: 44, height: 24, borderRadius: 999, border: 'none', background: notifications[key] ? '#10b981' : '#d1d5db', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                                <span style={{ position: 'absolute', top: 2, left: notifications[key] ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security */}
            <div className="admin-table-card" style={{ marginTop: 20 }}>
                <div className="admin-table-header">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Shield size={16} color="#ef4444" /> Account Security</h3>
                </div>
                <div style={{ padding: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button style={{ padding: '10px 20px', border: '1px solid var(--border)', borderRadius: 10, background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                        Change Password
                    </button>
                    <button style={{ padding: '10px 20px', border: '1px solid var(--border)', borderRadius: 10, background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                        Enable 2FA
                    </button>
                    <button style={{ padding: '10px 20px', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, background: 'rgba(239,68,68,0.05)', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#ef4444' }}>
                        Deactivate Account
                    </button>
                </div>
            </div>
        </div>
    );
}
