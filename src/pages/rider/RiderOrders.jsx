import { useState, useEffect } from 'react';
import { MapPin, Clock, Package, CheckCircle, Navigation, ShoppingBag } from 'lucide-react';

const TIMER_SECONDS = 25;

// Simulated incoming orders
const incomingOrders = [
    {
        id: '#ORD-2852',
        shop: 'Ramesh Kirana Store',
        shopAddr: 'Shop 12, Market St, Bhubaneswar',
        custName: 'Priya Sharma',
        custAddr: '45 MG Road, Unit 9, Bhubaneswar',
        distanceShopCust: '2.4 km',
        orderValue: '₹340',
        items: 4,
        earning: 30,
        deliveryKm: 2.4,
        payment: 'UPI (Prepaid)',
        eta: '~12 min',
    },
    {
        id: '#ORD-2853',
        shop: 'Priya Fashion Hub',
        shopAddr: 'Shop 5, Fashion Lane, Bhubaneswar',
        custName: 'Arun Das',
        custAddr: '78 Station Rd, Khandagiri',
        distanceShopCust: '3.8 km',
        orderValue: '₹890',
        items: 2,
        earning: 30,
        deliveryKm: 3.8,
        payment: 'Net Banking (Prepaid)',
        eta: '~18 min',
    },
];

// Delivery steps
const STEPS = [
    { key: 'navigate_shop', icon: <Navigation size={18} />, label: 'Navigate to Shop', action: 'Arrived at Shop' },
    { key: 'pickup', icon: <ShoppingBag size={18} />, label: 'Pickup Package', action: 'Mark Picked Up' },
    { key: 'navigate_cust', icon: <Navigation size={18} />, label: 'Navigate to Customer', action: 'Mark Arrived' },
    { key: 'otp', icon: <CheckCircle size={18} />, label: 'OTP Verification', action: 'Enter OTP to Complete' },
];

const earningForKm = (km) => km <= 2 ? 20 : km <= 5 ? 30 : 45;

export default function RiderOrders() {
    const [orders, setOrders] = useState(() =>
        incomingOrders.map(o => ({ ...o, status: 'Incoming', step: 0 }))
    );
    const [filter, setFilter] = useState('All');
    const [timers, setTimers] = useState(() =>
        Object.fromEntries(incomingOrders.map(o => [o.id, TIMER_SECONDS]))
    );
    const [otp, setOtp] = useState({});
    const [otpError, setOtpError] = useState({});
    const [delivered, setDelivered] = useState({});

    // Countdown timers for Incoming orders
    useEffect(() => {
        const interval = setInterval(() => {
            setTimers(prev => {
                const next = { ...prev };
                Object.keys(next).forEach(id => {
                    const order = orders.find(o => o.id === id);
                    if (order?.status === 'Incoming' && next[id] > 0) {
                        next[id] = next[id] - 1;
                        if (next[id] === 0) {
                            // Auto-reject on timeout
                            setOrders(prev => prev.map(o =>
                                o.id === id ? { ...o, status: 'Timeout' } : o
                            ));
                        }
                    }
                });
                return next;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [orders]);

    const accept = (id) => setOrders(prev => prev.map(o =>
        o.id === id ? { ...o, status: 'Active', step: 0 } : o
    ));
    const reject = (id) => setOrders(prev => prev.map(o =>
        o.id === id ? { ...o, status: 'Rejected' } : o
    ));
    const nextStep = (id) => setOrders(prev => prev.map(o =>
        o.id === id ? { ...o, step: Math.min(o.step + 1, STEPS.length - 1) } : o
    ));

    const handleOtp = (id, order) => {
        const entered = otp[id] || '';
        // Simulate correct OTP = "1234" for demo
        if (entered === '1234') {
            setOrders(prev => prev.map(o =>
                o.id === id ? { ...o, status: 'Delivered' } : o
            ));
            setDelivered(prev => ({ ...prev, [id]: true }));
            setOtpError(prev => ({ ...prev, [id]: '' }));
        } else {
            setOtpError(prev => ({ ...prev, [id]: 'Incorrect OTP. Customer receives OTP via SMS.' }));
        }
    };

    const filters = ['All', 'Incoming', 'Active', 'Delivered', 'Rejected', 'Timeout'];
    const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);

    const statusColor = {
        Incoming: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
        Active: { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' },
        Delivered: { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
        Rejected: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
        Timeout: { bg: 'rgba(107,114,128,0.1)', color: '#6b7280' },
    };

    const timerColor = (t) => t > 15 ? '#10b981' : t > 8 ? '#f59e0b' : '#ef4444';

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800 }}>My Delivery Orders</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>
                    All payments are prepaid — no cash handling required 🚫💵
                </p>
            </div>

            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {filters.map(f => (
                    <button key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '7px 16px', borderRadius: 999, border: '1px solid var(--border)',
                            background: filter === f ? '#10b981' : '#fff',
                            color: filter === f ? '#fff' : 'var(--gray-600)',
                            fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s'
                        }}>
                        {f}
                        {f !== 'All' && (
                            <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.8 }}>
                                ({orders.filter(o => o.status === f).length})
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '48px', color: 'var(--gray-400)' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🛵</div>
                    <div style={{ fontWeight: 600 }}>No orders in this category</div>
                </div>
            )}

            {filtered.map(order => (
                <div key={order.id} style={{
                    background: '#fff', borderRadius: 16,
                    border: `2px solid ${order.status === 'Incoming' ? '#f59e0b40' : order.status === 'Active' ? '#6366f140' : 'var(--border)'}`,
                    padding: 20, marginBottom: 16,
                    animation: order.status === 'Incoming' ? 'pulse 2s infinite' : 'none'
                }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontWeight: 800, fontSize: 14 }}>{order.id}</span>
                            <span style={{ ...statusColor[order.status], padding: '2px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                                {order.status}
                            </span>
                            <span style={{ fontSize: 11, color: '#6366f1', fontWeight: 600, background: 'rgba(99,102,241,0.08)', padding: '2px 8px', borderRadius: 999 }}>
                                ✓ {order.payment}
                            </span>
                        </div>
                        {/* Countdown timer for Incoming */}
                        {order.status === 'Incoming' && (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 28, fontWeight: 900, color: timerColor(timers[order.id] || 0), lineHeight: 1 }}>
                                    {timers[order.id] || 0}s
                                </div>
                                <div style={{ fontSize: 10, color: 'var(--gray-400)', fontWeight: 600 }}>AUTO-REJECT</div>
                            </div>
                        )}
                    </div>

                    {/* Order info grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12, fontSize: 12 }}>
                        <div>
                            <div style={{ fontWeight: 700, color: '#6366f1', marginBottom: 3 }}>📦 Pickup From</div>
                            <div style={{ fontWeight: 700 }}>{order.shop}</div>
                            <div style={{ color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: 3 }}>
                                <MapPin size={10} />{order.shopAddr}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, color: '#10b981', marginBottom: 3 }}>🏠 Deliver To</div>
                            <div style={{ fontWeight: 700 }}>{order.custName}</div>
                            <div style={{ color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: 3 }}>
                                <MapPin size={10} />{order.custAddr}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 12, color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Package size={12} /> {order.items} items · {order.orderValue}
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            🛵 {order.distanceShopCust}
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Clock size={12} /> ETA {order.eta}
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 900, color: '#10b981', marginLeft: 'auto' }}>
                            You earn: ₹{earningForKm(order.deliveryKm)}
                        </span>
                    </div>

                    {/* INCOMING — Accept / Reject */}
                    {order.status === 'Incoming' && (
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button className="btn-accept" style={{ flex: 1, padding: 12, borderRadius: 10, fontSize: 15 }} onClick={() => accept(order.id)}>
                                ✅ Accept Order
                            </button>
                            <button className="btn-reject" style={{ flex: 1, padding: 12, borderRadius: 10, fontSize: 15 }} onClick={() => reject(order.id)}>
                                ❌ Reject
                            </button>
                        </div>
                    )}

                    {/* ACTIVE — Step-by-step delivery flow */}
                    {order.status === 'Active' && (
                        <div>
                            {/* Step progress */}
                            <div style={{ display: 'flex', gap: '4px', marginBottom: 16 }}>
                                {STEPS.map((s, i) => (
                                    <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i <= order.step ? '#6366f1' : '#e5e7eb', transition: 'background 0.3s' }} />
                                ))}
                            </div>

                            {/* Current step */}
                            <div style={{ background: 'rgba(99,102,241,0.06)', borderRadius: 12, padding: 16, border: '1px solid rgba(99,102,241,0.2)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                        {STEPS[order.step].icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase' }}>
                                            Step {order.step + 1} of {STEPS.length}
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: 15 }}>{STEPS[order.step].label}</div>
                                    </div>
                                </div>

                                {/* OTP Step */}
                                {order.step === 3 ? (
                                    <div>
                                        <p style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 12 }}>
                                            Customer has received a <strong>4-digit OTP</strong> via SMS. Enter it to complete the delivery.
                                        </p>
                                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                            <input
                                                type="number"
                                                maxLength={4}
                                                placeholder="Enter OTP"
                                                value={otp[order.id] || ''}
                                                onChange={e => setOtp(prev => ({ ...prev, [order.id]: e.target.value }))}
                                                style={{
                                                    flex: 1, padding: '12px 16px', border: '2px solid #6366f1',
                                                    borderRadius: 10, fontSize: 20, fontWeight: 800,
                                                    textAlign: 'center', letterSpacing: 8, outline: 'none'
                                                }}
                                            />
                                            <button
                                                className="btn-accept"
                                                style={{ padding: '12px 20px', borderRadius: 10, fontSize: 15 }}
                                                onClick={() => handleOtp(order.id, order)}>
                                                ✓ Verify
                                            </button>
                                        </div>
                                        {otpError[order.id] && (
                                            <div style={{ fontSize: 12, color: '#ef4444', marginTop: 8, fontWeight: 600 }}>
                                                ⚠ {otpError[order.id]}
                                            </div>
                                        )}
                                        <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 8 }}>
                                            Demo OTP: <strong>1234</strong>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        className="btn-accept"
                                        style={{ width: '100%', padding: '12px', borderRadius: 10, fontSize: 14 }}
                                        onClick={() => nextStep(order.id)}>
                                        ✓ {STEPS[order.step].action}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* DELIVERED */}
                    {order.status === 'Delivered' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, background: 'rgba(16,185,129,0.08)', borderRadius: 10 }}>
                            <CheckCircle size={20} color="#10b981" />
                            <div>
                                <div style={{ fontWeight: 700, color: '#10b981' }}>Delivered Successfully!</div>
                                <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                                    OTP verified · ₹{earningForKm(order.deliveryKm)} credited to wallet
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TIMEOUT */}
                    {order.status === 'Timeout' && (
                        <div style={{ padding: 12, background: 'rgba(107,114,128,0.08)', borderRadius: 10, fontSize: 13, color: 'var(--gray-500)', fontWeight: 600 }}>
                            ⏱ Order auto-rejected (no response in {TIMER_SECONDS}s). Order sent to next available rider.
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
