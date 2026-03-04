import { useState } from 'react';
import { Check, X, Download, Search } from 'lucide-react';

const initialRequests = [
    { id: 'WR001', name: 'Ankit Verma', role: 'Rider', amount: '₹1,230', method: 'Bank — HDFC ****4521', requestedOn: 'Today, 10:15 AM', status: 'Pending' },
    { id: 'WR002', name: 'Ramesh Kumar', role: 'Seller', amount: '₹18,450', method: 'Bank — SBI ****7823', requestedOn: 'Today, 09:30 AM', status: 'Pending' },
    { id: 'WR003', name: 'Sonu Sharma', role: 'Rider', amount: '₹720', method: 'UPI — sonu@upi', requestedOn: 'Yesterday', status: 'Approved' },
    { id: 'WR004', name: 'Priya Fashion', role: 'Seller', amount: '₹9,800', method: 'Bank — ICICI ****3312', requestedOn: 'Yesterday', status: 'Approved' },
    { id: 'WR005', name: 'Mahesh Verma', role: 'Rider', amount: '₹500', method: 'UPI — mahesh@hdfc', requestedOn: '2 days ago', status: 'Rejected' },
];

const roleColors = { Rider: 'badge-green', Seller: 'badge-blue' };
const statusColors = { Pending: 'badge-orange', Approved: 'badge-green', Rejected: 'badge-red' };

export default function AdminPayouts() {
    const [requests, setRequests] = useState(initialRequests);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const approve = (id) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
    const reject = (id) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));

    const filtered = requests.filter(r =>
        (filter === 'All' || r.status === filter) &&
        (r.name.toLowerCase().includes(search.toLowerCase()) || r.id.includes(search))
    );

    const pendingCount = requests.filter(r => r.status === 'Pending').length;
    const totalPending = '₹19,680';

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>Payout Requests</h2>
                    <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Approve or reject withdrawal requests from sellers and riders</p>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', border: '1px solid var(--border)', borderRadius: 10, background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                    <Download size={14} /> Export CSV
                </button>
            </div>

            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
                {[
                    { label: 'Pending Requests', value: pendingCount, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
                    { label: 'Pending Amount', value: totalPending, color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
                    { label: 'Approved Today', value: '2', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
                    { label: 'Paid This Week', value: '₹1,28,900', color: '#374151', bg: 'rgba(55,65,81,0.08)' },
                ].map((s, i) => (
                    <div key={i} className="admin-stat-card">
                        <div className="admin-stat-icon" style={{ background: s.bg }}>
                            <span style={{ fontSize: 20 }}>{['⏳', '💰', '✅', '📊'][i]}</span>
                        </div>
                        <div className="admin-stat-value" style={{ color: s.color }}>{s.value}</div>
                        <div className="admin-stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="admin-table-card">
                {/* Toolbar */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--bg-base)', borderRadius: 8, flex: 1, minWidth: 200 }}>
                        <Search size={14} color="var(--gray-400)" />
                        <input placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)}
                            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, flex: 1 }} />
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid var(--border)', background: filter === f ? '#6366f1' : '#fff', color: filter === f ? '#fff' : 'var(--gray-600)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Amount</th>
                            <th>Payout Method</th>
                            <th>Requested</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(r => (
                            <tr key={r.id}>
                                <td style={{ fontWeight: 700, fontFamily: 'monospace', color: '#6366f1' }}>{r.id}</td>
                                <td style={{ fontWeight: 700 }}>{r.name}</td>
                                <td><span className={`badge ${roleColors[r.role]}`} style={{ fontSize: 11 }}>{r.role}</span></td>
                                <td style={{ fontWeight: 800, fontSize: 15 }}>{r.amount}</td>
                                <td style={{ fontSize: 12, color: 'var(--gray-500)' }}>{r.method}</td>
                                <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{r.requestedOn}</td>
                                <td><span className={`badge ${statusColors[r.status]}`}>{r.status}</span></td>
                                <td>
                                    {r.status === 'Pending' ? (
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button onClick={() => approve(r.id)}
                                                style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 12px', borderRadius: 6, border: 'none', background: 'rgba(16,185,129,0.1)', color: '#10b981', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                                                <Check size={12} /> Approve
                                            </button>
                                            <button onClick={() => reject(r.id)}
                                                style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 12px', borderRadius: 6, border: 'none', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                                                <X size={12} /> Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>
                                            {r.status === 'Approved' ? '✓ Processed' : '✗ Declined'}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>💰</div>
                        <div style={{ fontWeight: 600 }}>No payout requests found</div>
                    </div>
                )}
            </div>
        </div>
    );
}
