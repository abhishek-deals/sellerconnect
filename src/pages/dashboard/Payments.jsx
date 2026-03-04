import { Download, CreditCard, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const transactions = [
    { id: 'TXN001', customer: 'Anita Singh', method: 'UPI', amount: '₹1,240', date: 'Today 10:35 AM', status: 'success' },
    { id: 'TXN002', customer: 'Suresh Patel', method: 'COD', amount: '₹320', date: 'Today 09:12 AM', status: 'pending' },
    { id: 'TXN003', customer: 'Meena Joshi', method: 'Card', amount: '₹2,800', date: 'Yesterday', status: 'success' },
    { id: 'TXN004', customer: 'Ravi Kumar', method: 'UPI', amount: '₹750', date: 'Yesterday', status: 'success' },
    { id: 'TXN005', customer: 'Nita Roy', method: 'UPI', amount: '₹180', date: '2 days ago', status: 'refunded' },
];

export default function Payments() {
    return (
        <div>
            <div className="db-page-header">
                <div><h1>Payments</h1><p>Track all transactions, COD, and withdrawals.</p></div>
                <button className="btn btn-outline btn-sm"><Download size={14} /> Export Report</button>
            </div>

            <div className="db-stat-grid" style={{ marginBottom: '24px' }}>
                {[
                    { label: 'Total Collected', value: '₹1,24,500', icon: '💰' },
                    { label: 'Online Payments', value: '₹98,200', icon: '📱' },
                    { label: 'COD Collected', value: '₹26,300', icon: '💵' },
                    { label: 'Pending Withdrawal', value: '₹18,450', icon: '🔄' },
                ].map((s, i) => (
                    <div key={i} className="db-stat-card card">
                        <div style={{ fontSize: 28 }}>{s.icon}</div>
                        <div className="db-stat-value" style={{ fontSize: '22px' }}>{s.value}</div>
                        <div className="db-stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="db-two-col" style={{ marginBottom: '24px' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '16px' }}>Payment Methods</h3>
                    {[['UPI', 55, 'purple'], ['Cash on Delivery', 25, 'orange'], ['Card', 15, 'blue'], ['Wallet', 5, 'green']].map(([name, pct, col], i) => (
                        <div key={i} style={{ marginBottom: '14px' }}>
                            <div className="flex-between" style={{ marginBottom: '6px' }}>
                                <span style={{ fontSize: 13, fontWeight: 600 }}>{name}</span>
                                <span className={`badge badge-${col}`} style={{ padding: '2px 8px', fontSize: '11px' }}>{pct}%</span>
                            </div>
                            <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: `${pct}%` }}></div></div>
                        </div>
                    ))}
                </div>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3>Withdrawal Request</h3>
                    <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>Available balance: <strong>₹18,450</strong></p>
                    <div className="form-group"><label>Amount to Withdraw (₹)</label><input type="number" placeholder="Enter amount" /></div>
                    <div className="form-group"><label>Bank Account</label><select><option>HDFC Bank ****4521</option><option>SBI ****7823</option></select></div>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}><TrendingUp size={16} /> Request Withdrawal</button>
                </div>
            </div>

            {/* Seller Wallet */}
            <div className="card" style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CreditCard size={18} /> Seller Wallet
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
                    <div style={{ padding: '16px', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))', borderRadius: 12, border: '1px solid rgba(99,102,241,0.15)', textAlign: 'center' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', marginBottom: 6 }}>Available Balance</div>
                        <div style={{ fontSize: 32, fontWeight: 900, color: '#6366f1' }}>₹18,450</div>
                        <button className="btn btn-primary btn-sm" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
                            <TrendingUp size={14} /> Withdraw Now
                        </button>
                    </div>
                    <div style={{ padding: '16px', background: 'rgba(16,185,129,0.05)', borderRadius: 12, border: '1px solid rgba(16,185,129,0.15)' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginBottom: 8 }}>Earnings Overview</div>
                        {[['Gross Sales', '₹1,24,500'], ['Platform Commission (5%)', '-₹6,225'], ['GST Collected', '₹8,400'], ['Net Credited to Wallet', '₹1,18,275']].map(([l, v], i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < 3 ? '1px solid rgba(16,185,129,0.1)' : 'none', fontSize: 13 }}>
                                <span style={{ color: 'var(--gray-600)' }}>{l}</span>
                                <span style={{ fontWeight: 700, color: i === 1 ? '#ef4444' : i === 2 ? '#f59e0b' : '#10b981' }}>{v}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: '16px', background: 'rgba(245,158,11,0.05)', borderRadius: 12, border: '1px solid rgba(245,158,11,0.15)' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', marginBottom: 8 }}>Settlement Info</div>
                        <div style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.8 }}>
                            <div>🟢 Next auto-settlement: <strong>Sunday</strong></div>
                            <div>⏰ Settlement Time: <strong>11:59 PM</strong></div>
                            <div>🏦 Bank: <strong>HDFC ****4521</strong></div>
                            <div>📊 Cycle: <strong>Weekly</strong></div>
                        </div>
                        <button className="btn btn-outline btn-sm" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>Change Bank Account</button>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: '18px' }}>Transaction History</h3>
                <div className="db-table-wrap">
                    <table className="db-table">
                        <thead><tr><th>Transaction ID</th><th>Customer</th><th>Method</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
                        <tbody>
                            {transactions.map((t, i) => (
                                <tr key={i}>
                                    <td className="order-id">{t.id}</td>
                                    <td>{t.customer}</td>
                                    <td><span className="badge badge-blue" style={{ fontSize: '11px' }}>{t.method}</span></td>
                                    <td style={{ fontWeight: 700 }}>{t.amount}</td>
                                    <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{t.date}</td>
                                    <td>
                                        <span className={`badge ${t.status === 'success' ? 'badge-green' : t.status === 'pending' ? 'badge-orange' : 'badge-red'}`}>{t.status}</span>
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
