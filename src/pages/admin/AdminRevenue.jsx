import { DollarSign, TrendingUp, ArrowUp } from 'lucide-react';

const monthlyData = [
    { month: 'Oct 2025', setup: '₹12,000', subscription: '₹54,000', commission: '₹78,000', delivery: '₹6,800', total: '₹1,50,800' },
    { month: 'Nov 2025', setup: '₹18,000', subscription: '₹68,000', commission: '₹98,400', delivery: '₹9,200', total: '₹1,93,600' },
    { month: 'Dec 2025', setup: '₹24,000', subscription: '₹78,000', commission: '₹1,24,000', delivery: '₹11,600', total: '₹2,37,600' },
    { month: 'Jan 2026', setup: '₹30,000', subscription: '₹84,000', commission: '₹1,36,800', delivery: '₹12,400', total: '₹2,63,200' },
    { month: 'Feb 2026', setup: '₹36,000', subscription: '₹87,000', commission: '₹1,41,600', delivery: '₹12,000', total: '₹2,76,600' },
    { month: 'Mar 2026', setup: '₹48,000', subscription: '₹89,400', commission: '₹1,42,350', delivery: '₹12,600', total: '₹2,92,350' },
];

const subscriptionBreakdown = [
    { plan: 'Starter (₹499/mo)', count: 58, monthly: '₹28,942', color: '#10b981' },
    { plan: 'Growth (₹999/mo)', count: 64, monthly: '₹63,936', color: '#6366f1' },
    { plan: 'Pro (₹1,999/mo)', count: 20, monthly: '₹39,980', color: '#f59e0b' },
];

export default function AdminRevenue() {
    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>Revenue Dashboard</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Track all platform revenue streams</p>
            </div>

            {/* Top Stream Cards */}
            <div className="admin-stats-grid">
                {[
                    { label: 'Setup Fees', value: '₹48,000', sub: '16 new sellers this month', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', icon: <DollarSign size={20} color="#6366f1" /> },
                    { label: 'Subscriptions', value: '₹1,32,858', sub: '142 active plans', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', icon: <TrendingUp size={20} color="#8b5cf6" /> },
                    { label: 'Order Commission (5%)', value: '₹1,42,350', sub: '2,847 orders', color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: <DollarSign size={20} color="#10b981" /> },
                    { label: 'Delivery Margin', value: '₹12,600', sub: '₹10/rider delivery', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: <TrendingUp size={20} color="#f59e0b" /> },
                ].map((s, i) => (
                    <div key={i} className="admin-stat-card">
                        <div className="admin-stat-icon" style={{ background: s.bg }}>{s.icon}</div>
                        <div className="admin-stat-value" style={{ color: s.color }}>{s.value}</div>
                        <div className="admin-stat-label">{s.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{s.sub}</div>
                    </div>
                ))}
            </div>


            {/* Subscription Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div className="admin-table-card">
                    <div className="admin-table-header"><h3>Subscription Plan Breakdown</h3></div>
                    <div style={{ padding: '16px 20px' }}>
                        {subscriptionBreakdown.map((s, i) => (
                            <div key={i} style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{s.plan}</span>
                                    <span style={{ fontSize: 13, fontWeight: 800, color: s.color }}>{s.monthly}</span>
                                </div>
                                <div style={{ height: 8, background: '#f3f4f6', borderRadius: 999, overflow: 'hidden' }}>
                                    <div style={{ width: `${(s.count / 142) * 100}%`, height: '100%', background: s.color, borderRadius: 999 }} />
                                </div>
                                <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3 }}>{s.count} sellers</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-table-card">
                    <div className="admin-table-header"><h3>Total Revenue This Month</h3></div>
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: 48, fontWeight: 900, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            ₹2.92L
                        </div>
                        <div style={{ fontSize: 16, color: 'var(--gray-500)', marginTop: 8 }}>March 2026</div>
                        <div style={{ marginTop: 16, padding: '10px 20px', background: 'rgba(16,185,129,0.1)', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 700 }}>
                            <ArrowUp size={16} /> +5.7% from February
                        </div>
                    </div>
                </div>
            </div>

            {/* Monthly History Table */}
            <div className="admin-table-card">
                <div className="admin-table-header"><h3>Monthly Revenue History</h3></div>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Setup Fees</th>
                            <th>Subscriptions</th>
                            <th>Commission</th>
                            <th>Delivery</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyData.map((m, i) => (
                            <tr key={i} style={i === monthlyData.length - 1 ? { background: 'rgba(99,102,241,0.04)' } : {}}>
                                <td style={{ fontWeight: i === monthlyData.length - 1 ? 700 : 500 }}>{m.month}</td>
                                <td>{m.setup}</td>
                                <td>{m.subscription}</td>
                                <td>{m.commission}</td>
                                <td>{m.delivery}</td>
                                <td style={{ fontWeight: 800, color: '#6366f1' }}>{m.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
