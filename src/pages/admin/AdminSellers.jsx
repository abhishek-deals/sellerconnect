import { useState } from 'react';
import { Search, Check, X, Eye, MoreVertical } from 'lucide-react';

const sellers = [
    { id: 1, name: 'Ramesh Kirana Store', owner: 'Ramesh Kumar', city: 'Bhubaneswar', phone: '+91 98765 43210', plan: 'Growth', status: 'Active', orders: 234, revenue: '₹42,180', joined: 'Jan 2025', gstin: 'GSTIN21AAAAA0000A1Z5' },
    { id: 2, name: 'Priya Fashion Hub', owner: 'Priya Patel', city: 'Cuttack', phone: '+91 87654 32109', plan: 'Pro', status: 'Active', orders: 189, revenue: '₹78,450', joined: 'Dec 2024', gstin: '' },
    { id: 3, name: 'Sonu Electronics', owner: 'Sonu Das', city: 'Puri', phone: '+91 76543 21098', plan: 'Starter', status: 'Active', orders: 67, revenue: '₹12,340', joined: 'Feb 2025', gstin: '' },
    { id: 4, name: 'Anita Sweet Shop', owner: 'Anita Mohanty', city: 'Bhubaneswar', phone: '+91 65432 10987', plan: 'Growth', status: 'Inactive', orders: 23, revenue: '₹4,500', joined: 'Mar 2025', gstin: '' },
    { id: 5, name: 'Raj Medical Store', owner: 'Rajesh Nayak', city: 'Rourkela', phone: '+91 54321 09876', plan: 'Pro', status: 'Active', orders: 456, revenue: '₹1,12,000', joined: 'Nov 2024', gstin: 'GSTIN21BBBBB0000B1Z6' },
    { id: 6, name: 'Meena Stationary', owner: 'Meena Sahoo', city: 'Sambalpur', phone: '+91 43210 98765', plan: 'Starter', status: 'Active', orders: 34, revenue: '₹6,200', joined: 'Feb 2025', gstin: '' },
];

const planColors = { Starter: '#10b981', Growth: '#6366f1', Pro: '#f59e0b' };

export default function AdminSellers() {
    const [search, setSearch] = useState('');
    const [planFilter, setPlanFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [localSellers, setLocalSellers] = useState(sellers);

    const filtered = localSellers.filter(s =>
        (planFilter === 'All' || s.plan === planFilter) &&
        (statusFilter === 'All' || s.status === statusFilter) &&
        (s.name.toLowerCase().includes(search.toLowerCase()) || s.owner.toLowerCase().includes(search.toLowerCase()))
    );

    const toggleStatus = (id) => {
        setLocalSellers(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s));
    };

    const upgradePlan = (id) => {
        const plans = ['Starter', 'Growth', 'Pro'];
        setLocalSellers(prev => prev.map(s => {
            if (s.id !== id) return s;
            const idx = plans.indexOf(s.plan);
            return { ...s, plan: plans[Math.min(idx + 1, 2)] };
        }));
    };

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>Seller Management</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Manage all registered sellers on SellerConnect</p>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid var(--border)', borderRadius: '10px', padding: '8px 14px', flex: 1, minWidth: '200px' }}>
                    <Search size={16} color="#9ca3af" />
                    <input
                        placeholder="Search sellers..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }}
                    />
                </div>
                <select value={planFilter} onChange={e => setPlanFilter(e.target.value)}
                    style={{ padding: '8px 14px', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '14px', background: '#fff', cursor: 'pointer' }}>
                    <option value="All">All Plans</option>
                    <option>Starter</option><option>Growth</option><option>Pro</option>
                </select>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                    style={{ padding: '8px 14px', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '14px', background: '#fff', cursor: 'pointer' }}>
                    <option value="All">All Status</option>
                    <option>Active</option><option>Inactive</option>
                </select>
            </div>

            <div className="admin-table-card">
                <div className="admin-table-header">
                    <h3>All Sellers ({filtered.length})</h3>
                    <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>{localSellers.filter(s => s.status === 'Active').length} active</span>
                </div>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Shop / Owner</th>
                            <th>City</th>
                            <th>Plan</th>
                            <th>Orders</th>
                            <th>Revenue</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(s => (
                            <tr key={s.id}>
                                <td>
                                    <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                                    <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{s.owner} · {s.phone}</div>
                                </td>
                                <td>{s.city}</td>
                                <td>
                                    <span style={{ background: `${planColors[s.plan]}18`, color: planColors[s.plan], padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                                        {s.plan}
                                    </span>
                                </td>
                                <td style={{ fontWeight: 600 }}>{s.orders}</td>
                                <td style={{ fontWeight: 700, color: '#059669' }}>{s.revenue}</td>
                                <td>
                                    <span style={{
                                        background: s.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                                        color: s.status === 'Active' ? '#10b981' : '#ef4444',
                                        padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700
                                    }}>
                                        {s.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button onClick={() => toggleStatus(s.id)}
                                            style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                                            {s.status === 'Active' ? <><X size={12} /> Disable</> : <><Check size={12} /> Enable</>}
                                        </button>
                                        <button onClick={() => upgradePlan(s.id)}
                                            style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #6366f1', background: 'rgba(99,102,241,0.05)', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#6366f1' }}>
                                            Upgrade
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
