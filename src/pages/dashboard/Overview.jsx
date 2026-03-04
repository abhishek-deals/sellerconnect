import { BarChart3, TrendingUp, Package, ShoppingCart, Users, CreditCard, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const stats = [
    { label: 'Total Revenue', value: '₹1,24,500', trend: '+18% this month', up: true, icon: <CreditCard size={20} />, color: 'blue' },
    { label: 'Total Orders', value: '348', trend: '+32 this week', up: true, icon: <ShoppingCart size={20} />, color: 'purple' },
    { label: 'Pending Orders', value: '12', trend: '3 urgent', up: false, icon: <AlertTriangle size={20} />, color: 'orange' },
    { label: 'Total Customers', value: '215', trend: '+8 new today', up: true, icon: <Users size={20} />, color: 'green' },
];

const recentOrders = [
    { id: '#ORD-1042', customer: 'Anita Singh', items: 3, amount: '₹1,240', status: 'new' },
    { id: '#ORD-1041', customer: 'Suresh Patel', items: 1, amount: '₹320', status: 'shipped' },
    { id: '#ORD-1040', customer: 'Meena Joshi', items: 5, amount: '₹2,800', status: 'delivered' },
    { id: '#ORD-1039', customer: 'Ravi Kumar', items: 2, amount: '₹750', status: 'new' },
    { id: '#ORD-1038', customer: 'Nita Roy', items: 1, amount: '₹180', status: 'cancelled' },
];

const topProducts = [
    { name: 'Basmati Rice 5kg', sold: 142, revenue: '₹17,040', pct: 82 },
    { name: 'Fortune Refined Oil 1L', sold: 98, revenue: '₹12,250', pct: 60 },
    { name: 'Tata Salt 1kg', sold: 76, revenue: '₹1,900', pct: 46 },
    { name: 'Amul Butter 500g', sold: 54, revenue: '₹5,940', pct: 33 },
];

const statusColors = { new: 'badge-blue', shipped: 'badge-orange', delivered: 'badge-green', cancelled: 'badge-red' };

export default function Overview() {
    return (
        <div>
            <div className="db-page-header">
                <div>
                    <h1>Overview</h1>
                    <p>Welcome back, Ramesh! Here's your business snapshot for today.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to="/dashboard/products" className="btn btn-outline btn-sm">+ Add Product</Link>
                    <Link to="/dashboard/orders" className="btn btn-primary btn-sm">View Orders</Link>
                </div>
            </div>

            {/* STAT CARDS */}
            <div className="db-stat-grid">
                {stats.map((s, i) => (
                    <div key={i} className="db-stat-card card">
                        <div className="flex-between">
                            <div className={`icon-box icon-box-${s.color}`}>{s.icon}</div>
                            <span className={`stat-trend ${s.up ? 'trend-up' : 'trend-down'}`}>{s.trend}</span>
                        </div>
                        <div className="db-stat-value">{s.value}</div>
                        <div className="db-stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* CHARTS ROW */}
            <div className="db-two-col">
                <div className="card">
                    <div className="flex-between" style={{ marginBottom: '20px' }}>
                        <h3>Revenue This Week</h3>
                        <span className="badge badge-green">↑ 18%</span>
                    </div>
                    <div className="mini-chart">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="mini-bar-wrap">
                                <div className="mini-bar" style={{ height: `${h}%` }}></div>
                                <span className="mini-bar-label">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <div className="flex-between" style={{ marginBottom: '20px' }}>
                        <h3>Top Products</h3>
                        <Link to="/dashboard/products" className="btn btn-outline btn-sm">View All</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {topProducts.map((p, i) => (
                            <div key={i}>
                                <div className="flex-between" style={{ marginBottom: '6px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{p.name}</span>
                                    <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>{p.revenue}</span>
                                </div>
                                <div className="progress-bar-track">
                                    <div className="progress-bar-fill" style={{ width: `${p.pct}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RECENT ORDERS */}
            <div className="card" style={{ marginTop: '24px' }}>
                <div className="flex-between" style={{ marginBottom: '20px' }}>
                    <h3>Recent Orders</h3>
                    <Link to="/dashboard/orders" className="btn btn-outline btn-sm">View All <ArrowRight size={14} /></Link>
                </div>
                <div className="db-table-wrap">
                    <table className="db-table">
                        <thead>
                            <tr>
                                <th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((o, i) => (
                                <tr key={i}>
                                    <td className="order-id">{o.id}</td>
                                    <td>{o.customer}</td>
                                    <td>{o.items} items</td>
                                    <td style={{ fontWeight: '700' }}>{o.amount}</td>
                                    <td><span className={`badge ${statusColors[o.status]}`}>{o.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
