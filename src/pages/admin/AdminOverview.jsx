import { Users, ShoppingCart, Truck, TrendingUp, DollarSign, Store, Activity, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
    { label: 'Total Sellers', value: '142', trend: '+8 this month', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', icon: <Users size={22} color="#6366f1" /> },
    { label: 'Active Riders', value: '38', trend: '+5 this week', color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: <Truck size={22} color="#10b981" /> },
    { label: 'Total Orders', value: '2,847', trend: '+124 today', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: <ShoppingCart size={22} color="#f59e0b" /> },
    { label: 'Platform Revenue', value: '₹4.2L', trend: '+₹28k today', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: <DollarSign size={22} color="#ef4444" /> },
    { label: 'Monthly Subscriptions', value: '₹89,400', trend: '142 active plans', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', icon: <TrendingUp size={22} color="#8b5cf6" /> },
    { label: 'Commission Earned', value: '₹1.8L', trend: 'This month', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', icon: <DollarSign size={22} color="#06b6d4" /> },
];

const recentSellers = [
    { name: 'Ramesh Kirana Store', city: 'Bhubaneswar', plan: 'Growth', status: 'Active', orders: 234, revenue: '₹42,180' },
    { name: 'Priya Fashion Hub', city: 'Cuttack', plan: 'Pro', status: 'Active', orders: 189, revenue: '₹78,450' },
    { name: 'Sonu Electronics', city: 'Puri', plan: 'Starter', status: 'Active', orders: 67, revenue: '₹12,340' },
    { name: 'Anita Sweet Shop', city: 'Bhubaneswar', plan: 'Growth', status: 'Inactive', orders: 23, revenue: '₹4,500' },
];

const recentOrders = [
    { id: '#ORD-2847', seller: 'Ramesh Kirana', amount: '₹360', status: 'Delivered', delivery: 'Rider' },
    { id: '#ORD-2846', seller: 'Priya Fashion', amount: '₹1,240', status: 'Processing', delivery: 'Self' },
    { id: '#ORD-2845', seller: 'Sonu Electronics', amount: '₹5,600', status: 'Pending', delivery: 'Pickup' },
    { id: '#ORD-2844', seller: 'Anita Sweet Shop', amount: '₹180', status: 'Delivered', delivery: 'Rider' },
];

const statusColor = {
    Active: { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
    Inactive: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
    Delivered: { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
    Processing: { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' },
    Pending: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
};

export default function AdminOverview() {
    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>Platform Overview</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Real-time stats for SellerConnect platform</p>
            </div>

            {/* Stats */}
            <div className="admin-stats-grid">
                {stats.map((s, i) => (
                    <div key={i} className="admin-stat-card">
                        <div className="admin-stat-icon" style={{ background: s.bg }}>
                            {s.icon}
                        </div>
                        <div className="admin-stat-value">{s.value}</div>
                        <div className="admin-stat-label">{s.label}</div>
                        <div className="admin-stat-trend"><ArrowUp size={11} /> {s.trend}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Recent Sellers */}
                <div className="admin-table-card">
                    <div className="admin-table-header">
                        <h3>Recent Sellers</h3>
                        <Link to="/admin/sellers" style={{ fontSize: '13px', color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Shop</th>
                                <th>Plan</th>
                                <th>Status</th>
                                <th>Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentSellers.map((s, i) => (
                                <tr key={i}>
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                                        <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{s.city}</div>
                                    </td>
                                    <td><span style={{ fontSize: 12, fontWeight: 600, color: '#6366f1' }}>{s.plan}</span></td>
                                    <td>
                                        <span style={{ ...statusColor[s.status], padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 700 }}>{s.revenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Recent Orders */}
                <div className="admin-table-card">
                    <div className="admin-table-header">
                        <h3>Recent Orders</h3>
                        <Link to="/admin/orders" style={{ fontSize: '13px', color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Seller</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((o, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 700, fontSize: 13 }}>{o.id}</td>
                                    <td>{o.seller}</td>
                                    <td style={{ fontWeight: 700 }}>{o.amount}</td>
                                    <td>
                                        <span style={{ ...statusColor[o.status], padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
                                            {o.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Revenue Streams */}
            <div className="admin-table-card" style={{ marginTop: '20px' }}>
                <div className="admin-table-header">
                    <h3>Revenue Streams Breakdown</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
                    {[
                        { label: 'Setup Fees', value: '₹48,000', desc: '16 new sellers', color: '#6366f1' },
                        { label: 'Subscriptions', value: '₹89,400', desc: '142 active plans', color: '#8b5cf6' },
                        { label: 'Order Commission (5%)', value: '₹1,42,350', desc: '2847 orders', color: '#10b981' },
                        { label: 'Delivery Margin', value: '₹12,600', desc: '1260 rider orders', color: '#f59e0b' },
                    ].map((r, i) => (
                        <div key={i} style={{ padding: '20px', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                            <div style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 600, marginBottom: 6 }}>{r.label}</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: r.color }}>{r.value}</div>
                            <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4 }}>{r.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
