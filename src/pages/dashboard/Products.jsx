import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, AlertTriangle, Upload } from 'lucide-react';
import './Dashboard.css';

const initialProducts = [
    { id: 1, name: 'Basmati Rice 5kg', category: 'Grocery', price: 280, stock: 45, status: 'active', emoji: '🌾', gstPct: 5 },
    { id: 2, name: 'Fortune Oil 1L', category: 'Grocery', price: 145, stock: 3, status: 'low', emoji: '🫙', gstPct: 5 },
    { id: 3, name: 'Colgate Toothpaste', category: 'Personal Care', price: 85, stock: 24, status: 'active', emoji: '🪥', gstPct: 18 },
    { id: 4, name: 'Amul Butter 500g', category: 'Dairy', price: 260, stock: 12, status: 'active', emoji: '🧈', gstPct: 12 },
    { id: 5, name: 'Tata Salt 1kg', category: 'Grocery', price: 24, stock: 0, status: 'out', emoji: '🧂', gstPct: 0 },
    { id: 6, name: 'Parle-G 800g', category: 'Biscuits', price: 55, stock: 32, status: 'active', emoji: '🍪', gstPct: 18 },
];

export default function Products() {
    const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState('');
    const [showAdd, setShowAdd] = useState(false);

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    const del = (id) => setProducts(products.filter(p => p.id !== id));

    return (
        <div>
            <div className="db-page-header">
                <div><h1>Products</h1><p>Manage your product catalog, prices, and stock.</p></div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-outline btn-sm"><Upload size={14} /> Bulk Upload</button>
                    <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}><Plus size={14} /> Add Product</button>
                </div>
            </div>

            {/* SUMMARY */}
            <div className="db-stat-grid" style={{ marginBottom: '20px' }}>
                {[
                    { label: 'Total Products', value: products.length, col: 'blue' },
                    { label: 'Active', value: products.filter(p => p.status === 'active').length, col: 'green' },
                    { label: 'Low Stock', value: products.filter(p => p.status === 'low').length, col: 'orange' },
                    { label: 'Out of Stock', value: products.filter(p => p.status === 'out').length, col: 'purple' },
                ].map((s, i) => (
                    <div key={i} className="db-stat-card card">
                        <div className="db-stat-value" style={{ fontSize: '28px' }}>{s.value}</div>
                        <div className="db-stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="card">
                <div className="products-toolbar">
                    <div className="products-search">
                        <Search size={16} />
                        <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <select className="btn btn-outline btn-sm" style={{ cursor: 'pointer', height: '40px' }}>
                        <option>All Categories</option><option>Grocery</option><option>Dairy</option><option>Biscuits</option>
                    </select>
                </div>

                {products.some(p => p.status === 'low' || p.status === 'out') && (
                    <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <AlertTriangle size={16} color="#f97316" />
                        <span style={{ fontSize: '13px', fontWeight: '600' }}>⚠️ {products.filter(p => p.status === 'low' || p.status === 'out').length} products need restocking!</span>
                    </div>
                )}

                <div className="db-table-wrap">
                    <table className="db-table">
                        <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>GST %</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div className="product-img-placeholder">{p.emoji}</div>
                                            <strong style={{ fontSize: '14px' }}>{p.name}</strong>
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--gray-500)', fontSize: '13px' }}>{p.category}</td>
                                    <td style={{ fontWeight: '700' }}>₹{p.price}</td>
                                    <td>
                                        <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: p.gstPct === 0 ? '#f3f4f6' : 'rgba(245,158,11,0.1)', color: p.gstPct === 0 ? '#9ca3af' : '#d97706' }}>
                                            {p.gstPct}%
                                        </span>
                                    </td>
                                    <td>{p.stock} units</td>
                                    <td>
                                        <span className={`badge ${p.status === 'active' ? 'badge-green' : p.status === 'low' ? 'badge-orange' : 'badge-red'}`}>
                                            {p.status === 'active' ? 'In Stock' : p.status === 'low' ? 'Low Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="btn btn-outline btn-sm" style={{ padding: '6px 10px' }}><Edit2 size={13} /></button>
                                            <button className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--red)', padding: '6px 10px' }} onClick={() => del(p.id)}><Trash2 size={13} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ADD PRODUCT MODAL */}
            {showAdd && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                    <div className="modal-box card" onClick={e => e.stopPropagation()}>
                        <h3 style={{ marginBottom: '20px' }}>Add New Product</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div className="form-grid-2">
                                <div className="form-group"><label>Product Name</label><input placeholder="e.g. Basmati Rice 5kg" /></div>
                                <div className="form-group"><label>Category</label><select><option>Grocery</option><option>Dairy</option><option>Biscuits</option></select></div>
                            </div>
                            <div className="form-grid-2">
                                <div className="form-group"><label>Price (₹)</label><input type="number" placeholder="280" /></div>
                                <div className="form-group">
                                    <label>GST %</label>
                                    <select>
                                        <option value="0">0% (Exempt)</option>
                                        <option value="5">5% (Essential goods)</option>
                                        <option value="12">12% (Standard)</option>
                                        <option value="18">18% (Most items)</option>
                                        <option value="28">28% (Luxury)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group"><label>Discount (%)</label><input type="number" placeholder="0" /></div>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                                <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
                                <button className="btn btn-primary">Save Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
