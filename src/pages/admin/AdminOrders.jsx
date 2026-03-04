import { useState } from 'react';
import { Search } from 'lucide-react';

const allOrders = [
    { id: '#ORD-2847', seller: 'Ramesh Kirana', customer: 'Suresh Mohanty', amount: '₹360', gst: '₹15', delivery: '₹40', status: 'Delivered', type: 'Rider', date: 'Today 2:30 PM' },
    { id: '#ORD-2846', seller: 'Priya Fashion', customer: 'Kavita Singh', amount: '₹1,240', gst: '₹62', delivery: '₹0', status: 'Processing', type: 'Pickup', date: 'Today 1:15 PM' },
    { id: '#ORD-2845', seller: 'Sonu Electronics', customer: 'Dev Rathore', amount: '₹5,600', gst: '₹504', delivery: '₹60', status: 'Pending', type: 'Rider', date: 'Today 12:00 PM' },
    { id: '#ORD-2844', seller: 'Anita Sweet Shop', customer: 'Priya Das', amount: '₹180', gst: '₹9', delivery: '₹25', status: 'Delivered', type: 'Rider', date: 'Today 10:45 AM' },
    { id: '#ORD-2843', seller: 'Raj Medical Store', customer: 'Mohan Rao', amount: '₹890', gst: '₹0', delivery: '₹30', status: 'Delivered', type: 'Self', date: 'Yesterday' },
    { id: '#ORD-2842', seller: 'Meena Stationary', customer: 'Sunita Behera', amount: '₹245', gst: '₹12', delivery: '₹40', status: 'Cancelled', type: 'Rider', date: 'Yesterday' },
];

const statusColor = {
    Delivered: { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
    Processing: { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' },
    Pending: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
    Cancelled: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
};

export default function AdminOrders() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filtered = allOrders.filter(o =>
        (statusFilter === 'All' || o.status === statusFilter) &&
        (o.id.includes(search) || o.seller.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>All Platform Orders</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Monitor all orders across all sellers</p>
            </div>

            {/* Quick stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
                {['Delivered', 'Processing', 'Pending', 'Cancelled'].map((s, i) => (
                    <div key={i} className="admin-stat-card" style={{ padding: '16px', cursor: 'pointer' }} onClick={() => setStatusFilter(s === statusFilter ? 'All' : s)}>
                        <div style={{ fontSize: 24, fontWeight: 800, color: Object.values(statusColor)[i].color }}>
                            {allOrders.filter(o => o.status === s).length}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{s}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid var(--border)', borderRadius: '10px', padding: '8px 14px', flex: 1 }}>
                    <Search size={16} color="#9ca3af" />
                    <input placeholder="Search by order ID or seller..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }} />
                </div>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                    style={{ padding: '8px 14px', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '14px', background: '#fff', cursor: 'pointer' }}>
                    <option value="All">All Status</option>
                    <option>Delivered</option><option>Processing</option><option>Pending</option><option>Cancelled</option>
                </select>
            </div>

            <div className="admin-table-card">
                <div className="admin-table-header">
                    <h3>Orders ({filtered.length})</h3>
                </div>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Seller</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>GST</th>
                            <th>Delivery Charge</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((o, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 700, fontSize: 13 }}>{o.id}</td>
                                <td>{o.seller}</td>
                                <td>{o.customer}</td>
                                <td style={{ fontWeight: 700 }}>{o.amount}</td>
                                <td style={{ color: '#f59e0b', fontWeight: 600 }}>{o.gst}</td>
                                <td>{o.delivery}</td>
                                <td><span style={{ fontSize: 12, fontWeight: 600, color: '#6366f1' }}>{o.type}</span></td>
                                <td>
                                    <span style={{ ...statusColor[o.status], padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                                        {o.status}
                                    </span>
                                </td>
                                <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{o.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
