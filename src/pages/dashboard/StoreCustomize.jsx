import { useState } from 'react';
import { Image, Clock, MapPin, Phone, Globe, Tag, Save, Eye } from 'lucide-react';
import './Dashboard.css';

const CATEGORIES = ['Grocery', 'Dairy', 'Snacks', 'Beverages', 'Personal Care', 'Bakery', 'Electronics', 'Clothing'];

export default function StoreCustomize() {
    const [saved, setSaved] = useState(false);
    const [banner, setBanner] = useState('');
    const [logo, setLogo] = useState('');
    const [shopName, setShopName] = useState('Ramesh Kirana Store');
    const [tagline, setTagline] = useState('Your trusted neighbourhood store');
    const [address, setAddress] = useState('Plot 42, Unit-4, Bhubaneswar, Odisha 751001');
    const [phone, setPhone] = useState('9876543210');
    const [whatsapp, setWhatsapp] = useState('9876543210');
    const [categories, setCategories] = useState(['Grocery', 'Dairy', 'Snacks']);
    const [openTime, setOpenTime] = useState('08:00');
    const [closeTime, setCloseTime] = useState('22:00');
    const [closedDays, setClosedDays] = useState([]);
    const [storeSlug] = useState('ramesh-kirana');

    const toggleCategory = (cat) =>
        setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
    const toggleDay = (d) =>
        setClosedDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

    return (
        <div>
            <div className="db-page-header">
                <div>
                    <h1>Store Customization</h1>
                    <p>Design your public store page — banner, timings, categories, and more.</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <a href={`/store/${storeSlug}`} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Eye size={14} /> Preview Store
                    </a>
                    <button className="btn btn-primary btn-sm" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Save size={14} /> {saved ? '✓ Saved!' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Store URL Card */}
            <div style={{ padding: '14px 20px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 12, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', marginBottom: 2 }}>Your Store URL</div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>
                        sellerconnect.in/store/<span style={{ color: '#6366f1' }}>{storeSlug}</span>
                    </div>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => navigator.clipboard?.writeText(`https://sellerconnect.in/store/${storeSlug}`)}>
                    Copy Link
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* Basic Info */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                        <div className="icon-box icon-box-blue"><Globe size={18} /></div>
                        <h3>Basic Info</h3>
                    </div>
                    <div className="form-group"><label>Shop Name</label><input value={shopName} onChange={e => setShopName(e.target.value)} /></div>
                    <div className="form-group"><label>Tagline / Short Description</label><input value={tagline} onChange={e => setTagline(e.target.value)} placeholder="e.g. Fresh groceries daily" /></div>
                    <div className="form-group"><label><Phone size={12} /> Phone Number</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} /></div>
                    <div className="form-group"><label>WhatsApp Number (for orders)</label><input type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} /></div>
                    <div className="form-group"><label><MapPin size={12} /> Full Shop Address</label><textarea className="ai-textarea" rows={2} value={address} onChange={e => setAddress(e.target.value)} /></div>
                </div>

                {/* Images */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                            <div className="icon-box icon-box-purple"><Image size={18} /></div>
                            <h3>Shop Banner</h3>
                        </div>
                        <div style={{ border: '2px dashed #e5e7eb', borderRadius: 12, padding: '24px', textAlign: 'center', background: '#fafafa', cursor: 'pointer' }}
                            onClick={() => document.getElementById('bannerInput').click()}>
                            {banner
                                ? <img src={banner} alt="banner" style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8 }} />
                                : <div><div style={{ fontSize: 32 }}>🖼</div><div style={{ fontSize: 13, color: 'var(--gray-400)', marginTop: 4 }}>Click to upload banner (1200×400 px)</div></div>
                            }
                        </div>
                        <input id="bannerInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) setBanner(URL.createObjectURL(e.target.files[0])); }} />
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                            <div className="icon-box icon-box-green"><Image size={18} /></div>
                            <h3>Shop Logo</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{ width: 72, height: 72, borderRadius: 16, background: logo ? 'transparent' : 'var(--bg-base)', border: '2px dashed #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer', flexShrink: 0 }}
                                onClick={() => document.getElementById('logoInput').click()}>
                                {logo ? <img src={logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 28 }}>🏪</span>}
                            </div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>Upload logo 256×256 px</div>
                                <button className="btn btn-outline btn-sm" style={{ marginTop: 6 }} onClick={() => document.getElementById('logoInput').click()}>Choose File</button>
                            </div>
                        </div>
                        <input id="logoInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) setLogo(URL.createObjectURL(e.target.files[0])); }} />
                    </div>
                </div>

                {/* Categories */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                        <div className="icon-box icon-box-orange"><Tag size={18} /></div>
                        <h3>Store Categories</h3>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 14 }}>Select categories that best describe your store. Shown to customers on your store page.</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {CATEGORIES.map(cat => (
                            <button key={cat} onClick={() => toggleCategory(cat)}
                                style={{
                                    padding: '7px 14px', borderRadius: 999,
                                    border: `2px solid ${categories.includes(cat) ? '#6366f1' : '#e5e7eb'}`,
                                    background: categories.includes(cat) ? 'rgba(99,102,241,0.08)' : '#fff',
                                    color: categories.includes(cat) ? '#6366f1' : 'var(--gray-600)',
                                    fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s'
                                }}>
                                {categories.includes(cat) ? '✓ ' : ''}{cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Opening Hours */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                        <div className="icon-box icon-box-green"><Clock size={18} /></div>
                        <h3>Opening Hours</h3>
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                            <label>Opens At</label>
                            <input type="time" value={openTime} onChange={e => setOpenTime(e.target.value)} />
                        </div>
                        <div className="form-group" style={{ flex: 1, margin: 0 }}>
                            <label>Closes At</label>
                            <input type="time" value={closeTime} onChange={e => setCloseTime(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', marginBottom: 8 }}>Closed Days</div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                                <button key={d} onClick={() => toggleDay(d)}
                                    style={{
                                        padding: '6px 12px', borderRadius: 8,
                                        border: `1px solid ${closedDays.includes(d) ? '#ef4444' : '#e5e7eb'}`,
                                        background: closedDays.includes(d) ? 'rgba(239,68,68,0.08)' : '#fff',
                                        color: closedDays.includes(d) ? '#ef4444' : 'var(--gray-600)',
                                        fontWeight: 600, fontSize: 13, cursor: 'pointer'
                                    }}>
                                    {d}
                                </button>
                            ))}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 6 }}>
                            Closed days will show "Closed" on your store page.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
