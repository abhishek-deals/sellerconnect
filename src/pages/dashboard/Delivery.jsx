import { useState } from 'react';
import { MapPin, Truck, User, CheckCircle } from 'lucide-react';
import './Dashboard.css';

const deliveries = [
    { id: '#ORD-1042', customer: 'Anita Singh', address: 'Plot 42, Unit-4, Bhubaneswar', distance: '2.3 km', partner: 'Rajesh', status: 'out_for_delivery' },
    { id: '#ORD-1041', customer: 'Suresh Kumar', address: 'Acharya Vihar, Bhubaneswar', distance: '4.1 km', partner: 'Unassigned', status: 'pending' },
    { id: '#ORD-1039', customer: 'Ravi Patel', address: 'Saheed Nagar, Bhubaneswar', distance: '1.8 km', partner: 'Manoj', status: 'delivered' },
];

export default function Delivery() {
    const [radius, setRadius] = useState('5km');

    return (
        <div>
            <div className="db-page-header">
                <div><h1>Delivery</h1><p>Set your delivery radius, manage partners, and track live orders.</p></div>
            </div>

            <div className="db-two-col" style={{ marginBottom: '24px' }}>
                <div className="card delivery-radius-card">
                    <h3 style={{ marginBottom: '6px' }}>🗺️ Delivery Radius</h3>
                    <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: '16px' }}>Set how far your shop delivers. Orders outside the radius will show "unavailable".</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {['3km', '5km', '10km'].map(r => (
                            <button key={r} className={`radius-btn ${radius === r ? 'active' : ''}`} onClick={() => setRadius(r)}>{r} radius</button>
                        ))}
                    </div>
                    <div className="delivery-map-placeholder">
                        <MapPin size={32} />
                        <span>Your Shop</span>
                        <span style={{ fontSize: 12 }}>Delivery radius: {radius}</span>
                    </div>
                    <div className="form-group">
                        <label>Delivery Charge (₹)</label>
                        <input type="number" placeholder="e.g. 30" defaultValue="30" />
                    </div>
                    <div className="form-group">
                        <label>Free Delivery Above (₹)</label>
                        <input type="number" placeholder="e.g. 500" defaultValue="500" />
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Save Settings</button>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '16px' }}>🚴 Delivery Partners</h3>
                    {[{ name: 'Rajesh Sahu', rating: '4.8 ⭐', trips: 142, active: true },
                    { name: 'Manoj Das', rating: '4.6 ⭐', trips: 98, active: true },
                    { name: 'Santosh Nayak', rating: '4.9 ⭐', trips: 215, active: false }].map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>{p.name[0]}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{p.rating} • {p.trips} trips</div>
                            </div>
                            <span className={`badge ${p.active ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '11px' }}>{p.active ? 'Available' : 'Offline'}</span>
                        </div>
                    ))}
                    <button className="btn btn-outline btn-sm" style={{ marginTop: '12px' }}><User size={14} /> Add Partner</button>
                </div>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: '18px' }}>Live Deliveries</h3>
                <div className="db-table-wrap">
                    <table className="db-table">
                        <thead><tr><th>Order</th><th>Customer</th><th>Address</th><th>Distance</th><th>Partner</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            {deliveries.map((d, i) => (
                                <tr key={i}>
                                    <td className="order-id">{d.id}</td>
                                    <td>{d.customer}</td>
                                    <td style={{ fontSize: 12, color: 'var(--gray-500)', maxWidth: 160 }}>{d.address}</td>
                                    <td><span className="badge badge-blue" style={{ fontSize: '11px' }}>{d.distance}</span></td>
                                    <td>{d.partner}</td>
                                    <td><span className={`badge ${d.status === 'delivered' ? 'badge-green' : d.status === 'out_for_delivery' ? 'badge-orange' : 'badge-blue'}`} style={{ fontSize: '11px' }}>{d.status.replace(/_/g, ' ')}</span></td>
                                    <td>
                                        {d.status === 'pending' && <button className="btn btn-outline btn-sm" style={{ fontSize: '12px' }}><Truck size={12} /> Assign</button>}
                                        {d.status === 'out_for_delivery' && <button className="btn btn-sm" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--green)', fontSize: '12px' }}><CheckCircle size={12} /> Delivered</button>}
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
