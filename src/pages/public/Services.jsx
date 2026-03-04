import { Link } from 'react-router-dom';
import {
    Globe, MessageCircle, CreditCard, MapPin, Share2, Bot, Package, BarChart3,
    Tag, Truck, Languages, Zap, ArrowRight, Sparkles
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Services.css';

const services = [
    {
        icon: <Globe size={28} />,
        title: 'Complete E-Commerce Setup',
        desc: 'Get a professional online store with product pages, shopping cart, checkout & order management — all branded for your business.',
        features: ['Custom domain', 'Mobile responsive', 'SEO optimized', 'WhatsApp integration'],
        color: 'blue', badge: 'Most Popular',
    },
    {
        icon: <MessageCircle size={28} />,
        title: 'WhatsApp Business Automation',
        desc: 'Automate orders, send confirmations, delivery updates and promotional messages directly via WhatsApp Business API.',
        features: ['Auto order confirmation', 'Delivery tracking', 'Menu sharing', 'Bulk promotions'],
        color: 'green', badge: 'High Demand',
    },
    {
        icon: <Bot size={28} />,
        title: 'AI Product Description Generator',
        desc: 'Our AI writes professional, SEO-friendly product descriptions in English, Hindi & Odia in seconds.',
        features: ['Multi-language output', 'SEO keywords', 'Bulk generation', 'Instant editing'],
        color: 'purple', badge: 'AI Powered',
    },
    {
        icon: <Share2 size={28} />,
        title: 'Social Media Management',
        desc: 'Complete setup and management of Instagram, Facebook, and Google Business for your shop.',
        features: ['Profile creation', 'Content calendar', 'Festival posts', 'Audience growth'],
        color: 'orange', badge: '',
    },
    {
        icon: <BarChart3 size={28} />,
        title: 'Ads Campaign Setup',
        desc: 'Expert-managed Facebook, Instagram & Google Ads targeted to your local customers for maximum ROI.',
        features: ['Hyperlocal targeting', 'Budget optimization', 'A/B testing', 'Weekly reports'],
        color: 'blue', badge: 'High ROI',
    },
    {
        icon: <Package size={28} />,
        title: 'Inventory Management',
        desc: 'Track your stock in real-time, get low stock alerts, and manage products across categories with ease.',
        features: ['Bulk upload via Excel', 'Low stock alerts', 'Category management', 'Barcode support'],
        color: 'green', badge: '',
    },
    {
        icon: <BarChart3 size={28} />,
        title: 'Analytics & Sales Reports',
        desc: 'Daily, weekly and monthly reports on sales, visitors, best-selling products and customer behavior.',
        features: ['Revenue charts', 'Product performance', 'Customer insights', 'Export PDF'],
        color: 'purple', badge: '',
    },
    {
        icon: <Tag size={28} />,
        title: 'Coupon & Discount System',
        desc: 'Create festival discount codes, seasonal offers, and loyalty rewards to boost repeat purchases.',
        features: ['Custom coupon codes', 'Usage limits', 'Expiry dates', 'Festival banners'],
        color: 'orange', badge: '',
    },
    {
        icon: <Truck size={28} />,
        title: 'Hyperlocal Delivery Setup',
        desc: 'Define delivery radius, calculate charges, manage delivery partners and track orders on a map.',
        features: ['3km, 5km, 10km radius', 'Partner assignment', 'Real-time tracking', 'COD support'],
        color: 'blue', badge: '',
    },
    {
        icon: <Languages size={28} />,
        title: 'Multi-language Store',
        desc: 'Serve customers in their preferred language with full English, Hindi, and Odia language support.',
        features: ['English / Hindi / Odia', 'Auto-translate', 'Language toggle', 'Regional formats'],
        color: 'green', badge: 'Local-First',
    },
];

export default function Services() {
    return (
        <div>
            <Navbar />
            <div className="page-hero">
                <div className="page-hero-bg"></div>
                <div className="container">
                    <span className="eyebrow-light">Our Services</span>
                    <h1>Everything You Need to <span className="gradient-text">Sell Online</span></h1>
                    <p>A complete done-for-you digital transformation suite for local businesses. No technical skills required.</p>
                    <Link to="/signup" className="btn btn-primary btn-lg">Get Started Free <ArrowRight size={18} /></Link>
                </div>
            </div>

            <section className="section services-grid-section">
                <div className="container">
                    <div className="services-grid">
                        {services.map((s, i) => (
                            <div key={i} className="service-card card">
                                {s.badge && <span className={`badge badge-${s.color} service-badge`}><Sparkles size={12} /> {s.badge}</span>}
                                <div className={`icon-box icon-box-${s.color}`}>{s.icon}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                                <ul className="service-features">
                                    {s.features.map((f, j) => (
                                        <li key={j}><Zap size={13} className="feature-tick" />{f}</li>
                                    ))}
                                </ul>
                                <Link to="/pricing" className="btn btn-outline btn-sm" style={{ marginTop: 'auto' }}>View Plans <ArrowRight size={14} /></Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section cta-strip">
                <div className="container">
                    <div className="cta-strip-inner">
                        <div>
                            <h2>Ready to Bring Your Shop Online?</h2>
                            <p>Join 120+ shopkeepers who transformed their business with SellerConnect.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <Link to="/signup" className="btn btn-primary">Start Free Today</Link>
                            <Link to="/contact" className="btn btn-outline-white">Talk to Expert</Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
