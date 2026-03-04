import { useState } from 'react';
import { Bike, Package, DollarSign, Star, ArrowUp, Clock, AlertCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const todayDeliveries = [
    { id: '#ORD-2847', shop: 'Ramesh Kirana', addr: '45 MG Road, Bhubaneswar', dist: '2.4 km', earning: '₹30', time: '2:30 PM' },
    { id: '#ORD-2845', shop: 'Sonu Electronics', addr: '12 Station Road, Bhubaneswar', dist: '4.8 km', earning: '₹30', time: '12:15 PM' },
    { id: '#ORD-2844', shop: 'Anita Sweet Shop', addr: '88 Park Street, Bhubaneswar', dist: '1.8 km', earning: '₹20', time: '10:50 AM' },
];

export default function RiderOverview() {
    const [isOnline, setIsOnline] = useState(true);

    return (
        <div>
            {/* Online / Offline toggle hero */}
            <div style={{
                background: isOnline
                    ? 'linear-gradient(135deg, #064e3b, #10b981)'
                    : 'linear-gradient(135deg, #374151, #6b7280)',
                borderRadius: 20, padding: '24px', marginBottom: 24, color: '#fff',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'background 0.5s'
            }}>
                <div>
                    <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>
                        {isOnline ? '🟢 You are receiving orders' : '⭕ You are offline — no orders will be assigned'}
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5 }}>
                        {isOnline ? 'ONLINE' : 'OFFLINE'}
                    </div>
                    {isOnline && (
                        <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>
                            🚫💵 No cash handling — all prepaid orders only
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setIsOnline(!isOnline)}
                    style={{
                        width: 72, height: 40, borderRadius: 999, border: 'none',
                        background: isOnline ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                        cursor: 'pointer', position: 'relative', transition: 'all 0.3s'
                    }}>
                    <span style={{
                        position: 'absolute', top: 4, width: 32, height: 32, borderRadius: '50%',
                        background: '#fff', transition: 'left 0.3s',
                        left: isOnline ? 36 : 4
                    }} />
                </button>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gray-900)' }}>Welcome back, Ankit 👋</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>Here's your delivery summary for today</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                    { label: "Today's Earning", value: '₹540', sub: '15 deliveries', icon: <DollarSign size={20} color="#10b981" />, bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
                    { label: 'This Week', value: '₹3,240', sub: '108 deliveries', icon: <ArrowUp size={20} color="#6366f1" />, bg: 'rgba(99,102,241,0.1)', color: '#6366f1' },
                    { label: 'Total Deliveries', value: '287', sub: 'Since joining', icon: <Package size={20} color="#f59e0b" />, bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
                    { label: 'Customer Rating', value: '4.9 ⭐', sub: 'Based on 145 ratings', icon: <Star size={20} color="#ef4444" />, bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
                ].map((s, i) => (
                    <div key={i} className="admin-stat-card">
                        <div className="admin-stat-icon" style={{ background: s.bg }}>{s.icon}</div>
                        <div className="admin-stat-value" style={{ color: s.color }}>{s.value}</div>
                        <div className="admin-stat-label">{s.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{s.sub}</div>
                    </div>
                ))}
            </div>

            {/* Bonus incentives banner */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(245,158,11,0.08))',
                border: '1px solid rgba(99,102,241,0.2)', borderRadius: 16, padding: 20, marginBottom: 24
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <Zap size={18} color="#f59e0b" />
                    <span style={{ fontWeight: 800, fontSize: 14 }}>Today's Active Bonuses</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                    {[
                        { label: '10 deliveries/day', bonus: '+₹100 bonus', progress: 15, target: 10, done: true },
                        { label: '50 deliveries/week', bonus: '+₹500 bonus', progress: 15, target: 50, done: false },
                        { label: '4.5+ rating', bonus: '+₹200/week', progress: 4.9, target: 4.5, done: true },
                    ].map((b, i) => (
                        <div key={i} style={{ padding: 14, background: b.done ? 'rgba(16,185,129,0.06)' : '#fff', borderRadius: 12, border: `1px solid ${b.done ? 'rgba(16,185,129,0.2)' : 'var(--border)'}` }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 4 }}>{b.label}</div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: b.done ? '#10b981' : '#f59e0b' }}>{b.bonus}</div>
                            {b.done ? (
                                <div style={{ fontSize: 11, color: '#10b981', fontWeight: 700, marginTop: 4 }}>✓ Earned!</div>
                            ) : (
                                <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>
                                    {b.progress}/{b.target} — {Math.round((b.progress / b.target) * 100)}%
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Earning breakdown */}
                <div className="admin-table-card">
                    <div className="admin-table-header"><h3>Earning Breakdown</h3></div>
                    <div style={{ padding: '16px 20px' }}>
                        {[
                            { label: 'Base Deliveries', value: '₹450', desc: '15 × ₹30 avg' },
                            { label: 'Daily Bonus (10+ orders)', value: '₹100', desc: '✓ Target hit!' },
                            { label: 'Festival Bonus (Holi)', value: '₹30', desc: '₹2 × 15 deliveries' },
                        ].map((e, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{e.label}</div>
                                    <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{e.desc}</div>
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 800, color: '#10b981' }}>{e.value}</div>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                            <div style={{ fontWeight: 700, color: '#1a1a2e' }}>Today Total</div>
                            <div style={{ fontSize: 18, fontWeight: 900, color: '#10b981' }}>₹580</div>
                        </div>
                    </div>
                </div>

                {/* Today Deliveries */}
                <div className="admin-table-card">
                    <div className="admin-table-header">
                        <h3>Today's Deliveries</h3>
                        <Link to="/rider/orders" style={{ fontSize: 13, color: '#10b981', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
                    </div>
                    <div>
                        {todayDeliveries.map((d, i) => (
                            <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 13 }}>{d.id}</div>
                                    <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{d.shop}</div>
                                    <div style={{ fontSize: 11, color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                                        <Clock size={10} /> {d.time} · {d.dist}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 800, color: '#10b981' }}>{d.earning}</div>
                                    <div style={{ fontSize: 11, background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '2px 8px', borderRadius: 999, fontWeight: 600 }}>Delivered</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Weekly target */}
            <div className="admin-table-card" style={{ marginTop: 20, padding: '20px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Weekly Target Progress</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>₹3,240 / ₹5,000 target</span>
                    <span style={{ fontWeight: 700, color: '#6366f1' }}>65%</span>
                </div>
                <div style={{ height: 10, background: 'var(--bg-base)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #10b981, #6366f1)', borderRadius: 999 }} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 6 }}>
                    Complete ₹1,760 more to earn the <strong>₹500 weekly bonus</strong> 🎯
                </div>
            </div>
        </div>
    );
}
