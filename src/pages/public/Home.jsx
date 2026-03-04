import { Link } from 'react-router-dom';
import {
    Rocket, ArrowRight, ShoppingCart, Globe, CreditCard, MapPin, Share2, Bot,
    Users, Star, TrendingUp, Shield, CheckCircle, ChevronRight, Play,
    Smartphone, Package, BarChart3, MessageCircle, Zap, Store
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Home.css';

const problems = [
    { icon: <TrendingUp />, title: 'Low Footfall', desc: 'Fewer customers walking into physical stores due to changing shopping habits.' },
    { icon: <Globe />, title: 'No Online Presence', desc: 'Competitors are online but your shop is still invisible on Google & social media.' },
    { icon: <BarChart3 />, title: 'No Marketing Skills', desc: 'Unsure how to run ads, create content, or attract online customers.' },
    { icon: <CreditCard />, title: 'No Digital Payments', desc: 'Missing out on customers who prefer UPI, card, or wallet payments.' },
    { icon: <Share2 />, title: 'Zero Online Sales', desc: 'WhatsApp orders are manual, error-prone, and hard to track.' },
    { icon: <Smartphone />, title: 'Technical Fear', desc: 'Technology feels complex and expensive for small shop owners.' },
];

const solutions = [
    { icon: <Globe />, title: 'E-Commerce Website', desc: 'Your professional online store ready to take orders 24/7.', color: 'blue' },
    { icon: <MessageCircle />, title: 'WhatsApp Ordering', desc: 'Let customers order directly via WhatsApp – zero hassle.', color: 'green' },
    { icon: <CreditCard />, title: 'Payment Gateway', desc: 'Accept UPI, cards, and wallets with Razorpay integration.', color: 'purple' },
    { icon: <MapPin />, title: 'Google Business', desc: 'Appear on Google Maps and local searches instantly.', color: 'orange' },
    { icon: <Share2 />, title: 'Social Media Setup', desc: 'Instagram, Facebook pages set up and branded for your shop.', color: 'blue' },
    { icon: <BarChart3 />, title: 'Ads Management', desc: 'Expert-run Facebook & Google ads to grow your sales.', color: 'green' },
    { icon: <Bot />, title: 'AI Marketing Tools', desc: 'AI-powered captions, descriptions, pricing & campaign ideas.', color: 'purple' },
    { icon: <Package />, title: 'Inventory Management', desc: 'Track stock, set alerts, and never run out of bestsellers.', color: 'orange' },
];

const steps = [
    { n: '01', title: 'Register Free', desc: 'Create your SellerConnect account in 2 minutes – no credit card needed.' },
    { n: '02', title: 'We Contact You', desc: 'Our onboarding expert calls you within 24 hours to understand your business.' },
    { n: '03', title: 'We Setup Your Store', desc: 'Our team builds your branded online store with all integrations.' },
    { n: '04', title: 'Products Uploaded', desc: 'We photograph and upload all your products with AI descriptions.' },
    { n: '05', title: 'Start Getting Orders', desc: 'Go live and watch orders roll in from WhatsApp, Google & your website.' },
];

const categories = [
    { emoji: '🛒', name: 'Grocery Stores' },
    { emoji: '👗', name: 'Clothing Shops' },
    { emoji: '📱', name: 'Electronics' },
    { emoji: '💊', name: 'Medical Stores' },
    { emoji: '🍬', name: 'Sweet Shops' },
    { emoji: '🏪', name: 'Local Vendors' },
    { emoji: '📚', name: 'Stationery' },
    { emoji: '🍕', name: 'Food & Bakers' },
];

const stats = [
    { value: '120+', label: 'Shops Onboarded', trend: '+15 this month' },
    { value: '₹25L+', label: 'Sales Generated', trend: '+₹3L this week' },
    { value: '95%', label: 'Satisfaction Rate', trend: 'Consistently high' },
    { value: '7 Days', label: 'Average Setup', trend: 'Fastest in India' },
];

const testimonials = [
    { name: 'Rajesh Sharma', shop: 'Sharma Kirana Store, Bhubaneswar', rating: 5, text: 'SellerConnect ne mera poora business change kar diya! Pehle 50 customers the, ab 300+ orders aate hain har mahine. Best decision tha!', avatar: '👨‍🦱' },
    { name: 'Priya Patel', shop: 'Priya Fashion, Cuttack', rating: 5, text: 'Without any technical knowledge, my clothing shop is now online. The team handled everything from website to Instagram setup. Amazing!', avatar: '👩‍🦰' },
    { name: 'Sunita Mohanty', shop: 'Sweets & More, Puri', rating: 5, text: 'Festival season mein WhatsApp orders se ₹80,000 extra kamai. SellerConnect is truly a blessing for small business owners!', avatar: '👩‍🦳' },
];

export default function Home() {
    return (
        <div className="home">
            <Navbar />

            {/* HERO */}
            <section className="hero">
                <div className="hero-bg"></div>
                <div className="hero-particles">
                    {[...Array(20)].map((_, i) => <div key={i} className="particle" style={{ '--delay': `${i * 0.3}s`, '--x': `${Math.random() * 100}%`, '--y': `${Math.random() * 100}%` }}></div>)}
                </div>
                <div className="container hero-inner">
                    <div className="hero-badge">
                        <Zap size={14} />
                        <span>🚀 Trusted by 120+ Shopkeepers Across India</span>
                    </div>
                    <h1 className="hero-title">
                        Take Your Shop Online<br />
                        <span className="gradient-text">in Just 7 Days 🚀</span>
                    </h1>
                    <p className="hero-subtitle">
                        We help local shopkeepers sell online <strong>without any technical knowledge</strong>.<br />
                        Website + WhatsApp Orders + Payment + Marketing — Everything Done For You.
                    </p>
                    <div className="hero-cta">
                        <Link to="/signup" className="btn btn-primary btn-lg">
                            <Rocket size={20} /> Start Free Consultation
                        </Link>
                        <a href="#how-it-works" className="btn btn-outline-white btn-lg">
                            <Play size={18} /> See How It Works
                        </a>
                    </div>
                    <div className="hero-trust">
                        <div className="trust-item"><CheckCircle size={15} /><span>No Technical Skills Needed</span></div>
                        <div className="trust-item"><CheckCircle size={15} /><span>₹0 Setup Cost to Start</span></div>
                        <div className="trust-item"><CheckCircle size={15} /><span>Live in 7 Days Guaranteed</span></div>
                    </div>
                </div>
                <div className="hero-scroll-indicator">
                    <div className="scroll-dot"></div>
                </div>
            </section>

            {/* STATS STRIP */}
            <section className="stats-strip">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((s, i) => (
                            <div key={i} className="stat-item">
                                <div className="stat-value">{s.value}</div>
                                <div className="stat-label">{s.label}</div>
                                <div className="stat-trend-text">{s.trend}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROBLEM */}
            <section className="section problem-section">
                <div className="container">
                    <div className="section-header">
                        <div className="eyebrow">The Problem</div>
                        <h2>Why Are Offline Shops <span className="gradient-text">Struggling Today?</span></h2>
                        <p>The retail world is changing fast. Here's what shopkeepers face every day without going digital.</p>
                    </div>
                    <div className="grid grid-3">
                        {problems.map((p, i) => (
                            <div key={i} className="problem-card card">
                                <div className="problem-icon">{p.icon}</div>
                                <h3>{p.title}</h3>
                                <p>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SOLUTION */}
            <section className="section solution-section">
                <div className="container">
                    <div className="section-header">
                        <div className="eyebrow">Our Solution</div>
                        <h2>Everything Your Shop Needs <span className="gradient-text">to Go Digital</span></h2>
                        <p>SellSathi is a complete done-for-you digital transformation service for local businesses.</p>
                    </div>
                    <div className="grid grid-4">
                        {solutions.map((s, i) => (
                            <div key={i} className={`solution-card card`}>
                                <div className={`icon-box icon-box-${s.color}`}>{s.icon}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="section how-section">
                <div className="container">
                    <div className="section-header">
                        <div className="eyebrow">How It Works</div>
                        <h2>From Offline to Online <span className="gradient-text">in 5 Simple Steps</span></h2>
                        <p>We do the heavy lifting. You just focus on your products and customers.</p>
                    </div>
                    <div className="steps-timeline">
                        {steps.map((s, i) => (
                            <div key={i} className="step-card">
                                <div className="step-number">{s.n}</div>
                                <div className="step-connector"></div>
                                <div className="step-content">
                                    <h3>{s.title}</h3>
                                    <p>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHO CAN JOIN */}
            <section className="section categories-section">
                <div className="container">
                    <div className="section-header">
                        <div className="eyebrow">Who Can Join?</div>
                        <h2>Perfect For <span className="gradient-text">Every Local Business</span></h2>
                        <p>Whether you sell groceries, garments, or gadgets — SellSathi is built for you.</p>
                    </div>
                    <div className="categories-grid">
                        {categories.map((c, i) => (
                            <div key={i} className="category-chip">
                                <span className="category-emoji">{c.emoji}</span>
                                <span>{c.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="section testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <div className="eyebrow">Success Stories</div>
                        <h2>Shopkeepers Who <span className="gradient-text">Transformed Their Business</span></h2>
                    </div>
                    <div className="grid grid-3">
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonial-card card">
                                <div className="testimonial-rating">
                                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={15} fill="#f59e0b" color="#f59e0b" />)}
                                </div>
                                <p className="testimonial-text">"{t.text}"</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{t.avatar}</div>
                                    <div>
                                        <div className="testimonial-name">{t.name}</div>
                                        <div className="testimonial-shop">{t.shop}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="section final-cta">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-bg"></div>
                        <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Start Today</div>
                        <h2>Ready to Sell Online? <br />We'll Set Everything Up For You!</h2>
                        <p>Join 120+ shops already growing online. Start with a free consultation — no commitment required.</p>
                        <div className="cta-actions">
                            <Link to="/signup" className="btn btn-primary btn-lg" style={{ background: '#fff', color: '#6366f1' }}>
                                <Rocket size={20} /> Start Selling Online Today
                            </Link>
                            <Link to="/contact" className="btn btn-outline-white btn-lg">Talk to an Expert</Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
