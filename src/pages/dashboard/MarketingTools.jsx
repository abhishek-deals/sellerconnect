import { Image, Share2, QrCode, MessageCircle, Download, Sparkles } from 'lucide-react';
import './Dashboard.css';

const templates = [
    { emoji: '🛒', title: 'Sale Announcement', tag: 'WhatsApp' },
    { emoji: '🎉', title: 'Festival Offer', tag: 'Instagram' },
    { emoji: '⭐', title: 'New Arrival', tag: 'Facebook' },
    { emoji: '🎁', title: 'Discount Banner', tag: 'Story' },
    { emoji: '🚚', title: 'Free Delivery Ad', tag: 'WhatsApp' },
    { emoji: '💰', title: 'Price Drop Alert', tag: 'All' },
];

export default function MarketingTools() {
    return (
        <div>
            <div className="db-page-header">
                <div><h1>Marketing Tools</h1><p>Create banners, share products, generate QR codes, and boost your sales.</p></div>
            </div>

            <div className="db-two-col" style={{ marginBottom: '24px' }}>
                {/* Social Media Posters */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <div className="icon-box icon-box-purple"><Image size={20} /></div>
                        <h3>Social Media Posters</h3>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: '16px' }}>Choose a template and auto-generate branded posts for your shop in seconds.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {templates.map((t, i) => (
                            <button key={i} className="btn btn-outline" style={{ flexDirection: 'column', height: '80px', gap: '6px', fontSize: '12px' }}>
                                <span style={{ fontSize: 22 }}>{t.emoji}</span>
                                <span>{t.title}</span>
                                <span className="badge badge-blue" style={{ fontSize: '10px', padding: '1px 6px' }}>{t.tag}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* QR Code + Shareable Link */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                            <div className="icon-box icon-box-blue"><QrCode size={20} /></div>
                            <h3>Shop QR Code</h3>
                        </div>
                        <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius)', padding: '24px', textAlign: 'center', marginBottom: '12px', border: '1px solid var(--gray-100)' }}>
                            <div style={{ fontSize: 48, letterSpacing: -2 }}>▓▒░▓▒░▓<br />░▓▒░▒▓░<br />▓▒░▓▒░▓</div>
                            <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 8 }}>Scan to visit your online store</p>
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}><Download size={14} /> Download QR Code</button>
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                            <div className="icon-box icon-box-green"><Share2 size={20} /></div>
                            <h3>Product Share Link</h3>
                        </div>
                        <div className="form-group">
                            <label>Select Product</label>
                            <select><option>Basmati Rice 5kg</option><option>Fortune Oil 1L</option><option>Amul Butter</option></select>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                            <a href="#" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', background: '#25d366' }}><MessageCircle size={14} /> Share on WhatsApp</a>
                            <button className="btn btn-outline" style={{ padding: '10px 14px' }}><Share2 size={14} /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Auto Sale Banner */}
            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <Sparkles size={20} color="var(--accent-mid)" />
                    <h3>Auto-Generate Sale Banner</h3>
                </div>
                <div className="form-grid-2" style={{ marginBottom: '14px' }}>
                    <div className="form-group"><label>Occasion</label><select><option>Weekend Sale</option><option>Diwali Sale</option><option>Summer Offer</option><option>New Year</option></select></div>
                    <div className="form-group"><label>Discount to Highlight</label><input placeholder="e.g. 25% OFF" /></div>
                </div>
                <button className="btn btn-primary"><Sparkles size={16} /> Generate Banner</button>
            </div>
        </div>
    );
}
