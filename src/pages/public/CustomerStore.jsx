import { useState } from 'react';
import { ShoppingBag, Search, ShoppingCart, MessageCircle, Star, Phone, MapPin, X, AlertTriangle, Clock } from 'lucide-react';
import { useParams } from 'react-router-dom';
import './CustomerStore.css';
import '../../pages/admin/Admin.css';

const shopProducts = [
    { id: 1, name: 'Basmati Rice 5kg', category: 'Grocery', price: 280, oldPrice: 320, emoji: '🌾', gstPct: 5 },
    { id: 2, name: 'Fortune Refined Oil 1L', category: 'Grocery', price: 145, oldPrice: 160, emoji: '🫙', gstPct: 5 },
    { id: 3, name: 'Amul Butter 500g', category: 'Dairy', price: 260, oldPrice: 280, emoji: '🧈', gstPct: 12 },
    { id: 4, name: 'Tata Salt 1kg', category: 'Grocery', price: 24, oldPrice: 28, emoji: '🧂', gstPct: 0 },
    { id: 5, name: 'Parle-G Gold 800g', category: 'Biscuits', price: 55, oldPrice: 60, emoji: '🍪', gstPct: 18 },
    { id: 6, name: 'Colgate Active Salt 200g', category: 'Personal Care', price: 85, oldPrice: 95, emoji: '🪥', gstPct: 18 },
];

const categories = ['All', 'Grocery', 'Dairy', 'Biscuits', 'Personal Care'];

// Delivery charge rules
const DELIVERY_CHARGES = {
    self: { '0-2': 10, '2-5': 20, '5-10': 30 },
    rider: { '0-2': 25, '2-5': 40, '5-10': 60 },
    pickup: 0,
};
const PLATFORM_SERVICE_FEE = 5;
const MIN_ORDER_FOR_RIDER = 199;

function getDeliveryCharge(type, km) {
    if (type === 'pickup') return 0;
    if (km <= 2) return DELIVERY_CHARGES[type]['0-2'];
    if (km <= 5) return DELIVERY_CHARGES[type]['2-5'];
    return DELIVERY_CHARGES[type]['5-10'];
}

export default function CustomerStore() {
    const { shopId } = useParams();
    const [activeCat, setActiveCat] = useState('All');
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState({});
    const [showCheckout, setShowCheckout] = useState(false);
    const [address, setAddress] = useState('');
    const [deliveryType, setDeliveryType] = useState('rider');
    const [distanceKm] = useState(3.5); // simulated distance
    const [paymentMethod, setPaymentMethod] = useState('UPI');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const filtered = shopProducts.filter(p =>
        (activeCat === 'All' || p.category === activeCat) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

    // Calculate subtotal (base prices only)
    const productSubtotal = shopProducts.reduce((sum, p) => sum + (cart[p.id] || 0) * p.price, 0);

    // Calculate total GST across all items
    const totalGST = shopProducts.reduce((sum, p) => {
        const qty = cart[p.id] || 0;
        return sum + (qty * p.price * p.gstPct / 100);
    }, 0);

    const deliveryCharge = getDeliveryCharge(deliveryType, distanceKm);
    const serviceFee = deliveryType !== 'pickup' ? PLATFORM_SERVICE_FEE : 0;
    const finalPayable = productSubtotal + totalGST + deliveryCharge + serviceFee;

    const belowMinOrder = deliveryType === 'rider' && productSubtotal < MIN_ORDER_FOR_RIDER;

    const updateCart = (id, delta) => {
        setCart(prev => {
            const newQty = (prev[id] || 0) + delta;
            if (newQty <= 0) {
                const copy = { ...prev };
                delete copy[id];
                return copy;
            }
            return { ...prev, [id]: newQty };
        });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setOrderPlaced(true);
        setTimeout(() => {
            setOrderPlaced(false);
            setShowCheckout(false);
            setCart({});
        }, 3000);
    };

    const checkoutViaWhatsApp = () => {
        if (totalItems === 0) return;
        let msg = `*New Order from SellerConnect:*\n\n`;
        shopProducts.forEach(p => {
            if (cart[p.id]) {
                const gstAmt = (cart[p.id] * p.price * p.gstPct / 100);
                msg += `👉 ${p.name} - ${cart[p.id]} x ₹${p.price} = ₹${cart[p.id] * p.price} (GST ${p.gstPct}%: ₹${gstAmt.toFixed(0)})\n`;
            }
        });
        msg += `\n*Products: ₹${productSubtotal}*`;
        msg += `\n*Total GST: ₹${totalGST.toFixed(0)}*`;
        msg += `\n*Delivery: ₹${deliveryCharge}*`;
        msg += `\n*Service Fee: ₹${serviceFee}*`;
        msg += `\n*TOTAL PAYABLE: ₹${Math.round(finalPayable)}*`;
        msg += `\n\nDelivery Type: ${deliveryType.toUpperCase()}`;
        msg += `\nPayment: ${paymentMethod}`;
        if (address) msg += `\nDelivery Address: ${address}`;
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <div className="store-container">
            {/* Store Header */}
            <div className="store-header">
                <div className="store-header-inner">
                    <div className="store-profile">
                        <div className="store-avatar">R</div>
                        <div>
                            <h1 className="store-title">{shopId ? shopId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Ramesh Kirana Store'}</h1>
                            <div className="store-tags">
                                <span className="store-tag"><Star size={12} fill="gold" color="gold" /> 4.8</span>
                                <span className="store-tag">Grocery</span>
                                <span className="store-tag"><MapPin size={12} /> Bhubaneswar</span>
                                <span className="store-tag"><Clock size={12} /> Open · 8AM–9PM</span>
                            </div>
                        </div>
                    </div>
                    <div className="store-actions">
                        <a href="tel:+919876543210" className="store-btn-circle"><Phone size={18} /></a>
                        <a href="https://wa.me/919876543210" className="store-btn-circle" style={{ color: '#25d366' }}><MessageCircle size={18} /></a>
                    </div>
                </div>
            </div>

            <div className="store-content">
                {/* Search */}
                <div className="store-search-wrap">
                    <Search size={18} color="var(--gray-400)" />
                    <input type="text" placeholder="Search products..." className="store-search-input"
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                {/* Categories */}
                <div className="store-categories">
                    {categories.map(c => (
                        <button key={c} className={`store-cat-btn ${activeCat === c ? 'active' : ''}`} onClick={() => setActiveCat(c)}>
                            {c}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="store-grid">
                    {filtered.map(p => (
                        <div key={p.id} className="store-product-card">
                            <div className="product-image">{p.emoji}</div>
                            <div className="product-details">
                                <div className="product-cat">{p.category}</div>
                                <h3 className="product-name">{p.name}</h3>
                                {p.gstPct > 0 && (
                                    <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 600, marginBottom: 2 }}>
                                        GST {p.gstPct}% incl.
                                    </div>
                                )}
                                <div className="product-price-row">
                                    <div className="product-price">
                                        ₹{p.price} <span className="product-old-price">₹{p.oldPrice}</span>
                                    </div>
                                    {cart[p.id] ? (
                                        <div className="qty-controls">
                                            <button onClick={() => updateCart(p.id, -1)}>-</button>
                                            <span>{cart[p.id]}</span>
                                            <button onClick={() => updateCart(p.id, 1)}>+</button>
                                        </div>
                                    ) : (
                                        <button className="add-btn" onClick={() => updateCart(p.id, 1)}>Add</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Cart Bottom Bar */}
            {totalItems > 0 && (
                <div className="floating-cart-bar">
                    <div className="cart-info">
                        <div className="cart-icon-wrap">
                            <ShoppingBag size={20} color="#fff" />
                            <div className="cart-badge">{totalItems}</div>
                        </div>
                        <div style={{ color: '#fff', fontWeight: 700 }}>
                            ₹{Math.round(productSubtotal + totalGST)}
                            <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.8 }}>Subtotal incl. GST</div>
                        </div>
                    </div>
                    <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
                        View Bill & Checkout <ShoppingCart size={16} />
                    </button>
                </div>
            )}

            {/* Checkout Modal */}
            {showCheckout && (
                <div className="checkout-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowCheckout(false); }}>
                    <div className="checkout-modal">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <h3 style={{ margin: 0 }}>Order Summary & Checkout</h3>
                            <button onClick={() => setShowCheckout(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                                <X size={22} />
                            </button>
                        </div>

                        {orderPlaced ? (
                            <div style={{ textAlign: 'center', padding: '32px 0' }}>
                                <div style={{ fontSize: 56 }}>🎉</div>
                                <h3 style={{ color: '#10b981', marginTop: 12 }}>Order Placed!</h3>
                                <p style={{ color: '#6b7280', fontSize: 14 }}>Order confirmed! Seller has been notified. You'll receive a WhatsApp update shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handlePlaceOrder}>
                                {/* Product Details */}
                                <div style={{ marginBottom: 12 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 8 }}>Cart Items</div>
                                    {shopProducts.filter(p => cart[p.id]).map(p => {
                                        const gstAmt = cart[p.id] * p.price * p.gstPct / 100;
                                        return (
                                            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13 }}>
                                                <span>{p.emoji} {p.name} ×{cart[p.id]}</span>
                                                <span style={{ fontWeight: 600 }}>₹{cart[p.id] * p.price}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <hr className="bill-divider" />

                                {/* Full Bill Breakdown */}
                                <div style={{ marginBottom: 12 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 8 }}>Bill Breakdown</div>
                                    <table className="bill-table">
                                        <tbody>
                                            <tr>
                                                <td>Products Subtotal</td>
                                                <td>₹{productSubtotal}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: '#f59e0b' }}>GST (calculated per item)</td>
                                                <td style={{ color: '#f59e0b' }}>₹{Math.round(totalGST)}</td>
                                            </tr>
                                            {deliveryType !== 'pickup' && (
                                                <tr>
                                                    <td>Delivery Charge ({distanceKm} km · {deliveryType})</td>
                                                    <td>₹{deliveryCharge}</td>
                                                </tr>
                                            )}
                                            {serviceFee > 0 && (
                                                <tr>
                                                    <td>Platform Service Fee</td>
                                                    <td>₹{serviceFee}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <hr className="bill-divider" />
                                    <table className="bill-table">
                                        <tbody>
                                            <tr className="bill-total-row">
                                                <td>TOTAL PAYABLE</td>
                                                <td style={{ color: '#6366f1' }}>₹{Math.round(finalPayable)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <hr className="bill-divider" />

                                {/* Minimum Order Warning */}
                                {belowMinOrder && (
                                    <div className="min-order-warning">
                                        <AlertTriangle size={14} />
                                        Minimum ₹{MIN_ORDER_FOR_RIDER} required for rider delivery. Add more items or choose Pickup.
                                    </div>
                                )}

                                {/* Delivery Type */}
                                <div style={{ marginBottom: 12 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 8 }}>Delivery Type</div>
                                    <div className="delivery-options">
                                        {[
                                            { key: 'rider', label: '🛵 Platform Rider', sub: `₹${getDeliveryCharge('rider', distanceKm)}` },
                                            { key: 'self', label: '🏪 Shop Delivery', sub: `₹${getDeliveryCharge('self', distanceKm)}` },
                                            { key: 'pickup', label: '📦 Self Pickup', sub: '₹0' },
                                        ].map(d => (
                                            <button key={d.key} type="button"
                                                className={`delivery-option-btn ${deliveryType === d.key ? 'selected' : ''}`}
                                                onClick={() => setDeliveryType(d.key)}>
                                                {d.label}
                                                <div style={{ fontSize: 11, marginTop: 2, opacity: 0.8 }}>{d.sub}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Address (for non-pickup) */}
                                {deliveryType !== 'pickup' && (
                                    <div style={{ marginBottom: 12 }}>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 8 }}>Delivery Address</div>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10, padding: '10px 12px' }}>
                                            <MapPin size={16} color="#9ca3af" style={{ marginTop: 2, flexShrink: 0 }} />
                                            <textarea
                                                required={deliveryType !== 'pickup'}
                                                placeholder="Enter your full delivery address..."
                                                value={address}
                                                onChange={e => setAddress(e.target.value)}
                                                style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: 14, resize: 'none', minHeight: 56 }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Payment Method - COD REMOVED: Online only */}
                                <div style={{ marginBottom: 20 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 6 }}>Payment Method</div>
                                    <div style={{ fontSize: 11, color: '#6366f1', fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                                        🔒 Secure Online Payment via Razorpay
                                    </div>
                                    <div className="payment-options">
                                        {[
                                            { key: 'UPI', label: '📱 UPI' },
                                            { key: 'Debit/Credit Card', label: '💳 Card' },
                                            { key: 'Net Banking', label: '🏦 Net Banking' },
                                            { key: 'Wallet', label: '👛 Wallet' },
                                        ].map(m => (
                                            <button key={m.key} type="button"
                                                className={`payment-option-btn ${paymentMethod === m.key ? 'selected' : ''}`}
                                                onClick={() => setPaymentMethod(m.key)}>
                                                {m.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>
                                        ⚠️ Cash on Delivery not available. All payments are 100% digital.
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={belowMinOrder}
                                    style={{
                                        width: '100%', padding: '14px',
                                        background: belowMinOrder ? '#d1d5db' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        color: '#fff', border: 'none', borderRadius: 12,
                                        fontSize: 15, fontWeight: 800, cursor: belowMinOrder ? 'not-allowed' : 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                                    }}>
                                    💳 Pay Online · ₹{Math.round(finalPayable)}
                                </button>

                                <button type="button"
                                    onClick={checkoutViaWhatsApp}
                                    style={{
                                        width: '100%', padding: '12px', marginTop: 10,
                                        background: '#25d366', color: '#fff', border: 'none', borderRadius: 12,
                                        fontSize: 14, fontWeight: 700, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                                    }}>
                                    <MessageCircle size={18} /> Also Share via WhatsApp
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
