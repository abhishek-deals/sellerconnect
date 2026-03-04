import { useState } from 'react';
import { Bot, Sparkles, Copy, RefreshCw } from 'lucide-react';
import './Dashboard.css';

const tools = [
    { emoji: '✍️', title: 'Product Description Generator', desc: 'Generate a professional, SEO-friendly product description instantly.', placeholder: 'Enter product name (e.g. Basmati Rice 5kg)', output: 'Our premium Basmati Rice 5kg is sourced from the finest farms of Dehradun. With its long, aromatic grains and fluffy texture when cooked, it\'s perfect for biryanis, pulao, and everyday meals. Rich in carbohydrates and naturally gluten-free. #OrganicRice #BuyLocal' },
    { emoji: '📸', title: 'Instagram Caption Generator', desc: 'Create viral Instagram captions for your product posts in seconds.', placeholder: 'Describe your product or offer...', output: '✨ Fresh stock alert! 🌾 Our Basmati Rice is back — long grain, aromatic & absolutely delicious! 😍 Order now via WhatsApp link in bio 🛒 #KiranaOnline #ShopLocal #IndianGrocery #FreshStock #SellSathi' },
    { emoji: '📢', title: 'Ad Copy Generator', desc: 'Generate high-converting Facebook & Google ad copy for your shop.', placeholder: 'What product/offer do you want to promote?', output: '🚨 LIMITED TIME OFFER! Get fresh Basmati Rice delivered to your doorstep! 🚀 Order NOW and save 20% 💰 Free delivery on orders above ₹500. Click → Order on WhatsApp. Trusted by 500+ families in Bhubaneswar!' },
    { emoji: '💰', title: 'Pricing Suggestion', desc: 'Get AI-powered pricing recommendations based on market trends.', placeholder: 'Enter product name and current price...', output: 'For Basmati Rice 5kg: Market avg: ₹280-310. Suggested price: ₹295 (competitive). For higher margins try ₹315 with "premium" branding. Bundle offer: 2 packs = ₹550 (saves ₹40) — boosts average order value.' },
    { emoji: '📈', title: 'Sales Prediction', desc: 'Predict next month\'s top sellers and revenue based on your history.', placeholder: 'Describe your shop briefly (type, location)...', output: 'Based on your sales history: 📈 Next month top sellers: 1) Basmati Rice 2) Fortune Oil 3) Amul Butter. Festival season boost expected: +35% revenue. Recommend stocking 25% more on these 3 products.' },
    { emoji: '🎯', title: 'Festival Campaign Generator', desc: 'Create complete festival marketing campaigns for Diwali, Holi, Eid and more.', placeholder: 'Which festival and what offer?', output: '🪔 DIWALI CAMPAIGN PLAN:\n• WhatsApp Message: "This Diwali, light up your home with fresh groceries! 20% OFF on all orders. Order via WhatsApp!"\n• Instagram post: "Festive offers are here! Tag 2 friends to win FREE delivery 🎁"\n• Google My Business: Update post with festive hours & offers.' },
];

export default function AITools() {
    const [active, setActive] = useState(0);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const generate = () => {
        if (!input.trim()) return;
        setLoading(true);
        setTimeout(() => {
            setOutput(tools[active].output);
            setLoading(false);
        }, 1400);
    };

    return (
        <div>
            <div className="db-page-header">
                <div>
                    <h1>🤖 AI Tools</h1>
                    <p>Powered by AI — create marketing content, descriptions, and campaigns in seconds.</p>
                </div>
            </div>

            <div className="db-two-col" style={{ alignItems: 'start' }}>
                {/* Tool selector */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {tools.map((t, i) => (
                        <button
                            key={i}
                            className={`ai-tool-card ${active === i ? 'ai-tool-active' : ''}`}
                            style={{ textAlign: 'left', cursor: 'pointer', border: active === i ? '1px solid var(--accent-mid)' : undefined }}
                            onClick={() => { setActive(i); setOutput(''); setInput(''); }}
                        >
                            <div className="ai-tool-header">
                                <span className="ai-tool-icon">{t.emoji}</span>
                                <div>
                                    <h3 style={{ fontSize: 14 }}>{t.title}</h3>
                                    <p style={{ fontSize: 12, marginTop: 2 }}>{t.desc}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Active tool */}
                <div className="card" style={{ position: 'sticky', top: '80px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <span style={{ fontSize: 32 }}>{tools[active].emoji}</span>
                        <div>
                            <h3>{tools[active].title}</h3>
                            <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{tools[active].desc}</p>
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                        <label>Your Input</label>
                        <textarea className="ai-textarea" rows={3} placeholder={tools[active].placeholder} value={input} onChange={e => setInput(e.target.value)} />
                    </div>

                    <button className="btn btn-primary" style={{ marginBottom: '16px' }} onClick={generate} disabled={loading}>
                        {loading ? <><RefreshCw size={15} className="spin" /> Generating...</> : <><Sparkles size={15} /> Generate with AI</>}
                    </button>

                    {output && (
                        <div style={{ position: 'relative' }}>
                            <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', display: 'block', marginBottom: '8px' }}>✨ Generated Output</label>
                            <div className="ai-result-box" style={{ whiteSpace: 'pre-wrap' }}>{output}</div>
                            <button style={{ position: 'absolute', top: 30, right: 10, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)' }}
                                onClick={() => navigator.clipboard.writeText(output)}>
                                <Copy size={15} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
