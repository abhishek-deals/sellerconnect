import { DollarSign, ArrowUp, Download } from 'lucide-react';

const history = [
    { date: 'Today (Mar 3)', deliveries: 15, base: '₹450', bonus: '₹90', total: '₹540' },
    { date: 'Yesterday (Mar 2)', deliveries: 18, base: '₹540', bonus: '₹60', total: '₹600' },
    { date: 'Mar 1', deliveries: 12, base: '₹360', bonus: '₹0', total: '₹360' },
    { date: 'Feb 28', deliveries: 20, base: '₹600', bonus: '₹100', total: '₹700' },
    { date: 'Feb 27', deliveries: 14, base: '₹420', bonus: '₹40', total: '₹460' },
    { date: 'Feb 26', deliveries: 16, base: '₹480', bonus: '₹60', total: '₹540' },
    { date: 'Feb 25', deliveries: 13, base: '₹390', bonus: '₹40', total: '₹430' },
];

const weeklyTotal = '₹3,240';
const monthTotal = '₹10,820';

export default function RiderEarnings() {
    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>My Earnings</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Your delivery payout history and bonuses</p>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                    { label: "Today's Earning", value: '₹540', sub: '15 deliveries', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
                    { label: 'This Week', value: weeklyTotal, sub: '108 deliveries', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
                    { label: 'This Month', value: monthTotal, sub: '287 deliveries', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
                ].map((s, i) => (
                    <div key={i} className="admin-stat-card" style={{ border: `2px solid ${s.color}30` }}>
                        <div className="admin-stat-icon" style={{ background: s.bg }}>
                            <DollarSign size={20} color={s.color} />
                        </div>
                        <div className="admin-stat-value" style={{ color: s.color }}>{s.value}</div>
                        <div className="admin-stat-label">{s.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{s.sub}</div>
                    </div>
                ))}
            </div>

            {/* Bonus Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div className="admin-table-card">
                    <div className="admin-table-header"><h3>Bonus Structure</h3></div>
                    <div style={{ padding: '16px 20px' }}>
                        {[
                            { label: 'Base Rate — 0–2 km', value: '₹20/delivery', active: true },
                            { label: 'Base Rate — 2–5 km', value: '₹30/delivery', active: true },
                            { label: 'Base Rate — 5–10 km', value: '₹45/delivery', active: true },
                            { label: 'Peak Hour Bonus (12-2PM, 7-9PM)', value: '+₹20/delivery', active: true },
                            { label: 'Festival Bonus (Active: Holi)', value: '+₹10/delivery', active: true },
                            { label: 'Weekly Target Bonus (₹5,000)', value: '+₹500', active: false },
                        ].map((b, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
                                <span style={{ fontSize: 13, color: b.active ? 'var(--gray-700)' : 'var(--gray-400)' }}>{b.label}</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: b.active ? '#10b981' : 'var(--gray-400)' }}>{b.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-table-card">
                    <div className="admin-table-header">
                        <h3>Wallet & Payout</h3>
                    </div>
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 4 }}>Wallet Balance</div>
                        <div style={{ fontSize: 44, fontWeight: 900, color: '#10b981' }}>₹1,230</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 20 }}>Available for withdrawal</div>
                        <button className="btn-accept" style={{ width: '100%', padding: '12px', borderRadius: 10 }}>
                            Withdraw to Bank Account
                        </button>
                        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--gray-400)' }}>
                            Next auto-settlement: Sunday 11:59 PM
                        </div>
                    </div>
                </div>
            </div>

            {/* History Table */}
            <div className="admin-table-card">
                <div className="admin-table-header">
                    <h3>Delivery History</h3>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                        <Download size={14} /> Export
                    </button>
                </div>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Deliveries</th>
                            <th>Base Pay</th>
                            <th>Bonus</th>
                            <th>Total Earned</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((h, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: i === 0 ? 700 : 500 }}>{h.date}</td>
                                <td>{h.deliveries}</td>
                                <td>{h.base}</td>
                                <td style={{ color: '#f59e0b', fontWeight: 600 }}>{h.bonus}</td>
                                <td style={{ fontWeight: 800, color: '#10b981' }}>{h.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
