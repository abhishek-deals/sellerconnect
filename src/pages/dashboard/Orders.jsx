import { useState } from 'react';
import { Search, Eye, CheckCircle, Truck, XCircle, Download } from 'lucide-react';
import './Dashboard.css';

const orders = [
    { id: '#ORD-1042', customer: 'Anita Singh', phone: '98765 11111', items: 'Basmati Rice, Oil', amount: '₹1,240', date: 'Today, 10:35 AM', status: 'new', payment: 'UPI' },
    { id: '#ORD-1041', customer: 'Suresh Patel', phone: '98765 22222', items: 'Amul Butter 500g', amount: '₹320', date: 'Today, 09:12 AM', status: 'shipped', payment: 'COD' },
    { id: '#ORD-1040', customer: 'Meena Joshi', phone: '98765 33333', items: 'Rice, Salt, Sugar, Oil, Ghee', amount: '₹2,800', date: 'Yesterday', status: 'delivered', payment: 'Card' },
    { id: '#ORD-1039', customer: 'Ravi Kumar', phone: '98765 44444', items: 'Parle-G, Tata Tea', amount: '₹750', date: 'Yesterday', status: 'new', payment: 'UPI' },
    { id: '#ORD-1038', customer: 'Nita Roy', phone: '98765 55555', items: 'Colgate 200g', amount: '₹180', date: '2 days ago', status: 'cancelled', payment: 'UPI' },
    { id: '#ORD-1037', customer: 'Arun Mishra', phone: '98765 66666', items: 'Fortune Oil 5L', amount: '₹685', date: '3 days ago', status: 'delivered', payment: 'COD' },
];

const statusColors = { new: 'badge-blue', shipped: 'badge-orange', delivered: 'badge-green', cancelled: 'badge-red' };
const filters = ['All', 'New', 'Shipped', 'Delivered', 'Cancelled'];

export default function Orders() {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = orders.filter(o =>
        (filter === 'All' || o.status === filter.toLowerCase()) &&
        (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search))
    );

    return (
        <div>
            <div className="db-page-header">
                <div><h1>Orders</h1><p>Track and manage all your customer orders.</p></div>
                <button className="btn btn-outline btn-sm"><Download size={14} /> Export</button>
            </div>

            <div className="db-stat-grid" style={{ marginBottom: '20px' }}>
                {[
                    { label: 'New Orders', value: orders.filter(o => o.status === 'new').length, col: 'blue' },
                    { label: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, col: 'orange' },
                    { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, col: 'green' },
                    { label: 'Cancelled', value: orders.filter(o => o.status === 'cancelled').length, col: 'purple' },
                ].map((s, i) => (
                    <div key={i} className="db-stat-card card">
                        <div className="db-stat-value" style={{ fontSize: '28px' }}>{s.value}</div>
                        <div className="db-stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="card">
                <div className="products-toolbar">
                    <div className="products-search">
                        <Search size={16} />
                        <input placeholder="Search by order ID or customer..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {filters.map(f => (
                            <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter(f)}>{f}</button>
                        ))}
                    </div>
                </div>

                <div className="db-table-wrap">
                    <table className="db-table">
                        <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Payment</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.map((o, i) => (
                                <tr key={i}>
                                    <td className="order-id">{o.id}</td>
                                    <td><div style={{ fontWeight: '600', fontSize: '13px' }}>{o.customer}</div><div style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{o.phone}</div></td>
                                    <td style={{ fontSize: '12px', color: 'var(--gray-500)', maxWidth: '140px' }}>{o.items}</td>
                                    <td style={{ fontWeight: '700' }}>{o.amount}</td>
                                    <td><span className="badge badge-blue" style={{ fontSize: '11px' }}>{o.payment}</span></td>
                                    <td style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{o.date}</td>
                                    <td><span className={`badge ${statusColors[o.status]}`}>{o.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button title="View" className="btn btn-outline btn-sm" style={{ padding: '5px 8px' }}><Eye size={12} /></button>
                                            {o.status === 'new' && <button title="Confirm" className="btn btn-sm" style={{ padding: '5px 8px', background: 'rgba(16,185,129,0.1)', color: 'var(--green)' }}><CheckCircle size={12} /></button>}
                                            {o.status === 'new' && <button title="Ship" className="btn btn-sm" style={{ padding: '5px 8px', background: 'rgba(249,115,22,0.1)', color: 'var(--orange)' }}><Truck size={12} /></button>}
                                            {(o.status === 'new' || o.status === 'shipped') && <button title="Cancel" className="btn btn-sm" style={{ padding: '5px 8px', background: 'rgba(239,68,68,0.1)', color: 'var(--red)' }}><XCircle size={12} /></button>}
                                            {(o.status === 'delivered' || o.status === 'shipped') && (
                                                <button title="Download GST Invoice" className="btn btn-sm" style={{ padding: '5px 8px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600 }}>
                                                    <Download size={12} /> GST
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
