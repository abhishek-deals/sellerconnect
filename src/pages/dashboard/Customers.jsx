import { Phone, MessageCircle, Download, Search } from 'lucide-react';
import './Dashboard.css';

const customers = [
    { name: 'Anita Singh', phone: '+91 98765 11111', city: 'Bhubaneswar', orders: 8, spent: '₹9,800', last: 'Today', avatar: '👩' },
    { name: 'Suresh Patel', phone: '+91 98765 22222', city: 'Cuttack', orders: 5, spent: '₹5,200', last: '2 days ago', avatar: '👨' },
    { name: 'Meena Joshi', phone: '+91 98765 33333', city: 'Puri', orders: 12, spent: '₹14,600', last: 'Yesterday', avatar: '👩' },
    { name: 'Ravi Kumar', phone: '+91 98765 44444', city: 'Bhubaneswar', orders: 3, spent: '₹2,900', last: '5 days ago', avatar: '👨' },
    { name: 'Nita Roy', phone: '+91 98765 55555', city: 'Berhampur', orders: 1, spent: '₹180', last: '1 week ago', avatar: '👩' },
    { name: 'Arun Mishra', phone: '+91 98765 66666', city: 'Sambalpur', orders: 7, spent: '₹7,450', last: '3 days ago', avatar: '👨' },
];

export default function Customers() {
    return (
        <div>
            <div className="db-page-header">
                <div><h1>Customers</h1><p>View customer profiles, purchase history and send promotions.</p></div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-outline btn-sm"><Download size={14} /> Export CSV</button>
                    <button className="btn btn-primary btn-sm"><MessageCircle size={14} /> Bulk WhatsApp</button>
                </div>
            </div>

            <div className="db-stat-grid" style={{ marginBottom: '20px' }}>
                {[{ label: 'Total Customers', value: customers.length },
                { label: 'Active (30 days)', value: 4 },
                { label: 'Repeat Buyers', value: '65%' },
                { label: 'Avg. Order Value', value: '₹840' }].map((s, i) => (
                    <div key={i} className="db-stat-card card">
                        <div className="db-stat-value" style={{ fontSize: '28px' }}>{s.value}</div>
                        <div className="db-stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="card">
                <div className="products-toolbar">
                    <div className="products-search"><Search size={16} /><input placeholder="Search customers..." /></div>
                </div>
                <div className="db-table-wrap">
                    <table className="db-table">
                        <thead><tr><th>Customer</th><th>Phone</th><th>City</th><th>Orders</th><th>Total Spent</th><th>Last Order</th><th>Actions</th></tr></thead>
                        <tbody>
                            {customers.map((c, i) => (
                                <tr key={i}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{c.avatar}</div>
                                            <strong style={{ fontSize: 14 }}>{c.name}</strong>
                                        </div>
                                    </td>
                                    <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>{c.phone}</td>
                                    <td>{c.city}</td>
                                    <td>{c.orders}</td>
                                    <td style={{ fontWeight: 700 }}>{c.spent}</td>
                                    <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{c.last}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <a href={`https://wa.me/${c.phone.replace(/\D/g, '')}`} className="btn btn-sm" style={{ background: 'rgba(37,211,102,0.1)', color: '#25d366', padding: '5px 8px' }}><MessageCircle size={12} /></a>
                                            <a href={`tel:${c.phone}`} className="btn btn-outline btn-sm" style={{ padding: '5px 8px' }}><Phone size={12} /></a>
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
