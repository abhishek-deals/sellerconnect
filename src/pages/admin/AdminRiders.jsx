import { useState } from 'react';
import { Check, X, Search, UserCheck, Clock } from 'lucide-react';

const pendingRiders = [
    { id: 'P1', name: 'Kiran Sahoo', phone: '+91 91111 00001', city: 'Bhubaneswar', vehicle: '🛵 Scooter', applied: '2 hours ago' },
    { id: 'P2', name: 'Manish Nayak', phone: '+91 92222 00002', city: 'Cuttack', vehicle: '🚲 Bicycle', applied: 'Yesterday' },
];

const riders = [
    { id: 1, name: 'Ankit Verma', phone: '+91 98007 12345', city: 'Bhubaneswar', status: 'Online', deliveries: 287, todayEarning: '₹540', totalEarning: '₹8,610', rating: 4.9, vehicle: '🛵 Scooter' },
    { id: 2, name: 'Bikash Sahu', phone: '+91 97006 23456', city: 'Bhubaneswar', status: 'Offline', deliveries: 194, todayEarning: '₹0', totalEarning: '₹5,820', rating: 4.7, vehicle: '🚲 Bicycle' },
    { id: 3, name: 'Chandan Das', phone: '+91 96005 34567', city: 'Cuttack', status: 'Online', deliveries: 342, todayEarning: '₹720', totalEarning: '₹10,260', rating: 4.8, vehicle: '🛵 Scooter' },
    { id: 4, name: 'Deepak Rana', phone: '+91 95004 45678', city: 'Puri', status: 'Online', deliveries: 156, todayEarning: '₹360', totalEarning: '₹4,680', rating: 4.6, vehicle: '🛵 Scooter' },
    { id: 5, name: 'Eshaan Panda', phone: '+91 94003 56789', city: 'Bhubaneswar', status: 'Inactive', deliveries: 89, todayEarning: '₹0', totalEarning: '₹2,670', rating: 4.3, vehicle: '🛵 Scooter' },
];

const statusColor = {
    Online: { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
    Offline: { bg: 'rgba(107,114,128,0.1)', color: '#6b7280' },
    Inactive: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
};

export default function AdminRiders() {
    const [search, setSearch] = useState('');
    const [localRiders, setLocalRiders] = useState(riders);
    const [pending, setPending] = useState(pendingRiders);
    const [tab, setTab] = useState('active');

    const approveRider = (id) => {
        const rider = pending.find(r => r.id === id);
        if (!rider) return;
        setLocalRiders(prev => [...prev, {
            id: prev.length + 1, name: rider.name, phone: rider.phone,
            city: rider.city, status: 'Offline', deliveries: 0,
            todayEarning: '₹0', totalEarning: '₹0', rating: 0, vehicle: rider.vehicle
        }]);
        setPending(prev => prev.filter(r => r.id !== id));
    };
    const rejectPending = (id) => setPending(prev => prev.filter(r => r.id !== id));

    const filtered = localRiders.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) || r.city.toLowerCase().includes(search.toLowerCase())
    );

    const toggleStatus = (id) => {
        setLocalRiders(prev => prev.map(r => {
            if (r.id !== id) return r;
            if (r.status === 'Inactive') return { ...r, status: 'Offline' };
            return { ...r, status: r.status === 'Online' ? 'Offline' : 'Online' };
        }));
    };

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>Rider Management</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Manage platform delivery riders</p>
            </div>

            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                    { label: 'Total Riders', value: localRiders.length, color: '#6366f1' },
                    { label: 'Online Now', value: localRiders.filter(r => r.status === 'Online').length, color: '#10b981' },
                    { label: 'Total Deliveries Today', value: localRiders.filter(r => r.status === 'Online').reduce((sum, r) => sum + Math.floor(r.deliveries / 50), 0), color: '#f59e0b' },
                ].map((s, i) => (
                    <div key={i} className="admin-stat-card" style={{ padding: '16px' }}>
                        <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid var(--border)', borderRadius: '10px', padding: '8px 14px', flex: 1 }}>
                    <Search size={16} color="#9ca3af" />
                    <input
                        placeholder="Search riders..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }}
                    />
                </div>
            </div>

            {/* PENDING APPROVAL SECTION */}
            {pending.length > 0 && (
                <div className="admin-table-card" style={{ marginBottom: 20, border: '2px solid rgba(245,158,11,0.3)' }}>
                    <div className="admin-table-header">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Clock size={16} color="#f59e0b" /> Pending Approval ({pending.length})
                        </h3>
                        <span style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700 }}>New Applications</span>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr><th>Name</th><th>City</th><th>Vehicle</th><th>Applied</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {pending.map(r => (
                                <tr key={r.id}>
                                    <td><div style={{ fontWeight: 700, fontSize: 13 }}>{r.name}</div><div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{r.phone}</div></td>
                                    <td>{r.city}</td>
                                    <td>{r.vehicle}</td>
                                    <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{r.applied}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button onClick={() => approveRider(r.id)}
                                                style={{ padding: '5px 12px', borderRadius: 6, border: 'none', background: 'rgba(16,185,129,0.1)', color: '#10b981', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                                                <Check size={12} /> Approve
                                            </button>
                                            <button onClick={() => rejectPending(r.id)}
                                                style={{ padding: '5px 12px', borderRadius: 6, border: 'none', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                                                <X size={12} /> Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="admin-table-card">
                <div className="admin-table-header">
                    <h3>All Riders ({filtered.length})</h3>
                    <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>{localRiders.filter(r => r.status === 'Online').length} online</span>
                </div>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Rider</th>
                            <th>City</th>
                            <th>Vehicle</th>
                            <th>Deliveries</th>
                            <th>Payout Rate</th>
                            <th>Today's Earning</th>
                            <th>Rating</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(r => (
                            <tr key={r.id}>
                                <td>
                                    <div style={{ fontWeight: 700, fontSize: 13 }}>{r.name}</div>
                                    <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{r.phone}</div>
                                </td>
                                <td>{r.city}</td>
                                <td>{r.vehicle}</td>
                                <td style={{ fontWeight: 600 }}>{r.deliveries}</td>
                                <td style={{ fontWeight: 700, color: '#059669' }}>{r.todayEarning}</td>
                                <td>⭐ {r.rating}</td>
                                <td>
                                    <span style={{ ...statusColor[r.status], padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                                        {r.status}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => toggleStatus(r.id)}
                                        style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                                        {r.status === 'Inactive' ? <><Check size={12} /> Activate</> : <><X size={12} /> Deactivate</>}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
